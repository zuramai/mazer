// DARK / LIGHT MODE TOGGLE
const themeToggleBtn = document.getElementById('themeToggle');
let isDark = false;

themeToggleBtn.addEventListener('click', () => {
    isDark = !isDark;
    document.documentElement.setAttribute('data-bs-theme', isDark ? 'dark' : 'light');
});

// Initialize Chart.js
const ctx = document.getElementById('weeklyChart').getContext('2d');
const gradient = ctx.createLinearGradient(0, 0, 0, 150);
gradient.addColorStop(0, 'rgba(37, 99, 235, 0.7)');
gradient.addColorStop(1, 'rgba(37, 99, 235, 0.1)');

let weeklyChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Weekly Activity',
            data: [],
            borderColor: '#2563eb',
            backgroundColor: gradient,
            tension: 0.4,
            fill: true,
            pointRadius: 5,
            pointHoverRadius: 7
        }]
    },
    options: {
        responsive: true,
        animation: {
            duration: 800,
            easing: 'easeOutQuart'
        },
        plugins: { legend: { display: false } },
        scales: {
            y: { beginAtZero: true }
        }
    }
});

// Function to update chart dynamically
const updateChart = (chart, chartData) => {
    chart.data.labels = chartData.labels;
    chart.data.datasets[0].data = chartData.data;
    chart.update();
};

// Animate KPI numbers
const animateNumber = (id, value) => {
    let elem = document.getElementById(id);
    let start = 0;
    let increment = value / 60;
    let interval = setInterval(() => {
        start += increment;
        if (start >= value) {
            start = value;
            clearInterval(interval);
        }
        elem.innerText = id === 'kpi-revenue' ? `$${start.toFixed(2)}` : Math.floor(start);
    }, 15);
};

// Initial load
fetch('assets/data/data.json')
    .then(res => res.json())
    .then(data => {
        // Animate KPIs
        animateNumber('kpi-activeUsers', data.kpis.activeUsers);
        animateNumber('kpi-newSignups', data.kpis.newSignups);
        animateNumber('kpi-revenue', data.kpis.revenue);
        animateNumber('kpi-openTickets', data.kpis.openTickets);

        // Populate recent activity table
        const tbody = document.querySelector('#recentTable tbody');
        data.recent.forEach(item => {
            const tr = document.createElement('tr');
            const statusClass = item.status === 'success' ? 'status-success' :
                                item.status === 'pending' ? 'status-pending' : 'status-failed';
            tr.innerHTML = `
                <td>${item.time}</td>
                <td>${item.user}</td>
                <td>${item.action}</td>
                <td class="${statusClass}">${item.status}</td>
            `;
            tbody.appendChild(tr);
        });

        // Populate chart
        updateChart(weeklyChart, data.chart);
    })
    .catch(err => console.error('Error loading dashboard data:', err));

// LIVE UPDATES SIMULATION (Every 10 seconds)
const liveUpdate = () => {
    fetch('assets/data/data.json')
        .then(res => res.json())
        .then(data => {
            // Animate KPIs
            ['activeUsers', 'newSignups', 'revenue', 'openTickets'].forEach(id => {
                const elem = document.getElementById(`kpi-${id}`);
                const value = data.kpis[id];
                let current = parseFloat(elem.innerText.replace(/[^\d.]/g, '') || 0);
                let increment = (value - current) / 60;
                let counter = 0;
                const interval = setInterval(() => {
                    current += increment;
                    counter++;
                    if (counter >= 60) {
                        current = value;
                        clearInterval(interval);
                    }
                    elem.innerText = id === 'revenue' ? `$${current.toFixed(2)}` : Math.floor(current);
                }, 50);
            });

            // Update recent activity table
            const tbody = document.querySelector('#recentTable tbody');
            tbody.innerHTML = '';
            data.recent.forEach(item => {
                const tr = document.createElement('tr');
                const statusClass = item.status === 'success' ? 'status-success' :
                                    item.status === 'pending' ? 'status-pending' : 'status-failed';
                tr.innerHTML = `
                    <td>${item.time}</td>
                    <td>${item.user}</td>
                    <td>${item.action}</td>
                    <td class="${statusClass}">${item.status}</td>
                `;
                tbody.appendChild(tr);
            });

            // Update chart
            updateChart(weeklyChart, data.chart);
        })
        .catch(err => console.error('Error fetching live data:', err));
};

// Start live updates
liveUpdate();
setInterval(liveUpdate, 10000);
