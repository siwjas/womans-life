class PregnancyCalculator < ApplicationRecord
  belongs_to :user

  # Validations
  validates :last_menstrual_period_date, presence: true

  # Callbacks
  before_save :calculate_due_date
  before_save :calculate_gestational_age

  # Methods
  def calculate_due_date
    self.due_date = last_menstrual_period_date + 280.days
  end

  def calculate_gestational_age
    today = Date.current
    days_difference = (today - last_menstrual_period_date).to_i
    self.weeks = days_difference / 7
    self.days = days_difference % 7
  end

  def current_trimester
    return 1 if weeks < 13
    return 2 if weeks < 27
    3
  end
end 