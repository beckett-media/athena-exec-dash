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

// #################### //GET// Website Analytics Query ####################
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

// #################### //GET// Competitor Metric Query ####################
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

// #################### //GET// Comics Metric Query ####################
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

//###################### //GET// Social Media Metrics #####################################
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

// ########################################################################################
// #################### [[[START]]] - Grading, Shipped, Received [OLD Prod] ###############
// ########################################################################################

//GET//
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

//POST//
app.post("/athenaform", async function (req, res) {
  const axios = require("axios");
  const aws = require("aws-sdk");
  const { v4: uuidv4 } = require("uuid");
  const uuid = uuidv4();

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
      parameters: {
        cards_graded_today: req.body.cards_graded_today,
        cards_shipped_today: req.body.cards_shipped_today,
        cards_received: req.body.cards_received,
        type: req.body.type,
        date: req.body.date,
        submission_item: `${uuid}`,
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

//PUT//
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
      parameters: {
        AthenaForm: req.body.submission_item,
        cards_graded_today: req.body.cards_graded_today,
        cards_shipped_today: req.body.cards_shipped_today,
        cards_received: req.body.cards_received,
        type: req.body.type,
        date: req.body.date,
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

//GET//
app.get("/timeserie", async function (req, res) {
  const axios = require("axios");
  const aws = require("aws-sdk");

  const ri = "ri.ontology.main.ontology.b034a691-27e9-4959-9bcc-bc99b1552c97";
  const athena = "AthenaGradingServiceForm";
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
        const stats = (response.data.data || []).map(({ properties }) => ({
          cardsGradedToday: properties.cardsGradedToday,
          cardsReceived: properties.cardsReceived,
          cardsShippedToday: properties.cardsShippedToday,
        }));

        let totalGraded = 0;
        let totalReceived = 0;
        let totalShipped = 0;
        for (const stat of stats) {
          totalGraded += stat.cardsGradedToday;
          totalReceived += stat.cardsReceived;
          totalShipped += stat.cardsShippedToday;
        }

        res.send({
          data: {
            ...response.data,
            stats: {
              totalGraded,
              totalReceived,
              totalShipped,
            },
          },
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

// ########################################################################################
// #################### [[[END]]] - Grading, Shipped, Received [OLD Prod] ###############
// ########################################################################################

// ########################################################################################
// #################### [[[START]]] - Grading, Shipped, Received [NEW Prod] ###############
// ########################################################################################

//GET//
app.get("/grading-service-form", async function (req, res) {
  const axios = require("axios");
  const aws = require("aws-sdk");

  const ri = "ri.ontology.main.ontology.b034a691-27e9-4959-9bcc-bc99b1552c97";
  const athena = "AthenaGradingServiceForm";
  const URL_API_Athena = `https://beckett.palantirfoundry.com/api/v1/ontologies/${ri}/objects/${athena}?orderBy=p.date:desc`;

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
//GET BY DATE//
app.get("/grading-service-form/:yesterday", async function (req, res) {
  const axios = require("axios");
  const aws = require("aws-sdk");

  const { yesterday } = req.params;

  const ri = "ri.ontology.main.ontology.b034a691-27e9-4959-9bcc-bc99b1552c97";
  const athena = "AthenaGradingServiceForm";
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
//POST NEW//
app.post("/grading-service-form", async function (req, res) {
  const axios = require("axios");
  const aws = require("aws-sdk");
  const { v4: uuidv4 } = require("uuid");
  const uuid = uuidv4();

  const riWrtAthena =
    "ri.ontology.main.ontology.b034a691-27e9-4959-9bcc-bc99b1552c97";
  const createAthenaServiceForm = "grading-service-form";
  const Athena_form_Action = `https://beckett.palantirfoundry.com/api/v1/ontologies/${riWrtAthena}/actions/${createAthenaServiceForm}/apply`;
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
        cards_graded_today: req.body.cards_graded_today,
        cards_shipped_today: req.body.cards_shipped_today,
        cards_received: req.body.cards_received,
        type: req.body.type,
        date: req.body.date,
        submission_item: `${uuid}`,
        AthenaGradingServiceForm: `${uuid}`,
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
//PUT UPDATE
app.put("/grading-service-form", async function (req, res) {
  const axios = require("axios");
  const aws = require("aws-sdk");

  const riWrtAthena =
    "ri.ontology.main.ontology.b034a691-27e9-4959-9bcc-bc99b1552c97";
  const updateAthenaRecord = "update-form-data";
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
      parameters: {
        AthenaGradingServiceForm: req.body.submission_item,
        cards_graded_today: req.body.cards_graded_today,
        cards_shipped_today: req.body.cards_shipped_today,
        cards_received: req.body.cards_received,
        type: req.body.type,
        date: req.body.date,
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

// ########################################################################################
// #################### [[[END]]] - Grading, Shipped, Received [NEW Prod] ###############
// ########################################################################################

// ########################################################################################
// #################### [[[START]]] - Servive Level, Verified, revenue Shipped [Prod] #####
// ########################################################################################

//GET//
app.get("/servicelevel", async function (req, res) {
  const axios = require("axios");
  const aws = require("aws-sdk");

  const ridServies =
    "ri.ontology.main.ontology.b034a691-27e9-4959-9bcc-bc99b1552c97";
  const objService = "AthenaServiceForm";
  const URL_API = `https://beckett.palantirfoundry.com/api/v1/ontologies/${ridServies}/objects/${objService}?p.date.gt=2022-04-29&orderBy=p.date:asc`;

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

//GET BY DATE//
app.get("/servicelevel/:yesterday", async function (req, res) {
  const axios = require("axios");
  const aws = require("aws-sdk");

  const { yesterday } = req.params;

  const ridServies =
    "ri.ontology.main.ontology.b034a691-27e9-4959-9bcc-bc99b1552c97";
  const objService = "AthenaServiceForm";
  const URL_API = `https://beckett.palantirfoundry.com/api/v1/ontologies/${ridServies}/objects/${objService}?p.date.eq=${yesterday}`;

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

//POST//
app.post("/servicelevel", async function (req, res) {
  const axios = require("axios");
  const aws = require("aws-sdk");
  const { v4: uuidv4 } = require("uuid");
  const uuid = uuidv4();

  // ######################  CRUD Palantir ######################
  const riWrt =
    "ri.ontology.main.ontology.b034a691-27e9-4959-9bcc-bc99b1552c97";
  const createServicesRecord =
    "new-action-256b9a79-2fc3-c664-f98a-40a6a8f1e79c";
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
      parameters: {
        AthenaServiceForm: `${uuid}`,
        submission_item: `${uuid}`,
        date: req.body.date,
        ten_day: req.body.ten_day,
        thirty_day: req.body.thirty_day,
        total: req.body.total,
        hidden_1: req.body.hidden_1,
        recase: req.body.recase,
        five_day: req.body.five_day,
        type: "BGS",
        two_day: req.body.two_day,
        revenueshipped: req.body.revenueshipped,
        verified: req.body.verified,
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

//PUT//
app.put("/servicelevel", async function (req, res) {
  const axios = require("axios");
  const aws = require("aws-sdk");

  // ######################  CRUD Palantir ######################
  const riWrt =
    "ri.ontology.main.ontology.b034a691-27e9-4959-9bcc-bc99b1552c97";
  const createServicesRecord = "update-service";
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
      parameters: {
        AthenaServiceForm: req.body.submission_item,
        date: req.body.date,
        ten_day: req.body.ten_day,
        thirty_day: req.body.thirty_day,
        total: req.body.total,
        hidden_1: req.body.hidden_1,
        recase: req.body.recase,
        five_day: req.body.five_day,
        type: "BGS",
        two_day: req.body.two_day,
        revenueshipped: req.body.revenueshipped,
        verified: req.body.verified,
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

// ########################################################################################
// #################### [[[END]]] - Servive Level, Verified, revenue Shipped [Prod] #####
// ########################################################################################

// ########################################################################################
// #################### [[[START]]] - Graders [Prod] #####
// ########################################################################################

//GET//
app.get("/graders", async function (req, res) {
  const axios = require("axios");
  const aws = require("aws-sdk");

  const ridServies =
    "ri.ontology.main.ontology.b034a691-27e9-4959-9bcc-bc99b1552c97";
  const objService = "AthenaGraders";
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

//POST//
app.post("/graders", async function (req, res) {
  const axios = require("axios");
  const aws = require("aws-sdk");
  const { v4: uuidv4 } = require("uuid");
  const uuid = uuidv4();

  // ######################  CRUD Palantir ######################
  const riWrt =
    "ri.ontology.main.ontology.b034a691-27e9-4959-9bcc-bc99b1552c97";
  const createServicesRecord = "new-action-grader";
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
      parameters: {
        id: `${uuid}`,
        new_grader_name: req.body.new_grader_name,
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

//PUT//
app.put("/graders", async function (req, res) {
  const axios = require("axios");
  const aws = require("aws-sdk");

  // ######################  CRUD Palantir ######################
  const riWrt =
    "ri.ontology.main.ontology.b034a691-27e9-4959-9bcc-bc99b1552c97";
  const createServicesRecord = "new-action-update";
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
      parameters: {
        AthenaGraders: req.body.id,
        new_grader_name: req.body.new_grader_name,
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

// ########################################################################################
// #################### [[[END]]] - Graders [Prod] #####
// ########################################################################################

app.listen(3000, function () {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
