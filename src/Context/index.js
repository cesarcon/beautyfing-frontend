import { createContext, useState } from "react";

export const ShoppingCarContext = createContext();

export function ShoppingCarProvider({ children }) {
    
    //Estado de el valor a buscar
    const [searchValue, setSearchValue] = useState('');

    const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('login')));

    //Estado para guardar los productos añadidos al carrito
    const [addedProducts, setAddedProducts] = useState([]);

    //Estado para llevar el conteo de productos en el carrito
    const [contador, setContador] = useState(0);

    //Estado para tomar datos del detalle del producto
    const [productDetail, setProductDetail] = useState();
    const handleSignOut = () => {
        console.log("saliendo...");
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('login');
        sessionStorage.clear();
        setUser(null);
    }


    return (
        <ShoppingCarContext.Provider value={{
            searchValue, setSearchValue,
            addedProducts, setAddedProducts,
            contador, setContador,
            productDetail, setProductDetail,
            user, setUser, handleSignOut,
        }}>
            {children}
        </ShoppingCarContext.Provider>
    );
}