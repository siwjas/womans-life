class PagesController < ApplicationController
  before_action :authenticate_user!, only: [:dashboard]
  
  def home
  end

  def dashboard
    # Adicionar log para verificar a data atual no servidor
    Rails.logger.debug "Current date on server: #{Date.today}"
    
    # Buscar os cálculos mais recentes de cada tipo para o usuário atual
    @latest_pregnancy = current_user.pregnancy_calculators.order(created_at: :desc).first if user_signed_in?
    @latest_menstrual = current_user.menstrual_cycle_calculators.order(created_at: :desc).first if user_signed_in?
    @latest_bmi = current_user.bmi_calculators.order(created_at: :desc).first if user_signed_in?
    
    # Logs detalhados
    if user_signed_in?
      Rails.logger.debug "User signed in: #{current_user.email}"
      Rails.logger.debug "Latest menstrual calculation: #{@latest_menstrual.inspect}" if @latest_menstrual
    end
    
    # Buscar histórico de cálculos para gráficos com timestamp completo
    @bmi_history = current_user.bmi_calculators.order(created_at: :asc).last(20) if user_signed_in?
    
    # Calcular eventos próximos para exibir no dashboard
    @upcoming_events = UpcomingEventsService.calculate_for_user(current_user) if user_signed_in?
    
    # Calcular próximos ciclos para o calendário
    if @latest_menstrual
      @next_cycles = @latest_menstrual.next_cycles(3)
      Rails.logger.debug "Next cycles: #{@next_cycles.inspect}"
    end
    
    # Log dos eventos
    Rails.logger.debug "Upcoming events count: #{@upcoming_events.size}" if @upcoming_events
    
    # Calcular tendência de IMC
    if user_signed_in? && @bmi_history.present? && @bmi_history.size > 1
      first_bmi = @bmi_history.first.bmi
      last_bmi = @bmi_history.last.bmi
      @bmi_trend = {
        direction: last_bmi <=> first_bmi,  # -1: diminuindo, 0: estável, 1: aumentando
        difference: (last_bmi - first_bmi).round(2),
        percentage: ((last_bmi - first_bmi) / first_bmi * 100).round(2)
      }
    end
    
    # Preparar dados para o gráfico de peso
    if user_signed_in? && @bmi_history.present?
      # Determinar se estamos em uma requisição mobile (baseado no user agent)
      is_mobile = request.user_agent =~ /Mobile|Android|iPhone/
      
      # Para dispositivos móveis, reduzir a quantidade de pontos de dados
      data_points = is_mobile ? @bmi_history.last(10) : @bmi_history
      
      @weight_chart_data = data_points.map do |record|
        local_time = record.created_at.in_time_zone('America/Sao_Paulo')
        {
          date: local_time.strftime('%d/%m'),
          weight: record.weight
        }
      end
      
      # Preparar dados para o gráfico de IMC
      @bmi_chart_data = data_points.map do |record|
        local_time = record.created_at.in_time_zone('America/Sao_Paulo')
        {
          date: local_time.strftime('%d/%m'),
          bmi: record.bmi.round(1)
        }
      end
    end

    # Adicionar logs para depuração
    Rails.logger.debug "BMI History Count: #{@bmi_history.size}" if @bmi_history.present?
    Rails.logger.debug "Weight Chart Data: #{@weight_chart_data.inspect}"
  end

  def blog
  end
  
  def about
  end

  def bmi_calculators
  end

  def pregnancy_calculators
  end

  def menstrual_cycle_calculators
  end  
end
