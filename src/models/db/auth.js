const { db } = require('./db');
// const selectUser = 'SELECT * FROM users WHERE name = $1'
// const insertUser = `
//   INSERT INTO
//     users (name, email, access_token)
//   VALUES ($1, $2, $3, $4)
// `
// const user = {
//   find: ({ name }) => db.query( selectUser, [ name ] ),
//   create: options => {
//     const { name, email, access_token } = options
//     return db.query( insertUser, [name, email, access_token] )
//   },
// };

// will server throw err if user tokens need to be updated?
// how will I know when the server returns with new tokens? Will I know????
//try authenticate, catch error and handle error with a flow to sen to fb graph server



// module.exports = user;
