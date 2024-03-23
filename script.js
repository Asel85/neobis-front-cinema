const API_KEY = "7776dcc3-36a8-4d32-98e5-3c49cc019f8d";
const API_TOP_THE_BEST = "https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_POPULAR_MOVIES&page=1";

const bestMovies = document.querySelector("#link-best");
//console.log(bestMovies);
function getClassByRate(vote){
    if(vote>=7){
        return "green"
    }else if(vote>5){
        return "orange"
    }else {
        return "red"
    }
  }
bestMovies.addEventListener("click",  (e) =>{
  e.preventDefault();
getBestMovies(API_TOP_THE_BEST);
 async function getBestMovies(url){
    const result = await fetch(url,{
       headers : {
        "content-type":"application/json",
        "X-API-KEY":API_KEY

       }, 
    });
    const data =  await result.json();
    showBestMovies(data);
  }

  function showBestMovies(data){
    const moviesEl = document.querySelector(".movies");
    data.items.forEach((movie) => {
     const movieEl = document.createElement("div");
     movieEl.classList.add("movie") ;
     console.log(movieEl);
     movieEl.innerHTML=`
     <div class="movie__cover-inner">
       <img src="${movie.posterUrlPreview}" alt="${movie.nameRu}" class="movie__cover">
       <div class="movie__cover_darkened"></div>
     </div>
     <div class="movie__info">
       <div class="movie__title">${movie.nameRu}</div>
       <div class="movie__category">${movie.genres.map((genre)=>`${genre.genre}`)}</div>
       <div class="movie__year">${movie.year}</div>
       <div class="movie__average movie__average_${getClassByRate(movie.ratingKinopoisk)}">${movie.ratingKinopoisk}</div>
       <img src="img/heart-unLiked.svg" alt="favorite" class="movie__favorite"style="cursor: pointer;">
     </div>`
     moviesEl.appendChild(movieEl);  
    });
  }
})
