// auth-user.js

document.addEventListener("DOMContentLoaded", () => {

    // Retrieve logged-in user
    const userData = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!userData || !userData.fullname) return;

    // --- Officer Name ---
    const nameElement = document.getElementById("userName");
    if (nameElement) nameElement.textContent = userData.fullname;

    // --- Officer Role (static or could be dynamic later) ---
    const roleElement = document.getElementById("userRole");
    if (roleElement) roleElement.textContent = "Senior Analyst";

    // --- Officer Initials ---
    const avatarElement = document.getElementById("userAvatar");
    if (avatarElement) {
        const initials = userData.fullname
            .split(" ")
            .map(n => n[0].toUpperCase())
            .join("");
        avatarElement.textContent = initials;
    }
});

// Logout handler
document.getElementById("logoutBtn")?.addEventListener("click", () => {
    localStorage.removeItem("loggedInUser");
    window.location.href = "../Public-pages/login.html";
});
