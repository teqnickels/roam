const { db } = require('./db');

const deleteUser = `DELETE from user WHERE id=$1`

const getUser = `SELECT first_name, last_name, address, city, state, zip from user WHERE id=$1`
