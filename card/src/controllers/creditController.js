const { v4: uuidv4 } = require('uuid');
const amqp = require('amqplib/callback_api')
const queue = process.env.QUEUE || 'update_customer'
const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM credit_card', (err, credit_cards) => {
            if (err) {
                res.json(err);
            }
            res.json(credit_cards);
        });
    });
};

controller.find = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        conn.query("SELECT * FROM credit_card WHERE id = ?", [id], (err, rows) => {
            res.json(rows[0])
        });
    });
};

controller.save = async (req, res) => {
    const data = req.body;
    data.id = uuidv4();
    amqp.connect('amqps://kfpgnvpj:d9hGpxPuupBaAJFwHXPMDJjkxQgpHrzs@beaver.rmq.cloudamqp.com/kfpgnvpj', (err0, connection) => {
        connection.createChannel((err1, channel) => {
            channel.sendToQueue('update_customer', Buffer.from(JSON.stringify(data)));
        });
    });
    req.getConnection((error, conn) => {
        const query = conn.query('INSERT INTO credit_card set ?', data, (err, card) => {
            res.json(card)
        });
    });
};


module.exports = controller;