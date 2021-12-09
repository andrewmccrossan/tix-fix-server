const model = require('./users-model');

const findAllUsers = () =>
    model.find();

const findUserByCredentials = (username, password) =>
    model.find({username: username, password: password});

const findUserById = (id) =>
    model.findById(id);

const createUser = (user) =>
    model.create(user);

const deleteUser = (id) =>
    model.deleteOne({_id: id});

const updateUser = (id, updatedUser) =>
    model.updateOne({_id: id},
                    {$set: updatedUser});

const updateUserDetails = (id, userInfo) =>
    model.updateOne(
        { _id: id},
        { $set:
                {
                    firstName: userInfo.firstName,
                    lastName: userInfo.lastName,
                    email: userInfo.email,
                    zip: userInfo.zip,
                }
        });

const findUserByUsername = (username) =>
    model.find({username: username});

module.exports = {
    findAllUsers, findUserById, createUser, deleteUser, updateUser, findUserByCredentials,
    findUserByUsername, updateUserDetails
};