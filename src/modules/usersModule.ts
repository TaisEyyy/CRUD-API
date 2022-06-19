let users = require('../users.json')
const { v4: uuidv4 } = require('uuid')

const { writeDataToFile } = require('../utils.ts')

function findAll() {
  return new Promise((resolve, reject) => {
    resolve(users)
  })
}

function findById(id: any) {
  return new Promise((resolve, reject) => {
    const user = users.find((u: any) => u.id === id)
    console.log(user)
    resolve(user)
  })
}

function createUser(user: any) {
  return new Promise((resolve, reject) => {
    const newUser = {id:uuidv4(), ...user}
    users.push(newUser)
    writeDataToFile('./src/users.json', users)
    resolve(newUser)
  })
}

function updateUser(id: any, user: any) {
  return new Promise((resolve, reject) => {
    const index = users.findIndex((u: any) => u.id === id)
    users[index] = { id, ...user }

    writeDataToFile('./src/users.json', users)
    resolve(users[index])
  })
}

function remove(id: any) {
  return new Promise((resolve, reject) => {
    users = users.filter((u: any) => u.id !== id)
    writeDataToFile('./src/users.json', users)
    resolve('Successfully deleted')
  })
}


export {
  findAll,
  findById,
  createUser,
  updateUser,
  remove
}