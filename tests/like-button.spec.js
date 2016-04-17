'use strict';

let expect = require('chai').expect;
let $http  = require('request');
let sqlite = require('sqlite3');
let db     = new sqlite.Database(':memory:');

try {
    db.run('CREATE TABLE if not exists Like(ip TEXT, page TEXT)');
} catch (e) {
    console.error(e);
}
///////////////////////////////////////////////

describe('Test de la base de données:', () => {
    const IP = '1.2.3.4';
    const PAGE = 'page-test.html';
    let nbLikes = -1;

    describe('le like de la page: ', () => {
        it('doit récupérer 0 like pour la page', (done) => {
            db.get(`SELECT COUNT(*) AS totalLike
                    FROM Like
                    WHERE page='${PAGE}'`, (err, row) => {
                if(err) {
                    expect.fail(-1, 0, err, null);
                } else {
                    done();
                }
            });
        });

        it('doit retourner la possiblité de liker la page', (done) => {
            let canLike = null;
            db.get(`SELECT COUNT(*) AS nbLike
                    FROM Like
                    WHERE ip='${IP}'
                        AND page='${PAGE}'`, (err, row) => {
                if(err) throw err;

                if (row.nbLike === 0) {                //_L'utilisateur n'a jamais "like" cette page.
                    canLike = true;
                    done();
                } else if (row.nbLike === 1) {        //_L'utilisateur a déja "like" cette page.
                    canLike = false;
                    expect(canLike).to.equal(true);
                } else {                            //_Problème de cohérence des données
                    console.error(`La requête a renvoyé le résultat: ${row.nbLike}. Cet utilisateur a pu 'Liker' cette page ${row.nbLike} fois`);
                    expect(canLike).to.equal(true);
                }

            });
        });

        it('doit insérer dans la base de données', (done) => {
            db.run(`INSERT INTO Like
                    VALUES('${IP}', '${PAGE}')`, (err) => {
                if(err) {
                    console.error(err);
                    expect.fail(-1, 0, err, null);
                } else {
                    done();
                }
            });
        });
    });

    describe('Tentative de liker une seconde fois', () => {
        it('doit récupérer 1 like pour la page', () => {
            db.get(`SELECT COUNT(*) AS totalLike
                    FROM Like
                    WHERE page='${PAGE}'`, (err, row) => {
                if(err) expect.fail(-1, 0, err, null);
                else expect(row.totalLike).to.equal(1);
            });
        });

        it('doit retourner l\'impossiblité de liker la page', () => {
            let canLike = null;
            db.get(`SELECT COUNT(*) AS nbLike
                    FROM Like
                    WHERE ip='${IP}'
                        AND page='${PAGE}'`, (err, row) => {
                if(err) throw err;

                if (row.nbLike === 0) {                //_L'utilisateur n'a jamais "like" cette page.
                    canLike = true;
                    done();
                } else if (row.nbLike === 1) {        //_L'utilisateur a déja "like" cette page.
                    canLike = false;
                    expect(canLike).to.equal(true);
                } else {                            //_Problème de cohérence des données
                    expect(canLike).to.equal(true);
                }
                
                expect(canLike).to.equal(false);
            });
        });
    });
});
