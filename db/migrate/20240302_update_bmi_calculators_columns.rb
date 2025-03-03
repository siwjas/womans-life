class UpdateBmiCalculatorsColumns < ActiveRecord::Migration[7.0]
  def change
    change_column :bmi_calculators, :weight, :decimal, precision: 5, scale: 2
    change_column :bmi_calculators, :height, :decimal, precision: 5, scale: 2
    change_column :bmi_calculators, :pre_pregnancy_weight, :decimal, precision: 5, scale: 2
    change_column :bmi_calculators, :weight_goal, :decimal, precision: 5, scale: 2
  end
end 