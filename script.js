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
            backgroundColor: 'rgba(153, 102, 255, 0.6)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1,
            barThickness: 40 
        }]
    },
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Bar Chart'
            }
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
const chart2 = new Chart(areaChart, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Dataset',
            data: [],
            borderColor: 'rgba(75, 192, 192, 1)',
            fill: false
        }]
    },
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Area Chart'
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
    chart2.update(); 
    chart.update();
});