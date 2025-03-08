Chartkick.options = {
  height: "300px",
  colors: ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"],
  message: {empty: "Sem dados disponíveis"},
  thousands: ".",
  decimal: ",",
  suffix: "",
  round: 2,
  loading: "Carregando dados...",
  adapter: "highcharts",
  library: {
    chart: {
      style: {
        fontFamily: "'Inter', 'Helvetica', 'Arial', sans-serif"
      }
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      series: {
        animation: {
          duration: 1000
        },
        marker: {
          enabled: true,
          radius: 4
        }
      }
    }
  }
}
