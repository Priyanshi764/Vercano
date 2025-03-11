
function registerUser() {
    let name = document.getElementById("reg-name").value.trim();
    let email = document.getElementById("reg-email").value.trim();
    let password = document.getElementById("reg-password").value.trim();

    if (!name || !email || !password) {
        document.getElementById("reg-error").innerText = "All fields are required!";
        return;
    }

    if (localStorage.getItem(email)) {
        document.getElementById("reg-error").innerText = "User already exists! Please login.";
        return;
    }

    let user = { name, email, password, profilePic: "default.jpg" };
    localStorage.setItem(email, JSON.stringify(user));
    localStorage.setItem("loggedInUser", email); 

    window.location.href = "profile.html";
}

function loginUser() {
    let email = document.getElementById("login-email").value.trim();
    let password = document.getElementById("login-password").value.trim();

    let storedUser = JSON.parse(localStorage.getItem(email));

    if (storedUser && storedUser.password === password) {
        localStorage.setItem("loggedInUser", email);
        window.location.href = "profile.html"; 
    } else {
        document.getElementById("login-error").innerText = "Invalid email or password!";
    }
}

function handleGoogleLogin(response) {
    const decoded = JSON.parse(atob(response.credential.split(".")[1]));
    let user = {
        name: decoded.name,
        email: decoded.email,
        profilePic: decoded.picture
    };

    localStorage.setItem(decoded.email, JSON.stringify(user));
    localStorage.setItem("loggedInUser", decoded.email);
    window.location.href = "profile.html"; // Redirect to profile page
}

// Profile Page - Load User Data
if (window.location.pathname.includes("profile.html")) {
    let userEmail = localStorage.getItem("loggedInUser");
    let user = JSON.parse(localStorage.getItem(userEmail));

    if (!user) window.location.href = "index.html"; // Redirect to login if not logged in

    document.getElementById("user-name").innerText = user.name;
    document.getElementById("user-email").innerText = user.email;
    document.getElementById("profile-pic").src = user.profilePic || "default.jpg";
}

// Logout
function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html"; // Redirect to login
}
