const pgp = require('pg-promise')();
const connectionString = 'postgres:///roam'
const db = pgp(connectionString)

/**
 * Update the users table with given fields and values
 * @param {object} userUpdates - object with db fields to update and their values
 * @returns {Promise} - Promise which resolves to new values of user

 example input: 
    {
        id: 4,
        first_name: 'Kelcey',
        last_name: 'Wilson'
    }

 */
function updateUser(userUpdates) {
    updateFields = Object.keys(userUpdates)
    let query = 'UPDATE users SET '
    const fields = []
    updateFields.forEach(field => {
        if (field !== 'id') fields.push(`${field}=\$/${field}/`)
        // ' first_name=$/first_name/'
    })
    query += fields.join(', ')
    query += ' WHERE id=$/id/ RETURNING *'
    console.log('query', query)
    return db.query(query, userUpdates)
}

const  data =  {
    id: 2,
    first_name: 'Kelcey',
    last_name: 'Wilson'
}

updateUser(data)
    .then(console.log)
    .catch(console.error)