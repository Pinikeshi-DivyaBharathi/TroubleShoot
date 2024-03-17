const { OAuth2Client } = require('google-auth-library');
const { client_id, client_secret, redirect_uris } = require('../CredentialsTrial.json').web;
const oAuth2Client = new OAuth2Client(client_id, client_secret, redirect_uris[0]);
require("dotenv").config();

async function getRefreshToken() {
    try {
        // console.log(process.env); // Log all environment variables
        // const authorizedCode = process.env.AUTHORIZATION_CODE;
        // if (!authorizedCode) {
        //     throw new Error('Authorized code not found in environment variable');
        // }

        // const { tokens } = await oAuth2Client.getToken(authorizedCode);
        const {tokens} = await oAuth2Client.getToken('4/0AeaYSHDCTxK4GiDsg_SJ4tkcIFw0RTiI19h6KpBBMjRCvRuTtk1FrdXwHcViXp2E1uL1PQ');
        const refreshToken = tokens.refresh_token;
        console.log(`Refresh token: ${refreshToken}`);
    } catch (err) {
        console.error('Error getting refresh token:', err);
    }
}

getRefreshToken();
