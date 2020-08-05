const express  = require('express');
const multer   = require('multer');
const { body } = require('express-validator');

const isAuth = require('../middleware/is-auth');

const adminController = require('../controllers/adminController');

const router = express.Router();

/** Views routes
 * @module routers/admin
 * @requires express express.Router()
 */

// storage uploaded file
const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
});

// filter image by extension
const imageFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

// multer middleware
const uploadImage = multer({ storage: imageStorage, fileFilter: imageFilter }).single('image');

/**
 * Return view with all generated pdf
 * @name getDashboard GET
 * @function
 * @memberof module:routers/admin
 * @param {string} 'admin/dashboard' - uri
 * @param {function} adminController.getDashboard
 */
router.get('/dashboard', isAuth, adminController.getDashboard);


/**
 * Create template for sign-off sheet PDF
 * @name addtemplate POST
 * @function
 * @memberof module:routers/admin
 * @param {string} 'admin/addtemplate' - uri
 * @param {function} adminController.addtemplate
 */
router.post(
    '/addtemplate',
    isAuth,
    uploadImage,
    [
        body('name', 'Veuillez renseigner un nom pour le template')
            .not()
            .isEmpty(),
        body('intitule', 'Veuillez renseigner l\'intitulé')
            .not()
            .isEmpty(),
        body('organisme', 'Veuillez renseigner un organisme de formation')
            .not()
            .isEmpty(),
    ],
    adminController.addtemplate
);


/**
 * Generate Sign-off Sheet PDF
 * @name postSignOffShettPdf POST
 * @function
 * @memberof module:routers/admin
 * @param {string} 'admin/signoffsheet' - uri
 * @param {function} adminController.postSignOffShettPdf
 */
router.post(
    '/signoffsheet', 
    isAuth,
    adminController.postSignOffShettPdf
);

module.exports = router;