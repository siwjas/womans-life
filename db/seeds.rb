# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

# Configuração de dados iniciais para testes

# Limpar dados existentes para evitar duplicações
puts "Limpando dados existentes..."
User.destroy_all
BmiCalculator.destroy_all
MenstrualCycleCalculator.destroy_all

# Criar usuária Diana Prince
puts "Criando usuária Diana Prince..."
diana = User.create!(
  first_name: "Diana",
  last_name: "Prince",
  height: 155,
  email: "diana.prince@email.com",
  password: "maravilha",
  password_confirmation: "maravilha"
)

# Criar cálculo de ciclo menstrual (20 dias atrás)
puts "Criando cálculo de ciclo menstrual..."
last_period_date = 20.days.ago.to_date
diana.menstrual_cycle_calculators.create!(
  last_period_date: last_period_date,
  cycle_length: 28,
  period_duration: 5
)

# Criar 15 pesagens para a calculadora de IMC (uma por dia, começando 15 dias atrás)
puts "Criando 15 pesagens para a calculadora de IMC..."

# Array de pesos aleatórios entre 49.0 e 61.5 kg
weights = 15.times.map { rand(49.0..61.5).round(1) }

# Criar um registro para cada dia, começando 15 dias atrás
15.times do |i|
  date = (15 - i).days.ago
  weight = weights[i]
  
  diana.bmi_calculators.create!(
    weight: weight,
    height: diana.height,
    created_at: date,
    updated_at: date
  )
  
  puts "  Criado registro de IMC para #{date.strftime('%d/%m/%Y')}: #{weight} kg"
end

# Resumo dos dados criados
puts "\nDados criados com sucesso!"
puts "Usuária: #{diana.email}"
puts "Registros de IMC: #{diana.bmi_calculators.count}"
puts "Registros de ciclo menstrual: #{diana.menstrual_cycle_calculators.count}"
puts "Último peso: #{diana.bmi_calculators.order(created_at: :desc).first.weight} kg"
puts "Último IMC: #{diana.bmi_calculators.order(created_at: :desc).first.bmi}"
puts "Próxima menstruação: #{diana.menstrual_cycle_calculators.first.next_period_date.strftime('%d/%m/%Y')}"
