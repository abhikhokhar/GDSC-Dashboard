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

const barCtx = document.getElementById('barChart').getContext('2d');
const randomN = document.getElementById("randomNumber")

const chart = new Chart(barCtx, {
    type: 'bar',
    data: {
        labels: ['Number'],
        datasets: [{
            label: 'Sales',
            data: [0],
            backgroundColor: 'rgba(54, 162, 235, 0.7)', 
            borderColor: 'rgba(54, 162, 235, 1)', 
            borderWidth: 1,
            barThickness: 40 
        }]
    },
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Bar Chart',
                font :{
                    size: 18,
                    weight: 'bold'
                },
                color: '#333'
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                min: 0,
                max: 10,
                ticks: {
                    stepSize: 1 
                }
            }
        }
    }
});


const areaChart = document.getElementById('areaChart').getContext('2d');
const gradientFill = areaChart.createLinearGradient(0, 0, 0, 400);
gradientFill.addColorStop(0, 'rgba(75, 192, 192, 0.4)');
gradientFill.addColorStop(1, 'rgba(153, 102, 255, 0.2)');

const chart2 = new Chart(areaChart, {
    type: 'line',
    data: {
        labels: [], 
        datasets: [{
            label: 'Dataset',
            data: [],
            backgroundColor: gradientFill,
            borderColor: 'rgba(75, 192, 192, 1)',
            pointBackgroundColor: 'rgba(255, 99, 132, 1)',
            pointBorderColor: '#fff',
            fill: true,
            tension: 0.4
        }]
    },
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Area Chart',
                font: {
                    size: 18,
                    weight: 'bold'
                },
                color: '#333'
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
const socket = io('https://data.gdscnsut.com');

socket.on('random_number', (randomNum) => {
    randomN.innerHTML = randomNum.number;

    chart.data.datasets[0].data = [randomNum.number]; 
    chart2.data.datasets[0].data.push(randomNum.number); 
    const time = new Date();
    chart2.data.labels.push(time.toLocaleTimeString()); 
    if (chart2.data.labels.length > 50) {
        chart2.data.labels.shift();
        chart2.data.datasets[0].data.shift();
      }
    chart2.update(); 
    chart.update();
});
