# RESTHeart Webchat

This examples uses [RESTHeart](https://restheart.org) WebsSockets API to create a basic chat application.

For more information refer to the [Change Streams section](https://restheart.org/docs/change-streams/) in the RESTheart official documentation.

## Requirements

- Node.js 12+
- RESTHeart (6+)
- MongoDB (3.6+)

However, the provided `docker-compose.yml` file containes all that is needed.

## Quick start

You need node 12.x and npm 6.x to build and run this project.

- Install yarn `npm install --global yarn` (yarn version >= 1.20.x but < than 2.x)
- Clone this repository `git clone git@github.com:SoftInstigate/restheart-webchat.git`
- Run the following command to download and run the latest RESTHeart version `./bin/restart.sh -p restheart`
- Create message collection and define change stream stage

```json
curl -u admin:secret -X PUT localhost:8080/messages -d '
 "streams": [
        {
            "stages": [
                {
                    "_$match": {
                        "_$or": [
                            {
                                "operationType": "insert"
                            }
                        ]
                    }
                }
            ],
            "uri": "all"
        }
    ]
' -H "Content-Type: application/json"
```
- Run `yarn` to install the required dependencies
- Start the angular application with `yarn start --configuration=local`
