const express = require('express');
const router = express.Router();
const User = require("../models/User");
const fs = require("fs");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const {promisify} = require("util");

const readFile = promisify(fs.readFile);
const mkdir = promisify(fs.mkdir);
const writeFile = promisify(fs.writeFile);

/* GET users listing. */
router.get('/', async (req, res) => {
  const bearer = "Bearer ";
  if (!(req.headers.authorization && req.headers.authorization.startsWith(bearer))) {
    return res.json({error: "Unauthorized"});
  }

  const token = req.headers.authorization.substr(bearer.length);

  const keyFile = "./keys/identity-server-public-key.pem";
  let publicKey = null;

  try {
    publicKey = await readFile(keyFile);
  } catch(error) {
    console.log("Public key not found", error);
    try {
      await mkdir("./keys", "0o775");
    } catch(error) {
      console.log("Key directory already exists", error);
      const identityResponse = await axios.get("http://localhost:3000/public-key");
      publicKey = identityResponse.data.publicKey;

      try {
        await writeFile(keyFile, identityResponse.data.publicKey, "utf8");
      } catch(error) {
        console.log('Error writing public key', error);
      }
    }
  }

  const payload = jwt.verify(token, publicKey, async (err, decoded) => {
    console.log(decoded);

    if (decoded && decoded.user) {
      const users = await User.find();
      res.json({users: users});
    } else {
      res.status(401).json({error: "Unauthorized"});
    }
  });
});

module.exports = router;
