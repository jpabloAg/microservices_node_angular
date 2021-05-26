const amqp = require('amqplib/callback_api')
const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM customer', (err, customers) => {
            if (err) {
                res.json(err);
            }
            res.json(customers);
        });
    });
};

controller.find = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        conn.query("SELECT * FROM customer WHERE id = ?", [id], (err, rows) => {
            res.json(rows[0])
        });
    });
};


controller.update = (req, res) => {
    const { id } = req.params;
    const newCustomer = req.body;
    console.log(id);
    console.log(newCustomer);
    req.getConnection((err, conn) => {
    
        conn.query('UPDATE customer set ? where id = ?', [newCustomer, id], (err, rows) => {
            res.json(rows);
        });
    });
};

controller.updateRabbit = (req, res) => {
    amqp.connect('amqps://kfpgnvpj:d9hGpxPuupBaAJFwHXPMDJjkxQgpHrzs@beaver.rmq.cloudamqp.com/kfpgnvpj', (err0, connection) => {
        connection.createChannel((err1, channel) => {
            channel.assertQueue('update_customer', { durable: false })
            channel.consume('update_customer', (msg) => {
                cont = JSON.parse(msg.content.toString());
                console.log(cont)
                req.getConnection((err, conn) => {
                    conn.query('UPDATE customer set ? where id = ?', [{ credit: cont.id }, cont.owner], (err, rows) => {
                        res.json(rows);
                    });
                });
                
            }, { noAck: true })
        });
    });
};

module.exports = controller;