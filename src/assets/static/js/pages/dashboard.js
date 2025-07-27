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
  colors: "#435ebe",
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

// Interactive Chart Filters for Profile Visit
const yearFilter = document.getElementById('year-filter');
const regionFilter = document.getElementById('region-filter');

// Mock data for demonstration
const chartData = {
  '2022': {
    europe: [9, 20, 30, 20, 10, 20, 30, 20, 10, 20, 30, 20],
    america: [5, 15, 25, 15, 5, 15, 25, 15, 5, 15, 25, 15],
    india: [12, 18, 22, 18, 12, 18, 22, 18, 12, 18, 22, 18],
    indonesia: [7, 14, 21, 14, 7, 14, 21, 14, 7, 14, 21, 14],
  },
  '2023': {
    europe: [15, 25, 35, 25, 15, 25, 35, 25, 15, 25, 35, 25],
    america: [10, 20, 30, 20, 10, 20, 30, 20, 10, 20, 30, 20],
    india: [18, 24, 28, 24, 18, 24, 28, 24, 18, 24, 28, 24],
    indonesia: [13, 20, 27, 20, 13, 20, 27, 20, 13, 20, 27, 20],
  }
};

function updateProfileVisitChart() {
  const year = yearFilter.value;
  const region = regionFilter.value;
  const data = chartData[year][region];
  chartProfileVisit.updateSeries([
    { name: 'sales', data }
  ]);
  // Optionally update color or other options based on region
  const regionColors = {
    europe: '#435ebe',
    america: '#008b75',
    india: '#ffc434',
    indonesia: '#dc3545',
  };
  chartProfileVisit.updateOptions({ colors: [regionColors[region]] });
}

if (yearFilter && regionFilter) {
  yearFilter.addEventListener('change', updateProfileVisitChart);
  regionFilter.addEventListener('change', updateProfileVisitChart);
}

// Theme Switcher Logic
const themeToggleBtn = document.getElementById('theme-toggle');
const themeToggleIcon = document.getElementById('theme-toggle-icon');
const userTheme = localStorage.getItem('theme');

// Apply saved theme on load
if (userTheme === 'dark') {
  document.documentElement.setAttribute('data-theme', 'dark');
  if (themeToggleIcon) themeToggleIcon.className = 'bi bi-sun';
} else {
  document.documentElement.setAttribute('data-theme', 'light');
  if (themeToggleIcon) themeToggleIcon.className = 'bi bi-moon';
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', function () {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'light') {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      if (themeToggleIcon) themeToggleIcon.className = 'bi bi-sun';
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
      if (themeToggleIcon) themeToggleIcon.className = 'bi bi-moon';
    }
  });
}

// User Profile Editing Modal Logic
const editProfileBtn = document.getElementById('editProfileBtn');
const editProfileModal = document.getElementById('editProfileModal');
const profileForm = document.getElementById('profileForm');
const profileNameInput = document.getElementById('profileName');
const profileAvatarInput = document.getElementById('profileAvatar');
const profileBioInput = document.getElementById('profileBio');
const profileNameDisplay = document.getElementById('profile-name');
const profileAvatarDisplay = document.getElementById('profile-avatar');
const profileBioDisplay = document.getElementById('profile-bio');

// Load profile from localStorage
function loadProfile() {
  const name = localStorage.getItem('profileName') || 'John Duck';
  const bio = localStorage.getItem('profileBio') || '@johnducky';
  const avatar = localStorage.getItem('profileAvatar') || 'assets/static/images/faces/1.jpg';
  profileNameDisplay.textContent = name;
  profileBioDisplay.textContent = bio;
  profileAvatarDisplay.src = avatar;
}

// Open modal and prefill form
if (editProfileBtn) {
  editProfileBtn.addEventListener('click', function() {
    profileNameInput.value = profileNameDisplay.textContent;
    profileBioInput.value = profileBioDisplay.textContent;
    profileAvatarInput.value = '';
    // Show modal (Bootstrap 5)
    var modal = new bootstrap.Modal(editProfileModal);
    modal.show();
  });
}

// Handle avatar preview and save
if (profileForm) {
  profileForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = profileNameInput.value;
    const bio = profileBioInput.value;
    let avatar = profileAvatarDisplay.src;
    const file = profileAvatarInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(evt) {
        avatar = evt.target.result;
        saveProfile(name, bio, avatar);
        var modal = bootstrap.Modal.getInstance(editProfileModal);
        modal.hide();
      };
      reader.readAsDataURL(file);
    } else {
      saveProfile(name, bio, avatar);
      var modal = bootstrap.Modal.getInstance(editProfileModal);
      modal.hide();
    }
  });
}

function saveProfile(name, bio, avatar) {
  localStorage.setItem('profileName', name);
  localStorage.setItem('profileBio', bio);
  localStorage.setItem('profileAvatar', avatar);
  loadProfile();
}

// On page load
loadProfile();

// User Onboarding Tour with Intro.js
(function loadIntroJsAndInitTour() {
  // Dynamically load Intro.js CSS and JS if not already present
  if (!window.introJs) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/intro.js/minified/introjs.min.css';
    document.head.appendChild(link);
    var script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/intro.js/minified/intro.min.js';
    script.onload = setupTour;
    document.body.appendChild(script);
  } else {
    setupTour();
  }

  function setupTour() {
    // Add data-intro attributes to key elements
    var pageHeading = document.querySelector('.page-heading h3');
    if (pageHeading) pageHeading.setAttribute('data-intro', 'Welcome to your dashboard! Here you can see your profile statistics.');
    var chartFilters = document.querySelector('.card-header .d-flex.gap-2');
    if (chartFilters) chartFilters.setAttribute('data-intro', 'Use these filters to change the chart data by year and region.');
    var editProfileBtn = document.getElementById('editProfileBtn');
    if (editProfileBtn) editProfileBtn.setAttribute('data-intro', 'Click here to edit your profile information.');

    var startTourBtn = document.getElementById('start-tour');
    if (startTourBtn) {
      startTourBtn.addEventListener('click', function() {
        window.introJs().setOptions({
          steps: [
            { element: '.page-heading h3', intro: 'Welcome to your dashboard! Here you can see your profile statistics.' },
            { element: '.card-header .d-flex.gap-2', intro: 'Use these filters to change the chart data by year and region.' },
            { element: '#editProfileBtn', intro: 'Click here to edit your profile information.' }
          ],
          showProgress: true,
          showBullets: false,
          nextLabel: 'Next',
          prevLabel: 'Back',
          doneLabel: 'Finish',
        }).start();
      });
    }
  }
})();

