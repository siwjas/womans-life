# Este arquivo configura variáveis de ambiente padrão para o ambiente de build do Docker

# Verificar se estamos no ambiente de build do Docker
if ENV['RAILS_ENV'] == 'production' && ENV['DOCKER_BUILD'] == 'true'
  # Definir valores padrão para variáveis de ambiente durante o build
  ENV['DATABASE_URL'] ||= 'postgresql://postgres:postgres@localhost/dummy_db'
  ENV['SECRET_KEY_BASE'] ||= 'dummy_key_for_build_only'
  
  # Adicione outras variáveis de ambiente necessárias durante o build
end 