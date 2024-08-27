document.addEventListener('DOMContentLoaded', () => {
    const jobId = new URLSearchParams(window.location.search).get('jobId');
    if (!jobId) {
        console.error('No job ID found in URL');
        return;
    }

    const token = localStorage.getItem("authToken");

    if (!token) {
        console.error("No authentication token found");
        return;
    }

    // Fetch job details
    fetch(`https://workwave-api-wyrf.onrender.com/jobs/jobs/${jobId}/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`
        }
    })
    .then(res => res.json())
    .then(job => {
        document.getElementById('jobId').value = job.id;
        document.getElementById('jobTitle').value = job.title;
        document.getElementById('jobDescription').value = job.description;
        document.getElementById('jobLocation').value = job.location;
        document.getElementById('jobDatePosted').value = job.date_posted || '';
        document.getElementById('jobSalary').value = job.offer_salary || '';
        document.getElementById('jobExperience').value = job.experience || '';
        document.getElementById('jobCategory').value = job.category || '';
        document.getElementById('jobEmployeeType').value = job.employee_type || '';
        document.getElementById('jobPosition').value = job.position || '';
        document.getElementById('jobResponsibilities').value = job.responsibilities || '';
        document.getElementById('jobQualifications').value = job.qualifications || '';
        document.getElementById('jobSkillsExperience').value = job.skills_experience || '';
    })
    .catch(error => console.error('Error fetching job details:', error));

    // Handle form submission
    document.getElementById('editJobForm').addEventListener('submit', (event) => {
        event.preventDefault();

        const updatedJob = {
            title: document.getElementById('jobTitle').value,
            description: document.getElementById('jobDescription').value,
            location: document.getElementById('jobLocation').value,
            date_posted: document.getElementById('jobDatePosted').value,
            offer_salary: document.getElementById('jobSalary').value,
            experience: document.getElementById('jobExperience').value,
            category: document.getElementById('jobCategory').value,
            employee_type: document.getElementById('jobEmployeeType').value,
            position: document.getElementById('jobPosition').value,
            responsibilities: document.getElementById('jobResponsibilities').value,
            qualifications: document.getElementById('jobQualifications').value,
            skills_experience: document.getElementById('jobSkillsExperience').value
        };

        fetch(`https://workwave-api-wyrf.onrender.com/jobs/jobs/${jobId}/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            },
            body: JSON.stringify(updatedJob)
        })
        .then(response => {
            if (response.ok) {
                alert("Job updated successfully.");
                window.location.href = "/employer/emp-dashboard.html"; 
            } else {
                return response.json().then(err => {
                    console.error('Error updating job:', err);
                    alert(`Failed to update the job. ${err.message || ''}`);
                });
            }
        })
        .catch(error => console.error('Error updating job:', error));
    });
});
