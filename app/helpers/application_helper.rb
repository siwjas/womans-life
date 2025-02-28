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
    if current_page?(path)
      "block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
    else
      "block py-2 px-3 text-gray-900 rounded hover:bg-rose-200 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white
      md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent transition-all duration-300"
    end
  end

  def aria(path)
    if current_page?(path)
      "page"
    else
      "false"
    end
  end
end
