const express = require('express')
const ejs = require('ejs')
const morgan = require('morgan')
const fileUpload = require('express-fileupload')
const mongoose = require('mongoose')
const expressSession = require('express-session')
const bodyParser = require('body-parser')
const path = require('path')
const flash = require('connect-flash')
const app = new express()

require('dotenv').config()

app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(morgan())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({exntended:true}))
app.use(fileUpload())
app.use(flash())
app.use(expressSession({
    secret: 'pe86fm8o5e7m68el5y6r8lye5fr'
}))
globalloggedIn = null;
app.use("*", (req, res, next)=>{
    loggedIn = req.session.userId;
    next()
});

/////////////////////////////////////////////////////////////
// Middlewares
// const validateMiddleware = require('./middleware/validateMiddleware')
// const authMiddleware = require('./middleware/authMiddleware');
const redirectIfAuthenticated = require('./middleware/redirectIfAuthenticated')


/////////////////////////////////////////////////////////////
// DB Connection
mongoose.connect(process.env.DB_URL, {
    useUnifiedTopology:true
})
if(!mongoose){
    console.log('No DB connection')
} else {
    console.log('DB connection')
}
/////////////////////////////////////////////////////////////

const homeController = require('./controllers/home')
const aboutController = require('./controllers/about')
const contactController = require('./controllers/contact')
const sendContactFormController = require('./controllers/storeContactForm')
const registerController = require('./controllers/register')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const logoutController = require('./controllers/logout')
const profilesController = require('./controllers/profiles')
const profileController = require('./controllers/profile')
const deleteProfileController = require('./controllers/deleteProfile')
const reviewController = require('./controllers/newReview')
const storeReviewController = require('./controllers/storeReview')
const catalogController = require('./controllers/catalog')

app.listen(process.env.PORT || 3000, () => {
    console.log('App listening')
})

app.get('/', homeController)
app.get('/about', aboutController)
app.get('/contact', contactController)
app.post('/contact/post', sendContactFormController)
app.get('/auth/register', redirectIfAuthenticated, registerController)
app.post('/register/user', redirectIfAuthenticated, storeUserController)
app.get('/login', redirectIfAuthenticated, loginController)
app.post('/users/login', redirectIfAuthenticated, loginUserController)
app.get('/auth/logout', logoutController)
app.get('/profiles', profilesController)
app.get('/profile/:id', profileController)
app.delete('/profile/delete/:id', deleteProfileController)
app.get('/createReview', reviewController)
app.post('/reviews/store', storeReviewController)
app.get('/catalog', catalogController)

app.use((req, res) => res.render('notFound'))