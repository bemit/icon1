import { iconListMaker } from './icon1/iconListMaker.js'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url));

(() => {
    const args = process.argv.slice(2)
    const command = args[0]
    switch(command) {
        case 'build-icon-list':
            iconListMaker(__dirname + '/data')
            break
    }
})()
