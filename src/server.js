import http from 'node:http'
import { json } from './middlewares/json.js'

const users = []

const server = http.createServer(async (req, res) => {
  const { url, method } = req

  await json(req, res)

  if (url === '/users' && method === 'GET') {
    return res.end(JSON.stringify(users))
  }

  if (url === '/users' && method === 'POST') {
    const { name, email } = req.body
    
    users.push({
      name,
      email
    })

    return res.writeHead(201).end()
  }

  return res.writeHead(404).end()
})

server.listen(3333, () => {
  console.log('Server is running on port 3333')
})