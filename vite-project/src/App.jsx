import { useState, useEffect } from 'react'
import axios from 'axios'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
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

  return (
    <>
      <main className='container'>
        <div className='movie-container'>
          {movies.map((ele, index) =>(
            <div key={index}>
              <img src={`https://movie-hub-backend-w0l9.onrender.com${ele.image}`} alt="" />
              <h2>{ele.movie}</h2>
              <h3>{ele.released}</h3>
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
