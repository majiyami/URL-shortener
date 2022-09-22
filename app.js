const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
require('./config/mongoose')
const URLdata = require('./moduls/URLdata')

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.urlencoded({ extended: true }))

//設定靜態服務
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {

  const inputURL = req.body.inputURL
  let shortUrl
  URLdata.findOne({ inputURL, inputURL })
    .lean()
    .then(url => {
      if (url) {
        shortUrl = url.shortURL
      } else {
        shortUrl = shortURLGenerator()
        URLdata.create({
          inputURL: inputURL, shortURL: shortUrl
        })
      }

    })
    .then(() => {
      res.render('copypage', {
        //localhost:3000/+shortURL
        shortUrl: req.headers.host + '/' + shortUrl})
    })

    .catch(error => console.log(error))

})

app.get('/:shortURL', (req, res) => {
  URLdata.findOne({ shortURL: req.params.shortURL })
    .lean()
    .then(url => res.redirect(url.inputURL))
})

function shortURLGenerator() {
  let string = 'abcdefghijklmnopqrstuvwxyz'
  let upperstring = string.toUpperCase()
  let number = '1234567890'
  const randombase = string + upperstring + number
  let result = ''
  for (let i = 0; i < 5; i++) {
    const randomindex = Math.floor(Math.random() * randombase.length)
    result += randombase[randomindex]
  }
  return result

}

app.listen(port, () => console.log('server running on http://localhost:3000/'))