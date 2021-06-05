const _ = require('lodash')
const express = require('express')
const users = require('./data/users.json')

const app = express()

// app.all('*', (req, res) => {
//   res.send({ message: 'Hello world' })
// })

// req.query
app.get('/users', (req, res) => {
  // ?page=2&per_page=10 // { page: 2, per_page: 10 }
  const page = Number(req.query.page) || 1
  const perPage = Number(req.query.per_page) || 30
  const offset = (page - 1) * perPage
  return res.send({
    page,
    perPage,
    total: users.length,
    data: _.slice(users, offset, offset + perPage)
    // (1 - 1) * 30 = 0
    // (2 - 1) * 30 = 30
    // (3 - 1) * 30 = 60
  })
})

// req.params
app.get('/users/:id', (req, res) => {
  const id = Number(req.params.id)
  const user = _.find(users, { id })
  if (!user) {
    res.status(404)
    return res.send({ message: 'user not found' })
  }
  return res.send({ data: user })
})

app.get('/test/string', (req, res) => {
  res.send('hello')
})

app.get('/test/html', (req, res) => {
  res.send('<h1>hello</h1>')
})

app.get('/test/json', (req, res) => {
  // res.json()
  res.send({ message: 'hello' })
})

app.get('/test/format', (req, res) => {
  res.format({
    'text/plain': () => res.send('hello'),
    'text/html': () => res.send('<h1>hello</h1>'),
    'application/json': () => res.send({ message: 'hello' })
  })
})

app.get('/test/empty', (req, res) => {
  // res.send()
  res.end()
})

app.get('/test/status', (req, res) => {
  // res.status(201).end()
  res.sendStatus(201)
})

app.get('/test/redirect', (req, res) => {
  res.redirect('http://example.com')
})

app.get('/test/download', (req, res) => {
  res.download('./data/users.json')
})

app.listen(3000, () => console.log('Web server listen at 3000'))
