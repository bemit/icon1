const path = require('path');
const {packer, webpack} = require('lerna-packer');
const {makeModulePackageJson, copyRootPackageJson, transformForEsModule} = require('lerna-packer/packer/modulePackages');

packer(
    {
        apps: {
            demo: {
                root: path.resolve(__dirname, 'packages', 'demo'),
                template: path.resolve(__dirname, 'packages', 'demo/public/index.html'),
                contentBase: path.resolve(__dirname, 'packages', 'demo/public'),// dev-server
                port: 3000,
                main: path.resolve(__dirname, 'packages', 'demo/src/index.js'),
                dist: path.resolve(__dirname, 'dist', 'demo'),
                servedPath: '/',// todo: make package.json homepage dependent,
                plugins: [
                    new webpack.DefinePlugin({
                        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
                        'process.env.NODE_DEBUG': JSON.stringify(process.env.NODE_ENV),
                        'process.env.REACT_APP_ICON1_API': JSON.stringify(process.env.REACT_APP_ICON1_API),
                    }),
                ],
            },
        },
        backends: {
            icon1Api: {
                root: path.resolve(__dirname, 'packages', 'icon1-api'),
                src: 'src',
                entry: 'server.js',
            },
        },
        packages: {
            // the keys are the commonjs names that is applied to externals
            // this is the same as `@babel/plugin-transform-modules-commonjs` applies
            icon1Core: {
                name: '@icon1/core',
                root: path.resolve(__dirname, 'packages', 'icon1-core'),
                entry: path.resolve(__dirname, 'packages', 'icon1-core/src/'),
            },
            icon1Mui: {
                name: '@icon1/mui',
                root: path.resolve(__dirname, 'packages', 'icon1-mui'),
                entry: path.resolve(__dirname, 'packages', 'icon1-mui/src/'),
            },
            icon1React: {
                name: '@icon1/react',
                root: path.resolve(__dirname, 'packages', 'icon1-react'),
                entry: path.resolve(__dirname, 'packages', 'icon1-react/src/'),
            },
        },
    },
    __dirname,
    {
        pathBuild: 'build',
        pathPackages: 'packages',
        afterEsModules: (packages, pathBuild) => {
            return Promise.all([
                makeModulePackageJson(transformForEsModule)(packages, pathBuild),
                copyRootPackageJson()(packages, pathBuild),
            ])
        },
    },
)
    .then(([execs, elapsed]) => {
        if(execs.indexOf('doServe') !== -1) {
            console.log('\x1b[34m[packer] is now serving (after ' + elapsed + 'ms)\x1b[0m', execs)
        } else {
            console.log('\x1b[32m[packer] finished successfully (after ' + elapsed + 'ms)\x1b[0m', execs)
            process.exit(0)
        }
    })
    .catch((e) => {
        console.error('\x1b[41m[30m[packer] finished with error(s)\x1b[0m', e)
        process.exit(1)
    })

