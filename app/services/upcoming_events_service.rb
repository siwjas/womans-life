class UpcomingEventsService
  def self.calculate_for_user(user)
    return [] unless user

    events = []
    
    # Buscar os cálculos mais recentes
    latest_menstrual = user.menstrual_cycle_calculators.order(created_at: :desc).first
    latest_pregnancy = user.pregnancy_calculators.order(created_at: :desc).first
    latest_bmi = user.bmi_calculators.order(created_at: :desc).first
    
    # Adicionar eventos do ciclo menstrual
    events.concat(menstrual_events(latest_menstrual)) if latest_menstrual
    
    # Adicionar eventos da gravidez
    events.concat(pregnancy_events(latest_pregnancy)) if latest_pregnancy
    
    # Adicionar eventos de IMC/peso
    events.concat(bmi_events(latest_bmi)) if latest_bmi
    
    # Ordenar eventos por proximidade
    events.sort_by! { |event| event[:days_away] }
  end
  
  def self.menstrual_events(calculator)
    events = []
    
    # Adicionar próximo período menstrual
    events << {
      name: "Próximo ciclo menstrual",
      date: calculator.next_period_date,
      days_away: (calculator.next_period_date - Date.today).to_i,
      type: "menstrual"
    }
    
    # Adicionar janela fértil
    fertility_start = calculator.fertility_window_start
    fertility_end = calculator.fertility_window_end
    
    if Date.today >= fertility_start && Date.today <= fertility_end
      # Estamos dentro da janela fértil
      events << {
        name: "Janela fértil",
        date: fertility_start,
        end_date: fertility_end,
        days_away: 0,
        type: "fertility",
        status: "current"
      }
    elsif Date.today < fertility_start
      # Janela fértil ainda não começou
      events << {
        name: "Janela fértil",
        date: fertility_start,
        end_date: fertility_end,
        days_away: (fertility_start - Date.today).to_i,
        type: "fertility"
      }
    elsif Date.today > fertility_end && fertility_start > Date.today
      # Próxima janela fértil (do próximo ciclo)
      events << {
        name: "Próxima janela fértil",
        date: fertility_start,
        end_date: fertility_end,
        days_away: (fertility_start - Date.today).to_i,
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