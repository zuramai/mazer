// custom-dashboard.js

document.addEventListener("DOMContentLoaded", async () => {
  // Fetch data.json
  const response = await fetch("/assets/data/data.json");
  const data = await response.json();

  // -----------------------
  // 1. Populate KPI Cards
  // -----------------------
  const kpis = data.kpis;
  document.getElementById("kpi-activeUsers").textContent = kpis.activeUsers.toLocaleString();
  document.getElementById("kpi-newSignups").textContent = kpis.newSignups.toLocaleString();
  document.getElementById("kpi-revenue").textContent = `$${kpis.revenue.toLocaleString()}`;
  document.getElementById("kpi-openTickets").textContent = kpis.openTickets.toLocaleString();

  // -----------------------
  // 2. Populate Weekly Chart
  // -----------------------
  const ctx = document.getElementById("weeklyChart").getContext("2d");
  const weeklyChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: data.chart.labels,
      datasets: [{
        label: "Weekly Activity",
        data: data.chart.data,
        backgroundColor: "rgba(37, 99, 235, 0.2)",
        borderColor: "#2563eb",
        borderWidth: 2,
        tension: 0.3,
        fill: true,
        pointRadius: 4,
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { stepSize: 50 }
        }
      }
    }
  });

  // -----------------------
  // 3. Populate Recent Activity Table
  // -----------------------
  const tbody = document.querySelector("#recentTable tbody");
  data.recent.forEach(item => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${item.time}</td>
      <td>${item.user}</td>
      <td>${item.action}</td>
      <td>
        <span class="badge ${
          item.status === "success" ? "bg-success" :
          item.status === "pending" ? "bg-warning" :
          "bg-danger"
        }">${item.status}</span>
      </td>
    `;
    tbody.appendChild(tr);
  });

  // -----------------------
  // 4. Theme / Background Switching
  // -----------------------
  const themeSelect = document.getElementById("themeSelect");
  const pageContent = document.querySelector(".page-content");

  const themes = {
    ocean: "linear-gradient(to right, #2563eb, #1e40af)",
    sunset: "linear-gradient(to right, #f97316, #b45309)",
    forest: "linear-gradient(to right, #16a34a, #166534)",
    midnight: "linear-gradient(to right, #0f172a, #1e293b)"
  };

  // Set initial theme
  pageContent.style.background = themes[data.settings.theme] || themes.ocean;

  themeSelect.addEventListener("change", (e) => {
    const selectedTheme = e.target.value;
    pageContent.style.background = themes[selectedTheme];
  });

});
