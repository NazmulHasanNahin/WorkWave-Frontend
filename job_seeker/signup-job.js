document.getElementById('signup-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const csrfToken = getCookie('csrftoken');

    const formData = {
        first_name: document.getElementById('first_name').value,
        last_name: document.getElementById('last_name').value,
        username: document.getElementById('username').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        confirm_password: document.getElementById('confirm_password').value
    };

    fetch('https://workwave-api-wyrf.onrender.com/job_seekers/auth/registration/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken
        },
        body: JSON.stringify(formData)
    })
        .then(response => response.json().then(data => ({ status: response.status, body: data })))
        .then(responseData => {
            if (responseData.status === 201) {
                // Successful registration
                console.log('Success:', responseData.body);

                // Display success message
                const successMessage = document.createElement('p');
                successMessage.textContent = responseData.body.message || 'Registration successful!';
                successMessage.className = 'text-green-600 text-center mt-4';
                document.getElementById('signup-form').appendChild(successMessage);

                // Optionally clear the form
                document.getElementById('signup-form').reset();

                // Redirect to login page after 2 seconds
                setTimeout(() => {
                    window.location.href = './signin-job.html';
                }, 2000);

            } else {
                // Handle errors
                console.error('Error:', responseData.body);
                displayErrorMessages(responseData.body);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function displayErrorMessages(errors) {
    const existingErrors = document.querySelectorAll('.error-message');
    existingErrors.forEach(error => error.remove());

    for (const [field, messages] of Object.entries(errors)) {
        const fieldElement = document.getElementById(field);
        if (fieldElement) {
            messages.forEach(message => {
                const errorMessage = document.createElement('p');
                errorMessage.textContent = message;
                errorMessage.className = 'text-red-600 text-sm mt-1 error-message';
                fieldElement.insertAdjacentElement('afterend', errorMessage);
            });
        }
    }
}