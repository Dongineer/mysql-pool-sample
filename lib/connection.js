let mysql = require('mysql')
const config = require('./config/dbConfig')

let connection = ''
const __getConnection = () => {
  if (!connection) {
    connection = mysql.createConnection(config)
    return connection
  }
  return connection
}

module.exports = __getConnection