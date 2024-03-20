//javascript for show filters button
document.querySelector('#show').addEventListener('click', function() {
    document.querySelector('.options').classList.toggle('active');
});


async function filterResults(sort_by,genre,year){
      let genreIDs = {
        "Action": 28,
        "Adventure": 12,
        "Animation": 16,
        "Comedy": 35,
        "Crime": 80,
        "Documentary": 99,
        "Drama": 18,
        "Family": 10751,
        "Fantasy": 14,
        "History": 36,
        "Horror": 27,
        "Music": 10402,
        "Mystery": 9648,
        "Romance": 10749,
        "Science Fiction": 878,
        "TV Movie": 10770,
        "Thriller": 53,
        "War": 10752,
        "Western": 37
    };
    // console.log(genre);
    // console.log(genreIDs[genre]);
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZmM1NTAyNWIyYjk1NWIzMDc3MjdmNzkyYTQ2YzhiOSIsInN1YiI6IjY1ZTdlNWRiMmIxYjQ0MDE0YTY4NDQ5ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qBvg9UW0BJ_0sN9A7DRDSY97TI66zJ5SfkY0b-eKjZU'
        }
      };
      
      let response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=${sort_by}&with_genres=${genreIDs[genre]}&year=${year}`, options)
      let result = await response.json();
      return result['results'];
}



//js for filter results
document.querySelector('#filter').addEventListener('click', searchResults);

//js for search results
async function searchResults(){
    document.querySelector('.options').classList.remove('active');
    let sort_by = document.querySelector('#sort').value;
    let genre = document.querySelector('#genre').value;
    let year = document.querySelector('#year').value;
    console.log(sort_by,genre,year)
    let results = await filterResults(sort_by,genre,year);
    console.log(results);
    let cards ="";

    for(let i in results){
      let x = results[i];
      // let x = await getMovieById(id);



      cards += `<div class="flip-card" id = ${x['id']}>
                      <div class="flip-card-inner">
                          <div class="flip-card-front">
                              <img id="movie-poster" src=https://image.tmdb.org/t/p/w500${x['poster_path']} alt="${x['title']}">
                          </div>
                          <div class="flip-card-back">
                              <p class="title" id="movie-title">${x['title']}</p>
                              <p id = 'view-more'>View More</p>
                          </div>
                      </div>
                  </div>`
    }
    document.querySelector("#results").innerHTML = cards;
}