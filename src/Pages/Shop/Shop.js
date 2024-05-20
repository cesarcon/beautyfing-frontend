import { useState, useEffect, useContext } from "react";
import { ShoppingCarContext } from "../../Context";
import { Layout } from "../../Components/Layout/Layout";
import { Intro } from "../../Components/Intro/Intro";
import { ProductsList } from "../../Components/ProductList/ProductList";
import { Product } from "../../Components/ProductCard/Product";
import Swal from "sweetalert2";

function Shop({url, title}) {
  const context = useContext(ShoppingCarContext);

  //Estado para guardar los productos consultados a la API
  const [listaProductos, setListaProductos] = useState([]);
  useEffect(() => {
    let urlFinal = url;
    if (context.latitud && context.longitud) {
      urlFinal = url.concat('?lat=').concat(context.latitud).concat('&lon=').concat(context.longitud);
    }
    fetch(urlFinal)
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
  }, [title]);
  //Estado para filtrar los productos por la busqueda del usuario
  const filteredList = listaProductos.filter(producto => {
    let titulo = producto.nombre.toLowerCase();
    let textBusqueda = context.searchValue.toLowerCase();
    return titulo.includes(textBusqueda);
});
  return (
    <Layout>
      <Intro />
      <div className="container">
        <div className="row">
          <div className=" d-flex justify-content-center">
            <h1>{title}</h1>
          </div>
        </div>
      </div>
      <ProductsList>
        {filteredList?.map(producto => (
          <Product
            key={producto.idServicio}
            product={producto} />
        )
        )}
      </ProductsList>
    </Layout>
  );
}

export { Shop };