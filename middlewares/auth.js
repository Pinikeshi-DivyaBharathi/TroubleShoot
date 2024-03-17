// auth.js

const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const { client_id, client_secret, redirect_uris } = require('../CredentialsTrial.json').web;

const oAuth2Client = new OAuth2Client(client_id, client_secret, redirect_uris[0]);
const app = express();

// Generate the URL for user consent and redirect
function generateAuthUrl() {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: ['https://www.googleapis.com/auth/drive.readonly', 'https://www.googleapis.com/auth/gmail.send', 'https://www.googleapis.com/auth/spreadsheets']
    });

    return authUrl;
}


// Handle the redirect from Google after user grants consent
app.get('/auth/google', (req, res) => {
    const authUrl = generateAuthUrl();
    res.redirect(authUrl);
});

module.exports = app;
