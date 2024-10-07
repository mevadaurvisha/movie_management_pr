const express = require('express');
const router = express.Router();
const upload = require('../config/multerConfig');
const controller = require('../controllers/controller');

router.get('/', controller.defaultController);
router.get('/add', controller.addMovie);
router.post('/', upload.single('poster'), controller.addMovieController);
router.get('/edit/:id', controller.editMovie);
router.post('/update/:id', upload.single('poster'), controller.updateMovie);
router.get('/delete/:id', controller.deleteMovie);

module.exports = router;