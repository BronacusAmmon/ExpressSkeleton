"use strict";

//express includes
const app = require("express")(),
  bodyParser = require("body-parser");

const PORT = process.env.PORT || 1500;

//middleware includes
const { dataTrim, authentication } = require("./middleware/organization");

//util includes
const { fileList } = require("./utils/helperFunctions");

//path includes
const pathInsecure = "./routes";
const pathSecure = "./routes/auth";

//path organization
const insecure = fileList(pathInsecure);
const secure = fileList(pathSecure);

//middleware

app.use(bodyParser.urlencoded({ extended: true }));
app.use(dataTrim);

//insecure routes applied to application
for (let i = 0; i < insecure.length; i++) {
  let fileName = insecure[i].split(".")[0];
  app.use(`/${fileName}`, require(`${pathInsecure}/${fileName}`));
}

//auth middleware
app.use(authentication);

//secure routes applied to app
for (let i = 0; i < secure.length; i++) {
  let fileName = secure[i].split(".")[0];
  app.use(`/${fileName}`, require(`${pathSecure}/${fileName}`));
}

//app startup proceedures
if (!parseInt(process.env.TLS)) {
  const server = app.listen(PORT, () =>
    console.log(`listening on port ${PORT} `)
  );
  process.on("SIGINT", () => {
    console.log("SIGTERM signal received: closing server");
    server.close((err) => {
      if (err) {
        console.log(error);
      }
      process.exit((code) => {
        console.log(code);
      });
    });
  });
} else {
  //tls certs needed, this will not work without them
  const server = https.createServer(options, app);
  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT} SSL`);
  });
  if (process.env.NODE_ENV === "PRODUCTION") {
    process.on("SIGINT", () => {
      console.log("graceful shutdown initiated");
      server.close((err) => {
        if (err) {
          console.log(error);
        }
        process.exit((code) => {
          console.log(code);
        });
      });
    });
  }
}
