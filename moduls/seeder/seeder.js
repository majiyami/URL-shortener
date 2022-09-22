const db = require('../../config/mongoose')
const URLdata = require('../URLdata')
const data = require('./URLdata.json')

db.once('open', () => {
  URLdata.create(data)
    .then(() => { console.log('urlShortenSeeder done.') })
    .catch(error => console.log(error))
    .finally(() => db.close())
})