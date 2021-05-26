const express = require('express');
const app = express();
const morgan = require('morgan');
const mysql = require('mysql')
const myConnection = require('express-myconnection');
const amqp = require('amqplib/callback_api')
const cors = require('cors')

app.use(cors({
    origin: ['http://localhost:4200']
}));
// importing routes
const customerRoutes = require('./routers/customer');

// settings
app.set('port', process.env.PORT || 3000);

// middlewares
app.use(morgan('dev'));
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: 'password',
    port: 3306,
    database: 'crud'
}, 'single'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// routes
app.use('/', customerRoutes);

app.listen(app.get('port'), () => {
    console.log('Server on port 3000');
})