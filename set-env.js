const fs = require('fs')

fs.readFile('./dist-server/bin/www.js', 'utf8', (err, content) => {
  if (err) {
    throw err
  }

  const newContent = content.replace('"use strict";', `"use strict"; \n require('dotenv').config();`)

  fs.writeFile('./dist-server/bin/www.js', newContent, (err) => {
    if (err) {
      throw err
    }
  })
})
