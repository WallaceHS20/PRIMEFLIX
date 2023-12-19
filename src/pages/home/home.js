import { useEffect, useState } from "react";
import api from "../../services/api";
import './home.css'
import { Link } from "react-router-dom";

function Home() {

  const [movies, setMovies] = useState([]);
  const [loading, setLoad] = useState([true]);

  useEffect(() => {
    async function loadMovies() {
      const response = await api.get("movie/now_playing", {
        params: {
          api_key: "28fc232cc001c31e8a031f419d0a14ca",
          language: "pt-BR",
          page: 1,
        }
      })
      //console.log(response.data.results);
      setMovies(response.data.results.slice(0, 20))
      setLoad(false);
    }

    loadMovies()
  }, [])

  if(loading){
    return(
      <div className="loader">
        Carregando...
      </div>
    )
  }

  return (
    <div className="list-movies">
      {movies.map((movie) => {
        return (
          <Link to={`/movie/${movie.id}`} className="card" key={movie.id}>
            <div className="capa">
              <img className="pepe" src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} title={movie.title} />
            </div>
            <div className="details">
              <p>{movie.title}</p>
              <div className="popularity">
                <p>{parseFloat(movie.vote_average.toFixed(1))}</p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                </svg>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  );
}

export default Home;
