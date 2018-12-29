const projectId = 'appointmentagent-cc027'; //https://dialogflow.com/docs/agents#settings
const sessionId = '1229141198';
const query = 'Hello';
const languageCode = 'en-US';
process.env['GOOGLE_APPLICATION_CREDENTIALS']=".\\credentials.json"

// Instantiate a DialogFlow client.
const dialogflow = require('dialogflow');
const sessionClient = new dialogflow.SessionsClient();

// Define session path
const sessionPath = sessionClient.sessionPath(projectId, sessionId);

// The text query request.


    // Send request and log result



const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public'));
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded());

app.post('/talk', (req, res, next) => {

    console.log(req.body.query);

    const request = {
        session: sessionPath,
        queryInput: {
          text: {
            text: req.body.query,
            languageCode: languageCode,
          },
        },
      };

    sessionClient
    .detectIntent(request)
    .then(responses => {
    console.log('Detected intent');
    const result = responses[0].queryResult;
    console.log(`  Query: ${req.body.query}`);
    console.log(`  Response: ${result.fulfillmentText}`);
    if (result.intent) {
        console.log(`  Intent: ${result.intent.displayName}`);
    } else {
        console.log(`  No intent matched.`);
    }
    if(responses) {
        res.send(result.fulfillmentText)
    }
    })
    .catch(err => {
        console.error('ERROR:', err);
    });
})

app.listen(port, () => console.log(`Example app listening on http://localhost:${port}!`))