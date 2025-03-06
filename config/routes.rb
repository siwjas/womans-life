Rails.application.routes.draw do
  devise_for :users, controllers: {
    registrations: 'users/registrations'
  }
  get "pages/home"
  root "pages#home"

  # Rotas para as páginas estáticas
  get "blog", to: "pages#blog", as: :blog
  get "dashboard", to: "pages#dashboard", as: :dashboard
  get "sobre", to: "pages#about", as: :about

  # Rotas para as calculadoras
  resources :pregnancy_calculators
  resources :menstrual_cycle_calculators
  resources :bmi_calculators

  # Rota para a página de perfil
  resource :profile, only: [ :show ]

  get "up" => "rails/health#show", as: :rails_health_check
end
