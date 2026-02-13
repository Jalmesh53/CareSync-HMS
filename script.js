// CareSync HMS - Hospital Management System
// Pure JavaScript Implementation

// Global state management
let currentPage = "dashboard";
let currentUser = null;
let currentRole = "admin";
let isAuthenticated = false;
let mockData = {
  users: [],
  patients: [],
  appointments: [],
  consultations: [],
  admissions: [],
  labOrders: [],
  labReports: [],
  prescriptions: [],
  bills: [],
  inventory: [],
  staff: [],
};

// Initialize authentication
function initAuth() {
  // Check if user is already logged in
  const storedUser = localStorage.getItem("currentUser");
  if (storedUser) {
    const user = JSON.parse(storedUser);
    currentUser = user;
    isAuthenticated = true;
    currentRole = user.role;
    // Update UI based on user role
    updateRoleBasedUI();
    // Show dashboard if user is authenticated
    if (window.location.hash !== "#login") {
      showPage("dashboard");
    }
  } else {
    // Redirect to login if not authenticated
    showPage("login");
  }
}

// Initialize the application
function init() {
  // Initialize authentication
  initAuth();

  // Load mock data
  loadMockData();

  // Set up event listeners
  setupEventListeners();

  // Initialize dashboard
  updateDashboard();

  // Generate patient ID
  generatePatientId();

  // Set up navigation
  setupNavigation();

  // Set up logout functionality
  setupLogout();
}

// Load initial mock data
function loadMockData() {
  // Mock users
  mockData.users = [
    {
      id: "USR001",
      name: "Dr. John Smith",
      email: "john@hospital.com",
      role: "doctor",
      department: "cardiology",
      status: "active",
    },
    {
      id: "USR002",
      name: "Nurse Sarah Johnson",
      email: "sarah@hospital.com",
      role: "nurse",
      department: "emergency",
      status: "active",
    },
    {
      id: "USR003",
      name: "Admin Mike Wilson",
      email: "mike@hospital.com",
      role: "admin",
      department: "admin",
      status: "active",
    },
    {
      id: "USR004",
      name: "Lab Tech Emma Davis",
      email: "emma@hospital.com",
      role: "lab",
      department: "laboratory",
      status: "active",
    },
    {
      id: "USR005",
      name: "Pharmacist Alex Brown",
      email: "alex@hospital.com",
      role: "pharmacy",
      department: "pharmacy",
      status: "active",
    },
  ];

  // Mock patients
  mockData.patients = [
    {
      id: "PAT001",
      name: "Rajesh Kumar",
      age: 45,
      gender: "male",
      phone: "9876543210",
      email: "rajesh@example.com",
      address: "123 Main St, City",
      registered: "2024-01-15",
    },
    {
      id: "PAT002",
      name: "Priya Sharma",
      age: 32,
      gender: "female",
      phone: "8765432109",
      email: "priya@example.com",
      address: "456 Oak Ave, City",
      registered: "2024-01-16",
    },
    {
      id: "PAT003",
      name: "Amit Patel",
      age: 28,
      gender: "male",
      phone: "7654321098",
      email: "amit@example.com",
      address: "789 Pine Rd, City",
      registered: "2024-01-17",
    },
    {
      id: "PAT004",
      name: "Sunita Devi",
      age: 55,
      gender: "female",
      phone: "6543210987",
      email: "sunita@example.com",
      address: "321 Elm St, City",
      registered: "2024-01-18",
    },
    {
      id: "PAT005",
      name: "Vikram Singh",
      age: 40,
      gender: "male",
      phone: "5432109876",
      email: "vikram@example.com",
      address: "654 Maple Dr, City",
      registered: "2024-01-19",
    },
  ];

  // Mock appointments
  mockData.appointments = [
    {
      id: "APT001",
      patientId: "PAT001",
      patientName: "Rajesh Kumar",
      doctor: "Dr. John Smith",
      date: "2024-01-20",
      time: "10:00",
      status: "scheduled",
    },
    {
      id: "APT002",
      patientId: "PAT002",
      patientName: "Priya Sharma",
      doctor: "Dr. John Smith",
      date: "2024-01-20",
      time: "11:00",
      status: "waiting",
    },
    {
      id: "APT003",
      patientId: "PAT003",
      patientName: "Amit Patel",
      doctor: "Dr. Sarah Johnson",
      date: "2024-01-20",
      time: "12:00",
      status: "in-consultation",
    },
    {
      id: "APT004",
      patientId: "PAT004",
      patientName: "Sunita Devi",
      doctor: "Dr. Mike Wilson",
      date: "2024-01-20",
      time: "13:00",
      status: "completed",
    },
    {
      id: "APT005",
      patientId: "PAT005",
      patientName: "Vikram Singh",
      doctor: "Dr. John Smith",
      date: "2024-01-20",
      time: "14:00",
      status: "scheduled",
    },
  ];

  // Mock lab orders
  mockData.labOrders = [
    {
      id: "LAB001",
      patientId: "PAT001",
      patientName: "Rajesh Kumar",
      testType: "Blood Test",
      status: "pending",
      date: "2024-01-19",
    },
    {
      id: "LAB002",
      patientId: "PAT002",
      patientName: "Priya Sharma",
      testType: "X-Ray",
      status: "in-progress",
      date: "2024-01-19",
    },
    {
      id: "LAB003",
      patientId: "PAT003",
      patientName: "Amit Patel",
      testType: "MRI",
      status: "completed",
      date: "2024-01-18",
    },
    {
      id: "LAB004",
      patientId: "PAT004",
      patientName: "Sunita Devi",
      testType: "ECG",
      status: "pending",
      date: "2024-01-20",
    },
    {
      id: "LAB005",
      patientId: "PAT005",
      patientName: "Vikram Singh",
      testType: "Urine Test",
      status: "in-progress",
      date: "2024-01-20",
    },
  ];

  // Mock inventory
  mockData.inventory = [
    {
      id: "INV001",
      name: "Paracetamol",
      category: "medicine",
      quantity: 150,
      unit: "tablets",
      minStock: 50,
      price: 5,
    },
    {
      id: "INV002",
      name: "Aspirin",
      category: "medicine",
      quantity: 80,
      unit: "tablets",
      minStock: 30,
      price: 3,
    },
    {
      id: "INV003",
      name: "Gauze Bandage",
      category: "consumable",
      quantity: 200,
      unit: "pieces",
      minStock: 100,
      price: 2,
    },
    {
      id: "INV004",
      name: "Syringe",
      category: "consumable",
      quantity: 50,
      unit: "pieces",
      minStock: 100,
      price: 8,
    },
    {
      id: "INV005",
      name: "Thermometer",
      category: "equipment",
      quantity: 15,
      unit: "pieces",
      minStock: 5,
      price: 250,
    },
  ];

  // Mock staff
  mockData.staff = [
    {
      id: "STF001",
      name: "Dr. John Smith",
      department: "cardiology",
      role: "doctor",
      specialization: "Cardiology",
      contact: "9876543210",
    },
    {
      id: "STF002",
      name: "Dr. Sarah Johnson",
      department: "emergency",
      role: "doctor",
      specialization: "Emergency Medicine",
      contact: "8765432109",
    },
    {
      id: "STF003",
      name: "Nurse Emma Davis",
      department: "emergency",
      role: "nurse",
      specialization: "Critical Care",
      contact: "7654321098",
    },
    {
      id: "STF004",
      name: "Dr. Mike Wilson",
      department: "general",
      role: "doctor",
      specialization: "General Medicine",
      contact: "6543210987",
    },
    {
      id: "STF005",
      name: "Pharmacist Alex Brown",
      department: "pharmacy",
      role: "pharmacist",
      specialization: "Clinical Pharmacy",
      contact: "5432109876",
    },
  ];
}

