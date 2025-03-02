class PregnancyCalculatorsController < ApplicationController
  before_action :authenticate_user!
  def index
    @latest_pregnancy_calculation = current_user.pregnancy_calculators.order(created_at: :desc).first
  end

  def create
    @calculator = current_user.pregnancy_calculators.new(calculator_params)
    if @calculator.save
      respond_to do |format|
        format.html { redirect_to pregnancy_calculators_path, notice: "Cálculo salvo com sucesso!" }
        format.turbo_stream do
          render turbo_stream: turbo_stream.replace(
            "latest_pregnancy_calculation",
            partial: "pregnancy_calculators/calculation_result",
            locals: { calculator: @calculator }
          )
        end
      end
    else
      render :index, alert: "Erro ao salvar cálculo."
    end
  end

  def edit
    @calculator = current_user.pregnancy_calculators.find(params[:id])
    respond_to do |format|
      format.html
      format.turbo_stream
    end
  end

  def update
    @calculator = current_user.pregnancy_calculators.find(params[:id])
    if @calculator.update(calculator_params)
      respond_to do |format|
        format.html { redirect_to pregnancy_calculators_path, notice: "Cálculo atualizado com sucesso!" }
        format.turbo_stream do
          render turbo_stream: turbo_stream.replace(
            "edit_pregnancy_calculator",
            partial: "pregnancy_calculators/calculation_result",
            locals: { calculator: @calculator }
          )
        end
      end
    else
      render :edit, alert: "Erro ao atualizar cálculo."
    end
  end

  def destroy
    @calculator = current_user.pregnancy_calculators.find(params[:id])
    @calculator.destroy
    redirect_to pregnancy_calculators_path, notice: "Cálculo excluído com sucesso!"
  end

  private

  def calculator_params
    params.require(:pregnancy_calculator).permit(:last_menstrual_period_date)
  end
end
