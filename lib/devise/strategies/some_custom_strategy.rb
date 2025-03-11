require "devise/strategies/authenticatable"

module Devise
  module Strategies
    class SomeCustomStrategy < Authenticatable
      def authenticate!
        # Lógica de autenticação personalizada
        if params[:user] && params[:user][:email] == "custom@example.com" && params[:user][:password] == "password"
          success!(User.find_by(email: "custom@example.com"))
        else
          fail!("Invalid email or password")
        end
      end
    end
  end
end

Warden::Strategies.add(:some_custom_strategy, Devise::Strategies::SomeCustomStrategy)
