document.addEventListener("DOMContentLoaded", async () => {
    // Simulate an API request or any async operation
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = JSON.parse(decodeURIComponent(urlParams.get('id')));
    await movieDashboard(id);
    setTimeout(() => {
        hideLoader();
        showContent();
    }, 1000);
});

function hideLoader() {
    const loader = document.querySelector(".loader");
    loader.style.display = "none";
}

function showContent() {
    const content = document.querySelector(".content");
    content.style.display = "block";
}




async function getMovieById(id='tt0848228'){
    const url = `https://moviesminidatabase.p.rapidapi.com/movie/id/${id}/`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'e87193b36cmshb02ac7a2bf02a67p13322fjsn8ed7ba7f6346',
            'X-RapidAPI-Host': 'moviesminidatabase.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result['results'];
    } catch (error) {
        console.error(error);
    }
}

async function movieDashboard(id){
    let data = await getMovieById(id);
    document.querySelector('#movie-title').innerText = data['title'];
    document.querySelector('#release-year').innerText = "("+data['year']+")";
    document.querySelector('#age').innerText = data['content_rating'];
    document.querySelector('#release-date').innerText = data['release'];
    document.querySelector('#runtime').innerText = data['movie_length']+ " min";
    document.querySelector('#rating').innerText = data['rating'];
    document.querySelector('#movie-poster').src = data['banner'];
    document.querySelector('#description').innerText = data['description'];
    document.querySelector('#trailer').href = data['trailer'];


    let genres = data['gen']
    let genreList = "";
    
    
    
    for(let i = 0; i<genres.length; i++){
        genreList += `<a href="">${genres[i]['genre']}</a>
        ,&nbsp;`;
    };
    document.querySelector('#genres').innerHTML = genreList;

    // let cast = document.querySelector("#cast")
    let crew = await castList(id);
    let castCards = "";

    for(let j=0;j<10;j++){
        
        let image = await getActorImage(crew[j]['actor']['imdb_id']);
        castCards +=`<div class="cast-card" id = "${crew[j]['actor']['imdb_id']}">
                        <div class= "image">
                            <img src="${image}" alt="image">
                        </div>
                        <div class="details">
                            <span>${crew[j]['actor']['name']}</span>
                            <span>${crew[j]['role']}</span>
                        </div>
                    </div>`;
    };
    document.querySelector('#cast').innerHTML = castCards;
}

async function castList(id){
    const url = `https://moviesminidatabase.p.rapidapi.com/movie/id/${id}/cast/`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'e87193b36cmshb02ac7a2bf02a67p13322fjsn8ed7ba7f6346',
            'X-RapidAPI-Host': 'moviesminidatabase.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        // console.log(result);
        return result['results']['roles'];
    } catch (error) {
        console.error(error);
    }
}

async function getActorImage(id){
    const url = `https://moviesminidatabase.p.rapidapi.com/actor/id/${id}/`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'e87193b36cmshb02ac7a2bf02a67p13322fjsn8ed7ba7f6346',
            'X-RapidAPI-Host': 'moviesminidatabase.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        // console.log(result);
        return result['results']['image_url'];
    } catch (error) {
        console.error(error);
    }
}