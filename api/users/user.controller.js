const { create, getUsers, getUsersByUserID, updateUser, deleteUser, getUserByUserEmailID } = require("./user.service");

const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");


module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.User_Password = hashSync(body.User_Password, salt);
        create(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database Connection Error"
                });
            }
            return res.status(200).json ({
                success: 1,
                data: results
            });
        });
    },
    getUsersByUserID: (req,res) => {
        const User_id = req.params.User_id;
        getUsersByUserID(User_id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json ({
                    success: 0,
                    message: "Record Not Found"
                });
            }
            return res.json ({
                success: 1,
                data: results
            });
        });
    },
    getUsers: (req, res) => {
        getUsers((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json ({
                    success: 0,
                    messag: "Record Not Found"
                });
            }
            return res.json ({
                success: 1,
                data: results
            });
        });
    },
    updateUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.User_Password = hashSync(body.User_Password, salt);
        updateUser(body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json ({
                    success: 0,
                    message: "Failed to Update User"
                });
            }
            return res.json ({
                success: 1,
                message: "Updated Successfully"
            });
        });
    },
    deleteUser: (req,res) => {
        const data = req.body;
        deleteUser(data, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json ({
                    success: 0,
                    message: "Record Not Found"
                });
            }
            return res.json ({
                success: 1,
                message: "User Deleted Successfully"
            });
        });
    },
    login: (req, res) => {
        const body = req.body;
        getUserByUserEmailID(body.User_emailid, (err, results) => {
            if (err) {
                console.log(err);
            }
            if (!results)  {
                return res.json({
                    success: 0,
                    data: "Invalid email or password"
                });
            }
            const result = compareSync (body.User_Password, results.User_Password);
            if (result) {
                results.User_Password = undefined;
                const jsontoken = sign ({ result: results }, "0909abc", {
                    expiresIn: "1 Hour"
                });
                return res.json ({
                    success: 1,
                    message: "Login Successfully",
                    token: jsontoken
                });
            } else {
                return res.json ({
                    success: 0,
                    data: "Invalid email or password"
                });
            }
        });
    }
};