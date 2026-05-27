const searchMovie = (title) => {

  let xhr = new XMLHttpRequest();

  xhr.open(
    "GET",
    `https://api.themoviedb.org/3/search/movie?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&query=${title}&page=1`
  );

  xhr.send();

  xhr.onreadystatechange = () => {

    if (xhr.readyState == 4) {

      if (xhr.status == 200) {

        const movies = JSON.parse(xhr.responseText);

        document.querySelector(".row").innerHTML = "";

        if (movies.results.length > 0) {

          movies.results.forEach((movie) => {

            let divTag = document.createElement("div");

            divTag.className = "col-xl-3 col-md-4 col-sm-6 mb-4";

            let imgTag = document.createElement("img");

            imgTag.className = "img-fluid";

            let h4Tag = document.createElement("h4");

            let pTag = document.createElement("p");

            imgTag.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

            h4Tag.innerText = movie.title;

            pTag.innerText = `Rating: ${movie.vote_average}`;

            divTag.append(imgTag);

            divTag.append(h4Tag);

            divTag.append(pTag);

            document.querySelector(".row").append(divTag);

          });

        } else {

          let divTag = document.createElement("div");

          divTag.className = "col-12 text-center";

          let h3Tag = document.createElement("h3");

          h3Tag.innerText = "Movie not found.....!";

          divTag.append(h3Tag);

          document.querySelector(".row").append(divTag);

        }

      } else {

        console.log("Error: " + xhr.status);

      }

    }

  };

};


const handleSearch = (event) => {

  event.preventDefault();

  let query = document.querySelector(".searchBox").value;

  if (query && query.trim() !== "") {

    window.location.href = `search.html?query=${query}`;

  }

};


document.addEventListener("DOMContentLoaded", () => {

  // Run only on search page
  if (window.location.pathname.includes("search.html")) {

    let param = new URLSearchParams(window.location.search);

    let title = param.get("query");

    if (title && title.trim() !== "") {

      searchMovie(title);

    }

  }

});