import { createContext, useState } from "react";

export const ShoppingCarContext = createContext();

export function ShoppingCarProvider({ children }) {

    //Estado para guardar la informacion del usuario logueado
    const [user, setUser] = useState({nombre: ''});

    //Estado para saber si el usuario esta loggeado
    const [isLogged, setIsLogged] = useState(false);
    
    //Estado de el valor a buscar
    const [searchValue, setSearchValue] = useState('');

    //Estado para guardar los productos añadidos al carrito
    const [addedProducts, setAddedProducts] = useState([]);

    //Estado para llevar el conteo de productos en el carrito
    const [contador, setContador] = useState(0);

    //Estado para tomar datos del detalle del producto
    const [productDetail, setProductDetail] = useState();



    console.log("busqueda: "+ searchValue);
    return (
        <ShoppingCarContext.Provider value={{
            searchValue, setSearchValue,
            addedProducts, setAddedProducts,
            contador, setContador,
            productDetail, setProductDetail,
            user, setUser,
            isLogged, setIsLogged
        }}>
            {children}
        </ShoppingCarContext.Provider>
    );
}