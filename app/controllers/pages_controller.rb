class PagesController < ApplicationController
  before_action :authenticate_user!, only: [:dashboard]
  
  def home
  end

  def dashboard
    # Buscar os cálculos mais recentes de cada tipo para o usuário atual
    @latest_pregnancy = current_user.pregnancy_calculators.order(created_at: :desc).first if user_signed_in?
    @latest_menstrual = current_user.menstrual_cycle_calculators.order(created_at: :desc).first if user_signed_in?
    @latest_bmi = current_user.bmi_calculators.order(created_at: :desc).first if user_signed_in?
    
    # Buscar histórico de cálculos para gráficos com timestamp completo
    @bmi_history = current_user.bmi_calculators.order(created_at: :asc).last(20) if user_signed_in?
    
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
    
    # Calcular próximos eventos importantes usando o serviço
    @upcoming_events = UpcomingEventsService.calculate_for_user(current_user) if user_signed_in?

    # Usar um formato de data mais simples e consistente com fuso horário local
    @weight_chart_data = @bmi_history.map do |record|
      local_time = record.created_at.in_time_zone('America/Sao_Paulo')
      {
        date: local_time.strftime('%d/%m %H:%M'),
        weight: record.weight,
        # Adicionar timestamp completo para depuração
        full_timestamp: local_time.to_s
      }
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