// Set up event listeners
function setupEventListeners() {
  // Navigation events
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const pageId = item.dataset.page;
      showPage(pageId);
    });
  });

  // Role selection
  document.getElementById("role-select").addEventListener("change", (e) => {
    currentRole = e.target.value;
    // Update UI based on role
    updateRoleBasedUI();
  });

  // Login form
  document
    .getElementById("login-form")
    ?.addEventListener("submit", handleLogin);

  // Signup form
  document
    .getElementById("signup-form")
    ?.addEventListener("submit", handleSignup);

  // Show signup link
  document
    .getElementById("show-signup-link")
    ?.addEventListener("click", (e) => {
      e.preventDefault();
      document.getElementById("login-form-container").style.display = "none";
      document.getElementById("signup-form-container").style.display = "block";
    });

  // Show login link
  document.getElementById("show-login-link")?.addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("signup-form-container").style.display = "none";
    document.getElementById("login-form-container").style.display = "block";
  });

  // User management form
  document
    .getElementById("user-form")
    ?.addEventListener("submit", handleUserCreation);

  // Patient registration form
  document
    .getElementById("patient-form")
    ?.addEventListener("submit", handlePatientRegistration);

  // Search and filter events
  document
    .getElementById("user-search")
    ?.addEventListener("input", filterUsers);
  document
    .getElementById("patient-search")
    ?.addEventListener("input", filterPatients);
  document
    .getElementById("patient-filter")
    ?.addEventListener("change", filterPatients);

  // Refresh buttons
  document
    .getElementById("refresh-users")
    ?.addEventListener("click", updateUsersTable);
  document
    .getElementById("refresh-patients")
    ?.addEventListener("click", updatePatientsTable);

  // Menu toggle
  document
    .getElementById("menu-toggle")
    ?.addEventListener("click", toggleSidebar);
}

// Set up navigation
function setupNavigation() {
  // Update current page in breadcrumb
  document.getElementById("current-page").textContent =
    document.querySelector(".nav-item.active .nav-link span")?.textContent ||
    "Dashboard";
}

// Show a specific page
function showPage(pageId) {
  // Hide all pages
  document.querySelectorAll(".page").forEach((page) => {
    page.classList.remove("active");
  });

  // Remove active class from all nav items
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.classList.remove("active");
  });

  // Show the requested page
  document.getElementById(pageId).classList.add("active");

  // Update active nav item
  document
    .querySelector(`.nav-item[data-page="${pageId}"]`)
    .classList.add("active");

  // Update current page in breadcrumb
  document.getElementById("current-page").textContent = document.querySelector(
    `.nav-item[data-page="${pageId}"] .nav-link span`
  ).textContent;

  currentPage = pageId;

  // Update page-specific content
  updatePageContent(pageId);
}

// Update page-specific content
function updatePageContent(pageId) {
  switch (pageId) {
    case "dashboard":
      updateDashboard();
      break;
    case "user-management":
      updateUsersTable();
      break;
    case "patient-registration":
      updatePatientsTable();
      break;
    case "opd-queue":
      updateOPDQueue();
      break;
    case "lab-orders":
      updateLabOrders();
      break;
    case "inventory":
      updateInventory();
      break;
    case "staff-directory":
      updateStaffDirectory();
      break;
    case "admin-dashboard":
      updateAdminDashboard();
      break;
    case "department-analytics":
      updateDepartmentAnalytics();
      break;
    case "ai-alerts":
      updateAIAlerts();
      break;
    case "fraud-detection":
      updateFraudDetection();
      break;
    case "bed-optimization":
      updateBedOptimization();
      break;
  }
}

// Update dashboard
function updateDashboard() {
  // Update KPIs
  document.getElementById("total-patients").textContent =
    mockData.patients.length;
  document.getElementById("appointments").textContent =
    mockData.appointments.filter(
      (a) => a.date === new Date().toISOString().split("T")[0]
    ).length;

  // Calculate bed occupancy (mock calculation)
  const totalBeds = 100; // Mock total beds
  const occupiedBeds = 75; // Mock occupied beds
  const occupancyPercentage = Math.round((occupiedBeds / totalBeds) * 100);
  document.getElementById(
    "bed-occupancy"
  ).textContent = `${occupancyPercentage}%`;

  // Calculate revenue (mock calculation)
  const revenue = mockData.bills.reduce((sum, bill) => sum + bill.amount, 0);
  document.getElementById(
    "revenue"
  ).textContent = `₹${revenue.toLocaleString()}`;

  // Initialize charts
  initializeCharts();
}

