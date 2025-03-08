Chartkick.options = {
  height: "300px",
  colors: ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"],
  message: {empty: "Sem dados disponíveis"},
  thousands: ".",
  decimal: ",",
  suffix: "",
  round: 2,
  loading: "Carregando dados...",
  library: {
    plugins: {
      legend: {
        position: 'bottom'
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: '#E5E7EB'
        }
      }
    }
  }
} 