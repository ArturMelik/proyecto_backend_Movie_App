const express = require("express");
const moviesWebController = require("../controllers/moviesWeb.controller");
const router = express.Router();

//Dashboard



/**
 * @swagger
 * /dashboard:
 *   get:
 *     tags:
 *       - Web
 *     summary: Renderizar el dashboard de películas
 *     description: Renderiza la vista del dashboard principal con el listado de películas u otra información relevante.
 *     responses:
 *       200:
 *         description: Vista del dashboard renderizada correctamente.
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *               example: "<html>Contenido del dashboard</html>"
 *       500:
 *         description: Error al renderizar el dashboard.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error al cargar el dashboard"
 */
router.get("/dashboard", moviesWebController.renderDashboard);

/**
 * @swagger
 * /favoritos:
 *   get:
 *     tags:
 *       - Web
 *     summary: Renderizar la vista de favoritos
 *     description: Muestra la página web donde se visualizan los favoritos del usuario.
 *     responses:
 *       200:
 *         description: Vista de favoritos renderizada correctamente.
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *               example: "<html>Contenido de la vista de favoritos</html>"
 *       500:
 *         description: Error al renderizar la vista de favoritos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error al cargar la página de favoritos"
 */
router.get("/favoritos", moviesWebController.renderFavoritos);



//Search

/**
 * @swagger
 * /search:
 *   get:
 *     tags:
 *       - Web
 *     summary: Renderizar la página de búsqueda
 *     description: Renderiza la vista donde el usuario puede realizar búsquedas de películas.
 *     responses:
 *       200:
 *         description: Vista de búsqueda renderizada correctamente.
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *               example: "<html>Contenido de la vista de búsqueda</html>"
 *       500:
 *         description: Error al renderizar la vista de búsqueda.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error al cargar la página de búsqueda"
 */
router.get("/search",moviesWebController.renderSearch);

// Página detalle de película

/**
 * @swagger
 * /search/{title}:
 *   get:
 *     tags:
 *       - Web
 *     summary: Mostrar detalles de una película por título
 *     description: Renderiza la vista de detalles de una película buscada por su título.
 *     parameters:
 *       - in: path
 *         name: title
 *         required: true
 *         schema:
 *           type: string
 *         description: Título de la película a buscar.
 *         example: "Inception"
 *     responses:
 *       200:
 *         description: Vista de detalles de la película renderizada correctamente.
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *               example: "<html>Detalle de la película</html>"
 *       404:
 *         description: Película no encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Película no encontrada"
 *       500:
 *         description: Error al renderizar la vista de detalles de la película.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error al cargar los detalles de la película"
 */

router.get("/search/:title", moviesWebController.renderMovieDetail);


module.exports = router;

