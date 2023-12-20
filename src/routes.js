
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/header/header.js'

import Home from './pages/home/home.js'
import Error from './pages/error/error.js'
import Movie from './pages/movies/movie.js';
import Favorite from './pages/favorite/favorite.js';



function RoutesApp(){
  return(
    
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/movie/:id" element={ <Movie/> } />
        <Route path="/favorite" element={ <Favorite/> } />

        <Route path="*" element={ <Error/> } />
      </Routes>
    </BrowserRouter>
  )
}

export default RoutesApp;