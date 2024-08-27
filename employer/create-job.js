document.addEventListener('DOMContentLoaded', function () {
    const jobForm = document.getElementById('jobForm');
    const messageDiv = document.getElementById('message');

    // Fetch job categories and populate the dropdown
    fetch('https://workwave-api-wyrf.onrender.com/jobs/categories/')
        .then(response => response.json())
        .then(data => {
            const categorySelect = document.getElementById('category');
            data.forEach(category => {
                const option = document.createElement('option');
                option.value = category.id;
                option.textContent = category.name;
                categorySelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error fetching categories:', error);
            messageDiv.textContent = 'Error fetching categories. Please try again.';
            messageDiv.className = 'text-red-500';
        });

    // Handle form submission
    jobForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(jobForm);
        const jobData = Object.fromEntries(formData);

        fetch('https://workwave-api-wyrf.onrender.com/jobs/jobs/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('authToken')}` // Assuming the token is stored in localStorage
            },
            body: JSON.stringify(jobData)
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else if (response.status === 401) {
                throw new Error('Not authorized. Please check your authentication token.');
            } else {
                console.log('Unexpected response status:', response.status);
                return response.json(); // Process as a JSON error response if not authorized
            }
        })
        .then(data => {
                messageDiv.textContent = 'Job created successfully!';
                messageDiv.className = 'text-green-500';
                jobForm.reset(); // Clear the form after successful submission
                setTimeout(() => {
                    window.location.reload(); // Refresh the page to show the updated state
                }, 2000);
        })
        .catch(error => {
            console.error('Error creating job:', error);
            if (error.message.includes('Not authorized')) {
                messageDiv.textContent = 'Authorization error. Please check your authentication token.';
                messageDiv.className = 'text-red-500';
            } else {
                messageDiv.textContent = 'Error creating job.';
                messageDiv.className = 'text-red-500';
            }
        });
    });
});