// Initialize charts
function initializeCharts() {
  // Department chart
  const deptCtx = document.getElementById("department-chart")?.getContext("2d");
  if (deptCtx) {
    new Chart(deptCtx, {
      type: "bar",
      data: {
        labels: [
          "Cardiology",
          "Emergency",
          "General",
          "Pediatrics",
          "Orthopedics",
        ],
        datasets: [
          {
            label: "Patient Count",
            data: [25, 30, 20, 15, 10],
            backgroundColor: [
              "#3b82f6",
              "#ef4444",
              "#10b981",
              "#f59e0b",
              "#8b5cf6",
            ],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  }

  // Revenue chart
  const revenueCtx = document.getElementById("revenue-chart")?.getContext("2d");
  if (revenueCtx) {
    new Chart(revenueCtx, {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Revenue (₹)",
            data: [150000, 180000, 220000, 190000, 250000, 280000],
            borderColor: "#10b981",
            backgroundColor: "rgba(16, 185, 129, 0.1)",
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  }
}

// Handle login
function handleLogin(e) {
  e.preventDefault();
  const role = document.getElementById("role-select-login").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Simple validation (in real app, this would be more secure)
  if (role && username && password) {
    currentUser = { role, username };
    currentRole = role;
    showPage("dashboard");
    alert(`Logged in as ${role}`);
  } else {
    alert("Please fill all fields");
  }
}

// Handle user creation
function handleUserCreation(e) {
  e.preventDefault();
  const name = document.getElementById("user-name").value;
  const email = document.getElementById("user-email").value;
  const role = document.getElementById("user-role").value;
  const department = document.getElementById("user-department").value;

  if (name && email && role && department) {
    const newUser = {
      id: `USR${String(mockData.users.length + 1).padStart(3, "0")}`,
      name,
      email,
      role,
      department,
      status: "active",
    };

    mockData.users.push(newUser);
    updateUsersTable();

    // Reset form
    document.getElementById("user-form").reset();
    alert("User created successfully!");
  } else {
    alert("Please fill all required fields");
  }
}

// Update users table
function updateUsersTable() {
  const tbody = document.getElementById("users-table-body");
  if (!tbody) return;

  tbody.innerHTML = "";

  mockData.users.forEach((user) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td>${user.department}</td>
            <td><span class="status-badge status-${user.status}">${user.status}</span></td>
            <td>
                <button class="btn btn-secondary" onclick="editUser('${user.id}')">Edit</button>
                <button class="btn btn-danger" onclick="deleteUser('${user.id}')">Delete</button>
            </td>
        `;
    tbody.appendChild(row);
  });
}

// Filter users
function filterUsers() {
  const searchTerm = document.getElementById("user-search").value.toLowerCase();
  const filteredUsers = mockData.users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm) ||
      user.role.toLowerCase().includes(searchTerm)
  );

  const tbody = document.getElementById("users-table-body");
  if (!tbody) return;

  tbody.innerHTML = "";

  filteredUsers.forEach((user) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td>${user.department}</td>
            <td><span class="status-badge status-${user.status}">${user.status}</span></td>
            <td>
                <button class="btn btn-secondary" onclick="editUser('${user.id}')">Edit</button>
                <button class="btn btn-danger" onclick="deleteUser('${user.id}')">Delete</button>
            </td>
        `;
    tbody.appendChild(row);
  });
}

// Edit user (placeholder function)
function editUser(userId) {
  const user = mockData.users.find((u) => u.id === userId);
  if (user) {
    // In a real app, this would open an edit modal
    alert(`Edit user: ${user.name}`);
  }
}

// Delete user
function deleteUser(userId) {
  if (confirm("Are you sure you want to delete this user?")) {
    mockData.users = mockData.users.filter((u) => u.id !== userId);
    updateUsersTable();
  }
}

// Handle patient registration
function handlePatientRegistration(e) {
  e.preventDefault();
  const name = document.getElementById("patient-name").value;
  const age = document.getElementById("patient-age").value;
  const gender = document.getElementById("patient-gender").value;
  const phone = document.getElementById("patient-phone").value;
  const email = document.getElementById("patient-email").value;
  const address = document.getElementById("patient-address").value;

  if (name && age && gender && phone) {
    const newPatient = {
      id: document.getElementById("patient-id").value,
      name,
      age: parseInt(age),
      gender,
      phone,
      email: email || "",
      address: address || "",
      registered: new Date().toISOString().split("T")[0],
    };

    mockData.patients.push(newPatient);
    updatePatientsTable();

    // Generate new patient ID
    generatePatientId();

    // Reset form
    document.getElementById("patient-form").reset();
    document.getElementById("patient-id").value = generatePatientId();
    alert("Patient registered successfully!");
  } else {
    alert("Please fill all required fields");
  }
}

// Generate patient ID
function generatePatientId() {
  const id = `PAT${String(mockData.patients.length + 1).padStart(3, "0")}`;
  document.getElementById("patient-id")?.setAttribute("value", id);
  return id;
}

// Update patients table
function updatePatientsTable() {
  const tbody = document.getElementById("patients-table-body");
  if (!tbody) return;

  tbody.innerHTML = "";

  mockData.patients.forEach((patient) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${patient.id}</td>
            <td>${patient.name}</td>
            <td>${patient.age}</td>
            <td>${patient.gender}</td>
            <td>${patient.phone}</td>
            <td>${patient.registered}</td>
            <td>
                <button class="btn btn-secondary" onclick="viewPatient('${patient.id}')">View</button>
                <button class="btn btn-warning" onclick="editPatient('${patient.id}')">Edit</button>
            </td>
        `;
    tbody.appendChild(row);
  });
}

// Filter patients
function filterPatients() {
  const searchTerm = document
    .getElementById("patient-search")
    .value.toLowerCase();
  const genderFilter = document.getElementById("patient-filter").value;

  let filteredPatients = mockData.patients;

  if (searchTerm) {
    filteredPatients = filteredPatients.filter(
      (patient) =>
        patient.name.toLowerCase().includes(searchTerm) ||
        patient.id.toLowerCase().includes(searchTerm) ||
        patient.phone.includes(searchTerm)
    );
  }

  if (genderFilter) {
    filteredPatients = filteredPatients.filter(
      (patient) => patient.gender === genderFilter
    );
  }

  const tbody = document.getElementById("patients-table-body");
  if (!tbody) return;

  tbody.innerHTML = "";

  filteredPatients.forEach((patient) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${patient.id}</td>
            <td>${patient.name}</td>
            <td>${patient.age}</td>
            <td>${patient.gender}</td>
            <td>${patient.phone}</td>
            <td>${patient.registered}</td>
            <td>
                <button class="btn btn-secondary" onclick="viewPatient('${patient.id}')">View</button>
                <button class="btn btn-warning" onclick="editPatient('${patient.id}')">Edit</button>
            </td>
        `;
    tbody.appendChild(row);
  });
}

// View patient (placeholder)
function viewPatient(patientId) {
  const patient = mockData.patients.find((p) => p.id === patientId);
  if (patient) {
    alert(`Viewing patient: ${patient.name}`);
    // In a real app, this would navigate to patient timeline
    showPage("patient-timeline");
  }
}

// Edit patient (placeholder)
function editPatient(patientId) {
  const patient = mockData.patients.find((p) => p.id === patientId);
  if (patient) {
    // Populate form with patient data
    document.getElementById("patient-id").value = patient.id;
    document.getElementById("patient-name").value = patient.name;
    document.getElementById("patient-age").value = patient.age;
    document.getElementById("patient-gender").value = patient.gender;
    document.getElementById("patient-phone").value = patient.phone;
    document.getElementById("patient-email").value = patient.email;
    document.getElementById("patient-address").value = patient.address;

    // Scroll to form
    document
      .querySelector(".form-section")
      .scrollIntoView({ behavior: "smooth" });
  }
}

// Update OPD queue
function updateOPDQueue() {
  // This would update the OPD queue page content
  console.log("Updating OPD queue");
}

// Update lab orders
function updateLabOrders() {
  // This would update the lab orders page content
  console.log("Updating lab orders");
}

// Update inventory
function updateInventory() {
  // This would update the inventory page content
  console.log("Updating inventory");
}

// Update staff directory
function updateStaffDirectory() {
  // This would update the staff directory page content
  console.log("Updating staff directory");
}

// Update admin dashboard
function updateAdminDashboard() {
  // This would update the admin dashboard content
  console.log("Updating admin dashboard");
}

// Update department analytics
function updateDepartmentAnalytics() {
  // This would update the department analytics content
  console.log("Updating department analytics");
}

// Update AI alerts
function updateAIAlerts() {
  // This would update the AI alerts page content
  console.log("Updating AI alerts");
}

// Update fraud detection
function updateFraudDetection() {
  // This would update the fraud detection page content
  console.log("Updating fraud detection");
}

// Update bed optimization
function updateBedOptimization() {
  // This would update the bed optimization page content
  console.log("Updating bed optimization");
}

// Update UI based on role
function updateRoleBasedUI() {
  // Update user menu with current user info
  if (currentUser && document.querySelector(".user-menu")) {
    const userMenu = document.querySelector(".user-menu");
    userMenu.innerHTML = `
      <i class="fas fa-user-circle"></i>
      <span>${currentUser.name || currentUser.email}</span>
    `;
  }

  // In a real app, this would hide/show elements based on role
  console.log(`Role changed to: ${currentRole}`);
}

// Toggle sidebar on mobile
function toggleSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.width = sidebar.style.width === "70px" ? "260px" : "70px";
}

// Initialize Chart.js (we'll add this to the HTML as well)
function initializeChartJS() {
  // This function would be called after Chart.js is loaded
  // For now, we're assuming it's loaded via CDN
}

// Initialize the application when DOM is loaded
document.addEventListener("DOMContentLoaded", init);

// Update page-specific content
function updatePageContent(pageId) {
  // If user is not authenticated, redirect to login
  if (!isAuthenticated && pageId !== "login") {
    showPage("login");
    return;
  }

  switch (pageId) {
    case "dashboard":
      updateDashboard();
      break;
    case "user-management":
      updateUsersTable();
      break;
    case "patient-registration":
      updatePatientsTable();
      break;
    case "patient-timeline":
      updatePatientTimeline();
      break;
    case "opd-queue":
      updateOPDQueue();
      break;
    case "opd-consultation":
      setupConsultationForm();
      break;
    case "ipd-admission":
      setupAdmissionForm();
      break;
    case "ipd-notes":
      setupDailyNotesForm();
      break;
    case "emergency":
      setupEmergencyForm();
      break;
    case "lab-orders":
      updateLabOrders();
      break;
    case "lab-reports":
      setupReportUpload();
      break;
    case "pharmacy":
      updatePharmacyView();
      break;
    case "billing":
      setupBillingForm();
      break;
    case "insurance":
      setupInsuranceForm();
      break;
    case "inventory":
      updateInventory();
      break;
    case "staff-directory":
      updateStaffDirectory();
      break;
    case "admin-dashboard":
      updateAdminDashboard();
      break;
    case "department-analytics":
      updateDepartmentAnalytics();
      break;
    case "ai-alerts":
      updateAIAlerts();
      break;
    case "fraud-detection":
      updateFraudDetection();
      break;
    case "bed-optimization":
      updateBedOptimization();
      break;
  }
}

// Update patient timeline
function updatePatientTimeline() {
  // Populate patient select
  const patientSelect = document.getElementById("patient-select");
  if (patientSelect) {
    patientSelect.innerHTML = '<option value="">Select Patient</option>';
    mockData.patients.forEach((patient) => {
      const option = document.createElement("option");
      option.value = patient.id;
      option.textContent = `${patient.name} (${patient.id})`;
      patientSelect.appendChild(option);
    });
  }

  // Set up timeline tabs
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".tab-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      // In a real app, this would filter the timeline content
    });
  });
}

