class MenstrualCycleCalculator < ApplicationRecord
  belongs_to :user

  # Validations
  validates :last_period_date, presence: true
  validates :cycle_length, presence: true, numericality: { greater_than: 0 }
  validates :period_duration, presence: true, numericality: { greater_than: 0 }

  # Callbacks
  before_save :calculate_fertility_window
  before_save :calculate_next_period

  # Methods
  def calculate_fertility_window
    ovulation_day = last_period_date + (cycle_length - 14).days
    self.fertility_window_start = ovulation_day - 3.days
    self.fertility_window_end = ovulation_day + 2.day
    self.ovulation_date = ovulation_day
  end

  def calculate_next_period
    self.next_period_date = last_period_date + cycle_length.days
  end
end
