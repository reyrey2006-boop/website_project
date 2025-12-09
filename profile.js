// ============================================
// Profile Page Authentication & Dashboard
// ============================================

// User data storage (using localStorage for demo)
let currentUser = null

// Initialize profile page on load
document.addEventListener("DOMContentLoaded", () => {
  checkUserSession()
  initializeProfilePage()
})

// Check if user has active session
function checkUserSession() {
  const userData = localStorage.getItem("currentUser")
  if (userData) {
    currentUser = JSON.parse(userData)
    showDashboard()
  }
}

// Initialize all event listeners
function initializeProfilePage() {
  // Navigation between sections
  const navItems = document.querySelectorAll(".sidebar-nav .nav-item:not(.logout-btn)")
  navItems.forEach((item) => {
    item.addEventListener("click", switchSection)
  })

  // Login form
  const loginForm = document.getElementById("loginForm")
  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin)
  }

  // Register form
  const registerForm = document.getElementById("registerForm")
  if (registerForm) {
    registerForm.addEventListener("submit", handleRegister)
  }

  // Toggle links
  const toggleLinks = document.querySelectorAll(".toggle-link")
  toggleLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const section = this.getAttribute("data-section")
      switchToSection(section)
    })
  })

  // Logout button
  const logoutBtn = document.getElementById("logoutBtn")
  if (logoutBtn) {
    logoutBtn.addEventListener("click", handleLogout)
  }

  // Settings
  const darkModeToggle = document.getElementById("darkMode")
  if (darkModeToggle) {
    darkModeToggle.addEventListener("change", toggleDarkMode)
  }
}

// Handle login
function handleLogin(e) {
  e.preventDefault()

  const email = document.getElementById("loginEmail").value.trim()
  const password = document.getElementById("loginPassword").value.trim()

  // Validation
  if (!email || !password) {
    alert("Please fill in all fields")
    return
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address")
    return
  }

  // Simulate user login
  const userData = {
    id: Date.now(),
    fullName: email.split("@")[0].charAt(0).toUpperCase() + email.split("@")[0].slice(1),
    email: email,
    phone: "+63 (0)999 000 0000",
    memberSince: new Date().toLocaleDateString(),
    matiVisits: Math.floor(Math.random() * 15) + 1,
    websiteVisits: Math.floor(Math.random() * 50) + 10,
    destinationsExplored: Math.floor(Math.random() * 6),
    loginTime: new Date(),
  }

  // Store user data
  localStorage.setItem("currentUser", JSON.stringify(userData))
  currentUser = userData

  console.log("[v0] User logged in:", userData)

  showDashboard()
  document.getElementById("loginForm").reset()
}

// Handle registration
function handleRegister(e) {
  e.preventDefault()

  const fullName = document.getElementById("registerName").value.trim()
  const email = document.getElementById("registerEmail").value.trim()
  const phone = document.getElementById("registerPhone").value.trim()
  const password = document.getElementById("registerPassword").value.trim()
  const confirmPassword = document.getElementById("registerConfirm").value.trim()

  // Validation
  if (!fullName || !email || !phone || !password || !confirmPassword) {
    alert("Please fill in all fields")
    return
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address")
    return
  }

  // Password validation
  if (password !== confirmPassword) {
    alert("Passwords do not match")
    return
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters long")
    return
  }

  // Create user account
  const userData = {
    id: Date.now(),
    fullName: fullName,
    email: email,
    phone: phone,
    memberSince: new Date().toLocaleDateString(),
    matiVisits: 0,
    websiteVisits: 1,
    destinationsExplored: 0,
    createdAt: new Date(),
  }

  // Store user data
  localStorage.setItem("currentUser", JSON.stringify(userData))
  currentUser = userData

  console.log("[v0] User registered:", userData)

  showDashboard()
  document.getElementById("registerForm").reset()
}

// Show dashboard after login/register
function showDashboard() {
  // Hide auth sections
  document.getElementById("login-section").classList.remove("active")
  document.getElementById("register-section").classList.remove("active")

  // Show dashboard
  document.getElementById("dashboard-section").classList.add("active")

  // Update dashboard with user data
  updateDashboard()

  // Show dashboard buttons in sidebar
  document.getElementById("dashboardBtn").style.display = "block"
  document.getElementById("profileInfoBtn").style.display = "block"
  document.getElementById("settingsBtn").style.display = "block"
  document.getElementById("logoutBtn").style.display = "block"

  // Hide login/register buttons
  document.querySelectorAll(".sidebar-nav .nav-item").forEach((btn) => {
    if (btn.getAttribute("data-section") === "login" || btn.getAttribute("data-section") === "register") {
      btn.style.display = "none"
    }
  })
}