// Update OPD queue
function updateOPDQueue() {
  // Set up doctor filter
  document
    .getElementById("doctor-filter")
    ?.addEventListener("change", filterQueueByDoctor);

  // Set up queue actions
  document.querySelectorAll(".queue-actions .btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const queueItem = this.closest(".queue-item");
      const patientName = queueItem.querySelector(".patient-name").textContent;
      alert(`Action performed for ${patientName}`);
    });
  });
}

// Filter queue by doctor
function filterQueueByDoctor() {
  const doctorFilter = document.getElementById("doctor-filter").value;
  // In a real app, this would filter the queue
  console.log("Filtering queue by doctor:", doctorFilter);
}

// Set up consultation form
function setupConsultationForm() {
  // Populate patient and doctor selects
  populateSelect("consultation-patient", mockData.patients, "id", "name");
  populateSelect(
    "consultation-doctor",
    mockData.staff.filter((s) => s.role === "doctor"),
    "id",
    "name"
  );

  // Set up form submission
  document
    .getElementById("consultation-form")
    ?.addEventListener("submit", handleConsultationSubmit);
}

// Handle consultation submission
function handleConsultationSubmit(e) {
  e.preventDefault();

  const formData = {
    patientId: document.getElementById("consultation-patient").value,
    doctorId: document.getElementById("consultation-doctor").value,
    symptoms: document.getElementById("symptoms").value,
    diagnosis: document.getElementById("diagnosis").value,
    tests: document.getElementById("prescribed-tests").value,
    medicines: document.getElementById("medicines").value,
    followupDate: document.getElementById("followup-date").value,
    date: new Date().toISOString().split("T")[0],
  };

  // Add to mock consultations
  mockData.consultations = mockData.consultations || [];
  mockData.consultations.push({
    id: `CONS${mockData.consultations.length + 1}`,
    ...formData,
  });

  alert("Consultation saved successfully!");
  document.getElementById("consultation-form").reset();
}

// Set up admission form
function setupAdmissionForm() {
  // Populate patient and doctor selects
  populateSelect("admission-patient", mockData.patients, "id", "name");
  populateSelect(
    "admission-doctor",
    mockData.staff.filter((s) => s.role === "doctor"),
    "id",
    "name"
  );

  // Set up ward type change to populate beds
  document
    .getElementById("ward-type")
    ?.addEventListener("change", updateAvailableBeds);

  // Set up form submission
  document
    .getElementById("admission-form")
    ?.addEventListener("submit", handleAdmissionSubmit);
}

// Update available beds based on ward type
function updateAvailableBeds() {
  const wardType = document.getElementById("ward-type").value;
  const bedSelect = document.getElementById("bed-number");

  if (bedSelect && wardType) {
    bedSelect.innerHTML = '<option value="">Select Bed</option>';

    // Mock bed data based on ward type
    const beds = [];
    if (wardType === "general") {
      for (let i = 1; i <= 20; i++) {
        beds.push(`G${i.toString().padStart(3, "0")}`);
      }
    } else if (wardType === "icu") {
      for (let i = 1; i <= 10; i++) {
        beds.push(`ICU${i.toString().padStart(2, "0")}`);
      }
    } else {
      for (let i = 1; i <= 15; i++) {
        beds.push(`P${i.toString().padStart(3, "0")}`);
      }
    }

    beds.forEach((bed) => {
      const option = document.createElement("option");
      option.value = bed;
      option.textContent = bed;
      bedSelect.appendChild(option);
    });
  }
}

