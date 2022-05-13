/*
Use the following code to retrieve configured secrets from SSM:

const aws = require('aws-sdk');

const { Parameters } = await (new aws.SSM())
  .getParameters({
    Names: ["API_KEY","PASS","USERNAME"].map(secretName => process.env[secretName]),
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

// #################### Website Analytics Query ####################
app.get("/api/:ri/:obj/:users", async function (req, res) {
  const aws = require("aws-sdk");
  const request = require("request");

  // Get the parameters from the request
  const { ri, obj, users } = req.params;

  // ########################GET SECRET KEY####################################
  const { Parameters } = await new aws.SSM()
    .getParameters({
      Names: ["API_KEY"].map((secretName) => process.env[secretName]),
      WithDecryption: true,
    })
    .promise();

  const token = Parameters;

  // #######################CHECK TOKEN##################################

  if (token[0].Value.length === 0) {
    res.status(500).send("No API key found");
  } else {
    const options = {
      method: "GET",

      url: `https://beckett.palantirfoundry.com/api/v1/ontologies/${ri}/objects/${obj}?&orderBy=${users}:desc`,
      headers: {
        Authorization: "Bearer " + token[0].Value,
        "Content-Type": "application/json",
      },
    };

    request(options, function (error, response, body) {
      if (error) throw new Error(error.message);
      res.send(JSON.parse(body));
    });
  }
});

// #################### Competitor Metric Query ####################
app.get("/competitormetric/:ri/:obj", async function (req, res) {
  const aws = require("aws-sdk");
  const request = require("request");

  // Get the parameters from the request
  const { ri, obj } = req.params;

  // ########################GET SECRET KEY####################################
  const { Parameters } = await new aws.SSM()
    .getParameters({
      Names: ["API_KEY"].map((secretName) => process.env[secretName]),
      WithDecryption: true,
    })
    .promise();

  const token = Parameters;
  // #######################CHECK TOKEN##################################

  if (token[0].Value.length === 0) {
    res.status(500).send("No API key found");
  } else {
    const options = {
      method: "GET",

      url: `https://beckett.palantirfoundry.com/api/v1/ontologies/${ri}/objects/${obj}?orderBy=p.date:desc`,
      headers: {
        Authorization: "Bearer " + token[0].Value,
        "Content-Type": "application/json",
      },
    };

    request(options, function (error, response, body) {
      if (error) throw new Error(error.message);
      res.send(JSON.parse(body));
    });
  }
});

// #################### Comics Metric Query ####################
app.get("/comics/:ri/:obj", async function (req, res) {
  const aws = require("aws-sdk");
  const request = require("request");

  // Get the parameters from the request
  const { ri, obj } = req.params;

  // ########################GET SECRET KEY####################################
  const { Parameters } = await new aws.SSM()
    .getParameters({
      Names: ["API_KEY"].map((secretName) => process.env[secretName]),
      WithDecryption: true,
    })
    .promise();

  const token = Parameters;
  // #######################CHECK TOKEN##################################

  if (token[0].Value.length === 0) {
    res.status(500).send("No API key found");
  } else {
    const options = {
      method: "GET",

      url: `https://beckett.palantirfoundry.com/api/v1/ontologies/${ri}/objects/${obj}`,
      headers: {
        Authorization: "Bearer " + token[0].Value,
        "Content-Type": "application/json",
      },
    };

    request(options, function (error, response, body) {
      if (error) throw new Error(error.message);
      res.send(JSON.parse(body));
    });
  }
});

//###################### Social Media Metrics #####################################

app.use("/socialmedia/:name", async function (req, res) {
  const axios = require("axios");
  const aws = require("aws-sdk");

  const { name } = req.params;

  const loginURL = "https://beckett-watchtower.herokuapp.com/api/token";
  const updatedURL =
    "https://plainspoken-watchtower-staging.herokuapp.com/api/";

  const { Parameters } = await new aws.SSM()
    .getParameters({
      Names: ["API_KEY", "PASS", "USERNAME"].map(
        (secretName) => process.env[secretName]
      ),
      WithDecryption: true,
    })
    .promise();

  const password = Parameters;
  const username = Parameters;

  // check type string
  if (password[1].Value.length === 0) {
    res.status(500).send("No a string");
  } else {
    axios
      .post(loginURL, {
        username: username[2].Value,
        password: password[1].Value,
      })
      .then((resp) => {
        axios
          .get(`https://beckett-watchtower.herokuapp.com/api/${name}/`, {
            headers: {
              Authorization: "Bearer " + `${resp.data.access}`,
              "Access-Control-Allow-Origin": "*",
            },
          })
          .then((resp) => {
            res.json({
              data: resp.data,
              status: resp.status,
            });
          });
      });
  }
});

// #################### GEt Form data ####################
app.get("/athenaform/:yesterday", async function (req, res) {
  const axios = require("axios");
  const aws = require("aws-sdk");

  const { yesterday } = req.params;

  const ri = "ri.ontology.main.ontology.b034a691-27e9-4959-9bcc-bc99b1552c97";
  const athena = "AthenaForm";
  const URL_API_Athena = `https://beckett.palantirfoundry.com/api/v1/ontologies/${ri}/objects/${athena}?p.date.eq=${yesterday}`;

  //############################### GET TOKEN ############################
  const { Parameters } = await new aws.SSM()
    .getParameters({
      Names: ["API_KEY"].map((secretName) => process.env[secretName]),
      WithDecryption: true,
    })
    .promise();

  const token = Parameters;

  //################################ GET DATA ############################

  const options = {
    method: "GET",
    url: URL_API_Athena,
    headers: {
      Authorization: "Bearer " + token[0].Value,
      "Content-Type": "application/json",
    },
  };
  if (token[0].Value.length === 0) {
    res.status(500).send("No API key found");
  } else {
    axios(options)
      .then((response) => {
        res.send({
          data: response.data,
          status: response.status,
        });
      })
      .catch((error) => {
        res.send({
          error: error.message,
          status_code: error.status,
        });
      });
  }
});

// #################### GEt Form data ####################
app.get("/timeserie", async function (req, res) {
  const axios = require("axios");
  const aws = require("aws-sdk");

  const ri = "ri.ontology.main.ontology.b034a691-27e9-4959-9bcc-bc99b1552c97";
  const athena = "AthenaForm";
  const URL_API_Athena = `https://beckett.palantirfoundry.com/api/v1/ontologies/${ri}/objects/${athena}?orderBy=p.date:asc`;

  //############################### GET TOKEN ############################
  const { Parameters } = await new aws.SSM()
    .getParameters({
      Names: ["API_KEY"].map((secretName) => process.env[secretName]),
      WithDecryption: true,
    })
    .promise();

  const token = Parameters;

  //################################ GET DATA ############################

  const options = {
    method: "GET",
    url: URL_API_Athena,
    headers: {
      Authorization: "Bearer " + token[0].Value,
      "Content-Type": "application/json",
    },
  };
  if (token[0].Value.length === 0) {
    res.status(500).send("No API key found");
  } else {
    axios(options)
      .then((response) => {
        res.send({
          data: response.data,
          status: response.status,
        });
      })
      .catch((error) => {
        res.send({
          error: error.message,
          status_code: error.status,
        });
      });
  }
});

// #################### POST Form input ####################
app.post("/athenaform", async function (req, res) {
  const axios = require("axios");
  const aws = require("aws-sdk");

  const riWrtAthena =
    "ri.ontology.main.ontology.b034a691-27e9-4959-9bcc-bc99b1552c97";
  const createAthenaRecord = "new-action-341541e4-574e-cf23-d4a5-908eb3797ded";
  const Athena_form_Action = `https://beckett.palantirfoundry.com/api/v1/ontologies/${riWrtAthena}/actions/${createAthenaRecord}/apply`;
  //############################### GET TOKEN ############################
  const { Parameters } = await new aws.SSM()
    .getParameters({
      Names: ["API_KEY"].map((secretName) => process.env[secretName]),
      WithDecryption: true,
    })
    .promise();

  const token = Parameters;

  //################################ POST VAULTING RECORD ############################

  const options = {
    method: "POST",
    url: Athena_form_Action,
    headers: {
      Authorization: "Bearer " + token[0].Value,
      "Content-Type": "application/json",
    },
    data: {
      "parameters": {
        "cards_graded_today": req.body.cards_graded_today,
        "cards_shipped_today": req.body.cards_shipped_today,
        "cards_received": req.body.cards_received,
        "type": req.body.type,
        "date": req.body.date,
        "submission_item": req.body.submission_item,
      },
    },
  };

  if (token[0].Value.length === 0) {
    res.status(500).send("No API key found");
  } else {
    axios(options)
      .then((response) => {
        console.log(response.data);
        res.send({
          message: "successfully updated",
          data: response.data,
          status_code: response.status,
        });
      })
      .catch((error) => {
        console.log(error);
        res.send({
          status: "error",
          data: error.message,
          status_code: error.status,
        });
      });
  }
});

// #################### PUT Form update ####################
app.put("/athenaform", async function (req, res) {
  const axios = require("axios");
  const aws = require("aws-sdk");

  const riWrtAthena =
    "ri.ontology.main.ontology.b034a691-27e9-4959-9bcc-bc99b1552c97";
  const updateAthenaRecord = "new-action-6a6ce3f8-09f6-e480-fd20-f1589f732055";
  const Athena_form_Action = `https://beckett.palantirfoundry.com/api/v1/ontologies/${riWrtAthena}/actions/${updateAthenaRecord}/apply`;

  //############################### GET TOKEN ############################
  const { Parameters } = await new aws.SSM()
    .getParameters({
      Names: ["API_KEY"].map((secretName) => process.env[secretName]),
      WithDecryption: true,
    })
    .promise();

  const token = Parameters;

  //################################ POST VAULTING RECORD ############################

  const options = {
    method: "POST",
    url: Athena_form_Action,
    headers: {
      Authorization: "Bearer " + token[0].Value,
      "Content-Type": "application/json",
    },
    data: {
      "parameters": {
        'AthenaForm': req.body.submission_item,
        'cards_graded_today': req.body.cards_graded_today,
        'cards_shipped_today': req.body.cards_shipped_today,
        'cards_received': req.body.cards_received,
        'type': req.body.type,
        'date': req.body.date,
        'submission_item': req.body.submission_item,
      },
    },
  };

  if (token[0].Value.length === 0) {
    res.status(500).send("No API key found");
  } else {
    axios(options)
      .then((response) => {
        console.log(response.data);
        res.send({
          message: "successfully updated",
          data: response.data,
          status_code: response.status,
        });
      })
      .catch((error) => {
        console.log(error);
        res.send({
          status: "error",
          data: error.message,
          status_code: error.status,
        });
      });
  }
});

// #################### Form update ####################
app.post("/athenaformdelete", async function (req, res) {
  const axios = require("axios");
  const aws = require("aws-sdk");

  const riWrtAthena =
    "ri.ontology.main.ontology.b034a691-27e9-4959-9bcc-bc99b1552c97";
  const deleteAthenaRecord = "new-action-0af4240c-ad4e-9265-a23c-59ae211df2b4";
  const Athena_form_Action = `https://beckett.palantirfoundry.com/api/v1/ontologies/${riWrtAthena}/actions/${deleteAthenaRecord}/apply`;

  //############################### GET TOKEN ############################
  const { Parameters } = await new aws.SSM()
    .getParameters({
      Names: ["API_KEY"].map((secretName) => process.env[secretName]),
      WithDecryption: true,
    })
    .promise();

  const token = Parameters;

  //################################ POST VAULTING RECORD ############################

  const options = {
    method: "POST",
    url: Athena_form_Action,
    headers: {
      Authorization: "Bearer " + token[0].Value,
      "Content-Type": "application/json",
    },
    data: {
      parameters: {
        AthenaForm: req.body.submission_item,
        submission_item: req.body.submission_item,
      },
    },
  };

  if (token[0].Value.length === 0) {
    res.status(500).send("No API key found");
  } else {
    axios(options)
      .then((response) => {
        console.log(response.data);
        res.send({
          message: "successfully updated",
          data: response.data,
          status_code: response.status,
        });
      })
      .catch((error) => {
        console.log(error);
        res.send({
          status: "error",
          data: error.message,
          status_code: error.status,
        });
      });
  }
});

// #################### GET Service Level Read ####################

  app.get("/servicelevel", async function (req, res) {
      const axios = require("axios");
      const aws = require("aws-sdk");
    
      const ridServies = "ri.ontology.main.ontology.b034a691-27e9-4959-9bcc-bc99b1552c97";
      const objService = "AthenaServiceLevel";
      const URL_API = `https://beckett.palantirfoundry.com/api/v1/ontologies/${ridServies}/objects/${objService}`;
    
      //############################### GET TOKEN ############################
      const { Parameters } = await new aws.SSM()
        .getParameters({
          Names: ["API_KEY"].map((secretName) => process.env[secretName]),
          WithDecryption: true,
        })
        .promise();
    
      const token = Parameters;
    
      //################################ GET DATA ############################
    
      const options = {
        method: "GET",
        url: URL_API,
        headers: {
          Authorization: "Bearer " + token[0].Value,
          "Content-Type": "application/json",
        },
      };
      if (token[0].Value.length === 0) {
        res.status(500).send("No API key found");
      } else {
        axios(options)
          .then((response) => {
            res.send({
              data: response.data,
              status: response.status,
            });
          })
          .catch((error) => {
            res.send({
              error: error.message,
              status_code: error.status,
            });
          });
      }
    });
    

// #################### POST Form update ####################
app.post("/servicelevel", async function (req, res) {
  const axios = require("axios");
  const aws = require("aws-sdk");

// ######################  CRUD Palantir ######################
const riWrt = "ri.ontology.main.ontology.b034a691-27e9-4959-9bcc-bc99b1552c97";
const createServicesRecord = "create-service-level";
const applyAction_createObject = `https://beckett.palantirfoundry.com/api/v1/ontologies/${riWrt}/actions/${createServicesRecord}/apply`;

  //############################### GET TOKEN ############################
  const { Parameters } = await new aws.SSM()
    .getParameters({
      Names: ["API_KEY"].map((secretName) => process.env[secretName]),
      WithDecryption: true,
    })
    .promise();

  const token = Parameters;

  //################################ POST VAULTING RECORD ############################

  const options = {
    method: "POST",
    url: applyAction_createObject,
    headers: {
      Authorization: "Bearer " + token[0].Value,
      "Content-Type": "application/json",
    },
    data: {
      "parameters": {
        "AthenaServiceLevel": req.body.submission_item,
        "submission_item": req.body.submission_item,
        "date": req.body.date,
        "10_day_express" : req.body.ten_day_express,
        "30_day_standard" : req.body.thirty_day_standard,
        "total":  req.body.total,
        "hidden": req.body.hidden,
        "recase": req.body.recase,
        "5_day_express": req.body.five_day_express,
        "type": req.body.type,
        "2_day_premium": req.body.two_day_premium,
      },
    },
  };

  if (token[0].Value.length === 0) {
    res.status(500).send("No API key found");
  } else {
    axios(options)
      .then((response) => {
        console.log(response.data);
        res.send({
          message: "successfully updated",
          data: response.data,
          status_code: response.status,
        });
      })
      .catch((error) => {
        console.log(error);
        res.send({
          status: "error",
          data: error.message,
          status_code: error.status,
        });
      });
  }
});



app.listen(3000, function () {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
