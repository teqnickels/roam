const { db } = require('./db');

const getPassword = `SELECT password from user WHERE email=$1`

const
