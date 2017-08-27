const express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    massive = require('massive');

let app = express();
app.use( bodyParser.json() );
app.use( cors() );

let port = 9070;

///////////// Connecting database
// postgres://[username]:[password]@[host]:[port]/[database]
massive( 'postgres://postgres:database@localhost:9000/zoids' ).then( db => {
        app.set( 'db', db );
        app.get('db').init.seed().then( res => console.log( res ) )
    } ).catch( err => {
    console.log( err )
});

app.listen( port, () =>{
console.log(`listening on port ${port}`)
} )