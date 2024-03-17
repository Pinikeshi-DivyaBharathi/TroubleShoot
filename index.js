const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const mailTemplate = require("./utils/registrationConfirmation");

require("dotenv").config();

// Google OAuth credentials
const credentials = require('./CredentialsTrial.json');
const { client_secret, client_id, redirect_uris } = credentials.web;
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

// Set the credentials to authorize the client
oAuth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN, // Replace with your refresh token
});

// Email configuration
let transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

// Google Sheets API configuration
const sheets = google.sheets({ version: 'v4', auth: oAuth2Client });

// ID of the Google Form responses sheet
const sheetId = process.env.SHEET_ID; // Replace with your Google Form responses sheet ID

async function checkFileId(fileId) {
    try {
      const response = await sheets.spreadsheets.get({
        spreadsheetId: fileId,
      });
  
      // If the request is successful, the file ID is valid
      console.log('File ID is valid');
    } catch (error) {
      // If the request fails, the file ID is not valid
      console.error('File ID is not valid:', error.message);
    }
  }
  
  checkFileId(sheetId);

// Route to process the Google Form responses and send emails
app.get('/send-emails', async (req, res) => {
    try {
      // Get the responses from the Google Form
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: sheetId,
        range: 'B2:D', // Assuming 'contact' is the sheet name
      });
  
      console.log('Google Sheet fetched successfully');
      const rows = response.data.values;
      if (rows.length) {
        console.log('Rows found in the Google Sheet:', rows.length);
        // Process each row and send emails
          for (let i = 0; i < rows.length; i++) {
              const [fullName, email, confirmed] = rows[i]; // Adjust the order of fields based on your Google Sheets column order
              console.log(fullName," ",email," codfirm :",confirmed);
              if (confirmed === undefined) {
                  await transporter.sendMail({
                      from: `TROUBLESHOOT 2024 JNTUH-UCESTH <${process.env.MAIL_USER}>`,
                      to: email,
                      subject: "TROUBLESHOOT REGISTRATION",
                      html: mailTemplate.courseEnrollmentEmail(fullName)
                  });
                  // Update the 'confirmed' column in the Google Sheets
                  await sheets.spreadsheets.values.update({
                      spreadsheetId: sheetId,
                      range: `D${i + 2}`,
                      valueInputOption: 'USER_ENTERED',
                      requestBody: {
                          values: [['T']],
                      },
                  });
              }
          }

      }
  
      res.send('Emails sent successfully');
    } catch (error) {
      console.error('Failed to process Google Sheet:', error);
      res.status(500).send('Failed to send emails');
    }
  });
  

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
