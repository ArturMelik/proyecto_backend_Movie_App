#  🎥 Proyecto backend: Movie App

![header](public/assets/header_readme.png)

## ⭐️ Introducción

Este proyecto consiste en el desarrollo de una aplicación web dedicada a la búsqueda, visualización y gestión de películas. A lo largo de su implementación se aplican los conceptos fundamentales de Frontend y Backend trabajados en clase, integrando ambos lados para ofrecer una experiencia completa al usuario.

## 📑 Requisitos del proyecto

Se pide desarrollar una aplicación web de búsqueda y gestión de películas que contemple las siguientes funcionalidades y endpoints asociados. Trabajaremos sobre los conceptos vistos de Frontend y Backend en clase

**Aclaración inicial previa**: La app tendrá dos roles distintos: `Usuario y Administrador`. Las funcionalidades que aparecerán tanto en el panel de control como en el resto de endpoints variarán dependiendo del tipo de usuario, no pudiendo nunca acceder a aquellas zonas o contenidos que no le corresponden.

## 📄 Instrucciones
### 1. Clona el repertorio 

```bash
git clone https://github.com/tu-usuario/movie-app.git
```

### 2. Instalar dependendias

```bash
npm install
```

### 3. Configurar variables de entorno


```bash
#Base de datos de Mongo
MY_MONGO_URI=
NODE_ENV=
PG_USER=
PG_PASSWORD=
PG_PORT=

#Api key Peliculas
MY_API_KEY=

#JWT 
JWT_SECRET=

#Google OAuth
CLIENT_ID=
CLIENT_SECRET=
GOOGLE_CALLBACK_URL=

#Passport
SESSION_SECRET=
```
### 5. Iniciar el servidor:
```bash
npm start
```

## ⛓️‍💥 Endpoints y Rutas

## 1.Registro de Usuario
   - URL: `/signup`
   - Método: `POST`
   - Descripción: Crea un nuevo usuario. Puedes elegir entre ser `user` o `admin`.

Ejemplo de Payload:
   ```json
   {
     "userName": "user1",
     "email": "user1@example.com",
     "role": "admin",
     "password": "mypassword"
   }
   ```

## 2. Inicio de Sesión
   - URL: `/login`
   - Método: `POST`
   - Descripción: Autentica al usuario para permitirle guardas peliculas

   Ejemplo de Payload:
   ```json
   {
     "userName": "user1",
     "password": "mypassword"
   }
   ```
## 4. Buscar pelicula
   - URL: `/api/movie`
   - Método: `GET`
   - Descripción: Permite buscar una pelicula tanto por titulo genérico o título exacto.

   Ejemplo de Payload título exacto:
   ```url
    http://localhost:3000/api/movie/avatar
   ```

   Ejemplo de Payload título genérico:
   ```url
    http://localhost:3000/api/movie/all/Avatar
   ```

## 4. Crear pelicula
   - URL: `/api/movie`
   - Método: `POST`
   - Descripción: Permite crear una pelicula al administrador. 

   Ejemplo de Payload:
   ```json
    {
  "Title":"Titulo",
  "Year":2019,
  "Runtime":"98m",
  "Genre":"Genero",
  "Director":"Nombre del director",
  "Actors":"Nombre de los actores",
  "Plot":"Descripción de la pelicula",
  "Country":"España",
  "Poster":"URL del postes",
  "imdbRating":7.9,
  "Opinions":"Opiniones"
  }
   ```

## 🛠️ Herramientas
- JavaScript
- CSS
- HTML
- Bases de datos:
  - PostgreSQL
  - MongoDB
- Express.js
- Node.js

## 📚 Librerías 
- Pug
- Jsonwebtoken
- Mongoosee
- Morgan
- Passport
- Puppeteer
- Bcryptjs
- Cookie-parser
- Dotenv
- Nodemon

## 🖥️ URL del despliegue en Render
```url
https://proyecto-backend-movie-app.onrender.com
```

## 👤 Participantes

- Lucia Aroca Solís: 
  - Link a GitHub: https://github.com/luciaaroca
  - Link a Linkdin:https://www.linkedin.com/in/luc%C3%ADa-aroca-sol%C3%ADs-b652552b4/
- Artur Melik:
  - Link a GitHub: https://github.com/ArturMelik/
  - Link a Linkdin: https://www.linkedin.com/in/artur-melik-adamyan-b62a86164/
- Rebeca Díaz-Montenegro Sánchez
  - Link a GitHub: https://github.com/rebecadiazmontenegro
  - Link a Linkdin: https://www.linkedin.com/in/rebeca-diaz-montenegro-s%C3%A1nchez-818515245/