// Handle admission submission
function handleAdmissionSubmit(e) {
  e.preventDefault();

  const formData = {
    patientId: document.getElementById("admission-patient").value,
    doctorId: document.getElementById("admission-doctor").value,
    reason: document.getElementById("admission-reason").value,
    wardType: document.getElementById("ward-type").value,
    bedNumber: document.getElementById("bed-number").value,
    admissionDate: new Date().toISOString().split("T")[0],
  };

  // Add to mock admissions
  mockData.admissions = mockData.admissions || [];
  mockData.admissions.push({
    id: `ADM${mockData.admissions.length + 1}`,
    ...formData,
  });

  alert("Patient admitted successfully!");
  document.getElementById("admission-form").reset();
}

// Set up daily notes form
function setupDailyNotesForm() {
  // Populate patient select
  populateSelect("notes-patient", mockData.patients, "id", "name");

  // Set today's date as default
  document.getElementById("notes-date").valueAsDate = new Date();

  // Set up form submission
  document
    .getElementById("daily-notes-form")
    ?.addEventListener("submit", handleDailyNotesSubmit);
}

// Handle daily notes submission
function handleDailyNotesSubmit(e) {
  e.preventDefault();

  const formData = {
    patientId: document.getElementById("notes-patient").value,
    date: document.getElementById("notes-date").value,
    vitalSigns: document.getElementById("vital-signs").value,
    progressNotes: document.getElementById("progress-notes").value,
    servicesUsed: document.getElementById("services-used").value,
  };

  // Add to mock notes
  mockData.dailyNotes = mockData.dailyNotes || [];
  mockData.dailyNotes.push({
    id: `NOTE${mockData.dailyNotes.length + 1}`,
    ...formData,
  });

  alert("Daily notes saved successfully!");
  document.getElementById("daily-notes-form").reset();
}

// Set up emergency form
function setupEmergencyForm() {
  // Set up form submission
  document
    .getElementById("emergency-form")
    ?.addEventListener("submit", handleEmergencySubmit);
}

// Handle emergency submission
function handleEmergencySubmit(e) {
  e.preventDefault();

  const formData = {
    name: document.getElementById("emergency-name").value || "Unknown",
    age: document.getElementById("emergency-age").value,
    gender: document.getElementById("emergency-gender").value,
    contact: document.getElementById("emergency-contact").value,
    complaint: document.getElementById("complaint").value,
    severity:
      document.querySelector('input[name="severity"]:checked')?.value || "low",
    registrationTime: new Date().toISOString(),
  };

  // Add to mock emergency patients
  mockData.emergencyPatients = mockData.emergencyPatients || [];
  mockData.emergencyPatients.push({
    id: `EMG${mockData.emergencyPatients.length + 1}`,
    ...formData,
  });

  alert("Emergency patient registered successfully!");
  document.getElementById("emergency-form").reset();
}

// Update lab orders
function updateLabOrders() {
  // Set up tab filters
  document.querySelectorAll(".tab-btn[data-tab]").forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".tab-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      // In a real app, this would filter the orders
      const tab = btn.dataset.tab;
      console.log("Switching to tab:", tab);
    });
  });

  // Set up action buttons
  document.querySelectorAll("#lab-orders-table .btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const row = this.closest("tr");
      const orderId = row.cells[0].textContent;
      alert(`Action performed for order: ${orderId}`);
    });
  });
}

// Set up report upload
function setupReportUpload() {
  // Populate patient select
  populateSelect("report-patient", mockData.patients, "id", "name");

  // Set up form submission
  document
    .getElementById("report-upload-form")
    ?.addEventListener("submit", handleReportUpload);
}

// Handle report upload
function handleReportUpload(e) {
  e.preventDefault();

  const formData = {
    patientId: document.getElementById("report-patient").value,
    type: document.getElementById("report-type").value,
    fileName:
      document.getElementById("report-file").files[0]?.name || "Manual Entry",
    notes: document.getElementById("report-notes").value,
    uploadDate: new Date().toISOString().split("T")[0],
  };

  // Add to mock reports
  mockData.labReports = mockData.labReports || [];
  mockData.labReports.push({
    id: `RPT${mockData.labReports.length + 1}`,
    ...formData,
  });

  alert("Report uploaded successfully!");
  document.getElementById("report-upload-form").reset();
}

// Update pharmacy view
function updatePharmacyView() {
  // Set up dispense buttons
  document
    .querySelectorAll(".prescription-actions .btn-success")
    .forEach((btn) => {
      btn.addEventListener("click", function () {
        const prescriptionItem = this.closest(".prescription-item");
        const patientName =
          prescriptionItem.querySelector(".patient-name").textContent;

        // In a real app, this would update inventory and mark as dispensed
        alert(`Medicines dispensed for ${patientName}`);

        // Update status
        this.textContent = "Dispensed";
        this.classList.remove("btn-success");
        this.classList.add("btn-secondary");
        this.disabled = true;
      });
    });
}

// Set up billing form
function setupBillingForm() {
  // Populate patient select
  populateSelect("billing-patient", mockData.patients, "id", "name");

  // Set up bill item management
  document
    .querySelector(".add-item")
    ?.addEventListener("click", addBillItemRow);

  // Set up form submission
  document
    .getElementById("billing-form")
    ?.addEventListener("submit", handleBillingSubmit);

  // Set up item change events for calculation
  document.addEventListener("input", handleBillItemChange);
}

// Add a new bill item row
function addBillItemRow() {
  const itemsContainer = document.querySelector(".bill-items");
  const newRow = document.createElement("div");
  newRow.className = "bill-item";
  newRow.innerHTML = `
        <input type="text" placeholder="Item description" class="bill-item-desc">
        <input type="number" placeholder="Quantity" class="bill-item-qty">
        <input type="number" placeholder="Rate" class="bill-item-rate">
        <input type="number" placeholder="Amount" class="bill-item-amount" readonly>
        <button type="button" class="btn btn-danger remove-item">X</button>
    `;
  itemsContainer.appendChild(newRow);

  // Add event to remove button
  newRow.querySelector(".remove-item").addEventListener("click", function () {
    this.closest(".bill-item").remove();
    calculateBillTotal();
  });
}

// Handle bill item change
function handleBillItemChange(e) {
  if (
    e.target.classList.contains("bill-item-qty") ||
    e.target.classList.contains("bill-item-rate")
  ) {
    const itemRow = e.target.closest(".bill-item");
    const qty = parseFloat(itemRow.querySelector(".bill-item-qty").value) || 0;
    const rate =
      parseFloat(itemRow.querySelector(".bill-item-rate").value) || 0;
    const amountInput = itemRow.querySelector(".bill-item-amount");

    amountInput.value = (qty * rate).toFixed(2);
    calculateBillTotal();
  }
}

