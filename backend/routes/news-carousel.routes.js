const express = require('express');
const router = express.Router();
const newsCarouselCtrl = require('../controllers/news-carousel.controller');
const userCtrl = require('../controllers/user.controller');
const authCtrl = require('../controllers/auth.controller');

// Ruta para crear un nuevo elemento del carrusel de noticias
router.post('/api/news-carousel', authCtrl.requireSignin, userCtrl.isAdmin, newsCarouselCtrl.create);

// Ruta para obtener la lista de elementos del carrusel de noticias
router.get('/api/news-carousel', newsCarouselCtrl.list);

// Ruta para obtener, actualizar y eliminar un elemento del carrusel de noticias por ID
router.route('/api/news-carousel/:newsId')
  .get(newsCarouselCtrl.read)
  .put(authCtrl.requireSignin, userCtrl.isAdmin, newsCarouselCtrl.update)
  .delete(authCtrl.requireSignin, userCtrl.isAdmin, newsCarouselCtrl.remove);

// Middleware para obtener el elemento del carrusel de noticias por ID
router.param('newsId', newsCarouselCtrl.newsByID);

module.exports = router;
