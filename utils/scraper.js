const puppeteer = require("puppeteer");
const fs = require('fs');

// Función para extraer la información de cada película
const extractMovieData = async (url, browser) => {
    try {
        const movieData = {};
        const page = await browser.newPage();
        await page.goto(url);

        // Aquí irán los selectors que tú encuentres para:
        // media de reseña y opiniones

        //Titulo pelicula
        movieData['title'] = await page.$eval(".meta-title-link", title => title.innerHTML);

        //Year
        movieData['year'] = await page.$eval(".date", year => year.innerHTML);

        //Genre
        movieData['genre'] = await page.$eval(".dark-grey-link", genre => genre.innerHTML);
        
        //Director
        movieData['director'] = await page.$$eval('.meta-body-item.meta-body-direction a',dirs => dirs.map(d => d.innerText.trim()));

        //Actors
        movieData['actors'] = await page.$$eval('.meta-body-actor a', links => links.map(a => a.innerText.trim()));

        //Plot
        let plot = await page.$eval(".content-txt", el => el.innerText.trim());

        movieData['plot'] = plot.length > 200
            ? plot.substring(0, 200) + "..."
            : plot;


        //Rating
        movieData['rating'] = await page.$eval(".stareval-note", rating => rating.innerHTML);
        
        //Opinions
        movieData['reviews'] = await page.$$eval(".editorial-content.cf", reviews => reviews.map(r => r.innerText).slice(0, 5));


        return movieData;
    } catch (err) {
        return { error: err };
    }
}

// Función principal de scraping
const scrap = async (url) => {
    try {
        const scrapedData = [];
        console.log("Opening the browser...");
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.goto(url);
        console.log(`Navigating to ${url}...`);

        // Capturamos los links de cada película
        const tmpurls = await page.$$eval("#content-layout .meta h2 a", data => data.map(a => a.href));
        const urls = tmpurls.filter((link, index) => tmpurls.indexOf(link) === index);
        const urls2 = urls.slice(0, 5); // solo las primeras 5 películas

        console.log(`${urls2.length} links encontrados`);
        for (const movieLink in urls2) {
            const movie = await extractMovieData(urls2[movieLink], browser);
            scrapedData.push(movie);
        }

        await browser.close();

        fs.writeFile('scrapedMovies.json', JSON.stringify(scrapedData, null, 2), (err) => {
            if (err) throw err;
            console.log('Datos guardados en scrapedMovies.json');
        });

        return scrapedData;
    } catch (err) {
        console.log("Error:", err);
    }
}

// Prueba de scraping
scrap("https://www.sensacine.com/peliculas/todas-peliculas/").then(data => {
    console.log(data);
});