// Calculate total bill amount
function calculateBillTotal() {
  let subtotal = 0;
  document.querySelectorAll(".bill-item-amount").forEach((input) => {
    subtotal += parseFloat(input.value) || 0;
  });

  const tax = subtotal * 0.05; // 5% tax
  const total = subtotal + tax;

  document.getElementById("subtotal").textContent = `₹${subtotal.toFixed(2)}`;
  document.getElementById("tax").textContent = `₹${tax.toFixed(2)}`;
  document.getElementById("total").textContent = `₹${total.toFixed(2)}`;
}

// Handle billing submission
function handleBillingSubmit(e) {
  e.preventDefault();

  // In a real app, this would save the bill
  alert("Bill generated successfully!");

  // Reset form
  document.getElementById("billing-form").reset();
  calculateBillTotal(); // Reset calculations

  // Add first item row
  document.querySelector(".bill-items").innerHTML = `
        <div class="bill-item">
            <input type="text" placeholder="Item description" class="bill-item-desc">
            <input type="number" placeholder="Quantity" class="bill-item-qty">
            <input type="number" placeholder="Rate" class="bill-item-rate">
            <input type="number" placeholder="Amount" class="bill-item-amount" readonly>
            <button type="button" class="btn btn-danger remove-item">X</button>
        </div>
    `;
}

// Set up insurance form
function setupInsuranceForm() {
  // Populate patient select
  populateSelect("insurance-patient", mockData.patients, "id", "name");

  // Set up form submission
  document
    .getElementById("insurance-form")
    ?.addEventListener("submit", handleInsuranceSubmit);
}

// Handle insurance submission
function handleInsuranceSubmit(e) {
  e.preventDefault();

  const formData = {
    patientId: document.getElementById("insurance-patient").value,
    provider: document.getElementById("insurance-provider").value,
    policyNumber: document.getElementById("policy-number").value,
    claimAmount: document.getElementById("claim-amount").value,
    status: document.getElementById("claim-status").value,
    notes: document.getElementById("claim-notes").value,
    claimDate: new Date().toISOString().split("T")[0],
  };

  // Add to mock claims
  mockData.insuranceClaims = mockData.insuranceClaims || [];
  mockData.insuranceClaims.push({
    id: `CLM${mockData.insuranceClaims.length + 1}`,
    ...formData,
  });

  alert("Insurance claim updated successfully!");
  document.getElementById("insurance-form").reset();
}

// Update inventory
function updateInventory() {
  // Populate inventory table
  updateInventoryTable();

  // Set up search and filter
  document
    .getElementById("inventory-search")
    ?.addEventListener("input", filterInventory);
  document
    .getElementById("inventory-category-filter")
    ?.addEventListener("change", filterInventory);

  // Set up form submission
  document
    .getElementById("inventory-form")
    ?.addEventListener("submit", handleInventoryUpdate);
}

// Update inventory table
function updateInventoryTable() {
  const tbody = document.getElementById("inventory-body");
  if (!tbody) return;

  tbody.innerHTML = "";

  mockData.inventory.forEach((item) => {
    const row = document.createElement("tr");

    // Determine status based on stock level
    const status = item.quantity < item.minStock ? "Low Stock" : "In Stock";
    const statusClass =
      item.quantity < item.minStock ? "status-danger" : "status-active";

    row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.category}</td>
            <td>${item.quantity}</td>
            <td>${item.unit}</td>
            <td>${item.minStock}</td>
            <td>₹${item.price}</td>
            <td><span class="status-badge ${statusClass}">${status}</span></td>
            <td>
                <button class="btn btn-secondary" onclick="editInventoryItem('${item.id}')">Edit</button>
                <button class="btn btn-danger" onclick="deleteInventoryItem('${item.id}')">Delete</button>
            </td>
        `;

    tbody.appendChild(row);
  });
}

// Filter inventory
function filterInventory() {
  const searchTerm = document
    .getElementById("inventory-search")
    .value.toLowerCase();
  const categoryFilter = document.getElementById(
    "inventory-category-filter"
  ).value;

  let filteredItems = mockData.inventory;

  if (searchTerm) {
    filteredItems = filteredItems.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm) ||
        item.id.toLowerCase().includes(searchTerm)
    );
  }

  if (categoryFilter) {
    filteredItems = filteredItems.filter(
      (item) => item.category === categoryFilter
    );
  }

  // Update table with filtered results
  const tbody = document.getElementById("inventory-body");
  if (!tbody) return;

  tbody.innerHTML = "";

  filteredItems.forEach((item) => {
    const row = document.createElement("tr");

    // Determine status based on stock level
    const status = item.quantity < item.minStock ? "Low Stock" : "In Stock";
    const statusClass =
      item.quantity < item.minStock ? "status-danger" : "status-active";

    row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.category}</td>
            <td>${item.quantity}</td>
            <td>${item.unit}</td>
            <td>${item.minStock}</td>
            <td>₹${item.price}</td>
            <td><span class="status-badge ${statusClass}">${status}</span></td>
            <td>
                <button class="btn btn-secondary" onclick="editInventoryItem('${item.id}')">Edit</button>
                <button class="btn btn-danger" onclick="deleteInventoryItem('${item.id}')">Delete</button>
            </td>
        `;

    tbody.appendChild(row);
  });
}

// Handle inventory update
function handleInventoryUpdate(e) {
  e.preventDefault();

  const name = document.getElementById("item-name").value;
  const category = document.getElementById("item-category").value;
  const quantity = parseInt(document.getElementById("item-quantity").value);
  const unit = document.getElementById("item-unit").value;
  const minStock = parseInt(document.getElementById("item-min-stock").value);
  const price = parseFloat(document.getElementById("item-price").value);

  if (
    name &&
    category &&
    !isNaN(quantity) &&
    unit &&
    !isNaN(minStock) &&
    !isNaN(price)
  ) {
    const newItem = {
      id: `INV${String(mockData.inventory.length + 1).padStart(3, "0")}`,
      name,
      category,
      quantity,
      unit,
      minStock,
      price,
    };

    mockData.inventory.push(newItem);
    updateInventoryTable();

    // Reset form
    document.getElementById("inventory-form").reset();
    alert("Inventory updated successfully!");
  } else {
    alert("Please fill all required fields with valid values");
  }
}

// Edit inventory item (placeholder)
function editInventoryItem(itemId) {
  const item = mockData.inventory.find((i) => i.id === itemId);
  if (item) {
    // Populate form with item data
    document.getElementById("item-name").value = item.name;
    document.getElementById("item-category").value = item.category;
    document.getElementById("item-quantity").value = item.quantity;
    document.getElementById("item-unit").value = item.unit;
    document.getElementById("item-min-stock").value = item.minStock;
    document.getElementById("item-price").value = item.price;

    // Change form to update mode
    // In a real app, we would have a separate update function
    alert(`Editing item: ${item.name}`);
  }
}

// Delete inventory item
function deleteInventoryItem(itemId) {
  if (confirm("Are you sure you want to delete this inventory item?")) {
    mockData.inventory = mockData.inventory.filter((i) => i.id !== itemId);
    updateInventoryTable();
  }
}

