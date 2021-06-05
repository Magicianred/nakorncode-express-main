const http = require('http')

// req = request  <-- header accept
// res = response <-- header content-type
const server = http.createServer((req, res) => {
  console.log(req.method, req.url)
  if (req.headers.accept?.includes('application/json')) {
    res.setHeader('content-type', 'application/json')
    res.end(JSON.stringify({ message: 'Hello world!' }))
    return
  }
  if (req.headers.accept?.includes('text/html')) {
    res.setHeader('content-type', 'text/html')
    res.end('<h1>Hello world!</h1>')
    return
  }
  res.end('not match with any accept')
})

server.listen(3000, () => console.log('Web server listen at 3000'))
