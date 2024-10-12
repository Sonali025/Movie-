window.onload = () => {
  let param = new URLSearchParams(window.location.search);
  let title = param.get("query");
  console.log(title);

  if (title !== "") {
    searchMovie(title);
  } else {
    console.log("Movie not found");
    let divTag = document.createElement("div");
    divTag.className = "col-xl-3";
    let h3Tag = document.createElement("h3");
    h3Tag.innerText = "Movie not found.....!";
    divTag.append(h3Tag);
    document.querySelector(".row").append(divTag);
  }
};
const searchMovie = (title) => {
  let xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    `https://api.themoviedb.org/3/search/movie?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&query=${title}&page=1`
  );

  xhr.send();
  //4 step
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        const movies = JSON.parse(xhr.responseText);
        console.log(movies);
        if (movies.results.length < 0) {
          movies.results.forEach((movies) => {
            console.log(movies);
            console.log(movies.title);
            console.log(movies.vote_average);
            console.log(movies.poster_path);
            let divTag = document.createElement("div");
            divTag.className = "col-xl-3";
            let imgTag = document.createElement("img");
            imgTag.className = "img-fluid";
            let h4Tag = document.createElement("h4");
            let pTag = document.createElement("p");
            imgTag.src = `https://image.tmdb.org/t/p/w500${movies.poster_path}`;
            h4Tag.innerText = movies.title;
            pTag.innerText = `Rating: ${movies.vote_average}`;
            divTag.append(imgTag);
            divTag.append(h4Tag);
            divTag.append(pTag);

            document.querySelector(".row").append(divTag);
          });
        } else {
          console.log("Movie not found");
          let divTag = document.createElement("div");
          divTag.className = "col-xl-3";
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
