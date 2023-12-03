const ZoomTokenModel = require("../../../models/Integration/Zoom/TokenModel");
const axios = require("axios");
const cors = require("cors");

const ZoomAccessToken = async (req, res) => {
  console.log(req.query.code, "req.query");

  // Set headers for the POST request
  const client_id = "Rbdh6SHISOKLMsSt8pEvng";
  const client_secret = "QaMu6sGxrOo0RtFkN7PJujQzHVNmWvZj";
  const redirect_uri = "http://localhost:3000/Integration/Zoom/Login";

  if (req.query.code) {
    const apiUrl = `https://zoom.us/oauth/token?grant_type=authorization_code&code=${req.query.code}&redirect_uri=${redirect_uri}`;

    const base64Credentials = Buffer.from(
      `${client_id}:${client_secret}`
    ).toString("base64");

    const authorizationToken =
      "Basic UmJkaDZTSElTT0tMTXNTdDhwRXZuZzpRYU11NnNHeHJPbzBSdEZrTjdQSnVqUXpIVk5tV3Zaag==";

    // Make the POST request
    try {
      // Make the POST request
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
        mode: "cors",
      });

      const data = await response.json();

      const token = new ZoomTokenModel({
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        token_type: data.token_type,
        scope: data.scope,
        expires_in: data.expires_in,
      });
      await token.save();
      console.log("Response:", data);
      res.json({ success: true, msg: "Zoom Connected Successfully!" })
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  }
};

module.exports = {
  ZoomAccessToken,
};
