const connection = require('../db');

// Helpers
const { success, error } = require("../helpers/responses");


// create company
exports.createCompany = async (req, res, next) => {
    const { name, email, phone, address, gtin, pan, tan } = req.body;
    const company = { id: null, name, email, phone, address, gtin, pan, tan };
    const savingCompany = await connection.promise().query('INSERT INTO company SET ?', company);
    if (savingCompany) {
        const user = {
            id: null, 
            name, email, phone, 
            password: '123456', 
            company_id: savingCompany[0].insertId, 
            role_id: 1
        };
        connection.query('INSERT INTO users SET ?', user, (err, rows) => {
            success(res, 'company and first user', '');
        });
    } else {
        error(res, 'err', '');
    }
};






// const author = { name: 'Craig Buckler', city: 'Exmouth' };
// con.query('INSERT INTO authors SET ?', author, (err, res) => {
//     if (err) throw err;

//     console.log('Last insert ID:', res.insertId);
// });

// con.query(
//     'UPDATE authors SET city = ? Where ID = ?',
//     ['Leipzig', 3],
//     (err, result) => {
//         if (err) throw err;

//         console.log(`Changed ${result.changedRows} row(s)`);
//     }
// );

// con.query(
//     'DELETE FROM authors WHERE id = ?', [5], (err, result) => {
//         if (err) throw err;

//         console.log(`Deleted ${result.affectedRows} row(s)`);
//     }
// );










