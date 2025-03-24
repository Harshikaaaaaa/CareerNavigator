document.getElementById('careerForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission


    var selectedPage = document.getElementById('interest').value;

    // Fetch the selected page content
    fetch(selectedPage)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(html => {
        // Display the HTML content in the div
        var contentDiv = document.getElementById('careerResults');
        contentDiv.innerHTML = html;
      })
      .catch(error => {
        console.error('Error fetching page:', error);
        var contentDiv = document.getElementById('careerResults');
        contentDiv.innerHTML = '<p>Error loading page. Please try again later.</p>';
      });
    
  });