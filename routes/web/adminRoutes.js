/** Views routes
 * @module routers/admin
 * @requires express express.Router()
 */

const express = require('express');

const adminController = require('../../controllers/web/adminController');

const router = express.Router();

router.get('/', adminController.getIndex);

router.get('/settings', adminController.getGeneralSettings);

router.get('/settings/informations', adminController.getInformationSettings);

router.get('/settings/password', adminController.getPasswordSettings);

router.get('/templates');

router.get('/emargements');

router.get('/apprenants');

router.get('/promotions');

module.exports = router;