module UpcomingEventsCalculator
  extend ActiveSupport::Concern

  # Definir métodos de classe diretamente no módulo em vez de usar class_methods
  module ClassMethods
    # Calcula todos os eventos próximos para um usuário
    def calculate_for_user(user)
      return [] unless user

      events = []

      # Buscar os cálculos mais recentes
      latest_menstrual = user.menstrual_cycle_calculators.order(created_at: :desc).first
      latest_pregnancy = user.pregnancy_calculators.order(created_at: :desc).first

      # Adicionar eventos do ciclo menstrual
      events.concat(menstrual_events(latest_menstrual)) if latest_menstrual

      # Adicionar eventos da gravidez
      events.concat(pregnancy_events(latest_pregnancy)) if latest_pregnancy

      # Ordenar eventos por proximidade
      events.sort_by! { |event| event[:days_away] }
    end

    private

    def menstrual_events(calculator)
      events = []

      # Adicionar próximo período menstrual
      events << {
        name: "Próximo ciclo menstrual",
        date: calculator.next_period_date,
        days_away: (calculator.next_period_date - Date.today).to_i,
        type: "menstrual"
      }

      # Adicionar janela fértil
      fertility_start = calculator.fertility_window_start
      fertility_end = calculator.fertility_window_end

      if Date.today >= fertility_start && Date.today <= fertility_end
        # Estamos dentro da janela fértil
        events << {
          name: "Janela fértil",
          date: fertility_start,
          end_date: fertility_end,
          days_away: 0,
          type: "fertility",
          status: "current"
        }
      elsif Date.today < fertility_start
        # Janela fértil ainda não começou
        events << {
          name: "Janela fértil",
          date: fertility_start,
          end_date: fertility_end,
          days_away: (fertility_start - Date.today).to_i,
          type: "fertility"
        }
      elsif Date.today > fertility_end && fertility_start > Date.today
        # Próxima janela fértil (do próximo ciclo)
        events << {
          name: "Próxima janela fértil",
          date: fertility_start,
          end_date: fertility_end,
          days_away: (fertility_start - Date.today).to_i,
          type: "fertility"
        }
      end

      events
    end

    def pregnancy_events(calculator)
      [ {
        name: "Data prevista do parto",
        date: calculator.due_date,
        days_away: (calculator.due_date - Date.today).to_i,
        type: "pregnancy"
      } ]
    end
  end
end
