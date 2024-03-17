const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const xlsx = require('xlsx');
const fs = require('fs');
const mailTemplate = require("./utils/registrationConfirmation");

require("dotenv").config();

// Email configuration
const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 587,
    secure: false,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    }
});

// Path to the Excel file
const filePath = './TroubleShoot.xlsx';

// Route to process the Excel file and send emails
// Route to process the Excel file and send emails
app.get('/send-emails', async (req, res) => {
    try {
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const emailList = xlsx.utils.sheet_to_json(sheet, { header: 'mail id' });

        console.log('Email list:', emailList);
        // Process emailList and send emails
        for (const emailObj of emailList) {
                const email = emailObj['mail id'];
                const fullName = emailObj['Full Name']; // Assuming 'Full Name' is the column name
                let confirmed = emailObj['confirmed']; // Assuming 'confirmed' is the column name
                if (confirmed === "F") {
                console.log("email :", email);
                await transporter.sendMail({
                from: '"TROUBLESHOOT 2024 JNTUH-UCESTH" <process.env.MAIL_USER>',
                to: email,
                subject: "TROUBLESHOOT REGISTRATION",
                html: mailTemplate.courseEnrollmentEmail(fullName)
                });
                // Update the confirmed field in the Excel file
                confirmed = "T";
                const cellAddress = `C${emailObj._row}`;
                xlsx.utils.sheet_add_aoa(sheet, [[confirmed]], {origin: cellAddress});
            }
        }


        res.send('Emails sent successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to send emails');
    }
});



// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
