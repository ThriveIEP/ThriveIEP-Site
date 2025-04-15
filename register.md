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
      Welcome to ThriveIEP!
    </h3>

    <small>
      We’re glad you’re here. Let’s get you set up.
      <br>
      <br>
      <b>Step 1:</b> Share your contact info so we know who to reach out to.
      <br>
      <b>Step 2:</b> Confirm the plan that fits your needs.
      <br>
      <br>
      <b>Quick Note:</b> Please use your own contact info, not your child’s.
      <br>
    </small>

    <br>

    <form id="signupForm" action="your-server-endpoint" method="POST" class="form-group">
      <div class="mb-3">
        <label for="email" class="form-label">Email:</label>
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
        <label for="package" class="form-label">Choose your Plan:</label>
        <select name="package" id="package" class="form-control" required>
          <option value="free">I'm Just Learning</option>
          <option value="basic">Help Me Navigate</option>
          <option value="emergency">Emergency Plan</option>
        </select>
      </div>

      <br>

      <button type="submit" class="btn btn-block w-100 btn-primary">Sign Up</button>
      <div id="result"></div>

      <br>
      <center>
      <small>
        <a href="https://app.termly.io/policy-viewer/policy.html?policyUUID=85b66a4f-a7cc-4d07-87ac-b3a2110c84e4">Privacy Policy</a> | 
        <a href="https://app.termly.io/policy-viewer/policy.html?policyUUID=50e7bb89-8a3f-4be8-9565-58be1ef50262">Terms of Use</a> | <a href="https://app.termly.io/policy-viewer/policy.html?policyUUID=c908869e-2f34-44d2-9dc3-063457a4d225">Cookie Policy</a> 
      </small>
      </center>
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

        <!-- const url = 'https://us-central1-thriveiep-25701.cloudfunctions.net/register'; -->
        const url = 'https://us-central1-thrieveiep.cloudfunctions.net/register';

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
              
              // Redirect to the success page
              window.location.href = 'https://thriveIEP.com/success';
            } else {
              // Handle error case
              resultDiv.className = 'error'; // Set class to error
              resultDiv.innerText = 'Error! Please try again.';
            }
          });
      });
    </script>
  </div>
</div>
