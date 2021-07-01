# RESTHeart Webchat
This examples uses [RESTHeart](https://restheart.org) WebsSockets API to create a basic chat application.

For more information refer to the [Change Streams section](https://restheart.org/docs/change-streams/) in the RESTheart official documentation.

## Requirements
- RESTHeart 6
- MongoDB
- Angular 12

## Quick start

- Clone this repository `git clone git@github.com:SoftInstigate/restheart-webchat.git`
- Run the following command to download and run the latest RESTHeart version `./bin/restart.sh -p restheart`
- Create message collection and define change stream stage
```
curl -u admin:secret -X PUT localhost:8080/messages -d '{"streams": [{"stages": [{"_$match": {"_$or": [{"operationType": "insert"}]}}],"uri": "all"}]}' -H "Content-Type: application/json"
```
- Navigate into client folder `cd client/` and run `yarn` or `npm install` to install the required dependencies
- Start angular application with `ng serve`
