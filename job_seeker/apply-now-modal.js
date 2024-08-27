document.addEventListener('DOMContentLoaded', () => {
    const openModalBtn = document.getElementById('openModalBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const cancelApplyBtn = document.getElementById('cancel-apply');
    const modal = document.getElementById('apply-modal');
    const applyForm = document.getElementById('apply-form');

    // Show modal
    if (openModalBtn) {
        openModalBtn.addEventListener('click', () => {
            modal.classList.remove('hidden');
        });
    }

    // Hide modal on clicking the close button
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            modal.classList.add('hidden');
        });
    }

    // Hide modal on clicking the cancel button
    if (cancelApplyBtn) {
        cancelApplyBtn.addEventListener('click', () => {
            modal.classList.add('hidden');
        });
    }

    // Handle form submission
    applyForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(applyForm);

        // Debugging: Log all FormData entries
        for (let pair of formData.entries()) {
            console.log(pair[0]+ ', '+ pair[1]); 
        }

        const resumeFile = formData.get('resume');
        const coverLetter = formData.get('cover_letter');
        console.log('Resume file:', resumeFile);
        console.log('Cover letter:', coverLetter);

        const token = getAuthToken();
        console.log('Auth Token:', token);

        const jobId = getJobIdFromUrl();
        console.log('Job ID:', jobId);

        if (!jobId) {
            console.error('Invalid job ID. Please make sure you are applying for a valid job.');
            return;
        }

        formData.append('job', jobId);

        try {
            const response = await fetch('https://workwave-api-wyrf.onrender.com/applications/apply/', {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${token}`,
                    // Do not set Content-Type header explicitly for FormData
                },
                body: formData
            });

            if (response.ok) {
                console.log('Application submitted successfully');
                modal.classList.add('hidden');
                alert('Your application has been submitted successfully.');
            } else {
                const errorData = await response.json();
                console.error('Failed to submit application:', errorData);
                alert('Error submitting application. Please check the console for details.');
            }
        } catch (error) {
            console.error('An error occurred while submitting the application:', error);
            alert('An unexpected error occurred. Please try again later.');
        }
    });

    // Function to get the job ID from the current URL
    function getJobIdFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        const jobId = urlParams.get('id');

        // Check if jobId is a valid number
        if (jobId && !isNaN(jobId)) {
            return parseInt(jobId);
        } else {
            return null;
        }
    }

    // Function to get the authentication token from localStorage
    function getAuthToken() {
        return localStorage.getItem('authToken') || '';
    }
});
