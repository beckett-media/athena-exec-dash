export type AmplifyDependentResourcesAttributes = {
    "function": {
        "athenaprodcb5f5078": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        },
        "AdminQueriesa200cd2e": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        },
        "athenaprod24dc5008": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        }
    },
    "auth": {
        "athenaprod": {
            "IdentityPoolId": "string",
            "IdentityPoolName": "string",
            "UserPoolId": "string",
            "UserPoolArn": "string",
            "UserPoolName": "string",
            "AppClientIDWeb": "string",
            "AppClientID": "string"
        },
        "userPoolGroups": {
            "adminGroupRole": "string",
            "financialGroupRole": "string",
            "gradingGroupRole": "string"
        }
    },
    "api": {
        "palentirApi": {
            "RootUrl": "string",
            "ApiName": "string",
            "ApiId": "string"
        },
        "AdminQueries": {
            "RootUrl": "string",
            "ApiName": "string",
            "ApiId": "string"
        }
    },
    "storage": {
        "amplifys3uploader": {
            "BucketName": "string",
            "Region": "string"
        }
    }
}