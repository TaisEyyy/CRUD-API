const Users = require('../modules/usersModule')
const { getPostData } = require('../utils.ts')

export async function getUsers(req: any, res: any) {
  try {
    const users = await Users.findAll()

    res.writeHead(200, { "Content-Type": "application/json" });      
    res.end(JSON.stringify(users));
  } catch (error) {
    console.log(error)
  }
  
}

export async function getUser(req: any, res: any, id: any) {
  try {
    const user = await Users.findById(id)
    if(!user) {
      res.writeHead(404, { "Content-Type": "application/json" });      
      res.end(JSON.stringify({ message: "User not found" }));
    } else{
      res.writeHead(200, { "Content-Type": "application/json" });      
      res.end(JSON.stringify(user));
    }

  } catch (error) {
    console.log(error)
  }
  
}

export async function createUser(req: any, res: any) {
  try {
    
    const body = await getPostData(req)

    const { username, age, hobbies } = JSON.parse(body)

    const user = {
      username,
      age,
      hobbies
    }
    const newUser = await Users.createUser(user)

    res.writeHead(201, { "Content-Type": "application/json" })
    return res.end(JSON.stringify(newUser))

  } catch (error) {
    console.log(error)
  }    
}

export async function updateUser(req: any, res: any, id: any) {
  try {
    const user = await Users.findById(id)

    if(!user) {
      res.writeHead(404, { "Content-Type": "application/json" });      
      res.end(JSON.stringify({ message: "User not found" }));
    } else {
      const body = await getPostData(req)

      const { username, age, hobbies } = JSON.parse(body)

      const userData = {
        username: username || Users.username,
        age: age || Users.age,
        hobbies: hobbies || Users.hobbies
      }
      const updUser = await Users.updateUser(id, userData)

      res.writeHead(200, { "Content-Type": "application/json" })
      return res.end(JSON.stringify(updUser))

    }
    
  } catch (error) {
    console.log(error)
  }    
}

export async function deleteUser(req: any, res: any, id: any) {
  try {
    const user = await Users.findById(id)
    if(!user) {
      res.writeHead(404, { "Content-Type": "application/json" });      
      res.end(JSON.stringify({ message: "User not found" }));
    } else{
      await Users.remove(id)
      res.writeHead(200, { "Content-Type": "application/json" });      
      res.end(JSON.stringify({ message: `User ${id} removed` }));
    }


  } catch (error) {
    console.log(error)
  }
  
}