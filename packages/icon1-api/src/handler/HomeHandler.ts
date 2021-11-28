import { ExpressHandler } from '../lib/routing'

const HomeHandler: ExpressHandler = async(_req, res) => {
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

export default HomeHandler
