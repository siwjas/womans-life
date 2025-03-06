class UpcomingEventsService
  def self.calculate_for_user(user)
    return [] unless user

    events = []
    
    # Buscar os cálculos mais recentes
    latest_menstrual = user.menstrual_cycle_calculators.order(created_at: :desc).first
    latest_pregnancy = user.pregnancy_calculators.order(created_at: :desc).first
    latest_bmi = user.bmi_calculators.order(created_at: :desc).first
    
    # Adicionar logs para depuração
    Rails.logger.debug "Latest menstrual calculation found: #{latest_menstrual.present?}"
    
    # Adicionar eventos do ciclo menstrual
    if latest_menstrual
      menstrual_events = self.menstrual_events(latest_menstrual)
      Rails.logger.debug "Menstrual events: #{menstrual_events.inspect}"
      events.concat(menstrual_events)
    end
    
    # Adicionar eventos da gravidez
    events.concat(pregnancy_events(latest_pregnancy)) if latest_pregnancy
    
    # Adicionar eventos de IMC/peso
    events.concat(bmi_events(latest_bmi)) if latest_bmi
    
    # Ordenar eventos por proximidade
    sorted_events = events.sort_by { |event| event[:days_away] }
    
    # Log dos eventos ordenados
    Rails.logger.debug "Sorted events: #{sorted_events.inspect}"
    
    sorted_events
  end
  
  def self.menstrual_events(calculator)
    return [] unless calculator
    
    events = []
    
    # Evento para o próximo ciclo
    events << {
      name: "Próximo Ciclo Menstrual",
      date: calculator.next_period_date,
      end_date: calculator.next_period_date + (calculator.period_duration || 5).days,
      days_away: (calculator.next_period_date - Date.today).to_i,
      type: "period"
    }
    
    # Evento para o período fértil
    if calculator.fertility_window_start > Date.today
      events << {
        name: "Período Fértil",
        date: calculator.fertility_window_start,
        end_date: calculator.fertility_window_end,
        days_away: (calculator.fertility_window_start - Date.today).to_i,
        type: "fertility"
      }
    end
    
    events
  end
  
  def self.pregnancy_events(calculator)
    [{
      name: "Data prevista do parto",
      date: calculator.due_date,
      days_away: (calculator.due_date - Date.today).to_i,
      type: "pregnancy"
    }]
  end
  
  def self.bmi_events(calculator)
    # Calcular peso ideal baseado na altura (usando fórmula do IMC ideal = 22)
    height_in_meters = calculator.height.to_f / 100  # Convertendo cm para metros
    ideal_weight = (22 * height_in_meters * height_in_meters).round(1)
    
    # Calcular diferença entre peso atual e ideal
    weight_difference = (calculator.weight - ideal_weight).round(1)
    
    # Determinar se precisa ganhar ou perder peso
    # Considerando uma margem de ±0.99 kg como "peso ideal"
    if weight_difference.abs <= 0.99
      status = "ideal"
      message = "Seu peso está ideal"
    elsif weight_difference > 0
      status = "lose"
      message = "Perder #{weight_difference.round} kg"
    else
      status = "gain"
      message = "Ganhar #{weight_difference.abs.round} kg"
    end
    
    [{
      name: "Peso ideal",
      current: calculator.weight,
      target: ideal_weight,
      difference: weight_difference,
      message: message,
      status: status,
      days_away: 30,  # Colocamos um valor arbitrário para ordenação
      type: "weight"
    }]
  end
end 