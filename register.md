---
title: Signup
layout: empty
subtitle: Would you like to join the ThriveIEP program.
order: 0
sitemap: true
---

<style>


  .success {
    color: green;
    font-weight: bold;
  }

  .error {
    color: red;
    font-weight: bold;
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  .form-control {
    width: 100%;
    padding: 0.75rem;
    margin-bottom: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    box-sizing: border-box;
  }

  .btn-primary {
    background-color: #007bff;
    border: none;
    padding: 0.75rem;
    font-size: 1rem;
    border-radius: 0.25rem;
    transition: background-color 0.3s ease;
  }

  .btn-primary:hover {
    background-color: #0056b3;
  }

  .form-label {
    font-weight: bold;
    margin-bottom: 0.5rem;
    display: block;
  }

  #result {
    margin-top: 1rem;
  }
</style>

<br>
<br>

<div class="row">

  <div class="col-12">

    <h3>
      Welcome to the ThriveIEP program. To get started, please fill out the form below.
      You will receive a welcome email, and custom link to our IEP onboarding process.
    </h3>

    <small>
      FYI, our onboarding will walk you through the legal consent process, pricing 
      and family set up process. Please use the form below to provide the primary
      or initial contact for your family. Do not use a minors email address.
    </small>

    <br>
    <br>

    <form id="signupForm" action="your-server-endpoint" method="POST" class="form-group">
      <div class="mb-3">
        <label for="email" class="form-label">Enter your Email:</label>
        <input type="email" name="email" id="email" class="form-control" placeholder="Enter your email" required />
      </div>
      <div class="mb-3">
        <label for="firstname" class="form-label">First Name</label>
        <input type="text" name="firstname" id="firstname" class="form-control" placeholder="Enter your first name" required />
      </div>
      <div class="mb-3">
        <label for="lastname" class="form-label">Last Name</label>
        <input type="text" name="lastname" id="lastname" class="form-control" placeholder="Enter your last name" required />
      </div>
      <div class="mb-3">
        <label for="package" class="form-label">Desired Package:</label>
        <select name="package" id="package" class="form-control" required>
          <option value="free">I want the Free Package.</option>
          <option value="basic">I want the Basic Package</option>
          <option value="emergency">I want the Emergency Package</option>
        </select>
      </div>

      <br>

      <button type="submit" class="btn btn-block w-100 btn-primary">Sign Up</button>
      <div id="result"></div>
    </form>

    <script>
      document.addEventListener('DOMContentLoaded', function() {
        // Set the package field to 'free' when the DOM is fully loaded
        document.getElementById('package').value = 'free';

        // Select buttons by their text content
        const buttons = document.querySelectorAll('.actions');
        buttons.forEach(button => {
          if (button.textContent.includes("Sign up for free")) {
            button.addEventListener('click', function() {
              document.getElementById('package').value = 'free';
            });
          } else if (button.textContent.includes("Basic Package")) {
            button.addEventListener('click', function() {
              document.getElementById('package').value = 'basic';
            });
          } else if (button.textContent.includes("Emergency Package")) {
            button.addEventListener('click', function() {
              document.getElementById('package').value = 'emergency';
            });
          }
        });

        const form = document.getElementById('signupForm');
        const submitButton = form.querySelector('button[type="submit"]');

        // Function to check if all required fields are filled
        function checkFormCompletion() {
          const email = form.email.value.trim();
          const firstname = form.firstname.value.trim();
          const lastname = form.lastname.value.trim();
          const package = form.package.value.trim();

          // Enable the submit button only if all fields are filled
          if (email && firstname && lastname && package) {
            submitButton.disabled = false;
          } else {
            submitButton.disabled = true;
          }
        }

        // Add event listeners to form inputs to check completion on input
        form.email.addEventListener('input', checkFormCompletion);
        form.firstname.addEventListener('input', checkFormCompletion);
        form.lastname.addEventListener('input', checkFormCompletion);
        form.package.addEventListener('change', checkFormCompletion);

        // Initial check to set the button state on page load
        checkFormCompletion();
      });

      document.getElementById('signupForm').addEventListener('submit', async function (e) {
        e.preventDefault();

        const url = 'https://us-central1-thriveiep-25701.cloudfunctions.net/register';
        const email = this.email.value;
        const firstname = this.firstname.value;
        const lastname = this.lastname.value;
        const package = this.package.value;
        const emailError = document.createElement("span");
        emailError.classList.add('error');
        
        await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, firstname, lastname, package })
        })
          .then(response => response.json())
          .then(data => {
            // Clear previous messages
            const resultDiv = document.getElementById('result');
            resultDiv.innerHTML = ''; // Clear any existing messages

            // Check the status of the response
            if (data.status === 'success') {
              // Clear input fields only on success
              this.email.value = '';
              this.firstname.value = '';
              this.lastname.value = '';
              this.package.value = 'free';
              
              // Create and show success message
              resultDiv.className = 'success'; // Set class to success
              resultDiv.innerText = 'Success! Your account is set up. You will receive an email with a link to start the onboarding process.';
            } else {
              // Handle error case
              resultDiv.className = 'error'; // Set class to error
              resultDiv.innerText = 'Error! Please try again.';
            }
            console.log('Got here', data);
          });
      });
    </script>
  </div>
</div>
