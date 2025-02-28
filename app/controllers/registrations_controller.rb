class Users::RegistrationsController < Devise::RegistrationsController
  before_action :configure_sign_up_params, only: [ :create ]
  before_action :configure_account_update_params, only: [ :update ]

  def create
    build_resource(sign_up_params)

    if resource.save
      redirect_to root_path, notice: "Usuário criado com sucesso!"
    else
      render :new
    end
  end

  protected

  def configure_sign_up_params
    devise_parameter_sanitizer.permit(:sign_up, keys: [ :first_name, :last_name, :email, :password, :password_confirmation ])
  end

  def configure_account_update_params
    devise_parameter_sanitizer.permit(:account_update, keys: [ :first_name, :last_name, :email, :password, :password_confirmation ])
  end
end
