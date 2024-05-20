import { useContext } from "react";
import { ShoppingCarContext } from "../../Context";
import { Layout } from "../../Components/Layout/Layout";
import "./styles.css";
import { useNavigate } from "react-router-dom";

function ShoppingCar() {
    const navigate = useNavigate();
    const context = useContext(ShoppingCarContext);
    console.log(context.addedProducts);

    //funcion para calcular el subtotal
    const subTotal = (products) => {
        let sum = 0;
        products.forEach(product => 
            sum += product.precio * product.cant);
            return sum;
    }
    const verificar = () => {
        navigate('/check-customer');
    }
    return (
        <Layout>
            <div className="pt-3 pb-3">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-sm-7">
                            <h1>Tu Carro</h1>
                            <hr />
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Item</th>
                                        <th scope="col">Precio</th>
                                        <th scope="col">Cant</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {context.addedProducts.map(
                                        product => (
                                            <tr>
                                                <td>
                                                    <img src={`data:image/jpeg;base64,${product.urlImagen}`} alt={product.nombre} />
                                                    <span className="px-3">{product.nombre}</span>
                                                </td>
                                                <td><strong>${product.precio}</strong></td>
                                                <td>
                                                    <input type="number" style={{ maxWidth: "50px" }}
                                                        value={product.cant}
                                                        onChange={(e) => {
                                                            let productsUpdate = [...context.addedProducts];
                                                            let index = productsUpdate.indexOf(product);                                                            
                                                            productsUpdate[index].cant = e.target.value;
                                                            context.setAddedProducts(productsUpdate);
                                                        }} />
                                                </td>
                                            </tr>
                                        )
                                    )}
                                    <tr>
                                        <td colspan="2" style={{ textAlign: "right" }}><strong>Subtotal:</strong> </td>
                                        <td><strong>${subTotal(context.addedProducts)}</strong></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="col-12 col-sm-5">
                            <div className="card pt-3 pb-3 px-4" style={{ background: "rgb(222, 222, 222)" }}>
                                <div>
                                    <h2><strong>Resumen ({context.addedProducts.length} Items)</strong></h2>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between">
                                    <span>Subtotal</span><span>${subTotal(context.addedProducts)}</span>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <span>Envio</span><span>$-</span>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <span>Impuestos</span><span>$-</span>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between">
                                    <span><strong>Total</strong> </span><span><strong>${subTotal(context.addedProducts)}</strong></span>
                                </div>
                                <br />
                                <button type="button" className="btn btn-primary" style={{ background: "#741b47", borderColor: "black" }}
                                    onClick={()=> {
                                        verificar();
                                    }}>
                                    Verificar
                                </button>
                                <hr />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export { ShoppingCar };