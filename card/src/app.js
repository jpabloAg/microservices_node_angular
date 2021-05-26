const express = require('express');
const app = express();
const morgan = require('morgan');
const mysql = require('mysql')
const myConnection = require('express-myconnection');
const cors = require('cors')

app.use(cors({
    origin: ['http://localhost:4200']
}));
// importing routes
const customerRoutes = require('./routers/credit');

// settings
app.set('port', process.env.PORT || 3001);

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
    console.log('Server on port 3001');
})