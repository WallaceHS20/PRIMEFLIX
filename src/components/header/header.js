import { Link } from 'react-router-dom';
import './header.css'

function Header() {
  return (
    <header>
      <div className='logo'>
        <h2>PRIMEFLIX</h2>
      </div>
      <div className="menu">
        <div className='menu-item'>
          <Link to="/">
            Home
            </Link>
        </div>
        <div className='menu-item'>
          <Link to="/movie/123">
            Minha lista
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header;