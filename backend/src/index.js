import app from './server.js'
import connection from './database.js'
import { loginRouter } from './routers/microsoft.js'
import passport from 'passport'

connection()

app.listen(app.get('port'),()=>{
    console.log(`Server ok on http://localhost:${app.get('port')}`);
})
