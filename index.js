/**
 * @description Pull all comment from Graph API node (Page's post, User's post, Photo) 
 * in Facebook and write it to file. You MUST setup appID and appSecret in config file.
 * @author adthonb <mongkon@hardwaredata.net>
 * @version 1.1.0
 * @license Apache-2.0
 */

var FB = require('fb');
var config = require('./config'),
    fs = require('fs'),
    request = require('request');

if (!config.facebook.appID || !config.facebook.appSecret) {
    throw new Error('facebook appId and appSecret required in config.js');
}

const node = ''; //set node (post ID) for Graph API here 
const edge = 'comments'; //set edge for Graph API here
const path = `/${node}/${edge}`;
var comments = [];

var getComments = function(response) {
    if (!response || response.error) {
        console.log(!response ? 'error occurred' : response.error);
        return;
    }
    response.data.forEach(function (value) {
        comments.push(value.message);
    });

    if (response.paging.next) {
        console.log('processing...')
        request({ method: 'GET', uri: response.paging.next, json: true }, function(error, response, body) {
            if(error)
               console.log(error);
            
            getComments(body);
        });
    } else {
        var file = fs.createWriteStream('./tmp/test.txt');
        file.on('error', function(err) {
            return console.log(err);
        });
        for(var i=0; i<comments.length; i++) {
            file.write( comments[i] + "\r\n");
        }
        file.end();
        console.log('file saved!');
    }
}

FB.api( path, 'get', { access_token: config.facebook.appSecret }, getComments);