/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const cors = require('cors');
const functions = require("firebase-functions");
const axios = require("axios");

const hubspotApiKey = functions.config().hubspot.api_key;
const Hubspot = require('@hubspot/api-client');
const hubspot = new Hubspot.Client({ accessToken: hubspotApiKey });

// Define the base URL for the HubSpot API
const HUBSPOT_API_BASE_URL = "https://api.hubapi.com/crm/v3/objects/contacts";

// Create a CORS-enabled function
const corsOptions = {
  origin: ['http://localhost:4000', 'http://127.0.0.1:4000', 'https://app.thriveiep.com'], // Allow both localhost and app.thriveIEP.com
};

exports.register = functions.https.onRequest(async (req, res) => {
  cors(corsOptions)(req, res, async () => {
    if (req.method === 'OPTIONS') {
      // Handle pre-flight request
      return res.status(204).end();
    }
    try {
      // Validate the request method
      if (req.method !== "POST") {
        return res.status(405).json({ status: 'failed', message: "Only POST requests are allowed" });
      }

      // Extract email from the request body
      const { email, firstname, lastname } = req.body;
      if (!email) {
        return res.status(400).json({ status: 'failed', message: "Email is required" });
      }

      // Call to see if we have a contact with this email.
      const contactExists = await doesContactExist(email);

      if (contactExists) {
        return res.status(200).json({ status: 'failed', message: "Email already exists" });
      }

      const contact = await createContact(email, firstname, lastname);
 
      // Trigger HubSpot Workflow 
      // Preivous: 47888404 - this was the portal Id not the workflow.
      await enrollContactInWorkflow(contact.id, '1621623448');

      return res.status(200).json({ status: 'success', message: "Contact created", contactId: contact.id });
    } catch (error) {
      console.error("Error validating email in HubSpot:", error.message);
      if (error.response) {
        // HubSpot API error
        res.status(error.response.status).json({
          error: error.response.data.message || "Error from HubSpot API",
        });
      } else {
        // Other errors
        res.status(500).json({ error: "Internal server error" });
      }
    }
  });
});

async function doesContactExist(email) {
  try {
    const contactId = email;
    const idProperty = 'email';
    const response = await hubspot.crm.contacts.basicApi.getById(contactId, undefined, undefined, undefined, false, idProperty);

    return response ? true : false;
  } catch (error) {
    if (error.statusCode === 404) {
      return false;
    }

    return false;
  }
}


const createContact = async (email, firstname, lastname) => {
  try {
    const contactObj = {
      properties: {
        email,
        firstname,
        lastname,
        start_workflow: 'Start'
      },
    };
    
    const contact = await hubspot.crm.contacts.basicApi.create(contactObj)
    return contact; 

  } catch(error) {
    console.error('Error creating contact:', error);
    throw error;
  }
}

async function enrollContactInWorkflow(contactId, workflowId) {
  try {
    await hubspot.automation.workflowsApi.enrollContact(workflowId, contactId);
    return { success: true };
  } catch (error) {
    console.error('Failed to enroll contact:', error);
  }
}