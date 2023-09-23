document.addEventListener("DOMContentLoaded", function () {
    const signupPage = document.getElementById("signup");
    const profilePage = document.getElementById("profile");
    const signupForm = document.getElementById("signup-form");
    const signupMessage = document.getElementById("signup-message");
    const profileUsername = document.getElementById("profile-username");
    const profileFullName = document.getElementById("profile-fullname");
    const profileEmail = document.getElementById("profile-email");
    const profileRandomToken = document.getElementById("profile-random-token");
    const profilePassword = document.getElementById("profile-password");
    const logoutButton = document.getElementById("logout-button");

    // Check if the user is already logged in
    const accessToken = localStorage.getItem("access_token");

    if (accessToken) {
        showProfilePage();
    } else {
        showSignupPage();
    }

    // Event listener for the signup form
    signupForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-password").value;

        // Check if passwords match
        if (password !== confirmPassword) {
            signupMessage.textContent = "Passwords do not match.";
            return;
        }

        // Simulate a successful signup
        const randomAccessToken = generateRandomAccessToken();
        localStorage.setItem("access_token", randomAccessToken);
        localStorage.setItem("username", name);
        localStorage.setItem("email", email);
        localStorage.setItem("random_token", randomAccessToken);
        localStorage.setItem("user_password", password);

        // Display success message and show profile page
        signupMessage.textContent = "Signup successful!";
        setTimeout(() => {
            signupMessage.textContent = "";
            showProfilePage();
        }, 1000);
    });

    // Event listener for the logout button
    logoutButton.addEventListener("click", function () {
        // Clear local storage and redirect to signup page
        localStorage.removeItem("access_token");
        localStorage.removeItem("username");
        localStorage.removeItem("email");
        localStorage.removeItem("random_token");
        localStorage.removeItem("user_password");
        showSignupPage();
    });

    // Function to show the signup page
    function showSignupPage() {
        signupPage.style.display = "block";
        profilePage.style.display = "none";
    }

    // Function to show the profile page
    function showProfilePage() {
        const username = localStorage.getItem("username");
        const fullName = localStorage.getItem("name");
        const email = localStorage.getItem("email");
        const randomToken = localStorage.getItem("random_token");
        const password = localStorage.getItem("user_password");

        signupPage.style.display = "none";
        profilePage.style.display = "block";

        profileUsername.textContent = username;
        profileFullName.textContent = fullName;
        profileEmail.textContent = email;
        profileRandomToken.textContent = randomToken;
        profilePassword.textContent = password;
    }

    // Function to generate a random access token
    function generateRandomAccessToken() {
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        const tokenLength = 16;
        let accessToken = "";

        for (let i = 0; i < tokenLength; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            accessToken += charset[randomIndex];
        }

        return accessToken;
    }
});
