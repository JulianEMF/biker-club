const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');
const multer = require('multer');
const dotenv = require('dotenv');
const cors = require('cors');

const errorMiddleware = require('./middleware/error');
// const User = require('./models/User');

// Express instanstiation
const app = express();

app.use(cors({
    origin: 'http://localhost:3000'
}));

// Access to environmental variables
dotenv.config();

// Session store configuration
const MONGODB_URI = process.env.MONGO_URI;
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
});

// File storage configuration for multer
// const fileStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'images');
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now().toString() + '-' + file.originalname)
//     }
// });

// File filter for multer
// const fileFilter = (req, file, cb) => {
//     if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
//         cb(null, true);
//     } else {
//         cb(null, false);
//     }
// };

// Encoding middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Session middleware
const SECRET = process.env.SESSION_SECRET;
app.use(session(
    {
        secret: SECRET, 
        resave: false, 
        saveUninitialized: false,
        store: store
    }
));

// Cross Site Request Forgery Middleware
// const csrfProtection = csrf();
// app.use(csrfProtection);

// This middleware will attach a token for every request
// app.use((req, res, next) => {
//     res.locals.isAuthenticated = req.session.isLoggedIn;
//     res.locals.csrfToken = req.csrfToken();
//     next();
// })

// Flash middleware
app.use(flash());

// This middleware will find the current user and make it available for all requests
app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    User.findById(req.session.user._id)
    .then(user => {
        req.user = user;
        next();
    })
    .catch(err => {
        next(new Error(err));
    });
});

// Routes
// const adminRoutes = require('./routes/admin');
// const shopRoutes = require('./routes/shop');
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/order');
const uploadRoutes = require('./routes/upload');
// app.use('/admin', adminRoutes);
// app.use(shopRoutes);
app.use('/user', userRoutes);
app.use('/products', productRoutes);
app.use('/order', orderRoutes);
app.use('/upload', uploadRoutes);

// Image storage middleware
// app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')); 
const dirname = path.resolve();
// app.use(express.static(path.join(dirname, 'public')));
// app.use(express.static(path.join(dirname, 'images')));
app.use('/images', express.static(path.join(dirname, '/images')));

// No page found middleware
app.use(errorMiddleware.get404);

// Server
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV;
mongoose
.connect(MONGODB_URI)
.then(result => {   
    app.listen(PORT, () => console.log(`Server running on ${NODE_ENV} mode on port: ${PORT}`));
})
.catch(err => console.log("Difficulties connecting to the database", err)
);