const db = require('../db');

// Helpers
const { success, error } = require("../helpers/responses");

// Exported Controller to create ticket in project
exports.create = (req, res, next) => {
    const {
        title, description, type,
        project_id, priority, parent_id,
        created_by, assigned_to, points
    } = req.body;
    const ticket = {
        id: null, title, description, type,
        project_id, priority, parent_id,
        created_by, assigned_to, points
    };
    db.query('INSERT INTO tickets SET ? ', ticket, (err, rows) => {
        if (err) {
            error(res, err, 'error occured');
        } else {
            success(res, rows.insertId, 'success');
        }
    });
};

// Exported Controller to view ticket in project
exports.view = (req, res, next) => {
    db.query(`SELECT * FROM ticket_view where id=${req.params.id}`, (err, rows) => {
        if (err) {
            error(res, err, 'error occured');
        } else {
            success(res, rows[0], '');
        }
    });
}

// Exported Controller to view ticket in project
exports.listByProject = (req, res, next) => {
    const { project_id } = req.params;
    db.query(`SELECT * FROM ticket_view where project_id=${project_id}`, (err, rows) => {
        if (err) {
            error(res, err, 'error occured');
        } else {
            success(res, rows, '');
        }
    });
}

// Exported Controller to view ticket in project
exports.listByUser = (req, res, next) => {
    const { user_id } = req.params;
    db.query(`SELECT * FROM ticket_view where assigned_to_id=${user_id}`, (err, rows) => {
        if (err) {
            error(res, err, 'error occured');
        } else {
            success(res, rows, '');
        }
    });
}

// Exported Controller to remove ticket
exports.remove = async (req, res, next) => {
    const { id } = req.params;
    db.query('DELETE FROM tickets WHERE id = ?', [id], (err, rows) => {
        if (err) {
            error(res, err, 'error occured');
        } else {
            success(res, `ticket removed from system`, 'success');
        }
    });
}

// Exported Controller to update ticket title
exports.update = (req, res, next) => {
    const { key } = req.params;
    db.query(
        `UPDATE tickets SET ${key} = ? Where id = ?`,
        [req.body[key], req.body.id],
        (err, result) => {
            if (err) {
                error(res, err, 'error occured');
            } else {
                success(res, `ticket updated from system`, 'success');
            }
        }
    );
}

// Exported Controller to add comment for a ticket
exports.addComment = (req, res, next) => {
    const {
        text, ticket_id, added_by
    } = req.body;
    const comment = {
        id: null, text, ticket_id, added_by
    };
    db.query('INSERT INTO comments SET ? ', comment, (err, rows) => {
        if (err) {
            error(res, err, 'error occured');
        } else {
            success(res, rows.insertId, 'success');
        }
    });
}

// Exported Controller to view ticket in project
exports.commentList = (req, res, next) => {
    const { ticket_id } = req.params;
    db.query(
        `SELECT * FROM comments_view where ticket_id=${ticket_id}`
        , (err, rows) => {
            if (err) {
                error(res, err, 'error occured');
            } else {
                success(res, rows, '');
            }
        });
}

// Exported Controller to remove comment from a ticket
exports.removeComment = (req, res, next) => {
    const { id } = req.params;
    db.query('DELETE FROM comments WHERE id = ?', [id], (err, rows) => {
        if (err) {
            error(res, err, 'error occured');
        } else {
            success(res, `comment removed from system`, 'success');
        }
    });
}