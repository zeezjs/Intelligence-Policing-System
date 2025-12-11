// Save user to LocalStorage
function registerUser(fullname, email, password) {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if user exists already
    const exists = users.find(u => u.email === email);
    if (exists) return false;

    users.push({ fullname, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    return true;
}

// Login User
function loginUser(email, password) {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const validUser = users.find(
        u => u.email === email && u.password === password
    );

    if (!validUser) return false;

    localStorage.setItem("loggedInUser", JSON.stringify(validUser));
    return true;
}

// EMAIL & PASSWORD VALIDATION
function validateEmail(email) {
    // Must be like j.smith@police.gov
    const regex = /^[a-zA-Z]+\.[a-zA-Z]+@police\.gov$/;
    return regex.test(email);
}

function validatePassword(password) {
    // Minimum 8 chars, 1 uppercase, 1 special char from #!><^()
    const regex = /^(?=.*[A-Z])(?=.*[#!><^()]).{8,}$/;
    return regex.test(password);
}

// Protect Pages
function checkAuth() {
    if (!localStorage.getItem("loggedInUser")) {
        window.location.href = "login.html";
    }
}

// Logout
// function logout() {
//     localStorage.removeItem("loggedInUser");
//     window.location.href = "login.html";
// }


document.getElementById("registerForm")?.addEventListener("submit", e => {
    e.preventDefault();

    const fullname = document.getElementById("full-name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirm-password").value.trim();

    // 1️⃣ Check password match
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    // 2️⃣ Validate email format
    if (!validateEmail(email)) {
        alert("Email must be in the format j.smith@police.gov");
        return;
    }

    // 3️⃣ Validate password strength
    if (!validatePassword(password)) {
        alert("Password must be at least 8 characters, include an uppercase letter, and a special character like #!><^()");
        return;
    }

    // 4️⃣ Attempt to register user
    const success = registerUser(fullname, email, password);
    if (!success) {
        alert("A user with this email/ID already exists!");
        return;
    }

    //  Registration successful → redirect to login
    alert("Registration successful!");
    window.location.href = "login.html"; 
});

// Login Form Handler
document.getElementById("loginForm")?.addEventListener("submit", e => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const success = loginUser(email, password);

    if (!success) {
        alert("Invalid email/ID or password");
        return;
    }

    alert("Login successful!");
    window.location.href = "../Dashboard/dashboard.html"; 
});
