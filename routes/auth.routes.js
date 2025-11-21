const express = require('express');
const router = express.Router();
const passport = require('passport'); 
const authControllers = require('../controllers/auth.controller');
const authMiddleware = require('../middlewars/authMiddleware');
const authorizeRole = require('../middlewars/roleMiddleware');


//Ruta Signup
router.get('/signup', (req, res) => res.render('signup'));
router.post('/signup', authControllers.signUp);

// Redirigir de / a /login
router.get('/', (req, res) => res.redirect('/login'));

router.get('/login', (req, res) => res.render('login'));
router.post('/login', authControllers.login);

// Ruta para iniciar sesión con Google
router.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'], prompt: 'select_account' }));

// Callback de Google
router.get("/google/callBack",
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        res.cookie('token', req.user.token, { httpOnly: true });
        const redirectUrl = req.user.user.role === 'admin' ? '/admin/dashboard' : '/user/dashboard';
        res.redirect(redirectUrl);
    }
);
//router.get('/logout', authControllers.logout);
// router.get('/logout', (req, res) => {
//     req.logout((err) => {
//         if (err) return next(err);
//         req.session.destroy(() => {
//             res.clearCookie('connect.sid'); // Eliminar la cookie de sesión
//             res.clearCookie('token'); // Eliminar el token JWT
//             res.redirect('/login');
//         });
//     });
// });




/**
 * @swagger
 * /logout:
 *   get:
 *     tags:
 *       - Auth
 *     summary: Cerrar sesión del usuario
 *     description: Cierra la sesión del usuario eliminando la cookie de autenticación y redirige al login.
 *     responses:
 *       302:
 *         description: Redirección al login después de cerrar sesión
 *         headers:
 *           Location:
 *             description: URL de redirección
 *             schema:
 *               type: string
 *               example: /login
 *       200:
 *         description: OK (solo si no hay redirección)
 *       500:
 *         description: Error al cerrar sesión
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error al cerrar sesión"
 */
//Log out
router.get('/logout', (req, res) => {
    // Si hubiera una sesión, la destruimos (opcional)
    if (req.session) {
        req.session.destroy(() => {});
    }

    // Borrar cookies
    res.clearCookie('token');
    res.clearCookie('connect.sid');  

    // Redirigir al login
    return res.redirect('/login');
});



/**
 * @swagger
 * /user/dashboard:
 *   get:
 *     tags:
 *       - Users
 *     summary: Dashboard del usuario
 *     description: Renderiza la vista del dashboard para usuarios con rol 'user'.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard renderizado correctamente
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *               example: "<html>Contenido del dashboard del usuario</html>"
 *       401:
 *         description: No autenticado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No autorizado"
 *       403:
 *         description: Rol insuficiente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Acceso denegado: rol insuficiente"
 */
router.get('/user/dashboard', authMiddleware, authorizeRole('user'), (req, res) => {
    res.render('userDashboard', { role: 'user' });
});

/**
 * @swagger
 * /admin/dashboard:
 *   get:
 *     tags:
 *       - Admin
 *     summary: Panel de administración
 *     description: Renderiza el dashboard de administrador. Solo accesible para usuarios con rol "admin".
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard del administrador renderizado correctamente.
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *               example: "<html>Contenido del dashboard admin</html>"
 *       401:
 *         description: Usuario no autenticado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No autorizado"
 *       403:
 *         description: Acceso denegado. El usuario no tiene el rol adecuado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Acceso denegado: rol insuficiente"
 */

router.get('/admin/dashboard', authMiddleware, authorizeRole('admin'), (req, res) => {
    res.render('adminDashboard', { role: 'admin' });
});


module.exports = router;


