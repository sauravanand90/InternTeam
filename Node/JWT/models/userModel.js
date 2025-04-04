const users = [];
const addUser = (user) => users.push(user);
const getUser = (username) => users.find(user => user.username === username);

module.exports = {addUser,getUser};