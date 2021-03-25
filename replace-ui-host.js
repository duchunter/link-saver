require('dotenv').config();

const fs = require('fs')

const jsFolder = './dist/js'
const isDev = process.env.NODE_ENV !== 'prod'
const localhost = 'http://localhost:3000'
const localhostClient = 'http://localhost:8080'
const prodHost = 'https://gp-linksaver.herokuapp.com'

fs.readdir(jsFolder, (err, files) => {
    if (err) {
        throw err
    }
    files.forEach(file => {
        const filepath = `${jsFolder}/${file}`
        fs.readFile(filepath, 'utf8', (err, content) => {
            if (err) {
                throw err
            }
            
            if (isDev) {
                console.log(`Replace host to local in ${filepath}`)
                newContent = content.split(prodHost).join(localhost)
                newContent = content.split(localhostClient).join(localhost)
            } else {
                console.log(`Replace host to production in ${filepath}`)
                newContent = content.split(localhost).join(prodHost)
                newContent = content.split(localhostClient).join(prodHost)
            }
            
            fs.writeFile(filepath, newContent, (err) => {
                if (err) {
                    throw err
                }
            })
        })
    })
})
