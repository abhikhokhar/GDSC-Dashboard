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

const liveCtx = document.getElementById('liveChart').getContext('2d');
const saleData = document.getElementById("randomNumber");
const projectedCtx = document.getElementById('projectedChart').getContext('2d');
const projectedData = document.getElementById("projectedNumber");

const liveChart = createChart(liveCtx, 'Live Data');
const projectedChart = createChart(projectedCtx, 'Projected Data');

function createChart(context, label) {
  return new Chart(context, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: label,
        backgroundColor: label === 'Live Data' ? 'rgba(75, 192, 192, 0.2)' : 'rgba(255, 99, 132, 0.2)',
        borderColor: label === 'Live Data' ? 'rgba(75, 192, 192, 1)' : 'rgba(255, 99, 132, 1)',
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
}

function updateChart(chart, value) {
  const currentTime = new Date().toLocaleTimeString();
  chart.data.labels.push(currentTime);
  chart.data.datasets[0].data.push(value);

  if (chart.data.labels.length > 50) {
    chart.data.labels.shift();
    chart.data.datasets[0].data.shift();
  }
  chart.update();
}

setInterval(() => {
  const simulatedValue = Math.floor(Math.random() * 100);
  saleData.innerHTML = simulatedValue;
  updateChart(liveChart, simulatedValue);
}, 2000);

setInterval(() => {
  const simulatedValue = Math.floor(Math.random() * 100);
  projectedData.innerHTML = simulatedValue;
  updateChart(projectedChart, simulatedValue);
}, 4000);
