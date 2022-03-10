/*
Use the following code to retrieve configured secrets from SSM:

const aws = require('aws-sdk');

const { Parameters } = await (new aws.SSM())
  .getParameters({
    Names: ["API_KEY"].map(secretName => process.env[secretName]),
    WithDecryption: true,
  })
  .promise();

Parameters will be of the form { Name: 'secretName', Value: 'secretValue', ... }[]
*/
/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

const express = require("express");
const bodyParser = require("body-parser");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");

// declare a new express app
const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

/**********************
 * Example get method *
 **********************/

app.get("/api/:ri/:obj/:year/:users", async function (req, res) {
  const aws = require("aws-sdk");
  const request = require("request");

  // Get the parameters from the request
  const { ri, obj, year, users } = req.params;

  // #######################################################################
  const { Parameters } = await new aws.SSM()
    .getParameters({
      Names: ["API_KEY"].map((secretName) => process.env[secretName]),
      WithDecryption: true,
    })
    .promise();

  const token = Parameters;
  // ######################################################################

  if (token[0].Value.length === 0) {
    res.status(500).send("No API key found");
  } else {
    //#####################################################################

    const options = {
      method: "GET",

      url: `https://beckett.palantirfoundry.com/objects-gateway/api/v1/ontologies/${ri}/objects/${obj}?p.dates.eq=${year}&orderBy=${users}:desc`,
      headers: {
        Authorization: "Bearer " + token[0].Value,
        "Content-Type": "application/json",
      },
    };

    //#####################################################################

    request(options, async function (error, response, body) {
      if (error) throw new Error(error.message);
      res.send(JSON.parse(body));
    });

    //######################################################################
  }
});

app.get("/socialmedia", async function (req, res) {
  const axios = require("axios");

  if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
  }
  

  const data = [];

  const getTokenAndData = async () => {
    axios.get(`https://jsonplaceholder.typicode.com/todos`).then((response) => {
      data.push(data);
    });
  };

  await getTokenAndData();

  res.send(JSON.stringify(data));
});

app.listen(3000, function () {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
