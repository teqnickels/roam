const { db } = require('./db');

const deleteUser = `DELETE from user WHERE id=$1`
