class MenstrualCycleCalculatorsController < ApplicationController
  before_action :authenticate_user!
  def index
    @latest_menstrual_calculation = current_user.menstrual_cycle_calculators.order(created_at: :desc).first
  end

  def create
    @calculator = current_user.menstrual_cycle_calculators.new(calculator_params)
    if @calculator.save
      respond_to do |format|
        format.html { redirect_to menstrual_cycle_calculators_path, notice: "Cálculo salvo com sucesso!" }
        format.turbo_stream do
          render turbo_stream: turbo_stream.replace(
            "latest_menstrual_calculation",
            partial: "menstrual_cycle_calculators/calculation_result",
            locals: { calculator: @calculator }
          )
        end
      end
    else
      render :index, alert: "Erro ao salvar cálculo."
    end
  end

  def edit
    @calculator = current_user.menstrual_cycle_calculators.find(params[:id])
    respond_to do |format|
      format.html
      format.turbo_stream
    end
  end

  def update
    @calculator = current_user.menstrual_cycle_calculators.find(params[:id])
    if @calculator.update(calculator_params)
      redirect_to menstrual_cycle_calculators_path, notice: "Cálculo atualizado com sucesso!"
    else
      render :edit, alert: "Erro ao atualizar cálculo."
    end
  end

  def destroy
    @calculator = current_user.menstrual_cycle_calculators.find(params[:id])
    @calculator.destroy
    redirect_to menstrual_cycle_calculators_path, notice: "Cálculo excluído com sucesso!"
  end

  private

  def calculator_params
    params.require(:menstrual_cycle_calculator).permit(:last_period_date, :cycle_length, :period_duration)
  end

  def calculate_periodo_fertil(last_period)
    # Lógica de cálculo do período fértil
    # Retorne o resultado do cálculo
    "Resultado do cálculo para a data #{last_period}"
  end
end
