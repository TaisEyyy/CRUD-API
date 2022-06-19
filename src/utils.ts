import fs from 'fs'

function writeDataToFile(filename: any, content: any) {
  console.log(filename)
  fs.writeFileSync(filename, JSON.stringify(content))
}

function getPostData(req: any) {
  return new Promise((resolve, reject) => {
    try {
      let body = ''
      req.on('data', (chunk: any) => {
        body += chunk.toString()
      })

      req.on('end', () => {
        resolve(body)
      })

    } catch (error) {
      reject(error)
    }
  })
}

module.exports = {
  writeDataToFile,
  getPostData
}