const http = require('http')
import dotenv from 'dotenv'
import { getUsers, getUser, createUser, updateUser, deleteUser } from './controllers/usersController'

dotenv.config()

const PORT = process.env.PORT || 5000

const server = http.createServer(async (req: any, res: any) => {
 
  if (req.url === "/api" && req.method === "GET") {     
    getUsers(req, res)
  } else if(req.url.match(/\/api\/([0-9]+)/) && req.method === 'GET'){
    const id: any = req.url.split('/')[2]
    getUser(req, res, id)
  } else if(req.url.match(/\/api\/([a-z0-9-]+)/) && req.method === 'PUT'){
    const id: any = req.url.split('/')[2]
    updateUser(req, res, id)
  } else if(req.url === "/api" && req.method === "POST") {
    createUser(req, res)
  } else if(req.url.match(/\/api\/([a-z0-9-]+)/) && req.method === 'DELETE'){
    const id: any = req.url.split('/')[2]
    deleteUser(req, res, id)
 
  } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Route not found" }));
  }
});

server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});
