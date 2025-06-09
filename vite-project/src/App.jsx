import { useState, useEffect } from 'react'
import axios from 'axios'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [input, setInput] = useState("")
  let perPage = 12;

  const fetchMovies = async(page) => {
    try {
      const response = await axios.get(`https://movie-hub-backend-w0l9.onrender.com/movies?_page=${page}&_perPage=${perPage}`)
      setMovies(prev => [...prev, ...response.data.Movies]);
    } 
    catch (err) {
      console.error("errer in fetching movies", err);
    }
  }

    useEffect(() => {
    fetchMovies(page);
  },[])

  const loadMore = () => {
    const nxtPage = page + 1;
    setPage(nxtPage);
    fetchMovies(nxtPage);
  }

  const searchMovie = async() => {
    let currentPage = page;
    let filteredMovies = [...movies]; 
    while(true){
      let filteredArr = filteredMovies.filter((ele) => ele.movie.toLowerCase().includes(input.toLowerCase()));
      if(filteredArr.length > 0){
        setMovies(filteredArr);
        break;
      }

      currentPage += 1;
      try {
        
        const newFetch = await axios.get(`https://movie-hub-backend-w0l9.onrender.com/movies?_page=${currentPage}&_perPage=${perPage}`)
        const newMovies = newFetch.data.Movies;
        filteredMovies = [...filteredMovies, ...newMovies]

        if(newMovies.length < 1){
        console.log("no result found!")
        break;
      }
      } 
      catch (err) {
        console.error("catch error!", err)
        break;
      }
      
    }
  
    console.log(filteredMovies)
  }

  return (
    <>
      <main className='container'>
        <div className='title'>
          <h1>Movie Theatre</h1>
        </div>
        <div className='search-bar'>
          <input type="text" placeholder='Search movie...' required value={input} onChange={(e) => {setInput(e.target.value)}}/>
          <button onClick={searchMovie}>Search</button>
        </div>
        <div className='movie-container'>
          {movies.map((ele, index) =>(
            <div key={index}>
              <img src={`https://movie-hub-backend-w0l9.onrender.com${ele.image}`} alt="" />
              <h2>Moive Name: {ele.movie}</h2>
              <h3>Released Year: {ele.released}</h3>
            </div>
          ))}
        </div>
        <div className='load-more'>
          <button onClick={loadMore}>Load More</button>
        </div>
      </main>
    </>
  )
}

export default App