// Update dashboard content
function updateDashboard() {
  if (!currentUser) return

  document.getElementById("welcomeName").textContent = currentUser.fullName
  document.getElementById("matiVisits").textContent = currentUser.matiVisits
  document.getElementById("websiteVisits").textContent = currentUser.websiteVisits
  document.getElementById("destinationsExplored").textContent = currentUser.destinationsExplored
  document.getElementById("memberSince").textContent = new Date(currentUser.createdAt).getFullYear()

  // Update profile info
  document.getElementById("profileFullName").textContent = currentUser.fullName
  document.getElementById("profileEmail").textContent = currentUser.email
  document.getElementById("profilePhone").textContent = currentUser.phone
  document.getElementById("profileMemberSince").textContent = currentUser.memberSince
}

// Switch between sections
function switchSection(e) {
  if (!e.target.classList.contains("logout-btn")) {
    const section = e.target.getAttribute("data-section")
    switchToSection(section)
  }
}

// Switch to specific section
function switchToSection(section) {
  // Hide all sections
  document.querySelectorAll(".profile-section").forEach((sec) => {
    sec.classList.remove("active")
  })

  // Remove active class from nav items
  document.querySelectorAll(".sidebar-nav .nav-item").forEach((item) => {
    item.classList.remove("active")
  })

  // Show selected section
  const sectionId = `${section}-section`
  const sectionElement = document.getElementById(sectionId)
  if (sectionElement) {
    sectionElement.classList.add("active")
  }

  // Add active class to nav item
  const navItem = document.querySelector(`[data-section="${section}"]`)
  if (navItem) {
    navItem.classList.add("active")
  }
}

// Handle logout
function handleLogout() {
  localStorage.removeItem("currentUser")
  currentUser = null

  console.log("[v0] User logged out")

  // Hide dashboard sections
  document.getElementById("dashboardBtn").style.display = "none"
  document.getElementById("profileInfoBtn").style.display = "none"
  document.getElementById("settingsBtn").style.display = "none"
  document.getElementById("logoutBtn").style.display = "none"

  // Show auth sections
  document.querySelectorAll(".sidebar-nav .nav-item").forEach((btn) => {
    if (btn.getAttribute("data-section") === "login" || btn.getAttribute("data-section") === "register") {
      btn.style.display = "block"
    }
  })

  // Switch to login
  switchToSection("login")
}

// Dark mode toggle
// Select the dark mode checkbox
const darkModeToggle = document.getElementById('darkMode');

// Load saved dark mode state on page load
if (localStorage.getItem('darkMode') === 'true') {
  document.body.classList.add('dark-mode');
  darkModeToggle.checked = true;
} else {
  document.body.classList.remove('dark-mode');
  darkModeToggle.checked = false;
}

// This function will toggle dark mode whenever Save Settings is clicked
function saveSettings() {
  // Get current dark mode state
  const isCurrentlyDark = document.body.classList.contains('dark-mode');

  // Toggle dark mode
  if (isCurrentlyDark) {
    document.body.classList.remove('dark-mode');
    darkModeToggle.checked = false;
    localStorage.setItem('darkMode', 'false');
  } else {
    document.body.classList.add('dark-mode');
    darkModeToggle.checked = true;
    localStorage.setItem('darkMode', 'true');
  }

  // You can still retrieve other settings here
  const emailNotifications = document.getElementById("emailNotifications").checked;
  const trackLocation = document.getElementById("trackLocation").checked;

  console.log("Settings saved:", {
    darkMode: !isCurrentlyDark,
    emailNotifications,
    trackLocation
  });
}

// Optional: update checkbox instantly when clicked
darkModeToggle.addEventListener('change', toggleDarkMode);
function toggleDarkMode(e) {
  const isDarkMode = e.target.checked;
  if (isDarkMode) {
    document.body.classList.add("dark-mode");
    localStorage.setItem("darkMode", "true");
  } else {
    document.body.classList.remove("dark-mode");
    localStorage.setItem("darkMode", "false");
  }
}


// Track visits
function trackVisit(destinationType) {
  if (currentUser) {
    if (destinationType === "mati-city") {
      currentUser.matiVisits += 1
    } else if (destinationType === "website") {
      currentUser.websiteVisits += 1
    }
    localStorage.setItem("currentUser", JSON.stringify(currentUser))
    console.log("[v0] Visit tracked for:", destinationType)
  }
}

// Track destination exploration
function trackDestinationView(destination) {
  if (currentUser) {
    if (!currentUser.exploreredDestinations) {
      currentUser.exploreredDestinations = []
    }
    if (!currentUser.exploreredDestinations.includes(destination)) {
      currentUser.exploreredDestinations.push(destination)
      currentUser.destinationsExplored = currentUser.exploreredDestinations.length
    }
    localStorage.setItem("currentUser", JSON.stringify(currentUser))
  }
}
