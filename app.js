'use strict'

let process = require('process');
let app = require('express')();
let bodyParser = require('body-parser');
let morgan = require('morgan');
let cors = require('cors');
let sqlite = require('sqlite3');
let db = new sqlite.Database('yuzu.db');

console.log(`Server running on port: ${process.argv[2]}`);

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.listen(process.argv[2]);

try {
    db.run('CREATE TABLE if not exists Like(ip TEXT, page TEXT)');
} catch (e) {
    console.error(e);
}

//_Récupération du nombres de "Like" d'une page
app.get('/api/page/likes/:page', (req, res) => {

    //_On cherche le nombre de like pour cette page
    db.get(`SELECT COUNT(*) AS totalLike
            FROM Like
            WHERE page='${req.params.page}'`, (err, row) => {
        if(err) throw err;

        res.json({totalLike: row.totalLike});
    });
});

//_Voit si on peut liker une page
app.get('/api/can-like/:page', (req,res) => {
    let canLike = null;

    //_On vérifie déjà si l'utilsateur a liké la page une fois déja.
    db.get(`SELECT COUNT(*) AS nbLike
            FROM Like
            WHERE ip='${req.ip}'
                AND page='${req.params.page}'`, (err, row) => {
        if(err) throw err;

        if (row.nbLike === 0) {                //_L'utilisateur n'a jamais "like" cette page.
            canLike = true;
        } else if (row.nbLike === 1) {        //_L'utilisateur a déja "like" cette page.
            canLike = false;
        } else {                            //_Problème de cohérence des données
            console.error(`La requête a renvoyé le résultat: ${row.nbLike}. Cet utilisateur a pu 'Liker' cette page ${row.nbLike} fois`);
        }

        res.json({canLike});
    });

});

//_Like une page
app.post('/api/page/like', (req, res) => {

    db.run(`INSERT INTO Like
            VALUES('${req.ip}', '${req.body.page}')`, (err) => {
        if(err) {
            console.error(err);
            res.json(500);
        }
        res.json(200);
    });
});

//////////////////////////////////////////////////

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public_html/index.html`);
});

app.get('/*.*', (req,res) => {
    res.sendFile(`${__dirname}/public_html${req.originalUrl}`);
});
