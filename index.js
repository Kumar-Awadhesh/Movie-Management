
//function to fetch movie data
function fetchMovies(){

        //API to fetch data form
        fetch("http://localhost:3000/movies?_page=1&_per_page=12")
        .then(res => {
            //check if given API is valid or throw error
            if(!res.ok){
                throw new Error("provided API not valid");
            }
            //return response in json formate
            return res.json();
        })
        .then(data => {
            //store fetched data
            fetchData(data.data);
            
        })
        //console any error founded
        .catch(err => {
            console.log("somthing went wrong", err);
        })
    }

fetchMovies()

//function to show fetched data in DOM
function fetchData(movieData){
    
    //get element by id
    let content = document.getElementById("content");

    //forEach loop to iterate over movie array
    movieData.forEach(element => {
        
        //create new div element and add class name to it
        let movieContainer = document.createElement("div");
            movieContainer.classList.add("movieContainer");

        //create a img element to store image and add class name
        let image = document.createElement("img");
            image.classList.add("image");
            image.src = element.image;

        //create a new element to store title and add class name
        let title = document.createElement("h1");
            title.classList.add("movieTitle");
            //add inner text to title
            title.innerText =  element.movie

        //create a new element to store rating and add class name
        let rating = document.createElement("p");
            rating.classList.add("rating");
            //add inner text to genres
           rating.innerText = `IMDb Rating: ${element.rating}`

        //create a new element to store genre and add class name
        let genre = document.createElement("p");
            genre.classList.add("genre");
            genre.innerText = `Genres: ${element.genre}`;

         //create a new element to store button and add class name  
         let button = document.createElement("button");
            button.classList.add("button");
            //add text content to the button.
            button.textContent = "WATCH"

        button.addEventListener("click", function(){

        })

        //append all element to movie container
        movieContainer.append(image, title, rating, genre, button);
        //add movie container to content div
        content.append(movieContainer)
        
    });
}


//Pagination Section---> Next Button

//get element by form id and add event listener
document.getElementById("form").addEventListener("submit", function(event){
    //prevent browser's default behaviour
    event.preventDefault();

    //fetch the API
    fetch("http://localhost:3000/movies")
    //check if privided API is valid or throw an error
    .then(res => {
        if(!res.ok){
            throw new error("provided API is not valid");
        }
        //return response in json formate
        return res.json()
    })
    //get the data
    .then(data => {
        movieData(data)
    })
    //check if there any error
    .catch(err => {
        console.log("somthing went wrong", err);
    })

    //function to add data to DOM
    function movieData(movieData){

        //get element and find its value
        let inputValue = document.getElementById("searchInput").value.toLowerCase()

        //get element by id
        let container = document.getElementById("movieContainer");

            //empty container on every call
            container.innerHTML = "";

        let found = false;

        //run forEach loop to iterate over movie data and compare with inputValue
        movieData.forEach(ele => {

            //create a new element to store all elements and add class name
            let childDiv = document.createElement("div");
             childDiv.classList.add("movieDiv");
           
            //set display as none to the previous container to show only filterd data
            document.getElementById('content').style.display = "none"

            if(ele.movie.toLowerCase().includes(inputValue)){

                found = true;

                //create a new element to store image and add class name
                let image = document.createElement("img");
                    image.classList.add("image");

                    //add content to the image element
                    image.src = ele.image;

                //create a new element to store rating
                let rating = document.createElement("p");

                    //add content to the title element
                    rating.innerText = `Rating: ${ele.rating}`;

                //create a new element to store genre and add class name
                let genre = document.createElement("p");
                genre.classList.add("genre")

                    //add content to the imdb link
                    genre = `Genres: ${ele.genre}`;

                //create a new element to store title and add class name
                let title = document.createElement("h1");
                    title.classList.add("movieTitle");

                    //add content to the title element
                    title.innerText = ele.movie;

                //append all element to chaildDiv
                childDiv.append(image, title, rating, genre);
                //append childDiv to container
                container.append(childDiv);
            }
        
        })
        if(found === false){
            container.textContent = "No match found!"
        }
    }
});

//calculation of total number of item, per page item and total number of pages.
let total = 100;
let perPage = 12;
let totalPage = Math.ceil(total/perPage);
//initialize the page number.
let page = 2;

