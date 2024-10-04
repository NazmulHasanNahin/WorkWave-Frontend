document.addEventListener("DOMContentLoaded", () => {
    const overviewTab = document.getElementById("overview-tab");
    const settingsTab = document.getElementById("settings-tab");
    const overviewContent = document.getElementById("overview-content");
    const settingsContent = document.getElementById("settings-content");

    // Function to show the Overview tab
    const showOverview = () => {
        overviewContent.classList.remove("hidden");
        settingsContent.classList.add("hidden");
        overviewTab.classList.add("text-indigo-600", "border-indigo-600");
        settingsTab.classList.remove("text-indigo-600", "border-indigo-600");
    };

    // Function to show the Settings tab
    const showSettings = () => {
        overviewContent.classList.add("hidden");
        settingsContent.classList.remove("hidden");
        settingsTab.classList.add("text-indigo-600", "border-indigo-600");
        overviewTab.classList.remove("text-indigo-600", "border-indigo-600");
    };

    // Event listeners for tab switching
    overviewTab.addEventListener("click", showOverview);
    settingsTab.addEventListener("click", showSettings);

    // Show the Overview tab by default on page load
    showOverview();

    // Fetch and populate profile data
    const fetchProfileData = () => {
        const token = localStorage.getItem("authToken");

        if (!token) {
            console.error("No authentication token found");
            return;
        }

        fetch("https://workwave-api.vercel.app/employers/profile/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch profile data");
            }
            return response.json();
        })
        .then(data => {
            console.log("Profile data:", data);

            // Update the Overview section
            overviewContent.innerHTML = `
                <h3 class="text-xl font-semibold">Company Overview</h3>
                <p class="text-gray-600 mt-4">${data.company_description || "No description provided."}</p>
                <h3 class="text-xl font-semibold mt-6">Company Details</h3>
                <ul class="mt-4 space-y-2">
                    <li><strong>Name:</strong> ${data.company_name}</li>
                    <li><strong>Website:</strong> <a href="${data.company_website}" target="_blank" class="text-indigo-600">${data.company_website || "N/A"}</a></li>
                </ul>
            `;

            // Update the Settings form
            document.querySelector("input[name='company_name']").value = data.company_name || "";
            document.querySelector("textarea[name='company_description']").value = data.company_description || "";
            document.querySelector("input[name='company_website']").value = data.company_website || "";

            // Update the Profile section
            document.querySelector(".profile-name").textContent = data.company_name || "Company Name";
            document.querySelector(".profile-description").textContent = data.company_description || "Company Description";
        })
        .catch(error => {
            console.error("Error fetching profile data:", error);
        });
    };

    // Update profile data
    const updateProfileData = (event) => {
        event.preventDefault();
        const token = localStorage.getItem("authToken");

        if (!token) {
            console.error("No authentication token found");
            return;
        }

        const updatedData = {
            company_name: document.querySelector("input[name='company_name']").value,
            company_description: document.querySelector("textarea[name='company_description']").value,
            company_website: document.querySelector("input[name='company_website']").value
        };

        fetch("https://workwave-api.vercel.app/employers/profile/edit/", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            },
            body: JSON.stringify(updatedData)
        })
        .then(response => {
            return response.json().then(data => {
                if (!response.ok) {
                    throw data;
                }
                return data;
            });
        })
        .then(data => {
            console.log("Profile updated:", data);
            alert("Profile updated successfully!");
            fetchProfileData();  // Refresh the profile data
        })
        .catch(error => {
            console.error("Error updating profile data:", error);
            alert(`Error updating profile: ${JSON.stringify(error)}`);
        });
    };

    // Attach the event listener for saving changes
    document.querySelector("form").addEventListener("submit", updateProfileData);

    // Call the function to fetch and populate the profile data
    fetchProfileData();
});
