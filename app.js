const menuButton = document.getElementById('menu-button');
const sidebar = document.getElementById('sidebar');
const backdrop = document.getElementById('backdrop');

menuButton.addEventListener('click', () => {
    sidebar.classList.toggle('hidden-sidebar');
    sidebar.classList.toggle('visible-sidebar');
    backdrop.classList.toggle('visible');
});

backdrop.addEventListener('click', () => {
    sidebar.classList.add('hidden-sidebar');
    sidebar.classList.remove('visible-sidebar');
    backdrop.classList.remove('visible');
});

const pusher = new Pusher('e1873c90abc55b055f38', {
    cluster: 'ap2',
    encrypted: true
  });
  
  const channel = pusher.subscribe('my-channel');
  
  channel.bind('my-event', function(data) {
    updateChart(data.value);  
  });
  
  const ctx = document.getElementById('liveChart').getContext('2d');
  const statValue = document.getElementById('statValue')
  
  const liveChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Live Data',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        pointBorderColor: '#fff',
        data: [],
        fill: true,
        tension: 0.4,
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          type: 'category',  
          position: 'bottom'
        },
        y: {
          beginAtZero: true
        }
      }
    }
  });
  
  function updateChart(value) {
    statValue.innerHTML = value;
    const currentTime = new Date().toLocaleTimeString();
  
    liveChart.data.labels.push(currentTime);
    liveChart.data.datasets[0].data.push(value);
  
    if (liveChart.data.labels.length > 50) {
      liveChart.data.labels.shift();
      liveChart.data.datasets[0].data.shift();
    }
  
    liveChart.update();
  }
  
  
  setInterval(() => {
    const simulatedValue = Math.floor(Math.random() * 100);  
    updateChart(simulatedValue);  
  }, 3000);
  
