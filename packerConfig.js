const path = require('path');
const {buildExternal, packer, webpack} = require('lerna-packer');

const apps = {
    demo: {
        root: path.resolve(__dirname, 'packages', 'demo'),
        template: path.resolve(__dirname, 'packages', 'demo/public/index.html'),
        publicPath: path.resolve(__dirname, 'packages', 'demo/public'),// dev-server
        port: 3000,
        main: path.resolve(__dirname, 'packages', 'demo/src/index.js'),
        dist: path.resolve(__dirname, 'dist', 'demo'),
        servedPath: '/',// todo: make package.json homepage dependent,
        vendors: [],
        plugins: [],
    },
};

const backends = {
    icon1Api: {
        root: path.resolve(__dirname, 'packages', 'icon1-api'),
        src: 'src',
        entry: 'server.js',
    },
};

const packages = {
    // the keys are the commonjs names that is applied to externals
    // this is the same as `@babel/plugin-transform-modules-commonjs` applies
    icon1Core: {
        name: '@icon1/core',
        root: path.resolve(__dirname, 'packages', 'icon1-core'),
        entry: path.resolve(__dirname, 'packages', 'icon1-core/src/'),
        externals: {
            react: buildExternal('react'),
            'react-dom': buildExternal('react-dom'),
        },
    },
    icon1Mui: {
        name: '@icon1/mui',
        root: path.resolve(__dirname, 'packages', 'icon1-mui'),
        entry: path.resolve(__dirname, 'packages', 'icon1-mui/src/'),
        externals: {
            react: buildExternal('react'),
            'react-dom': buildExternal('react-dom'),
        },
    },
    icon1React: {
        name: '@icon1/react',
        root: path.resolve(__dirname, 'packages', 'icon1-react'),
        entry: path.resolve(__dirname, 'packages', 'icon1-react/src/'),
        externals: {
            react: buildExternal('react'),
            'react-dom': buildExternal('react-dom'),
        },
    },
};

packer(
    {apps, backends, packages},
    __dirname,
);
