const getJobIdFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
  };
  
  const loadJobDetails = (jobId) => {
    fetch(`https://workwave-api-wyrf.onrender.com/jobs/jobs/${jobId}/`)
      .then(res => res.json())
      .then((data) => displayJobDetails(data))
      .catch((err) => console.log(err));
  };
  
  const displayJobDetails = (job) => {
    const parent = document.getElementById("job-details-container");
    parent.innerHTML = `
              <div class="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg">
                  <div class="md:flex">
                    <div class="md:w-2/3">
                      <img src="./employer/image/job-img.jpg" alt="Job Image" class="w-full h-auto rounded-md">
                    </div>
                    
                    <div class="md:w-1/3 md:ml-4">
                      <h2 class="text-2xl font-semibold text-gray-800 mt-4 md:mt-0">${job.title}</h2>
                      <p class="text-sm text-gray-500 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-1">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15a4.5 4.5 0 0 1 7.5 0" />
                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 12.75a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM12 12.75a3.75 3.75 0 0 0 7.5 0 3.75 3.75 0 0 0-7.5 0Z" />
                        </svg>
                        8 Vacancies
                        <span class="ml-2 flex items-center">
                          <span class="text-yellow-500">4.8</span>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 ml-1 text-yellow-500">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 17.25l-3.5 2.25 1-4.25-3-2.75 4.5-.5L12 8l1.5 4.75 4.5.5-3 2.75 1 4.25-3.5-2.25z" />
                          </svg>
                        </span>
                      </p>
                
                      <div class="grid grid-cols-2 gap-2 mt-4">
                        <div>
                          <p class="text-sm text-gray-600">Experience</p>
                          <p class="text-base font-medium text-gray-800">${job.experience}</p>
                        </div>
                        <div>
                          <p class="text-sm text-gray-600">Employee Type</p>
                          <p class="text-base font-medium text-gray-800">${job.employee_type}</p>
                        </div>
                        <div>
                          <p class="text-sm text-gray-600">Position</p>
                          <p class="text-base font-medium text-gray-800">${job.position}</p>
                        </div>
                        <div>
                          <p class="text-sm text-gray-600">Offer Salary</p>
                          <p class="text-base font-medium text-gray-800">${job.offer_salary}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="mt-6">
                    <h3 class="text-lg font-semibold text-gray-800">Company Name</h3>
                    <p class="text-gray-600 mt-2">${job.company_name}</p>
                  </div>
                  <div class="mt-6">
                    <h3 class="text-lg font-semibold text-gray-800">Job Description</h3>
                    <p class="text-gray-600 mt-2">${job.description}</p>
                  </div>
                  <div class="mt-6 flex justify-between">
                    <div class="w-full md:w-1/3">
                      <h3 class="text-lg font-semibold text-gray-800">Job Overview</h3>
                      <div class="mt-2 space-y-2">
                        <div class="flex items-center">
                          <span class="bg-purple-100 p-2 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6  text-purple-500">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>                          
                          </span>
                          <p class="ml-2 text-gray-700">${job.title}</p>
                        </div>
                        <div class="flex items-center">
                          <span class="bg-purple-100 p-2 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6  text-purple-500">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                            </svg>
                          </span>
                          <p class="ml-2 text-gray-700">${job.experience}</p>
                        </div>
                        <div class="flex items-center">
                          <span class="bg-purple-100 p-2 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6  text-purple-500">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                            </svg>                          
                          </span>
                          <p class="ml-2 text-gray-700">${job.location}</p>
                        </div>
                        <div class="flex items-center">
                          <span class="bg-purple-100 p-2 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6  text-purple-500">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>                          
                          </span>
                          <p class="ml-2 text-gray-700">${job.offer_salary}</p>
                        </div>
                        <div class="flex items-center">
                          <span class="bg-purple-100 p-2 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6  text-purple-500">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                            </svg>                          
                          </span>
                          <p class="ml-2 text-gray-700">${job.qualifications}</p>
                        </div>
                        <div class="flex items-center">
                          <span class="bg-purple-100 p-2 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6  text-purple-500">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                            </svg>                          
                          </span>
                          <p class="ml-2 text-gray-700">Private</p>
                        </div>
                        <div class="flex items-center">
                          <span class="bg-purple-100 p-2 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6  text-purple-500">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>                          
                          </span>
                          <p class="ml-2 text-gray-700">${job.date_posted}</p>
                        </div>
                      </div>
                    </div>
                    
                  </div>
                  </div>
                  <div class="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg mt-2">
                      <p class="text-lg font-semibold text-gray-800">Responsibilities</p>
                      <p class="text-base font-medium text-gray-800">${job.responsibilities}</p>
                  </div>
                  <div class="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg mt-2">
                      <p class="text-lg font-semibold text-gray-800">Skill Experience</p>
                      <p class="text-base font-medium text-gray-800">${job.skills_experience}</p>
                  </div>
              
      `;
  
  };
  
  const jobId = getJobIdFromUrl();
  if (jobId) {
    loadJobDetails(jobId);
  }