
const path = require('path');

module.exports = {
    resolve: {
        alias: {
            '@icon1/core': path.resolve(__dirname, './icon1-core/src'),
'@icon1/mui': path.resolve(__dirname, './icon1-mui/src'),
'@icon1/react': path.resolve(__dirname, './icon1-react/src'),

        }
    }
}