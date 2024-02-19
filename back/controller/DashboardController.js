const fs = require('fs');
var path = require('path');
async function getStates(req, res) {
    fs.readFile(path.join(__dirname, 'sales.json'), 'utf8', (err, data) => {
        try {
            let states = []
            if (err) {
                console.log(err);
                res.send({ status: 400, states })
                return;
            }
            const parseData = JSON.parse(data);
            parseData.forEach(d => {
                states.push(d.State)
            });
            states = [...new Set(states)]
            res.send({ status: 201, states })
        } catch (error) {
            console.log(error);
        }
    });
}
async function getData(req, res) {
    fs.readFile(path.join(__dirname, 'sales.json'), 'utf8', (err, data) => {
        try {
            if (err) {
                console.log(err);
                res.send({ status: 400, data: [] })
                return;
            }
            const parseData = JSON.parse(data);
            res.send({ status: 201, data: parseData })
        } catch (error) {
            console.log(error);
        }
    });
}
module.exports = { getData, getStates }