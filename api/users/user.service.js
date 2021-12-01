const pool = require("../../config/database");

module.exports = {
    create: (data, callback) => {
        pool.query(
            `INSERT into User_Registration(User_id, User_FirstName, User_LastName, User_Address, User_ContactNumber, User_emailid, User_Gender, User_Age, User_Password) values(?,?,?,?,?,?,?,?,?)`,
            [
                data.User_id,
                data.User_FirstName,
                data.User_LastName,
                data.User_Address,
                data.User_ContactNumber,
                data.User_emailid,
                data.User_Gender,
                data.User_Age,
                data.User_Password
            ],
            (error, results, fields) => {
                if (error) {
                return   callback(error);
                }
                return callback(null, results)
            }
        );
    },
    getUsers: callback => {
        pool.query(
            `SELECT User_id, User_FirstName, User_LastName, User_Address, User_ContactNumber, User_emailid, User_Gender, User_Age from User_Registration`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getUsersByUserID: (User_id, callback) => {
        pool.query(
            `SELECT User_id, User_FirstName, User_LastName, User_Address, User_ContactNumber, User_emailid, User_Gender, User_Age from User_Registration where User_id=?`,
            [
                User_id
            ],
            (error, results, fields) => {
                if (error) {
                    callback(error);
                }
                return callback(null, results[0]);
            }
        );
    },
    updateUser: (data, callback) => {
        pool.query(
            `UPDATE User_Registration set User_FirstName=?, User_LastName=?, User_Address=?, User_ContactNumber=?, User_emailid=?, User_Gender=?, User_Age=?, User_Password=? where User_id=?`,
            [
                data.User_FirstName,
                data.User_LastName,
                data.User_Address,
                data.User_ContactNumber,
                data.User_emailid,
                data.User_Gender,
                data.User_Age,
                data.User_Password,
                data.User_id
            ],
            (error, results, fields) => {
                if (error) {
                    callback(error);
                }
                return callback(null, results);
            }
        );
    },
    deleteUser: (data, callback) => {
        pool.query(
            `DELETE from User_Registration where User_id = ?`,
            [
                data.User_id
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        );
    },
    getUserByUserEmailID: (User_emailid, callback) => {
        pool.query (
            `SELECT * FROM User_Registration where User_emailid = ?`,
            [
                User_emailid
            ],
            (error, results, fields) => {
                if (error) {
                    callback(error);
                }
                return callback(null, results[0]);
            }
        );
    }   
};