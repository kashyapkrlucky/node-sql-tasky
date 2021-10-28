const db = require('../db');

// Helpers
const { success, error } = require("../helpers/responses");

// Exported Controller to create projects
exports.create = async (req, res, next) => {
    const { name, description, company_id, created_by } = req.body;
    const project = { id: null, name, description, company_id, created_by };
    const projectAdded = await db.promise().query('INSERT INTO projects SET ?', project);
    if (projectAdded) {
        const member = {
            project_id: projectAdded[0].insertId,
            member_id: created_by
        }
        db.query('INSERT INTO members SET ? ', member, (err, rows) => {
            success(res, `${name} and member added in system`, 'success');
        });
    } else {
        error(res, err, 'error occured');
    }
};

// Exported Controller to get projects
exports.list = (req, res, next) => {
    db.query(
        `SELECT * FROM project_view WHERE company_id=${req.params.company_id}`,
        (err, rows) => {
            if (err) {
                error(res, err, 'error occured');
            } else {
                success(res, rows, 'success');
            }
        })
}

// Exported Controller to get projects
exports.view = async (req, res, next) => {
    const members = await db.promise().query(
        `SELECT * FROM member_view WHERE project_id = ${req.params.id}`
    );
    db.query(
        `SELECT * FROM project_view WHERE id=${req.params.id}`,
        (err, rows) => {
            if (err) {
                error(res, err, 'error occured');
            } else {
                success(res, {...rows[0], members: members[0]}, 'success');
            }
        });
}

// Exported Controller to add users to project
exports.addMember = async (req, res, next) => {
    const { project_id, member_id } = req.body;
    const member = { project_id, member_id };
    db.query('INSERT INTO members SET ? ', member, (err, rows) => {
        success(res, `member added in system`, 'success');
    });
}

// Exported Controller to remove user from project
exports.removeMember = async (req, res, next) => {
    const { id } = req.params;
    db.query('DELETE FROM members WHERE id = ?', [id], (err, rows) => {
        if (err) {
            error(res, err, 'error occured');
        } else {
            success(res, `member removed from system`, 'success');
        }
    });
}
