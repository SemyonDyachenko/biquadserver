const serverPort = 3000;
const serverAddr = "127.0.0.1"; //locahost


const telegramOptions = {
    hostname: 'https://api.telegram.org/bot[BOT_API_KEY]/sendMessage?chat_id=',
    port: 80,
    path: '/newmsg',
    method: "POST",
    headers: {
        'Content-Type': 'application/json'
    }
};


const telegram_token = "here token";
const vk_token = "here token";

const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const { Telegraf } = require('telegraf');
const request = require('request');
const axios = require('axios');
const { response } = require('express');
const { resolve } = require('path');

const app = express();
const bot = new Telegraf(telegram_token);



app.use(bodyParser.urlencoded({ extended: true }));

/*app.use((request, response, next) => {
    console.log(request);
    next();
});*/

let json = "";


app.get('/sendmessage',(request,response) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    let json = JSON.parse(JSON.stringify(request.query));

    if(json.unique == undefined || json.message ==undefined) {
        response.sendStatus(400);
    }else {
        response.writeHead( 200, 'OK', {'content-type' : 'text/plain'});
        let responseStr = "{'ok':true,'result':{'message_id': 123}}";
        response.end(responseStr);
    }
 
    console.log(json.message);


    const url = String('https://api.telegram.org/bot'+telegram_token+'/sendMessage?chat_id=-'+json.unique+'&text='+json.message);



    axios.post(url,{
        todo: 'Buy the milk'
    }).then((response) => {
       // console.log(response);
    }, (error) => {
       // console.log(error);
    });

});

app.post('/sendmessage', (request, response) => {
    
    console.log('Got body:', request.body);
    json = JSON.parse(JSON.stringify(request.body));
    response.header('Access-Control-Allow-Origin', '*');
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    console.log(json.unique);
    response.sendStatus(200);

    const url = String('https://api.telegram.org/bot'+telegram_token+'/sendMessage?chat_id=-'+json.unique+'&text='+json.message);

    axios.post(url,{
        todo: 'Buy the milk'
    }).then((response) => {
        console.log(response);
    }, (error) => {
        console.log(error);
    });

    bot.on('text',(ctx) => {
        return ctx.reply(`${ctx.message.chat.id}:hello`);
    });
});


//start
app.listen(3000);
bot.launch();
