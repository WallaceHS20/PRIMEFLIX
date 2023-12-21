import { useEffect, useState } from 'react';
import './favorite.css';
import { Link } from 'react-router-dom'

function Favorite() {
  const [filmes, setFilmes] = useState([])

  useEffect(() => {

    const minhaLista = localStorage.getItem("@primeflix");
    setFilmes(JSON.parse(minhaLista) || [])

  }, [])


  function excluirFilme(id) {
    let filtroFilmes = filmes.filter((item) => {
      return (item.id !== id)
    })

    setFilmes(filtroFilmes);
    localStorage.setItem("@primeflix", JSON.stringify(filtroFilmes))
  }

  return (
    <div className="meus-filmes">
      <h1>Meus filmes</h1>

      {filmes.length === 0 && <span className='text-info'>Você não possui nenhum filme salvo :( </span>}

      <ul>
        {filmes.map((item) => {
          return (
            <li key={item.id}>
              <div className="capa-fav">
                <img src={`https://image.tmdb.org/t/p/original/${item.poster_path}`} title={item.title} />
              </div>

              <div>
                <Link to={`/movie/${item.id}`}>Ver detalhes</Link>
                <button onClick={() => excluirFilme(item.id)}>Excluir</button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Favorite;