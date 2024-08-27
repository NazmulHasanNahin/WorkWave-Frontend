const handleLogin = (event) => {
    event.preventDefault();
    const form = document.getElementById("login-form");
    const formData = new FormData(form);

    const loginData = {
        email: formData.get("email"),
        username: formData.get("username"),
        password: formData.get("password"),
    };

    console.log("Login Data:", loginData);  // Log the data to ensure it's correct

    fetch("https://workwave-api-wyrf.onrender.com/employers/auth/login/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
    })
        .then((res) => res.json())
        .then((data) => {
            console.log("API Response:", data);  // Log the response
            if (data.key) {
                localStorage.setItem("authToken", data.key);
                window.location.href = "/employer/index.html";  // Redirect to the dashboard
            } else {
                console.log("Token not found in response");
            }
        })
        .catch((err) => console.log("Login error", err));
};

// Attach the handleLogin function to the form submit event
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("login-form");
    form.addEventListener("submit", handleLogin);
});
