class UsersController < ApplicationController
  def create
    @user = User.new(user_params)

    if @user.save
      redirect_to root_url, notice: "Usuário criado com sucesso!"
    else
      render :new, alert: "Erro ao criar usuário: #{@user.errors.full_messages.to_sentence}"
    end
  end

  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation)
  end
end
