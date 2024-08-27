document.addEventListener("DOMContentLoaded", () => {
    // Load navbar HTML
    fetch("./navbar.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("navbar-container").innerHTML = data;
            // Initialize or reinitialize event listeners if needed
            initNavbar();
        })
        .catch(error => console.error('Error loading navbar:', error));

    // Initialize or reinitialize event listeners
    function initNavbar() {
        const usernameDisplay = document.getElementById("username-display");
        const userMenuButton = document.getElementById("userMenuButton");
        const userMenu = document.getElementById("userMenu");

        // Sign-in links for desktop and mobile
        const signInLinksDesktop = `
            <a href="employer/signin-emp.html" class="text-gray-800 hover:text-violet-600">Sign in as Employee</a>
            <a href="job_seeker/signin-job.html" class="ml-4 text-gray-800 hover:text-violet-600">Sign in as Job Seeker</a>
        `;

        const signInLinksMobile = `
        `;

        // Display sign-in options on desktop
        usernameDisplay.innerHTML = signInLinksDesktop;
        userMenuButton.style.display = "none"; // Hide the profile icon
        document.getElementById("mobile-menu").innerHTML += signInLinksMobile; // Add sign-in options to the mobile menu

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
