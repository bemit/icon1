import app from './function.js'

app.listen(process.env.PORT || 3030, () => {
    console.log('Server started on port http://localhost:' + (process.env.PORT || 3030))
})
