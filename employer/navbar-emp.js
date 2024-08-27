document.addEventListener("DOMContentLoaded", () => {
    // Load navbar HTML
    fetch("./navbar-emp.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("navbar-container").innerHTML = data;
            // Initialize or reinitialize event listeners if needed
            initNavbar();
        })
        .catch(error => console.error('Error loading navbar:', error));

    // Initialize or reinitialize event listeners
    function initNavbar() {
        const authToken = localStorage.getItem("authToken");
        const usernameDisplay = document.getElementById("username-display");
        const mobileUsername = document.getElementById("mobile-username");
        const userMenuButton = document.getElementById("userMenuButton");
        const userMenu = document.getElementById("userMenu");

        const signInLinksDesktop = `
            <a href="employer/signin-emp.html" class="text-gray-800 hover:text-violet-600">Sign in as Employee</a>
            <a href="signin-jobseeker.html" class="ml-4 text-gray-800 hover:text-violet-600">Sign in as Job Seeker</a>
        `;

        const signInLinksMobile = `
            <li><a href="employer/signin-emp.html" class="hover:text-violet-600">Sign in as Employee</a></li>
            <li><a href="signin-jobseeker.html" class="hover:text-violet-600">Sign in as Job Seeker</a></li>
        `;

        if (authToken) {
            // Fetch the profile data using the auth token
            fetch("https://workwave-api-wyrf.onrender.com/employers/profile/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${authToken}`
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.user) {
                        usernameDisplay.textContent = data.user; // Display the username on desktop
                        mobileUsername.textContent = data.user; // Display username in mobile menu
                        userMenuButton.style.display = "block"; // Show profile icon
                    }
                })
                .catch(error => console.error('Error fetching profile data:', error));
        } else {
            // No auth token, show sign-in links instead of profile and username
            usernameDisplay.innerHTML = signInLinksDesktop; // Display sign-in options on desktop
            userMenuButton.style.display = "none"; // Hide the profile icon
            document.getElementById("mobile-menu").innerHTML = signInLinksMobile; // Display sign-in options on mobile
        }

        // Desktop Dropdown Menu Toggle
        if (userMenuButton) {
            userMenuButton.addEventListener("click", () => {
                userMenu.classList.toggle("hidden");
            });
        }

        // Close the dropdown if clicked outside
        document.addEventListener("click", (event) => {
            if (userMenuButton && !userMenuButton.contains(event.target) && !userMenu.contains(event.target)) {
                userMenu.classList.add("hidden");
            }
        });

        // Logout Functionality
        const logoutButton = userMenu ? userMenu.querySelector('a[href="#logout"]') : null;
        if (logoutButton) {
            logoutButton.addEventListener("click", (event) => {
                event.preventDefault();
                // Clear the authentication token and redirect to login page
                localStorage.removeItem("authToken");
                window.location.href = "signout.html"; // Redirect to your login page
            });
        }

        // Mobile Menu Toggle
        const menuBtn = document.getElementById('menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');

        if (menuBtn) {
            menuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
        }
    }
});
