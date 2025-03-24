document.getElementById('careerForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const interest = document.getElementById('interest').value;

    fetch(`/api/careers?interest=${interest}`, {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    })
        .then(response => response.json())
        .then(data => {
            const careerResults = document.getElementById('careerResults');
            careerResults.innerHTML = '';

            data.careers.forEach(career => {
                const careerElement = document.createElement('div');
                careerElement.className = 'career';
                careerElement.innerHTML = `
                    <h2>${career.title}</h2>
                    <p>${career.description}</p>
                    <p><strong>Average Salary:</strong> $${career.averageSalary}</p>
                    <p><strong>Required Skills:</strong> ${career.requiredSkills.join(', ')}</p>
                    <p><strong>Education Level:</strong> ${career.educationLevel}</p>
                `;
                careerResults.appendChild(careerElement);
            });
        });
});

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
        .then(response => response.json())
        .then(data => {
            if (data.token) {
                localStorage.setItem('token', `Bearer ${data.token}`);
                document.getElementById('loginMessage').textContent = 'Logged in successfully!';
            } else {
                document.getElementById('loginMessage').textContent = 'Login failed';
            }
        });
});

document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById('registerMessage').textContent = data.message;
        });
});