// Update staff directory
function updateStaffDirectory() {
  // Set up search and filter
  document
    .getElementById("staff-search")
    ?.addEventListener("input", filterStaffDirectory);
  document
    .getElementById("staff-department-filter")
    ?.addEventListener("change", filterStaffDirectory);
  document
    .getElementById("staff-role-filter")
    ?.addEventListener("change", filterStaffDirectory);

  // Update staff list
  updateStaffList();
}

// Update staff list
function updateStaffList() {
  const staffList = document.querySelector(".staff-list");
  if (!staffList) return;

  staffList.innerHTML = "";

  mockData.staff.forEach((staff) => {
    const staffItem = document.createElement("div");
    staffItem.className = "staff-item";
    staffItem.innerHTML = `
            <div class="staff-info">
                <div class="staff-name">${staff.name}</div>
                <div class="staff-role">${staff.specialization}</div>
                <div class="staff-department">${staff.department}</div>
                <div class="staff-contact">${staff.contact}</div>
            </div>
            <div class="staff-actions">
                <button class="btn btn-secondary" onclick="viewStaffProfile('${staff.id}')">View Profile</button>
            </div>
        `;
    staffList.appendChild(staffItem);
  });
}

// Filter staff directory
function filterStaffDirectory() {
  const searchTerm = document
    .getElementById("staff-search")
    .value.toLowerCase();
  const deptFilter = document.getElementById("staff-department-filter").value;
  const roleFilter = document.getElementById("staff-role-filter").value;

  let filteredStaff = mockData.staff;

  if (searchTerm) {
    filteredStaff = filteredStaff.filter(
      (staff) =>
        staff.name.toLowerCase().includes(searchTerm) ||
        staff.specialization.toLowerCase().includes(searchTerm)
    );
  }

  if (deptFilter) {
    filteredStaff = filteredStaff.filter(
      (staff) => staff.department === deptFilter
    );
  }

  if (roleFilter) {
    filteredStaff = filteredStaff.filter((staff) => staff.role === roleFilter);
  }

  // Update staff list with filtered results
  const staffList = document.querySelector(".staff-list");
  if (!staffList) return;

  staffList.innerHTML = "";

  filteredStaff.forEach((staff) => {
    const staffItem = document.createElement("div");
    staffItem.className = "staff-item";
    staffItem.innerHTML = `
            <div class="staff-info">
                <div class="staff-name">${staff.name}</div>
                <div class="staff-role">${staff.specialization}</div>
                <div class="staff-department">${staff.department}</div>
                <div class="staff-contact">${staff.contact}</div>
            </div>
            <div class="staff-actions">
                <button class="btn btn-secondary" onclick="viewStaffProfile('${staff.id}')">View Profile</button>
            </div>
        `;
    staffList.appendChild(staffItem);
  });
}

// View staff profile (placeholder)
function viewStaffProfile(staffId) {
  alert(`Viewing profile for staff: ${staffId}`);
}

// Update admin dashboard
function updateAdminDashboard() {
  // Update KPIs
  document.getElementById("total-patients-admin").textContent =
    mockData.patients.length;
  document.getElementById("staff-count").textContent = mockData.staff.length;

  // Calculate revenue
  const revenue = mockData.bills
    ? mockData.bills.reduce((sum, bill) => sum + bill.amount, 0)
    : 0;
  document.getElementById(
    "revenue-admin"
  ).textContent = `₹${revenue.toLocaleString()}`;

  // Calculate bed occupancy
  const totalBeds = 100; // Mock total beds
  const occupiedBeds = 75; // Mock occupied beds
  const occupancyPercentage = Math.round((occupiedBeds / totalBeds) * 100);
  document.getElementById(
    "bed-occupancy-admin"
  ).textContent = `${occupancyPercentage}%`;

  // Initialize admin charts
  initializeAdminCharts();
}

