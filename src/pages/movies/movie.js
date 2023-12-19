import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";

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
    if (!movie) {
      return <div>Carregando...</div>; // Ou qualquer outra representação de carregamento
    }

  return (
    <div className="container">
      <div className="cover-movie">
        <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} title={movie.title} />
      </div>
      <div className="movie-description">
        <h1>{movie.title}</h1>
        <h3>{movie.overview}</h3>
      </div>
    </div>
  );
}

export default Movie;
