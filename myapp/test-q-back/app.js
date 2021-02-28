const express = require('express');
const bodyParser = require('body-parser')
const csv = require('csv-parser');
const fs = require('fs');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json
app.use(bodyParser.json())

//***** Set Access control Headers ****/
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'accept, content-type, x-requested-with, x-requested-by');
    next();
});

let Qlist = [];
fs.createReadStream("./public/csv/Liste_Q.csv")
    .pipe(csv(['url']))
    .on('data', (row) => {
        var data = {
            source: row.url,
            likes: Math.floor(Math.random() * 100),
            dislikes: Math.floor(Math.random() * 100),
            rank: 0,
            id: -1
        }
        Qlist.push(data)
    })
    .on('end', () => {
        Qlist.sort(function(a, b) {
            return b.likes - a.likes;
        });

        for (i = 0; i < Qlist.length; i++) {
            Qlist[i].id = i
            Qlist[i].rank = i + 1
        }
    });

// GET /qlist
app.get('/qlist', function(req, res) {
    return res.send(Qlist);
})

// GET /qlist/random
app.get('/qlist/random', function(req, res) {
    let randomCardIndex = Math.floor(Math.random() * Qlist.length);
    return res.send(Qlist[randomCardIndex]);
})

// POST /qlist/like
app.post('/qlist/like', function(req, res) {
    var cardLiked = req.body.id
    for (i = 0; i < Qlist.length; i++) {
        if (cardLiked === Qlist[i].id) {
            Qlist[i].likes += 1
            return res.send(Qlist[i]);
        }
    }
})

// POST /qlist/dislike
app.post('/qlist/dislike', function(req, res) {
    var cardDisliked = req.body.id
    for (i = 0; i < Qlist.length; i++) {
        if (cardDisliked === Qlist[i].id) {
            Qlist[i].dislikes += 1;
            return res.send(Qlist[i]);
        }
    }
})

app.listen(3000)