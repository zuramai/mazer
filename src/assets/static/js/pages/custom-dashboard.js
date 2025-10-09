document.addEventListener("DOMContentLoaded", function () {
    // Fetch data from JSON
    fetch('/assets/data/data.json')
        .then(response => response.json())
        .then(data => {
            // ===========================
            // 1️⃣ Update KPI Cards
            // ===========================
            document.getElementById("kpi-activeUsers").textContent = data.kpis.activeUsers;
            document.getElementById("kpi-newSignups").textContent = data.kpis.newSignups;
            document.getElementById("kpi-revenue").textContent = `$${data.kpis.revenue.toLocaleString()}`;
            document.getElementById("kpi-openTickets").textContent = data.kpis.openTickets;

            // ===========================
            // 2️⃣ Weekly Chart
            // ===========================
            const ctx = document.getElementById("weeklyChart").getContext("2d");
            new Chart(ctx, {
                type: "line",
                data: {
                    labels: data.chart.labels,
                    datasets: [{
                        label: "Activity",
                        data: data.chart.data,
                        borderColor: "#2563eb",
                        backgroundColor: "rgba(37, 99, 235, 0.1)",
                        tension: 0.4,
                        fill: true,
                        pointRadius: 5
                    }]
                },
                options: {
                    responsive: true,
                    plugins: { legend: { display: false } },
                    scales: { y: { beginAtZero: true } }
                }
            });

            // ===========================
            // 3️⃣ Recent Activity Table
            // ===========================
            const tableBody = document.querySelector("#recentTable tbody");
            tableBody.innerHTML = ''; // Clear previous rows
            data.recent.forEach(item => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${item.time}</td>
                    <td>${item.user}</td>
                    <td>${item.action}</td>
                    <td><span class="badge bg-${getStatusColor(item.status)}">${item.status}</span></td>
                `;
                tableBody.appendChild(row);
            });

            // ===========================
            // 4️⃣ Helper Function for Status Badge
            // ===========================
            function getStatusColor(status) {
                switch(status.toLowerCase()) {
                    case "success": return "success";
                    case "pending": return "warning";
                    case "failed": return "danger";
                    default: return "secondary";
                }
            }
        })
        .catch(err => console.error("Error loading dashboard data:", err));
});
