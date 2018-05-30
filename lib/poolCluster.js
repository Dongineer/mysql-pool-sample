const mysql = require('mysql')
const MysqlPoolBooster = require('mysql-pool-booster')

const { mysql: mysqlConfig } = require('./config/dbConfig')

mysql = MysqlPoolBooster(mysql)
let cluster = ''
const __getPool = () => {
  if (!cluster) {
    cluster = mysql.createPoolCluster({ nodes: mysqlConfig })
    return cluster
  }
  return cluster
}

module.exports = function DBConnection(action, target) {
  return new Promise((resolve, reject) => {
    const pool = __getPool()
    if (action === 'reader') {
      pool.getReaderConnection(target, (err, conn) => {
        if (err) {
          reject(err)
        } else {
          resolve(conn)
        }
      })
    } else if (action === 'writer') {
      pool.getWriterConnection((err, conn) => {
        if (err) {
          console.log(err)
          reject(err)
        } else {
          resolve(conn)
        }
      })
    }
  })
}
