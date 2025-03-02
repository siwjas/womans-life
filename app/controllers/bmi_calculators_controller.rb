class BmiCalculatorsController < ApplicationController
  before_action :authenticate_user!
  def index
    @latest_bmi_calculation = current_user.bmi_calculators.order(created_at: :desc).first
  end

  def new
    @bmi_calculator = BmiCalculator.new
  end

  def create
    @calculator = current_user.bmi_calculators.new(calculator_params)
    if @calculator.save
      respond_to do |format|
        format.html { redirect_to bmi_calculators_path, notice: "Cálculo salvo com sucesso!" }
        format.turbo_stream do
          render turbo_stream: turbo_stream.replace(
            "latest_bmi_calculation",
            partial: "bmi_calculators/calculation_result",
            locals: { calculator: @calculator }
          )
        end
      end
    else
      render :index, alert: "Erro ao salvar cálculo."
    end
  end

  def edit
    @calculator = current_user.bmi_calculators.find(params[:id])
    respond_to do |format|
      format.html
      format.turbo_stream
    end
  end

  def update
    @calculator = current_user.bmi_calculators.find(params[:id])
    if @calculator.update(calculator_params)
      respond_to do |format|
        format.html { redirect_to bmi_calculators_path, notice: "Cálculo atualizado com sucesso!" }
        format.turbo_stream do
          render turbo_stream: [
            turbo_stream.replace(
              "edit_bmi_calculator",
              partial: "bmi_calculators/calculation_result",
              locals: { calculator: @calculator }
            ),
            turbo_stream.replace(
              "latest_bmi_calculation",
              partial: "bmi_calculators/calculation_result",
              locals: { calculator: @calculator }
            )
          ]
        end
      end
    else
      render :edit, alert: "Erro ao atualizar cálculo."
    end
  end

  def destroy
    @calculator = current_user.bmi_calculators.find(params[:id])
    @calculator.destroy
    redirect_to bmi_calculators_path, notice: "Cálculo excluído com sucesso!"
  end


  private

  def calculator_params
    params.require(:bmi_calculator).permit(:weight, :height, :is_pregnant, :pre_pregnancy_weight, :weight_goal)
  end
end
