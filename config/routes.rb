Rails.application.routes.draw do
  devise_for :users
  get "pages/home"
  root "pages#home"

  # Rotas para as calculadoras
  resources :pregnancy_calculators, only:       [ :index, :create, :edit, :update, :destroy ]
  resources :menstrual_cycle_calculators, only: [ :index, :create, :edit, :update, :destroy ]
  resources :bmi_calculators, only:             [ :index, :create, :edit, :update, :destroy ]

  # Rota para a página de perfil
  resource :profile, only: [ :show ]

  get "up" => "rails/health#show", as: :rails_health_check
end
