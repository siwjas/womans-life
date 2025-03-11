module ApplicationHelper
  def nav_items
    [
      { page: "Home", href: root_path },
      { page: "Blog", href: blog_path },
      { page: "Dashboard", href: dashboard_path },
      { page: "Sobre", href: about_path },
      { page: "Calculadoras", href: "#", dropdown: [
        { page: "Tempo de Gestação", href: pregnancy_calculators_path },
        { page: "Ciclo Menstrual", href: menstrual_cycle_calculators_path },
        { page: "Peso Ideal", href: bmi_calculators_path }
      ] }
    ]
  end

    def nav_class(path)
    end

  def aria(path)
    if current_page?(path)
      "page"
    else
      "false"
    end
  end

  def nav_icon
    tag.svg(class: "h-4 w-4 group-hover:rotate-45 transition-all duration-300", fill: "none", viewBox: "0 0 24 24", stroke_width: "1.5", stroke: "currentColor") do
      tag.path(
        stroke_linecap: "round",
        stroke_linejoin: "round",
        d: "m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
      )
    end
  end
end
