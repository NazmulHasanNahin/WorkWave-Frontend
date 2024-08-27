// // Get the modal element
// const modal = document.getElementById('modal');
// // Get the button that opens the modal
// const openModalBtn = document.getElementById('openModalBtn');
// // Get the button that closes the modal
// const closeModalBtn = document.getElementById('closeModalBtn');

// // Open the modal
// openModalBtn.addEventListener('click', () => {
//     modal.classList.remove('hidden');
// });

// // Close the modal
// closeModalBtn.addEventListener('click', () => {
//     modal.classList.add('hidden');
// });

// // Close the modal when clicking outside of the modal content
// window.addEventListener('click', (event) => {
//     if (event.target === modal) {
//         modal.classList.add('hidden');
//     }
// });



// new 
document.addEventListener('DOMContentLoaded', () => {
    const openModalBtn = document.getElementById('openModalBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const modal = document.getElementById('apply-modal');
    const applyForm = document.getElementById('apply-form');

    // Show modal
    openModalBtn.addEventListener('click', () => {
        modal.classList.remove('hidden');
    });

    // Hide modal
    closeModalBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

//     // Handle form submission
//     applyForm.addEventListener('submit', async (event) => {
//         event.preventDefault();

//         const formData = new FormData(applyForm);
//         const coverLetter = formData.get('coverLetter');
//         const resumeFile = formData.get('resume');

//         const token = getAuthToken(); // Function to retrieve your auth token

//         // Replace 'job_id' with the actual job ID
//         const jobId = 'job_id';

//         try {
//             const response = await fetch('https://workwave-api-wyrf.onrender.com/applications/apply/', {
//                 method: 'POST',
//                 headers: {
//                     'Authorization': `Bearer ${token}`,
//                 },
//                 body: formData
//             });

//             if (response.ok) {
//                 alert('Application submitted successfully');
//                 modal.classList.add('hidden');
//             } else {
//                 const errorData = await response.json();
//                 console.error('Error:', errorData);
//                 alert('Failed to submit application');
//             }
//         } catch (error) {
//             console.error('Error:', error);
//             alert('An error occurred while submitting the application');
//         }
//     });

//     // Function to get the authentication token from cookies or localStorage
//     function getAuthToken() {
//         // Replace with your logic to retrieve the auth token
//         return localStorage.getItem('authToken') || '';
//     }
});
