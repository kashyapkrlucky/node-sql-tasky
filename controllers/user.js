const db = require('../db');
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Helpers
const { success, error } = require("../helpers/responses");
const { passwordGenerator } = require('../helpers/generators');
const { secret } = require('../helpers/keys');

// Exported Controller to create user by company admin
exports.create = async (req, res, next) => {
    const {
        name, email, phone, company_id, role_id, created_by
    } = req.body;
    const [users] = await db.promise().query(`SELECT email FROM users WHERE email='${email}'`);
    console.log(users);
    if (users && users.length === 0) {
        const userPass = passwordGenerator(10);
        // Generate Password Hash
        const salt = await bcryptjs.genSalt(10);
        const hashedPass = await bcryptjs.hash(userPass, salt);
        console.log(userPass, hashedPass);
        const user = {
            id: null, name, email, phone, password: hashedPass, company_id, role_id, created_by
        };
        db.query('INSERT INTO users SET ? ', user, (err, rows) => {
            if (err) {
                error(res, err, 'error occured');
            } else {
                success(res, `${name} added in system`, 'success');
            }
        });
    } else {
        error(res, 'err', 'user exists');
    }
};

// Exported Controller to sign-in
exports.signIn = async (req, res, next) => {
    const { email, password } = req.body;
    const [users] = await db.promise().query(`SELECT * FROM users WHERE email='${email}'`);
    if (users && users.length > 0) {
        const [user] = users;
        const isVerified = await bcryptjs.compareSync(password, user.password);
        if (isVerified) {
            // Generate and Send Token
            let signOptions = { issuer: "tasky app", expiresIn: "23h" };
            const authToken = jwt.sign({ id: user.id }, secret, signOptions);
            success(res, authToken, `Authenticated`);
        } else {
            error(res, '', 'Invalid email or password');
        }
    } else {
        error(res, '', 'Invalid email or password');
    }
}

// Exported Controller to create user by company admin
exports.getProfile = (req, res, next) => {
    db.query(`SELECT * FROM user_view WHERE id = ${req.params.id}`, (err, rows) => {
        if (err) {
            error(res, err, 'error occured');
        } else {
            success(res, rows[0], 'success');
        }
    });
};

// Exported Controller to create user by company admin
exports.searchUser = (req, res, next) => {
    const { company_id, text } = req.body;
    db.query(
        `SELECT * FROM user_view WHERE name LIKE '%${text}%' AND company_id = ${company_id}`
        , (err, rows) => {
            if (err) {
                error(res, err, 'error occured');
            } else {
                success(res, rows, 'success');
            }
        });
};

// Exported Controller to create user by company admin
exports.getList = (req, res, next) => {
    const { company_id } = req.params;
    db.query(
        `SELECT * FROM user_view WHERE company_id = ${company_id}`
        , (err, rows) => {
            if (err) {
                error(res, err, 'error occured');
            } else {
                success(res, rows, 'success');
            }
        });
};

