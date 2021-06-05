const _ = require('lodash')
const faker = require('faker')
const fs = require('fs')
const path = require('path')

const saveFileTo = path.resolve(__dirname, './data/users.json')
const users = []

for (const i of _.range(100)) {
  const user = {
    id: i + 1,
    name: faker.name.findName(),
    age: _.random(18, 35),
    gender: _.sample(['male', 'female']),
    salary: _.random(10, 50) * 1000
  }
  users.push(user)
}

fs.writeFileSync(saveFileTo, JSON.stringify(users))