//get nextBtn element by id and add event listner.
document.getElementById("nextBtn").addEventListener("click", function(){

    if(page <= totalPage){
        //API to fetch data form
        fetch(`http://localhost:3000/movies?_page=${page}&_per_page=${perPage}`)
        .then(res => {
            //check if given API is valid or throw error
            if(!res.ok){
                throw new Error("provided API not valid");
            }
            //return response in json formate
            return res.json();
        })
        .then(data => {
            //store fetched data
            paginatedData(data.data);
            
        })
        //console any error founded
        .catch(err => {
            console.log("somthing went wrong", err);
        })

        function paginatedData(movies){
            
            //get content div by id and set display as none.
            document.getElementById("content").style.display = "none";
            
            //get movieContainer div by id and set display as none.
            document.getElementById("movieContainer").style.display = "none";

            //get element by id and store in pageNumber variable.
            let pageNumber = document.getElementById("pageNumber");

            //set pageBox as children of pageNumber.
            let pageBox = pageNumber.children;

            //loop for changing the color of numbers
            for(i = 0; i < pageBox.length; i++){
                console.log(pageBox.length+1)
                if(i + 2 === page){
                    //set the number as blue.
                    pageBox[i].style.color = "red"
                }
                else{
                    //remove the color from number.
                    pageBox[i].style.color = "";
                }
            }

             //get element by id and store in container variable.
            let paginated = document.getElementById("paginated");

            //set panginated div empty operation befor each operatioin.
            paginated.innerHTML = "";

            //loop to iterate over movies array
            movies.forEach(movie => {

                //create div element and add class name
                let movieDiv = document.createElement("div");
                movieDiv.classList.add("movieDiv")

                //create image element and add class name
                let image = document.createElement("img");
                image.classList.add("image");

                //add image source to image tag
                image.src = movie.image;

                //create h2 element and add class name
                let title = document.createElement("h1");
                title.classList.add("title");

                //add content to title tag
                title.innerText = movie.movie;

                //create p element and add class name
                let rating = document.createElement("p")
                rating.classList.add("rating")

                //add content to rating tag
                rating.innerText = `IMDb Rating: ${movie.rating}`;

                //create p element to store genre and add class name
                let genre = document.createElement("p");
                genre.classList.add("genre")

                //add content to genre tag
                genre.innerText = `Genres: ${movie.genre}`;

                //append all tags to movie div
                movieDiv.append(image, title, rating, genre);

                //append movie tag to paginated tag
                paginated.append(movieDiv);

            })

        }
    }
    if(page <= totalPage){
        //increase page number.
        page++;
    }
    console.log(page)
});


//Pagination Section---> Previous Button



//get prevBtn element by id and add event listner.
document.getElementById("prevBtn").addEventListener("click", function(){

    if(page <= totalPage){
        //API to fetch data form
        fetch(`http://localhost:3000/movies?_page=${page}&_per_page=${perPage}`)
        .then(res => {
            //check if given API is valid or throw error
            if(!res.ok){
                throw new Error("provided API not valid");
            }
            //return response in json formate
            return res.json();
        })
        .then(data => {
            //store fetched data
            paginatedData(data.data);
            
        })
        //console any error founded
        .catch(err => {
            console.log("somthing went wrong", err);
        })

        function paginatedData(movies){
            
            //get content div by id and set display as none.
            document.getElementById("content").style.display = "none";
            
            //get movieContainer div by id and set display as none.
            document.getElementById("movieContainer").style.display = "none";

            //get element by id and store in pageNumber variable.
            let pageNumber = document.getElementById("pageNumber");

            //set pageBox as children of pageNumber.
            let pageBox = pageNumber.children;


             //get element by id and store in container variable.
            let paginated = document.getElementById("paginated");

            //set panginated div empty operation befor each operatioin.
            paginated.innerHTML = "";

             //loop for changing the color of numbers
             for(i = 0; i < pageBox.length; i++){
                console.log(pageBox.length+1)
                if(i + 1 === page){
                    //set the number as blue.
                    pageBox[i].style.color = "red"
                }
                else{
                    //remove the color from number.
                    pageBox[i].style.color = "";
                }
            }

            //loop to iterate over movies array
            movies.forEach(movie => {

                //create div element and add class name
                let movieDiv = document.createElement("div");
                movieDiv.classList.add("movieDiv")

                //create image element and add class name
                let image = document.createElement("img");
                image.classList.add("image");

                //add image source to image tag
                image.src = movie.image;

                //create h2 element and add class name
                let title = document.createElement("h1");
                title.classList.add("title");

                //add content to title tag
                title.innerText = movie.movie;

                //create p element and add class name
                let rating = document.createElement("p")
                rating.classList.add("rating")

                //add content to rating tag
                rating.innerText = `IMDb Rating: ${movie.rating}`;

                //create p element to store genre and add class name
                let genre = document.createElement("p");
                genre.classList.add("genre")

                //add content to genre tag
                genre.innerText = `Genres: ${movie.genre}`;

                //append all tags to movie div
                movieDiv.append(image, title, rating, genre);

                //append movie tag to paginated tag
                paginated.append(movieDiv);

            })

        }
    }
    if(page > 1){
        page-=1;
    }
    console.log(page)
})