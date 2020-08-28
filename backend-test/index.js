var express = require('express')
var ejs = require('ejs')
var app = express()

const options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now())
  }
}

app.use(express.static('statics', options))

app.set('views','templates');
app.set('view engine','ejs');
app.engine('ejs', ejs.__express);       //定义模板引擎

app.get('/', function (req, res) {
  res.cookie('name', 'tobi')
  res.render('index.ejs',{a:8});
})

app.listen(3000, () => {
  console.log('服务已开启')
})