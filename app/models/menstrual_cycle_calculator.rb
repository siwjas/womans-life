class MenstrualCycleCalculator < ApplicationRecord
  belongs_to :user

  # Validations
  validates :last_period_date, presence: true
  validates :cycle_length, presence: true, numericality: { greater_than: 0 }
  validates :period_duration, presence: true, numericality: { greater_than: 0 }

  # Callbacks
  before_save :calculate_fertility_window
  before_save :calculate_next_period
  before_validation :set_default_period_duration, if: -> { period_duration.nil? }

  # Methods
  def calculate_fertility_window
    ovulation_day = last_period_date + (cycle_length - 14).days
    self.fertility_window_start = ovulation_day - 3.days
    self.fertility_window_end = ovulation_day + 2.days
    self.ovulation_date = ovulation_day
  end

  def calculate_next_period
    self.next_period_date = last_period_date + cycle_length.days
  end
  
  # Método para calcular os próximos 3 ciclos
  def next_cycles(count = 3)
    cycles = []
    current_date = next_period_date
    
    count.times do
      cycles << {
        period_start: current_date,
        period_end: current_date + period_duration.days,
        fertility_start: current_date + (cycle_length - 18).days,
        fertility_end: current_date + (cycle_length - 11).days,
        ovulation: current_date + (cycle_length - 14).days
      }
      
      current_date = current_date + cycle_length.days
    end
    
    cycles
  end
  
  private
  
  def set_default_period_duration
    self.period_duration = 5 # Valor padrão de 5 dias
  end
end
