module ApplicationHelper
  def nav_items
    [
      { page: "Home",             href: root_url },
      { page: "Gestação",         href: pregnancy_calculators_path },
      { page: "Ciclo menstrual",  href: menstrual_cycle_calculators_path },
      { page: "Peso ideal",       href: bmi_calculators_path }
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
end