// Initialize admin charts
function initializeAdminCharts() {
  // Department load chart
  const deptLoadCtx = document
    .getElementById("dept-load-chart")
    ?.getContext("2d");
  if (deptLoadCtx) {
    // Destroy existing chart if it exists
    if (window.deptLoadChart) {
      window.deptLoadChart.destroy();
    }

    window.deptLoadChart = new Chart(deptLoadCtx, {
      type: "bar",
      data: {
        labels: [
          "Cardiology",
          "Emergency",
          "General",
          "Pediatrics",
          "Orthopedics",
        ],
        datasets: [
          {
            label: "Patient Load",
            data: [45, 60, 40, 30, 25],
            backgroundColor: [
              "#3b82f6",
              "#ef4444",
              "#10b981",
              "#f59e0b",
              "#8b5cf6",
            ],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  }

  // Revenue by department chart
  const revenueDeptCtx = document
    .getElementById("revenue-dept-chart")
    ?.getContext("2d");
  if (revenueDeptCtx) {
    // Destroy existing chart if it exists
    if (window.revenueDeptChart) {
      window.revenueDeptChart.destroy();
    }

    window.revenueDeptChart = new Chart(revenueDeptCtx, {
      type: "doughnut",
      data: {
        labels: [
          "Cardiology",
          "Emergency",
          "General",
          "Pediatrics",
          "Orthopedics",
        ],
        datasets: [
          {
            data: [30, 25, 20, 15, 10],
            backgroundColor: [
              "#3b82f6",
              "#ef4444",
              "#10b981",
              "#f59e0b",
              "#8b5cf6",
            ],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
          },
        },
      },
    });
  }
}

// Update department analytics
function updateDepartmentAnalytics() {
  // Set up date range and filters
  document
    .getElementById("apply-filters")
    ?.addEventListener("click", applyAnalyticsFilters);

  // Initialize charts
  initializeAnalyticsCharts();
}

// Apply analytics filters
function applyAnalyticsFilters() {
  const deptFilter = document.getElementById("dept-filter").value;
  const startDate = document.getElementById("start-date").value;
  const endDate = document.getElementById("end-date").value;

  console.log("Applying filters:", { deptFilter, startDate, endDate });

  // In a real app, this would update the analytics based on filters
  alert(
    `Analytics updated for ${deptFilter || "all departments"} from ${
      startDate || "start"
    } to ${endDate || "today"}`
  );
}

// Initialize analytics charts
function initializeAnalyticsCharts() {
  // OPD trend chart
  const opdTrendCtx = document
    .getElementById("opd-trend-chart")
    ?.getContext("2d");
  if (opdTrendCtx) {
    // Destroy existing chart if it exists
    if (window.opdTrendChart) {
      window.opdTrendChart.destroy();
    }

    window.opdTrendChart = new Chart(opdTrendCtx, {
      type: "line",
      data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            label: "OPD Visits",
            data: [45, 52, 48, 60, 55, 30, 25],
            borderColor: "#10b981",
            backgroundColor: "rgba(16, 185, 129, 0.1)",
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  }

  // Lab volume chart
  const labVolumeCtx = document
    .getElementById("lab-volume-chart")
    ?.getContext("2d");
  if (labVolumeCtx) {
    // Destroy existing chart if it exists
    if (window.labVolumeChart) {
      window.labVolumeChart.destroy();
    }

    window.labVolumeChart = new Chart(labVolumeCtx, {
      type: "bar",
      data: {
        labels: [
          "Hematology",
          "Biochemistry",
          "Microbiology",
          "Imaging",
          "Pathology",
        ],
        datasets: [
          {
            label: "Tests Volume",
            data: [120, 95, 78, 65, 45],
            backgroundColor: [
              "#3b82f6",
              "#ef4444",
              "#10b981",
              "#f59e0b",
              "#8b5cf6",
            ],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  }
}

// Update AI alerts
function updateAIAlerts() {
  // In a real app, this would fetch AI alerts
  console.log("Updating AI alerts dashboard");
}

// Update fraud detection
function updateFraudDetection() {
  // Set up fraud scan button
  document
    .getElementById("scan-fraud")
    ?.addEventListener("click", scanForFraud);
}

// Scan for fraud
function scanForFraud() {
  const startDate = document.getElementById("fraud-start-date").value;
  const endDate = document.getElementById("fraud-end-date").value;
  const fraudType = document.getElementById("fraud-type").value;

  console.log("Scanning for fraud:", { startDate, endDate, fraudType });

  // In a real app, this would perform fraud detection
  alert(
    `Scanning for fraud from ${startDate || "start"} to ${
      endDate || "today"
    } (Type: ${fraudType || "All"})`
  );
}

// Update bed optimization
function updateBedOptimization() {
  // Set up filters
  document
    .getElementById("ward-filter")
    ?.addEventListener("change", updateBedDisplay);
  document
    .getElementById("time-perspective")
    ?.addEventListener("change", updateBedDisplay);
}

// Update bed display based on filters
function updateBedDisplay() {
  const wardFilter = document.getElementById("ward-filter").value;
  const timePerspective = document.getElementById("time-perspective").value;

  console.log("Updating bed display:", { wardFilter, timePerspective });

  // In a real app, this would update the bed visualization
  alert(
    `Updated bed display for ${wardFilter || "all wards"} - ${
      timePerspective || "current"
    }`
  );
}

// Helper function to populate select elements
function populateSelect(elementId, data, valueField, textField) {
  const selectElement = document.getElementById(elementId);
  if (!selectElement) return;

  selectElement.innerHTML = '<option value="">Select</option>';

  data.forEach((item) => {
    const option = document.createElement("option");
    option.value = item[valueField];
    option.textContent = item[textField];
    selectElement.appendChild(option);
  });
}

// Handle login
function handleLogin(e) {
  e.preventDefault();

  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  // Find user in stored users
  const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
  const user = storedUsers.find(
    (u) => u.email === email && u.password === password
  );

  if (user) {
    // Login successful
    currentUser = user;
    isAuthenticated = true;
    currentRole = user.role;

    // Store user in localStorage
    localStorage.setItem("currentUser", JSON.stringify(user));

    // Update UI based on user role
    updateRoleBasedUI();

    // Show dashboard
    showPage("dashboard");
    alert("Login successful!");
  } else {
    alert("Invalid email or password");
  }
}

// Handle signup
function handleSignup(e) {
  e.preventDefault();

  const name = document.getElementById("signup-name").value;
  const email = document.getElementById("signup-email").value;
  const role = document.getElementById("signup-role").value;
  const password = document.getElementById("signup-password").value;
  const confirmPassword = document.getElementById(
    "signup-confirm-password"
  ).value;

  // Validation
  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  if (!name || !email || !role || !password) {
    alert("Please fill all fields");
    return;
  }

  // Check if user already exists
  const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
  const userExists = storedUsers.some((u) => u.email === email);

  if (userExists) {
    alert("User with this email already exists");
    return;
  }

  // Create new user
  const newUser = {
    id: `USR${String(storedUsers.length + 1).padStart(3, "0")}`,
    name,
    email,
    role,
    password, // In a real app, this should be hashed
    created: new Date().toISOString().split("T")[0],
  };

  // Add to stored users
  storedUsers.push(newUser);
  localStorage.setItem("users", JSON.stringify(storedUsers));

  // Login the new user
  currentUser = newUser;
  isAuthenticated = true;
  currentRole = newUser.role;

  // Store user in localStorage
  localStorage.setItem("currentUser", JSON.stringify(newUser));

  // Update UI based on user role
  updateRoleBasedUI();

  // Show dashboard
  showPage("dashboard");
  alert("Account created successfully!");
}

// Show a specific page
function showPage(pageId) {
  // If trying to access any page without authentication, redirect to login
  if (pageId !== "login" && !isAuthenticated) {
    // Show login page
    document.querySelectorAll(".page").forEach((page) => {
      page.classList.remove("active");
    });
    document.getElementById("login").classList.add("active");

    // Update active nav item
    document.querySelectorAll(".nav-item").forEach((item) => {
      item.classList.remove("active");
    });
    document
      .querySelector(`.nav-item[data-page="login"]`)
      .classList.add("active");

    // Update current page in breadcrumb
    document.getElementById("current-page").textContent =
      document.querySelector(
        `.nav-item[data-page="login"] .nav-link span`
      ).textContent;

    currentPage = "login";
    return;
  }

  // If user is authenticated and trying to access login, redirect to dashboard
  if (pageId === "login" && isAuthenticated) {
    pageId = "dashboard";
  }

  // Hide all pages
  document.querySelectorAll(".page").forEach((page) => {
    page.classList.remove("active");
  });

  // Remove active class from all nav items
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.classList.remove("active");
  });

  // Show the requested page
  document.getElementById(pageId).classList.add("active");

  // Update active nav item
  document
    .querySelector(`.nav-item[data-page="${pageId}"]`)
    .classList.add("active");

  // Update current page in breadcrumb
  document.getElementById("current-page").textContent = document.querySelector(
    `.nav-item[data-page="${pageId}"] .nav-link span`
  ).textContent;

  currentPage = pageId;

  // Update page-specific content
  updatePageContent(pageId);
}

// Add logout functionality
function setupLogout() {
  // Add logout button if it doesn't exist
  const headerRight = document.querySelector(".header-right");
  if (headerRight && !document.getElementById("logout-btn")) {
    const logoutBtn = document.createElement("button");
    logoutBtn.id = "logout-btn";
    logoutBtn.className = "btn btn-danger";
    logoutBtn.textContent = "Logout";
    logoutBtn.addEventListener("click", handleLogout);
    headerRight.appendChild(logoutBtn);
  }
}

// Handle logout
function handleLogout() {
  // Clear user data
  currentUser = null;
  isAuthenticated = false;
  localStorage.removeItem("currentUser");

  // Redirect to login
  showPage("login");
  alert("Logged out successfully!");
}

// Initialize the application when DOM is loaded
document.addEventListener("DOMContentLoaded", init);
