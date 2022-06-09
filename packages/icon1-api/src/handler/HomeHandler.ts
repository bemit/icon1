import { ExpressHandler } from '../lib/routing'
import fs from 'fs'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const HomeHandler: ExpressHandler = async(_req, res) => {
    try {
        const file = await new Promise((resolve, reject) => {
            fs.stat(__dirname + '/../demo/index.html', (e) => {
                if(e) {
                    reject()
                    return
                }
                fs.readFile(__dirname + '/../demo/index.html', {}, (e, f) => {
                    if(e) {
                        reject(undefined)
                        return
                    }
                    resolve(f.toString())
                })
            })
        })
        res.setHeader('Cache-Control', 'public, max-age=60, immutable')
        return res.send(file)
    } catch(e) {
        return res.send(`
  <!doctype HTML>
<html>
<head>
    <title>Icon1 API</title>
</head>
<body>
    <h1>Icon1 API</h1>
    <p>Checkout <a href="https://github.com/bemit/icon1">github repository</a> for code, licenses and details.</p>
</body>
</html>`)
    }
}

export default HomeHandler
