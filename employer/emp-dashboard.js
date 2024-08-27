const dashboard = () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
        console.error("No authentication token found");
        return;
    }

    fetch("https://workwave-api-wyrf.onrender.com/employers/dashboard/", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`
        }
    })
    .then(res => res.json())
    .then(data => {
        if (data) {
            const jobsContainer = document.getElementById('jobsContainer');
            const applicationsTable = document.getElementById('applicationsTable');

            // Function to truncate text to a specific number of words
            function truncateText(text, wordLimit) {
                if (!text) return '';
                const words = text.split(/\s+/); // Split on any whitespace
                if (words.length > wordLimit) {
                    return words.slice(0, wordLimit).join(' ') + '...';
                }
                return text;
            }

            // Render jobs with buttons
            data.jobs.forEach(job => {
                const jobCard = document.createElement('div');
                jobCard.className = 'bg-white shadow-md rounded-md p-4';

                // Use the truncateText function for the job description
                const truncatedDescription = truncateText(job.description, 40);

                jobCard.innerHTML = `
                    <h3 class="text-lg font-bold text-indigo-600">${job.title}</h3>
                    <p class="text-gray-600">${truncatedDescription}</p>
                    <p class="text-sm text-gray-500 mt-2"><strong>Location:</strong> ${job.location}</p>
                    <p class="text-sm text-gray-500"><strong>Posted On:</strong> ${job.date_posted || 'N/A'}</p>
                    <p class="text-sm text-gray-500"><strong>Salary:</strong> ${job.offer_salary}</p>
                    <p class="text-sm text-gray-500"><strong>Experience:</strong> ${job.experience}</p>
                    <div class="mt-4 flex justify-between">
                        <a target="_blank" href="/employer/job-details.html?id=${job.id}" class="text-white bg-blue-500 hover:bg-blue-600 rounded-md px-4 py-2">Details</a>
                        <a href="edit-job.html?jobId=${job.id}" class="text-white bg-yellow-500 hover:bg-yellow-600 rounded-md px-4 py-2">Edit</a>
                        <button onclick="deleteJob(${job.id})" class="text-white bg-red-500 hover:bg-red-600 rounded-md px-4 py-2">Delete</button>
                    </div>
                `;
                jobsContainer.appendChild(jobCard);
            });

            // Render applications
            data.applications.forEach(application => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td class="px-6 py-4 whitespace-nowrap">${application.job}</td>
                    <td class="px-6 py-4 whitespace-nowrap">${application.job_seeker}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <a href="${application.resume}" class="text-indigo-600 hover:underline">Download</a>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">${application.cover_letter || 'N/A'}</td>
                `;
                applicationsTable.appendChild(row);
            });
        }
    })
    .catch(error => console.error('Error fetching data:', error));
};

const deleteJob = (jobId) => {
    const token = localStorage.getItem("authToken");

    if (!token) {
        console.error("No authentication token found");
        return;
    }

    if (confirm("Are you sure you want to delete this job?")) {
        fetch(`https://workwave-api-wyrf.onrender.com/jobs/jobs/${jobId}/`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${token}`
            }
        })
        .then(response => {
            if (response.ok) {
                alert("Job deleted successfully.");
                location.reload(); // Reload the page to see changes
            } else {
                alert("Failed to delete the job.");
            }
        })
        .catch(error => console.error('Error deleting job:', error));
    }
};

dashboard();
