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
    @latest_bmi       = current_user.bmi_calculators.order(created_at: :desc).first if user_signed_in?
    
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
    
    # Preparar dados para os gráficos de IMC
    @bmi_data = current_user.bmi_calculators.order(created_at: :asc) if user_signed_in?
    
    # Preparar dados para os gráficos de peso
    @weight_data = current_user.bmi_calculators.order(created_at: :asc) if user_signed_in?
    
    # Calcular peso ideal baseado na altura (IMC entre 18.5 e 24.9)
    if user_signed_in? && current_user.height.present?
      height_in_meters = current_user.height / 100.0
      @underweight_threshold = (18.5 * (height_in_meters**2)).round(1)
      @ideal_weight_min = (18.5 * (height_in_meters**2)).round(1)
      @ideal_weight_max = (24.9 * (height_in_meters**2)).round(1)
      @overweight_threshold = (25 * (height_in_meters**2)).round(1)
      @obesity_threshold = (30 * (height_in_meters**2)).round(1)
    end
    
    # Adicionar logs para depuração
    Rails.logger.debug "BMI History Count: #{@bmi_history.size}" if @bmi_history.present?
    Rails.logger.debug "Weight Chart Data: #{@weight_data.inspect}"
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
