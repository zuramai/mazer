const DATA_URL = '/assets/static/data/data.json';

async function loadData() {
  const res = await fetch(DATA_URL);
  if (!res.ok) throw new Error('Failed to load data');
  return res.json();
}

// Render stats cards
function renderStats(stats) {
  const container = document.getElementById('stats-cards');
  if (!container) return;
  container.innerHTML = stats.map(s => `
    <div class="col-md-4 col-12">
      <div class="card">
        <div class="card-body">
          <h6 class="text-muted">${s.label}</h6>
          <div class="d-flex justify-content-between align-items-center">
            <h3>${s.value}</h3>
            <span class="badge ${s.trend.startsWith('+') ? 'bg-success' : 'bg-danger'}">${s.trend}</span>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

// Render comments table
function renderComments(comments) {
  const tbody = document.getElementById('comments-body');
  if (!tbody) return;
  tbody.innerHTML = comments.map(c => `
    <tr>
      <td class="col-3">
        <div class="d-flex align-items-center">
          <div class="avatar avatar-md"><img src="${c.avatar}"></div>
          <p class="font-bold ms-3 mb-0">${c.name}</p>
        </div>
      </td>
      <td class="col-auto"><p class="mb-0">${c.text}</p></td>
    </tr>
  `).join('');
}

// Render messages list
function renderMessages(messages) {
  const container = document.getElementById('messages-container');
  if (!container) return;
  container.innerHTML = messages.map(m => `
    <div class="recent-message d-flex px-4 py-3">
      <div class="avatar avatar-lg"><img src="${m.avatar}"></div>
      <div class="name ms-4">
        <h5 class="mb-1">${m.name}</h5>
        <h6 class="text-muted mb-0">${m.handle}</h6>
      </div>
    </div>
  `).join('') + `
    <div class="px-4">
      <button class='btn btn-block btn-xl btn-outline-primary font-bold mt-3'>Start Conversation</button>
    </div>`;
}

// Render charts
function renderCharts(data) {
  const optionsProfileVisit = {
    chart: { type: "bar", height: 300 },
    series: [{ name: "sales", data: data.profileVisit }],
    colors: "#8c4304ff",
    xaxis: { categories: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"] }
  };

  const optionsVisitorsProfile = {
    series: data.visitorsProfile,
    labels: ["Male", "Female"],
    colors: ["#a90b79ff", "#04536bff"],
    chart: { type: "donut", height: 350 },
    legend: { position: "bottom" }
  };

  const baseOptions = {
    chart: { type: "area", height: 80, toolbar: { show: false } },
    stroke: { width: 2 },
    grid: { show: false },
    dataLabels: { enabled: false },
    xaxis: { labels: { show: false }, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { labels: { show: false } }
  };

  new ApexCharts(document.querySelector("#chart-profile-visit"), optionsProfileVisit).render();
  new ApexCharts(document.querySelector("#chart-visitors-profile"), optionsVisitorsProfile).render();
  new ApexCharts(document.querySelector("#chart-europe"), { ...baseOptions, series:[{data:data.regions.europe}], colors:["#0c0994ff"] }).render();
  new ApexCharts(document.querySelector("#chart-america"), { ...baseOptions, series:[{data:data.regions.america}], colors:["#006a33ff"] }).render();
  new ApexCharts(document.querySelector("#chart-india"), { ...baseOptions, series:[{data:data.regions.india}], colors:["#b7860cff"] }).render();
  new ApexCharts(document.querySelector("#chart-indonesia"), { ...baseOptions, series:[{data:data.regions.indonesia}], colors:["#b30617ff"] }).render();
}

// Main init
(async () => {
  try {
    const data = await loadData();
    renderStats(data.stats || []);
    renderComments(data.comments || []);
    renderMessages(data.messages || []);
    renderCharts(data);
  } catch (err) {
    console.error('Error loading dashboard data:', err);
  }
})();
