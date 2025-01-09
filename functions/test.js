
const Hubspot = require('@hubspot/api-client');
const hubspot = new Hubspot.Client({ accessToken: "pat-na1-3398662e-7113-4ba3-85cb-c8e02a21c335" });

const main = async () => {
  const email = "stephan.smith.kbc93@gmail.com";
  const firstname = "Stephan";
  const lastname = "Smith";

  const contactExists = await doesContactExist(email);
  console.log('contactExists', contactExists);

  if (!contactExists) {
    const contact = await createContact(email, firstname, lastname);
    console.log('contact', contact);
  }
}

main();

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
        lastname
      },
    };
    
    const contact = await hubspot.crm.contacts.basicApi.create(contactObj)
    return contact; 

  } catch(error) {
    console.error('Error creating contact:', error);
    throw error;
  }
}