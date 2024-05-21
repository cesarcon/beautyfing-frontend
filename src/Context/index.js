import { createContext, useEffect, useState } from "react";

export const ShoppingCarContext = createContext();

export function ShoppingCarProvider({ children }) {

    //Estados para capturar la ubicacion del usuario
    const [latitud, setLatitud] = useState(null);
    const [longitud, setLongitud] = useState(null);
    const [direccion, setDireccion] = useState(null);
    
    //Estado de el valor a buscar
    const [searchValue, setSearchValue] = useState('');

    const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('login')));

    //Estado para guardar los productos añadidos al carrito
    const [addedProducts, setAddedProducts] = useState([]);

    //Estado para llevar el conteo de productos en el carrito
    const [contador, setContador] = useState(0);

    //Estado para almacenar si es con domicilio
    const [domicilio, setDomicilio] = useState(false);

    //Estado para tomar datos del detalle del producto
    const [productDetail, setProductDetail] = useState();
    const handleSignOut = () => {
        console.log("saliendo...");
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('login');
        sessionStorage.clear();
        setUser(null);
    }

    //funcion para calcular el subtotal
    const subTotal = () => {
        let sum = 0;
        addedProducts.forEach(product => 
            sum += product.precio * product.cant);
            return sum;
    }
    //funcion para calcular el total
    const total = () => {
        let sum = 0;
        addedProducts.forEach(product => 
            sum += product.precio * product.cant);
            if (domicilio) {
                sum += 5000;
            }
            return sum;
    }
    useEffect(() => {
        // Verificar si el navegador soporta la geolocalización
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    // Obtener la latitud y longitud
                    setLatitud(position.coords.latitude);
                    setLongitud(position.coords.longitude);
                    console.log('las coordenadas son: ', latitud, ' ', longitud);
                },
                (error) => {
                    // Manejar errores de geolocalización
                    console.error('Error getting geolocation:', error);
                }
            );
        } else {
            // El navegador no soporta geolocalización
            console.error('Geolocation is not supported by this browser.');
        }
    }, []);


    return (
        <ShoppingCarContext.Provider value={{
            searchValue, setSearchValue,
            addedProducts, setAddedProducts,
            contador, setContador,
            productDetail, setProductDetail,
            user, setUser, handleSignOut,
            latitud, longitud,
            domicilio, setDomicilio,
            subTotal, total,
            direccion, setDireccion
        }}>
            {children}
        </ShoppingCarContext.Provider>
    );
}