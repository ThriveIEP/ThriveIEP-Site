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
</style>

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
          <strong>1. Gathers family information.</strong>
        </li>
        <li>
          <strong>2. Review legal documents.</strong>
        </li>
        <li>
          <strong>3. Review document handling policies.</strong>
        </li>
        <li>
          <strong>4. Setup IEP packagep.</strong>
        </li>
      </ul>
    </p>
  </div>
  <div class="col-5">
    <form id="signupForm" action="your-server-endpoint" method="POST" class="form-group">
      <div class="mb-3">
        <label for="email">Email</label>
        <input type="email" name="email" id="email" class="form-control" placeholder="Enter your email" required />
      </div>
      <div class="mb-3">
        <label for="firstname">First Name</label>
        <input type="text" name="firstname" id="firstname" class="form-control" placeholder="Enter your first name" required />
      </div>
      <div class="mb-3">
        <label for="lastname">Last Name</label>
        <input type="text" name="lastname" id="lastname" class="form-control" placeholder="Enter your last name" required />
      </div>
      <button type="submit" class="btn btn-primary">Sign Up</button>
      <div id="result"></div>
    </form>

    <script>
      document.getElementById('signupForm').addEventListener('submit', async function (e) {
        e.preventDefault();

        const url = 'https://us-central1-thriveiep-25701.cloudfunctions.net/register';
        const email = this.email.value;
        const firstname = this.firstname.value;
        const lastname = this.lastname.value;
        const emailError = document.createElement("span");
        emailError.classList.add('error');
        
        await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, firstname, lastname })
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
