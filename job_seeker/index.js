const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const loadingSpinner = document.getElementById('loading-spinner');
const noResults = document.getElementById('no-results');
const jobContainer = document.getElementById("job-container");

// menuBtn.addEventListener('click', () => {
//     mobileMenu.classList.toggle('hidden');
// });

const searchJobs = () => {
    const query = document.querySelector('input[type="text"]').value.trim();
    if (query) {
        loadingSpinner.classList.remove('hidden');
        loadingSpinner.classList.add('flex');
        jobContainer.innerHTML = '';
        noResults.classList.add('hidden');

        fetch(`https://workwave-api-wyrf.onrender.com/jobs/search/?q=${encodeURIComponent(query)}`)
            .then(res => res.json())
            .then((data) => {
                loadingSpinner.classList.add('hidden');
                loadingSpinner.classList.remove('flex');

                displayJobs(data);
            })
            .catch((err) => {
                loadingSpinner.classList.add('hidden');
                loadingSpinner.classList.remove('flex');
                console.log(err);
            });
    }
};

const displayJobs = (jobs) => {
    jobContainer.innerHTML = '';
    if (jobs.length > 0) {
        jobs.forEach(job => {
            const div = document.createElement("div");
            div.className = "p-1 bg-white rounded-lg mb-4";
            div.innerHTML = `
                <div class="max-w-lg lg:max-w-4xl mx-auto p-4 space-y-4">
                    <div class="bg-white p-4 rounded-lg shadow-md border-2 border-transparent hover:border-purple-500 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                        <div class="flex justify-between items-start">
                            <div>
                                <h2 class="text-lg font-semibold text-gray-800">${job.title}</h2>
                                <div class="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 8.25h-7.5m7.5 3h-7.5m7.5 3h-7.5M12 7.5h0m0 4.5h0m0 4.5h0m5.25-4.5A4.5 4.5 0 1 1 12 7.5a4.5 4.5 0 0 1 4.5 4.5zm0 0v9.75m-9-4.5A4.5 4.5 0 1 1 12 7.5a4.5 4.5 0 0 1 4.5 4.5z" />
                                    </svg>
                                    <span>${job.location}</span>
                                    <span class="text-gray-400">•</span>
                                    <span>${job.date_posted}</span>
                                </div>
                            </div>
                            <div class="flex space-x-2">
                                <span class="text-xs bg-green-100 text-green-700 py-1 px-2 rounded">${job.employee_type}</span>
                            </div>
                        </div>
                        <div class="flex justify-between items-center mt-2">
                            <p class="text-sm text-gray-600"><span class="font-semibold">Experience:</span> <span class="font-medium text-gray-800">${job.experience}</span></p>
                            <a href="job-details.html?id=${job.id}" target="_blank" class="text-indigo-500 text-sm font-medium hover:underline">Details</a>
                        </div>
                        <p class="text-sm text-gray-600"><span class="font-semibold">Description:</span> ${job.description.split(' ').slice(0, 30).join(' ')}...</p>
                    </div>
                </div>
            `;
            jobContainer.appendChild(div);
        });
    } else {
        console.log("No results found, displaying the image.");   //test
        noResults.classList.remove('hidden');
        noResults.classList.add('flex');
    }
};



// Fetch jobs from your API or data source
fetch('https://workwave-api-wyrf.onrender.com/jobs/jobs/')
    .then(response => response.json())
    .then(data => {
        // Limit to 5 jobs
        const limitedJobs = data.slice(0, 5);

        // Render jobs
        const jobsContainer = document.getElementById('jobs-container');
        jobsContainer.innerHTML = limitedJobs.map(job => `
      <div class="max-w-lg lg:max-w-4xl mx-auto p-4 space-y-4">
                    <div class="bg-white p-4 rounded-lg shadow-md border-2 border-transparent hover:border-purple-500 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                        <div class="flex justify-between items-start">
                            <div>
                                <h2 class="text-lg font-semibold text-gray-800">${job.title}</h2>
                                <div class="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 8.25h-7.5m7.5 3h-7.5m7.5 3h-7.5M12 7.5h0m0 4.5h0m0 4.5h0m5.25-4.5A4.5 4.5 0 1 1 12 7.5a4.5 4.5 0 0 1 4.5 4.5zm0 0v9.75m-9-4.5A4.5 4.5 0 1 1 12 7.5a4.5 4.5 0 0 1 4.5 4.5z" />
                                    </svg>
                                    <span>${job.location}</span>
                                    <span class="text-gray-400">•</span>
                                    <span>${job.date_posted}</span>
                                </div>
                            </div>
                            <div class="flex space-x-2">
                                <span class="text-xs bg-green-100 text-green-700 py-1 px-2 rounded">${job.employee_type}</span>
                            </div>
                        </div>
                        <div class="flex justify-between items-center mt-2">
                            <p class="text-sm text-gray-600"><span class="font-semibold">Experience:</span> <span class="font-medium text-gray-800">${job.experience}</span></p>
                            <a href="job-details.html?id=${job.id}" target="_blank" class="text-indigo-500 text-sm font-medium hover:underline">Details</a>
                        </div>
                        <p class="text-sm text-gray-600"><span class="font-semibold">Description:</span> ${job.description.split(' ').slice(0, 30).join(' ')}...</p>
                    </div>
                </div>
    `).join('');
    })
    .catch(error => console.error('Error fetching jobs:', error));



let currentSlide = 0;

function setSlide(index) {
    const slides = document.querySelectorAll('.carousel-item');
    slides[currentSlide].classList.add('hidden');
    slides[currentSlide].classList.remove('opacity-100');

    slides[index].classList.remove('hidden');
    slides[index].classList.add('opacity-100');

    currentSlide = index;

    const dots = document.querySelectorAll('#carousel button');
    dots.forEach(dot => dot.classList.remove('bg-indigo-500', 'scale-110'));
    dots[currentSlide].classList.add('bg-indigo-500', 'scale-110');
}

setInterval(() => {
    const nextSlide = (currentSlide + 1) % 3;
    setSlide(nextSlide);
}, 3000);
