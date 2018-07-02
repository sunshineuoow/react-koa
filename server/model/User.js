const { query } = require('../lib/mysql')

class User {
  // 添加用户
  async addUser(values) {
    const _sql = 'INSERT INTO users(name, pass, phone, email) values(?, ?, ?, ?);'
    return query(_sql, values)
  }

  // 查找用户
  async findUser(account) {
    const _sql = `SELECT * FROM users WHERE phone='${account}' OR name='${account}';`
    return await query(_sql)
  }
}

module.exports = new User()
