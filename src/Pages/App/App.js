import { useRoutes, BrowserRouter } from 'react-router-dom';
import { ShoppingCarProvider } from '../../Context';

import { Home } from '../Home/Home';
import { CheckCustomer } from '../CheckCustomer/CheckCustomer';
import { CheckShipping } from '../CheckShipping/CheckShipping';
import { NotFound } from '../NotFound/NotFound';
import { Payment } from '../Payment/Payment';
import { Register } from '../Register/Register';
import { ServiceDetail } from '../ServiceDetail/ServiceDetail';
import { ShoppingCar } from '../ShoppingCar/ShoppingCar';
import { Success } from '../Success/Success';
import './App.css';
import { NavBar } from '../../Components/NavBar/NavBar';
import { SignIn } from '../SignIn/SignIn';
import { Usuarios } from '../usuarios/Usuarios';
import { Servicios } from '../servicios/Servicios';
import { Shop } from '../Shop/Shop';
import { Pedidos } from '../Pedidos/Pedidos';

const AppRoutes = () => {
  let routes = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/sign-in', element: <SignIn /> },
    { path: '/check-customer', element: <CheckCustomer /> },
    { path: '/check-shipping', element: <CheckShipping /> },
    { path: '/payment', element: <Payment /> },
    { path: '/register', element: <Register /> },
    { path: '/service-detail', element: <ServiceDetail /> },
    { path: '/shop', element: <Shop url="http://localhost:5000/services" title="" /> },
    { path: '/cortes', element: <Shop url="http://localhost:5000/services/categoria/1" title="Cortes" /> },
    { path: '/manicura', element: <Shop url="http://localhost:5000/services/categoria/2" title="Manicuras" /> },
    { path: '/pedicura', element: <Shop url="http://localhost:5000/services/categoria/3" title="Pedicuras" /> },
    { path: '/peinados', element: <Shop url="http://localhost:5000/services/categoria/4" title="Peinados" /> },
    { path: '/maquillaje', element: <Shop url="http://localhost:5000/services/categoria/5" title="Maquillaje" /> },
    { path: '/shopping-car', element: <ShoppingCar /> },
    { path: '/success', element: <Success /> },
    { path: '/usuarios', element: <Usuarios /> },
    { path: '/servicios', element: <Servicios /> },
    { path: '/compras', element: <Pedidos url="http://localhost:5000/factura/compras/" /> },
    { path: '/ventas', element: <Pedidos url="http://localhost:5000/factura/ventas/" /> },
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
