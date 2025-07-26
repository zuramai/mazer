var optionsProfileVisit = {
  annotations: {
    position: "back",
  },
  dataLabels: {
    enabled: false,
  },
  chart: {
    type: "bar",
    height: 300,
  },
  fill: {
    opacity: 1,
  },
  plotOptions: {},
  series: [
    {
      name: "sales",
      data: [9, 20, 30, 20, 10, 20, 30, 20, 10, 20, 30, 20],
    },
  ],
  colors: ["#435ebe"], // Change from "#000" or black to Mazer blue
  xaxis: {
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
  },
}
let optionsVisitorsProfile = {
  series: [70, 30],
  labels: ["Male", "Female"],
  colors: ["#435ebe", "#55c6e8"],
  chart: {
    type: "donut",
    width: "100%",
    height: "350px",
  },
  legend: {
    position: "bottom",
  },
  plotOptions: {
    pie: {
      donut: {
        size: "30%",
      },
    },
  },
}

var optionsEurope = {
  series: [
    {
      name: "series1",
      data: [310, 800, 600, 430, 540, 340, 605, 805, 430, 540, 340, 605],
    },
  ],
  chart: {
    height: 80,
    type: "area",
    toolbar: {
      show: false,
    },
  },
  colors: ["#5350e9"],
  stroke: {
    width: 2,
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    type: "datetime",
    categories: [
      "2018-09-19T00:00:00.000Z",
      "2018-09-19T01:30:00.000Z",
      "2018-09-19T02:30:00.000Z",
      "2018-09-19T03:30:00.000Z",
      "2018-09-19T04:30:00.000Z",
      "2018-09-19T05:30:00.000Z",
      "2018-09-19T06:30:00.000Z",
      "2018-09-19T07:30:00.000Z",
      "2018-09-19T08:30:00.000Z",
      "2018-09-19T09:30:00.000Z",
      "2018-09-19T10:30:00.000Z",
      "2018-09-19T11:30:00.000Z",
    ],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    labels: {
      show: false,
    },
  },
  show: false,
  yaxis: {
    labels: {
      show: false,
    },
  },
  tooltip: {
    x: {
      format: "dd/MM/yy HH:mm",
    },
  },
}

let optionsAmerica = {
  ...optionsEurope,
  colors: ["#008b75"],
}
let optionsIndia = {
  ...optionsEurope,
  colors: ["#ffc434"],
}
let optionsIndonesia = {
  ...optionsEurope,
  colors: ["#dc3545"],
}

var chartProfileVisit = new ApexCharts(
  document.querySelector("#chart-profile-visit"),
  optionsProfileVisit
)
var chartVisitorsProfile = new ApexCharts(
  document.getElementById("chart-visitors-profile"),
  optionsVisitorsProfile
)
var chartEurope = new ApexCharts(
  document.querySelector("#chart-europe"),
  optionsEurope
)
var chartAmerica = new ApexCharts(
  document.querySelector("#chart-america"),
  optionsAmerica
)
var chartIndia = new ApexCharts(
  document.querySelector("#chart-india"),
  optionsIndia
)
var chartIndonesia = new ApexCharts(
  document.querySelector("#chart-indonesia"),
  optionsIndonesia
)

chartIndonesia.render()
chartAmerica.render()
chartIndia.render()
chartEurope.render()
chartProfileVisit.render()
chartVisitorsProfile.render()

fetch('assets/data/data.json')
  .then(response => response.json())
  .then(data => {
    // Example: populate a table with users
    const tbody = document.querySelector('#users-table-body');
    if (tbody && data.users) {
      tbody.innerHTML = data.users.map(user =>
        `<tr>
          <td>${user.id}</td>
          <td>${user.name}</td>
          <td>${user.role}</td>
        </tr>`
      ).join('');
    }
    // You can similarly use posts/settings data

    // User Feedback Component
    const feedbackList = document.getElementById('user-feedback-list');
    if (feedbackList && data.users) {
      feedbackList.innerHTML = data.users.map(user => `
        <div class="col-12 col-md-4 mb-4">
          <div class="card h-100 shadow-sm border-0">
            <div class="card-body d-flex flex-column align-items-center">
              <img src="${user.avatar}" alt="${user.name}" class="rounded-circle mb-3" width="80" height="80">
              <h5 class="font-bold mb-1">${user.name}</h5>
              <p class="text-muted text-center mb-2"><i class="bi bi-chat-left-quote"></i> ${user.feedback}</p>
              
            </div>
          </div>
        </div>
      `).join('');
    }
  });

document.addEventListener('DOMContentLoaded', function() {
  // Bootstrap modal instance
  let chatModal = null;
  if (window.bootstrap) {
    chatModal = new bootstrap.Modal(document.getElementById('chatModal'));
  }

  // Sample random messages
  const randomMessages = [
    "Hey, how are you?",
    "Can you help me with the dashboard?",
    "Did you check the latest update?",
    "Let's catch up soon!",
    "Any feedback on the new features?"
  ];

  // Use the button inside Recent Messages
  const startBtn = document.getElementById('start-conversation-btn');
  const chatMessages = document.getElementById('chat-messages');
  const chatInput = document.getElementById('chat-input');
  const sendBtn = document.getElementById('chat-send-btn');

  if (startBtn && chatModal && chatMessages) {
    startBtn.addEventListener('click', function() {
      // Pick a random message
      const msg = randomMessages[Math.floor(Math.random() * randomMessages.length)];
      chatMessages.innerHTML = `
        <div class="d-flex mb-2">
          <div class="bg-light p-2 rounded">
            <span class="fw-bold">User:</span> ${msg}
          </div>
        </div>
      `;
      chatInput.value = '';
      chatModal.show();
    });
  }

  // Handle sending reply
  if (sendBtn && chatMessages && chatInput) {
    sendBtn.addEventListener('click', function() {
      const reply = chatInput.value.trim();
      if (reply !== '') {
        chatMessages.innerHTML += `
          <div class="d-flex justify-content-end mb-2">
            <div class="bg-primary text-white p-2 rounded">
              <span class="fw-bold">You:</span> ${reply}
            </div>
          </div>
        `;
        chatInput.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }
    });
  }
});
