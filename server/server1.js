const zulip = require('zulip-js');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const axios = require('axios');

const app = express();

// Pass the path to your zuliprc file here.
const config = { zuliprc: ".zuliprc" };

// Get queue_id

// (async () => {
//     const client = await zulip(config);

//     // Register a queue
//     const params = {
//         event_types: ["message"],
//     };

//     console.log(await client.queues.register(params));
// })();

// Get own user

// (async () => {
//     const client = await zulip(config);

//     // Get the profile of the user/bot that requests this endpoint,
//     // which is `client` in this case:
//     console.log(await client.users.me.getProfile());
// })();


// Get messages sent by both sender and reciever 

// (async () => {
//     const client = await zulip(config);

//     const readParams = {
//         anchor: "newest",
//         num_before: 100,
//         num_after: 0,
//         narrow: [
//             {operator: "pm-with", operand: "nirmalkumarcse07@gmail.com" },
//         ],
//     };

//     console.log(await client.messages.retrieve(readParams));
// })();


// Get a user by email


// Get a user by email

(async () => {
    const client = await zulip(config);
    
    const email = "nirmalkumarcse07@gmail.com"

    

      
    // params = {email}
    // Get all users in the realm
    console.log(await client.users.retrieve(result));

    // You may pass the `client_gravatar` query parameter as follows:
    // console.log(await client.users.retrieve({client_gravatar: true}));
})();


