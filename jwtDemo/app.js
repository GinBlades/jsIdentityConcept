const fs = require("fs");
const jwt = require("jsonwebtoken");
const {promisify} = require("util");

// fs is not promise compatible by default
const readFile = promisify(fs.readFile);

async function main() {
    const privateKey = await readFile("C:/Apps/certs/jwt-private.pem");

    const token = jwt.sign({foo: "bar"}, { key: privateKey, passphrase: "password" }, { algorithm: "RS256"});
    console.log(token);

    const publicKey = await readFile("C:/Apps/certs/jwt-public.pem");
    const payload = jwt.verify(token, publicKey, (err, decoded) => {
        console.log("Decoded", decoded);
    })
}

main();
