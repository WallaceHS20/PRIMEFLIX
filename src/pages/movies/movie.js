import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";
import './movie.css'

function Movie() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function loadMovie() {
      try {
        const response = await api.get(`movie/${id}`, {
          params: {
            api_key: "28fc232cc001c31e8a031f419d0a14ca",
            language: "pt-BR",
          }
        });
        console.log(response.data);
        setMovie(response.data);
      } catch (error) {
        console.log(error.message);
      }
    }

    loadMovie();

    return () => {
      console.log('componente desmontado');
    }
  }, [id]);

  // Verifique se o filme foi carregado antes de tentar acessar suas propriedades
  /*<svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" class="bi bi-camera-reels" viewBox="0 0 16 16">
  <path d="M6 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0M1 3a2 2 0 1 0 4 0 2 2 0 0 0-4 0" />
  <path d="M9 6h.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 7.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 16H2a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2zm6 8.73V7.27l-3.5 1.555v4.35l3.5 1.556zM1 8v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1" />
  <path d="M9 6a3 3 0 1 0 0-6 3 3 0 0 0 0 6M7 3a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
</svg> */
  if (!movie) {
    return <div>Carregando...</div>; // Ou qualquer outra representação de carregamento
  }

  // Estilo de fundo
  const style = {
    backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  };

  return (
    <div className="container" style={style}>
      <div className="movie-description">
        <h1>{movie.title}</h1>
        <h3>{movie.overview}</h3>
        <div className="movie-data">
        <p className="genre">{movie.genres[0].name}</p>
        <p className="vote">{parseFloat(movie.vote_average.toFixed(1))}</p>
        <p className="popularity">{movie.popularity}</p>
        </div>
        <div className="actions">
        <a className="trailer" href="">Trailer</a>
        <a className="play" href="">Assistir</a>
      </div>
      </div>
    </div>
  );
}

export default Movie;
