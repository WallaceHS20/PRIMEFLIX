import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";
import './movie.css'
import { toast } from "react-toastify";

function Movie() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate()

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
        toast.error('Filme Não encontrado!')
        navigate('/')
      }
    }

    loadMovie();

    return () => {
      console.log('componente desmontado');
    }
  }, [navigate, id]);


  function salvarFilme(){
    const minhaLista = localStorage.getItem("@primeflix");

    let savemovie = JSON.parse(minhaLista) || [];

    const hasFilme = savemovie.some( (savemovie) => savemovie.id === movie.id)

    if(hasFilme){
      toast.warn('Este Filme já foi Adicionado')
      return;
    }

    savemovie.push(movie);
    localStorage.setItem("@primeflix", JSON.stringify(savemovie));
    toast.success('Filme Adicionado com Sucesso')

  }


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
        </div>
        <div className="actions">
        <a target="blank" rel="external" className="trailer" href={`https://youtube.com/results?search_query=${movie.title} trailer`}>Trailer</a>
        <button onClick={salvarFilme} className="play" href=""> + Meu Filme</button>
      </div>
      </div>
    </div>
  );
}

export default Movie;
