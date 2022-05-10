import React, { useState, useEffect } from "react";
import AWS from "aws-sdk";
import { Auth } from "aws-amplify";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const getUsers = async () => {
    try {
      let allUsers = [];
      let more = true;
      let paginationToken = "";

      while (more) {
        let params = {
          UserPoolId: "us-west-1_7eDAf5I2X", // process.env.REACT_APP_USER_POOL_ID,
          Limit: 60,
        };
        if (paginationToken !== "") {
          params.PaginationToken = paginationToken;
        }

        
        AWS.config.update({
            region: "us-west-1", //process.env.REACT_APP_USER_POOL_REGION,
            accessKeyId: "AKIAX7KA2GYFDAL4SMBH", //process.env.REACT_APP_ACCESS_KEY_ID,
            secretAccessKey: "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", //process.env.REACT_APP_SECRET_KEY
        });
        const cognito = new AWS.CognitoIdentityServiceProvider();
        const rawUsers = await cognito.listUsers(params).promise();
        await Auth.currentAuthenticatedUser().then((user) => {
          setCurrentUser(user);
        });
        allUsers = allUsers.concat(rawUsers.Users);
        if (rawUsers.PaginationToken) {
          paginationToken = rawUsers.PaginationToken;
        } else {
          more = false;
        }
      }
      setUsers(allUsers);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);
//  export users and currentUser to the App.js
    return { users, currentUser };
