// ================= Dashboard Data Binding Script =================

// 1️⃣ Fetch data.json
fetch('/assets/data/data.json')
  .then(response => response.json())
  .then(data => {
    // ---------------------------
    // 2️⃣ Update KPI Cards
    // ---------------------------
    document.querySelector('#kpi-activeUsers').textContent = data.kpis.activeUsers;
    document.querySelector('#kpi-newSignups').textContent = data.kpis.newSignups;
    document.querySelector('#kpi-revenue').textContent = `$${data.kpis.revenue.toLocaleString()}`;
    document.querySelector('#kpi-openTickets').textContent = data.kpis.openTickets;

    // ---------------------------
    // 3️⃣ Render Chart (Profile Visits)
    // ---------------------------
    const chartOptions = {
      chart: { type: 'line', height: 250 },
      series: [{
        name: 'Visits',
        data: data.chart.data
      }],
      xaxis: { categories: data.chart.labels },
      colors: [data.settings.primaryColor],
      stroke: { curve: 'smooth', width: 3 },
      markers: { size: 5 },
      dataLabels: { enabled: false }
    };
    const chart = new ApexCharts(document.querySelector('#chart-profile-visit'), chartOptions);
    chart.render();

    // ---------------------------
    // 4️⃣ Populate Recent Activity Table
    // ---------------------------
    const tableBody = document.querySelector('#recent-activity-body');
    tableBody.innerHTML = ''; // Clear existing rows
    data.recent.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.time}</td>
        <td>${item.user}</td>
        <td>${item.action}</td>
        <td><span class="badge bg-${item.status === 'success' ? 'success' : item.status === 'pending' ? 'warning' : 'danger'}">${item.status}</span></td>
      `;
      tableBody.appendChild(row);
    });

    // ---------------------------
    // 5️⃣ Theme / UI Settings
    // ---------------------------
    document.documentElement.style.setProperty('--bs-primary', data.settings.primaryColor);
  })
  .catch(err => console.error('Error loading dashboard data:', err));
