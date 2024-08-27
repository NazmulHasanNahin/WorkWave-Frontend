const loadJobCategories = () => {
    fetch('https://workwave-api-wyrf.onrender.com/jobs/categories/')
      .then(res => res.json())
      .then((data) => displayJobCategories(data))
      .catch((err) => console.log(err));
  };

  // Function to display job categories
  const displayJobCategories = (categories) => {
    const parent = document.getElementById("job-category-container");
    parent.innerHTML = '';

    let boxContainer;
    categories.forEach((category, index) => {
      if (index % 8 === 0) {
        boxContainer = document.createElement('div');
        boxContainer.className = "bg-[#F8F9FC] shadow-md p-6 rounded-lg ";
        parent.appendChild(boxContainer);
      }

      const categoryElement = document.createElement('div');
      categoryElement.className = "bg-white p-2 text-gray hover:text-indigo-600 mb-2";

      const randomNumber = Math.floor(Math.random() * 100) + 1;
      categoryElement.textContent = `${category.name}   (${randomNumber})`;

      boxContainer.appendChild(categoryElement);
    });
  };

document.addEventListener('DOMContentLoaded', loadJobCategories);