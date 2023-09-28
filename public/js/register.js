// Function to show SweetAlert success message
function showSuccessMessage(message) {
  Swal.fire({
    icon: 'success',
    title: 'Success',
    text: message,
  });
}

// Function to show SweetAlert error message
function showErrorMessage(message) {
  Swal.fire({
    icon: 'error',
    title: 'Error',
    text: message,
  });
}

document.querySelector('#submit').addEventListener('click', async (e) => {
  e.preventDefault();
  const firstname = document.querySelector('#firstname').value.trim();
  const lastname = document.querySelector('#lastname').value.trim();
  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password').value.trim();

  // Check if email contains "@" symbol
  if (!email.includes('@')) {
    showErrorMessage('Invalid email format. Please enter a valid email address.');
    return;
  }

  if (firstname && lastname && email && password) {
    if (password.length < 6) {
      // Password is too short, show an error message
      showErrorMessage('Password must be at least 6 characters long');
      return;
    }

    try {
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({
          firstname,
          lastname,
          email,
          password,
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        // Signup was successful, show SweetAlert success message
        const data = await response.json();
        showSuccessMessage(data.message || 'Signup successful');

        // Redirect to /dashboard (optional)
        setTimeout(() => {
          window.location.replace('/dashboard');
        }, 1500); // Redirect after 1.5 seconds (adjust as needed)
      } else {
        // Handle signup error using SweetAlert
        const data = await response.json();
        showErrorMessage(data.error || 'Signup failed');
      }
    } catch (error) {
      console.error(error);
      // Handle network or other errors using SweetAlert
      showErrorMessage('An error occurred during signup');
    }
  }
});
