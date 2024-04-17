import { useRoutes, BrowserRouter } from 'react-router-dom';
import { ShoppingCarProvider } from '../../Context';

import { Home } from '../Home/Home';
import { CheckCustomer } from '../CheckCustomer/CheckCustomer';
import { CheckShipping } from '../CheckShipping/CheckShipping';
import { NotFound } from '../NotFound/NotFound';
import { Payment } from '../Payment/Payment';
import { Register } from '../Register/Register';
import { ServiceDetail } from '../ServiceDetail/ServiceDetail';
import { Shop } from '../Shop/Shop';
import { ShoppingCar } from '../ShoppingCar/ShoppingCar';
import { Success } from '../Success/Success';
import './App.css';
import { NavBar } from '../../Components/NavBar/NavBar';
import { SignIn } from '../SignIn/SignIn';
import { Usuarios } from '../usuarios/Usuarios';
import { Servicios } from '../servicios/Servicios';

const AppRoutes = () => {
  let routes = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/sign-in', element: <SignIn /> },
    { path: '/check-customer', element: <CheckCustomer /> },
    { path: '/check-shipping', element: <CheckShipping /> },
    { path: '/payment', element: <Payment /> },
    { path: '/register', element: <Register /> },
    { path: '/service-detail', element: <ServiceDetail /> },
    { path: '/shop', element: <Shop /> },
    { path: '/shopping-car', element: <ShoppingCar /> },
    { path: '/success', element: <Success /> },
    { path: '/usuarios', element: <Usuarios /> },
    { path: '/servicios', element: <Servicios /> },
    { path: '*', element: <NotFound /> },
  ])
  return routes;
}

function App() {
  return (
    <ShoppingCarProvider>
      <BrowserRouter >
        <NavBar />
        <AppRoutes />
      </BrowserRouter>
    </ShoppingCarProvider>
  );
}

export default App;
