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

module.exports = {
    findAllUsers, findUserById, createUser, deleteUser, updateUser, findUserByCredentials
};