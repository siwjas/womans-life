class BmiCalculator < ApplicationRecord
  belongs_to :user

  # Validations
  validates :weight, presence: true, numericality: { greater_than: 0 }
  validates :height, presence: true, numericality: { greater_than: 0 }
  validates :pre_pregnancy_weight, numericality: { greater_than: 0 }, allow_nil: true
  validates :weight_goal, numericality: { greater_than: 0 }, allow_nil: true

  # Callbacks
  before_save :calculate_bmi

  # Methods
  def calculate_bmi
    # Converte a altura de centímetros para metros
    height_in_meters = height / 100.0
    # Calcula o IMC
    self.bmi = (weight / (height_in_meters**2)).round(2)
  end

  def bmi_category
    case bmi
    when 0..18.49     then "Abaixo do peso ideal"
    when 18.50..24.99 then "Peso ideal"
    when 25.00..29.99 then "Sobrepeso"
    when 30.00..34.99 then "Obesidade Grau I"
    when 35.00..39.99 then "Obesidade Grau II"
    when 40.00..99.99 then "Obesidade Grau III"
    else "Obesidade mórbida"
    end
  end

  def bmi_border_color(bmi_category)
    case bmi_category
    when "Abaixo do peso ideal" then "border-yellow-400"
    when "Peso ideal"           then "border-green-400"
    when "Sobrepeso"            then "border-orange-400"
    when "Obesidade Grau I"     then "border-red-400"
    when "Obesidade Grau II"    then "border-red-600"
    else "border-red-800"
    end
  end

  def bmi_text_color(bmi)
    case bmi
    when 0..18.49 then "text-yellow-600"
    when 18.50..24.99 then "text-green-600"
    when 25.00..29.99 then "text-orange-600"
    when 30.00..34.99 then "text-red-600"
    when 35.00..39.99 then "text-red-700"
    else "text-red-900"
    end
  end

  # def pregnancy_weight_category
  #   nil unless user.pregnancy_calculators.exists?
  #   # Custom pregnancy weight recommendations logic
  # end
end
