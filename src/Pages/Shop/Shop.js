import { useState, useEffect, useContext } from "react";
import { ShoppingCarContext } from "../../Context";
import { Layout } from "../../Components/Layout/Layout";
import { Intro } from "../../Components/Intro/Intro";
import { ProductsList } from "../../Components/ProductList/ProductList";
import { Product } from "../../Components/ProductCard/Product";
import Swal from "sweetalert2";

function Shop() {
  const context = useContext(ShoppingCarContext);

  //Estado para guardar los productos consultados a la API
  const [listaProductos, setListaProductos] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/services')
      .then(response => response.json())
      .then(data => setListaProductos(data))
      .catch(e =>{
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Falló cargar los servicios! Intente mas tarde"
        });
        console.error(e);
      });
  }, []);
  //Estado para filtrar los productos por la busqueda del usuario
  const filteredList = listaProductos.filter(producto => {
    let titulo = producto.nombre.toLowerCase();
    let textBusqueda = context.searchValue.toLowerCase();
    return titulo.includes(textBusqueda);
});
  return (
    <Layout>
      <Intro />
      <ProductsList>
        {filteredList?.map(producto => (
          <Product
            product={producto} />
        )
        )}
      </ProductsList>
    </Layout>
  );
}

export { Shop };