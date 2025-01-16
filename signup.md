---
title: Signup
layout: default
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


<div class="row row-cols-1 row-cols-md-3 mb-3 text-center">
      <div class="col">
        <div class="card mb-4 rounded-3 shadow-sm">
          <div class="card-header py-3">
            <h4 class="my-0 fw-normal">Just Learning</h4>
          </div>
          <div class="card-body">
            <h1 class="card-title pricing-card-title">$0<small class="text-muted fw-light">/mo</small></h1>
            <ul class="list-unstyled mt-3 mb-4" style="min-height: 250px !important;">
              <li>You have time to learn.</li>
              <li>You are not sure if you need an IEP expert yet.</li>
              <li>You and your child value resources for education.</li>
              <li>YOu have time to learn.</li>
            </ul>
            <button type="button" class="w-100 btn btn-lg btn-outline-primary actions">Sign up for free</button>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card mb-4 rounded-3 shadow-sm">
          <div class="card-header py-3">
            <h4 class="my-0 fw-normal">Engaged Parent</h4>
          </div>
          <div class="card-body">
            <h1 class="card-title pricing-card-title">$1,500<small class="text-muted fw-light">/mo</small></h1>
            <ul class="list-unstyled mt-3 mb-4" style="min-height: 250px !important;">
              <li>You have an on going need for IEP support.</li>
              <li>You need active context for your child's education.</li>
              <li>You have multiple stakeholders in your child's education.</li>
              <li>You believe in your school's ability to support your child.</li>
            </ul>
            <button type="button" class="w-100 btn btn-lg btn-outline-primary actions">Basic Package</button>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card mb-4 rounded-3 shadow-sm border-danger">
          <div class="card-header py-3 text-white bg-danger border-danger">
            <h4 class="my-0 fw-normal">Emergency</h4>
          </div>
          <div class="card-body">
            <h1 class="card-title pricing-card-title">$1,200<small class="text-muted fw-light"></small></h1>
            <ul class="list-unstyled mt-3 mb-4" style="min-height: 250px !important;">
              <li>Your have an immediate need for IEP.</li>
              <li>You need a quick turnaround.</li>
              <li>You have a child in distress.</li>
              <li>You have a pending meeting with the school.</li>
            </ul>
            <button type="button" class="w-100 btn btn-lg btn-outline-danger actions">Emergency Package</button>
          </div>
        </div>
      </div>
    </div>

<div class="row">
  <div class="col-7">
    <h3>
      Join the ThriveIEP program
    </h3>
    <p>
      We're looking for early-stage startups to join our program.
    </p>
    <p>
      You will receive a welcome eamil with a link to start
      the onboarding process. This is a multiple step process
      that does the following:
      <ul>
        <li>
          <strong>Gathers family information.</strong>
        </li>
        <li>
          <strong>Review legal documents.</strong>
        </li>
        <li>
          <strong>Review document handling policies.</strong>
        </li>
        <li>
          <strong>Setup IEP package.</strong>
        </li>
      </ul>
    </p>
  </div>
  <div class="col-5">
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
