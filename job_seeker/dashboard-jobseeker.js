document.addEventListener('DOMContentLoaded', () => {
    dashboard();
});

const dashboard = () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
        alert("You are not authorized. Please log in.");
        window.location.href = "/login.html"; // Redirect to login if not authorized
        return;
    }

    fetch("https://workwave-api-wyrf.onrender.com/job_seekers/dashboard/", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`
        }
    })
    .then(res => res.json())
    .then(data => {
        if (data && data.applications) {
            renderApplications(data.applications);
        }
    })
    .catch(error => console.error('Error fetching data:', error));
};

const renderApplications = (applications) => {
    const applicationsTable = document.getElementById('applicationsTable');
    applicationsTable.innerHTML = ""; // Clear previous data

    applications.forEach(application => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap">${application.job}</td>
            <td class="px-6 py-4 whitespace-nowrap">${application.job_seeker}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <a href="${application.resume}" class="text-indigo-600 hover:underline">Download</a>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <button id="details-application-btn-${application.id}" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Details</button>
                <button id="edit-application-btn-${application.id}" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Edit</button>
                <button id="delete-application-btn-${application.id}" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Delete</button>
            </td>
        `;
        applicationsTable.appendChild(row);

        document.getElementById(`details-application-btn-${application.id}`).addEventListener('click', () => showDetailsPage(application.id));
        document.getElementById(`edit-application-btn-${application.id}`).addEventListener('click', () => showEditPage(application.id));
        document.getElementById(`delete-application-btn-${application.id}`).addEventListener('click', () => deleteApplication(application.id));
    });
};

const showDetailsPage = (applicationId) => {
    window.location.href = `/job_seeker/application-details.html?applicationId=${applicationId}`;
};

const showEditPage = (applicationId) => {
    window.location.href = `/job_seeker/application-edit.html?applicationId=${applicationId}`;
};

const deleteApplication = (applicationId) => {
    const token = localStorage.getItem('authToken');

    if (confirm("Are you sure you want to delete this application?")) {
        fetch(`https://workwave-api-wyrf.onrender.com/applications/${applicationId}/delete/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        })
        .then(response => {
            if (response.ok) {
                console.log('Application deleted successfully');
                location.reload();  // Refresh the page to reflect changes
            } else {
                console.error('Failed to delete application:', response.status);
            }
        })
        .catch(error => console.error('Error:', error));
    }
};
