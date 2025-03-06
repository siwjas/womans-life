class Users::RegistrationsController < Devise::RegistrationsController
  # Redirecionar para o perfil após atualização bem-sucedida
  protected

  def after_update_path_for(resource)
    profile_path
  end
end 