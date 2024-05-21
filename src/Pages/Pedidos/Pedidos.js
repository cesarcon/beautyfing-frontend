import { useContext, useEffect, useState } from "react";
import { Layout } from "../../Components/Layout/Layout";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { ShoppingCarContext } from "../../Context";


function Pedidos({url}) {
    const context = useContext(ShoppingCarContext);
    const navigate = useNavigate();
    const [pedidos, setPedidos] = useState([]);
    const consultarPedidos = () => {
        let urlFinal = url.concat(context.user?.idUsuario);
        const options = {
            method: 'GET', // Método HTTP
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('token')
            }
        };
        fetch(urlFinal, options)
            .then(response => response.json())
            .then(data => setPedidos(data))
            .catch(e => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Algo falló!",
                    footer: 'No se pudo cargar la información de los pedidos'
                });
            });
        ;
    }
    useEffect(() => {
        if (context.user?.isBuyer || context.user?.isSeller) {            
            consultarPedidos();
        } else {
            navigate('/shop');
        }

    }, []);

    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <div className=" d-flex justify-content-center">
                        <h1>{context.user?.isSeller ? "Tus Ventas" : "Tus Compras"}</h1>
                    </div>
                </div>
                <div className="my-3">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Fecha</th>
                                <th scope="col">SubTotal</th>
                                <th scope="col">Impuestos</th>
                                <th scope="col">Total</th>
                                <th scope="col">Comprador</th>
                                <th scope="col">Vendedor</th>
                                <th scope="col">Cantidad Items</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pedidos?.map(
                                pedido => (
                                    <tr>
                                        <th scope="row">{pedido.idFactura}</th>
                                        <td>{pedido.fecha}</td>
                                        <td>{pedido.subTotalVenta}</td>
                                        <td>{pedido.totalImpuesto}</td>
                                        <td>{pedido.totalVenta}</td>
                                        <td>{pedido.comprador.nombre}</td>
                                        <td>{pedido.vendedor.nombre}</td>
                                        <td>{pedido.detallesFactura.length}</td>

                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

        </Layout>

    );
}

export { Pedidos };