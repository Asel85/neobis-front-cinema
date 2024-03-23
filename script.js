const API_KEY = "7776dcc3-36a8-4d32-98e5-3c49cc019f8d";
const API_URL_SEARCH =
  "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";
const PREMIERS =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=2024&month=MARCH";
const TOP_AWAITS =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_AWAIT_FILMS&page=1";
const API_TOP_THE_BEST = 
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_POPULAR_MOVIES&page=1";
const RELEASES =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=2024&month=FEBRUARY&page=1";

const bestMovies = document.querySelector("#link-best");
const releaseMovies = document.querySelector("#link-release");
const premieresMovies = document.querySelector("#link-premieres");
const expectedMovies = document.querySelector("#link-expected");

function getClassByRate(vote){
    if(vote>=7){
        return "green"
    }else if(vote>5){
        return "orange"
    }else {
        return "red"
    }
  }

  async function getMovies(url){
    try{
      const result = await fetch(url,{
        headers : {
         "content-type":"application/json",
         "X-API-KEY":API_KEY
 
        }, 
     });
     const data =  await result.json();
     showBestMovies(data);
    }catch(error){
      console.log("error")
    }

  }

  function showBestMovies(data){
    const moviesEl = document.querySelector(".movies");
     
    document.querySelector('.movies').innerHTML = '';
     if(data.items){
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
     }else{
      moviesEl.innerHTML = "<p class='moviesEl'>No movies found</p>";
     }
  }
  
bestMovies.addEventListener("click", (e) =>{
  e.preventDefault();
  getMovies(API_TOP_THE_BEST);
});

releaseMovies.addEventListener("click", (e)=>{
  e.preventDefault();
  getMovies(RELEASES);
});
premieresMovies.addEventListener("click", (e)=>{
  e.preventDefault();
  getMovies(PREMIERS);
});
expectedMovies.addEventListener("click", (e)=>{
  e.preventDefault();
  getMovies(TOP_AWAITS);
});



const form = document.querySelector(".header__form");
const search = document.querySelector(".header__input-search");

form.addEventListener("submit", (e)=>{
  e.preventDefault();

  const apiSearchUrl = `${API_URL_SEARCH}${search.value}`;
  if(search.value){
    getMovies(apiSearchUrl)
  }
  search.value = "";
});
