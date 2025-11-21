const express = require('express');
const router = express.Router();
const favoritesController = require('../controllers/favorites.controller');
const authMiddleware = require("../middlewars/authMiddleware");



/**
 * @swagger
 * /:
 *   get:
 *     tags:
 *       - Favorites
 *     summary: Obtener todos los favoritos del usuario
 *     description: Devuelve la lista de elementos favoritos del usuario autenticado.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de favoritos obtenida correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *               example:
 *                 - id: 1
 *                   userId: 10
 *                   movieId: 55
 *                 - id: 2
 *                   userId: 10
 *                   movieId: 99
 *       401:
 *         description: El usuario no está autenticado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Token inválido o no proporcionado"
 *       500:
 *         description: Error interno al obtener los favoritos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error al obtener los favoritos"
 */
router.get("/", authMiddleware,favoritesController.getAllFavorites);


/**
 * @swagger
 * /:
 *   post:
 *     tags:
 *       - Favorites
 *     summary: Crear un nuevo favorito
 *     description: Crea un nuevo elemento favorito para el usuario autenticado.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - movieId
 *             properties:
 *               movieId:
 *                 type: integer
 *                 example: 42
 *     responses:
 *       201:
 *         description: Favorito creado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 10
 *                 userId:
 *                   type: integer
 *                   example: 5
 *                 movieId:
 *                   type: integer
 *                   example: 42
 *       400:
 *         description: Datos inválidos o faltantes.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "movieId es requerido"
 *       401:
 *         description: Usuario no autenticado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Token inválido o no proporcionado"
 *       500:
 *         description: Error interno al crear el favorito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error al crear el favorito"
 */

router.post('/', authMiddleware,favoritesController.createFavorite);



/**
 * @swagger
 * /:
 *   delete:
 *     tags:
 *       - Favorites
 *     summary: Eliminar un favorito
 *     description: Elimina un elemento favorito del usuario autenticado. Usualmente se envía el movieId o el id del favorito en el cuerpo.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - movieId
 *             properties:
 *               movieId:
 *                 type: integer
 *                 example: 42
 *     responses:
 *       200:
 *         description: Favorito eliminado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Favorito eliminado"
 *       400:
 *         description: Datos inválidos o faltantes.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "movieId es requerido"
 *       401:
 *         description: Usuario no autenticado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Token inválido o no proporcionado"
 *       404:
 *         description: Favorito no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "El favorito no existe"
 *       500:
 *         description: Error interno al eliminar el favorito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error al eliminar el favorito"
 */

router.delete("/",authMiddleware, favoritesController.deleteFavorite);



module.exports = router;
