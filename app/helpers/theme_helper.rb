module ThemeHelper
  def dark_mode?
    # Verificar se há um cookie de tema
    cookies[:theme] == "dark"
  end

  def theme_color(dark_color, light_color)
    dark_mode? ? dark_color : light_color
  end
end
