
//Nos muestra TODAS las peliculas en relacion con TITLE
document.getElementById("searchButton").addEventListener("click", async (e) => {
  const title = document.getElementById("movieName").value;
  alert(title);
  try {
    const res = await fetch(`/api/movie/all/${title}`); //
    const data = await res.json();
    //alert(data);
    console.log(data);
    const result = document.getElementById("result");
    result.innerHTML = ""; // limpiamos antes
    
    data.forEach (movie => {
    result.innerHTML += `
    <div class="movie-card">
        <h2>${movie.Title}</h2>
        ${movie.Poster ? `<img src="${movie.Poster}" alt="${movie.Title}">` : ""}
        ${movie.Year ? `<p><strong>Año:</strong> ${movie.Year}</p>` : ""}
        <a class="detalle" href="/search/${encodeURIComponent(movie.Title)}">Detalles</a>
    </div>
`;
    })
  }catch (error) {
    console.log(error);
  }

}); // <--- cierre del addEventListener

