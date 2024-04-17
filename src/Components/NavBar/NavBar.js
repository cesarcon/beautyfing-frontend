import './styles.css'
import { Filter } from '../FilterNavBar/Filter';
import { ShoppingCar } from '../CarNavBar/ShoppinCar';
import { Link, NavLink } from 'react-router-dom';
import { LoggedUser } from '../LoggedUser/LoggedUser';
import { useContext } from 'react';
import { ShoppingCarContext } from '../../Context';

function NavBar() {
  const context = useContext(ShoppingCarContext);
  return (
    <nav id="header" className="navbar navbar-expand-lg navbar-dark sticky-top">
      <div className="container">
        <div className="d-flex justify-content-start">
          <Link className="navbar-brand" to="/shop">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-emoji-smile"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
            </svg>
            Beautyfing
          </Link>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbar" style={{ flexGrow: 0 }}>
          <ul className="navbar-nav ml-auto">
            <li className={`${context.user?.isAdmin ? 'navbar-item' : 'visually-hidden'}`}>
              <NavLink className="nav-link" to="/usuarios">
                Usuarios
              </NavLink>
            </li>
            <li className={`${context.user?.isSeller ? 'navbar-item' : 'visually-hidden'}`}>
              <NavLink className="nav-link" to="/servicios">
                Servicios
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/cortes">
                Cortes
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/manicura">
                Manicura
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/pedicura">
                Pedicura
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/peinados">
                Peinados
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/maquillaje">
                Maquillaje
              </NavLink>
            </li>
            <li className="nav-item">
              <Filter />
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/shopping-car">
                <ShoppingCar />
              </NavLink>
            </li>
          </ul>
          <div className='px-3'>


          </div>
          <div>
            <LoggedUser />
          </div>
        </div>
      </div>
    </nav>
  );
}

export { NavBar };
