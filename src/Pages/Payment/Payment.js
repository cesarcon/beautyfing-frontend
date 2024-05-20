import { Link, useNavigate } from "react-router-dom";
import { Layout } from "../../Components/Layout/Layout";
import { useContext } from "react";
import { ShoppingCarContext } from "../../Context";
import Swal from "sweetalert2";

function Payment() {
    const navigate = useNavigate();
    const context = useContext(ShoppingCarContext);
    const user = context.user;
    const addedProducts = context.addedProducts;
    //funcion para calcular el subtotal
    const subTotal = (products) => {
        let sum = 0;
        products.forEach(product =>
            sum += product.precio * product.cant);
        return sum;
    }
    //funcion para generar lista de items factura
    const generarDetalles = (products) => {

        let lista = [];
        products.forEach(product =>
            lista.push({
                cantidad: product.cant,
                totalDetalle: product.precio * product.cant,
                iva: 0,
                servicio: product.idServicio
            }));
        return lista;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const productosPorProveedor = addedProducts.reduce((acumulador, producto) => {
            const { idUsuario } = producto;
            if (!acumulador[idUsuario]) {
                acumulador[idUsuario] = [];
            }
            acumulador[idUsuario].push(producto);

            return acumulador;
        }, {});
        const facturasCreadas = [];
        for (const proveedor in productosPorProveedor) {
            if (productosPorProveedor.hasOwnProperty(proveedor)) {
                const listaProductos = productosPorProveedor[proveedor];

                try {
                    const formData = {
                        subTotalVenta: subTotal(listaProductos),
                        totalImpuesto: 0,
                        totalVenta: subTotal(listaProductos),
                        comprador: user.idUsuario,
                        vendedor: proveedor,
                        detallesFactura: generarDetalles(listaProductos)
                    }
                    const factura = await fetch('http://localhost:5000/factura', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': sessionStorage.getItem('token')
                        },
                        body: JSON.stringify(formData)
                    }).then(response => response.json())
                        .then(data => {
                            return data;
                        });
                    if (factura != null) {
                        console.log("factura creada: " + factura.idFactura);
                        facturasCreadas.push(factura.idFactura);
                    }
                } catch (error) {
                    console.error('Error en la solicitud: ', error);
                    //sessionStorage.removeItem('token');
                    //sessionStorage.removeItem('login');
                    //sessionStorage.clear();
                    Swal.fire({
                        icon: "error",
                        title: "Credenciales incorrectas",
                        text: "El usuario y/o contraseña no corresponden a un usuario creado"
                    });
                    //navigate('/sign-in');
                    return;
                }
            }
        }
        if (facturasCreadas?.length > 0) {
            Swal.fire({
                title: "Pedido recibido!",
                text: facturasCreadas.length == 1 ? "Se generó factura: ".concat(facturasCreadas[0])
                : "Se generaron las facturas: ".concat(facturasCreadas.join(", ")),
                icon: "success"
            });
            context.setContador(0);
            context.setAddedProducts([]);
            navigate("/shop");
        }

    };
    return (
        <Layout>
            <div className="container">
                <nav className="breadcrumb-nav" aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/shopping-car">Carrito</Link></li>
                        <li className="breadcrumb-item"><Link to="/check-customer">Informacion del cliente</Link></li>
                        <li className="breadcrumb-item active" ><Link to="/check-shipping">Informacion de envío</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Método de pago</li>
                    </ol>
                </nav>
                <hr />
                <div className="row">
                    <div className="col-12 col-sm-7">
                        <form className="mb-3" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <div className="d-flex justify-content-between">
                                    <label for="exampleInputEmail1" className="form-label"><strong>Direccion de envío</strong></label>
                                    <span>{user.direccion}</span>
                                    <Link to="/check-customer">Editar</Link>
                                </div>
                            </div>
                            <hr />
                            <div className="mb-3">
                                <div className="d-flex justify-content-between">
                                    <label for="exampleInputEmail1" className="form-label"><strong>Envío</strong></label>
                                    <span className={context.domicilio ? '' : 'visually-hidden'}>Domicilio en vivienda 10Km, $5.000</span>
                                    <Link to="/check-shipping">Editar</Link>
                                </div>
                            </div>
                            <hr />
                            <div id="pagos" className="d-flex justify-content-between mb-3">
                                <label for="exampleInputName1" className="form-label">Método de Pago</label>
                                <div>
                                    <img src={`${process.env.PUBLIC_URL}/images/logo_visa.png`} alt="visa" />
                                    <img src={`${process.env.PUBLIC_URL}/images/mc_symbol.svg`} alt="master" />
                                    <img src={`${process.env.PUBLIC_URL}/images/dls-logo-bluebox-solid.svg`} alt="american" />
                                </div>
                            </div>
                            <div className="mb-3 pb-2 row">
                                <div className="input-group has-validation">
                                    <input type="text" className="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" required
                                        placeholder="Número de tarjeta" />
                                    <span className="input-group-text" id="inputGroupPrepend">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-lock-fill" viewBox="0 0 16 16">
                                            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                            <div className="mb-3 pb-2 row">
                                <div className="col-12 col-sm-6">
                                    <input type="text" className="form-control" id="" placeholder="Nombre" />
                                </div>
                                <div className="col-6 col-sm-3">
                                    <input type="text" className="form-control" id="" placeholder="MM/YY" />
                                </div>
                                <div className="col-6 col-sm-3">
                                    <input type="text" className="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" required
                                        placeholder="CVV" />
                                </div>
                            </div>
                            <hr />
                            <div className="mb-3 pb-2 row">
                                <label className="form-label">Dirección donde se prestará el servicio</label>
                                <div className="form-check" style={{ border: '2px solid #9999' }}>
                                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked />
                                    <label className="form-check-label" for="flexRadioDefault2">
                                        La misma que la dirección del usuario
                                    </label>
                                </div>
                                <div className="form-check" style={{ border: '2px solid #9999' }}>
                                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                    <label className="form-check-label" for="flexRadioDefault1">
                                        La misma direccion que la direccion del Proveedor
                                    </label>
                                </div>
                                <div className="form-check" style={{ border: '2px solid #9999' }}>
                                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                    <label className="form-check-label" for="flexRadioDefault1">
                                        Usar una dirección diferente
                                    </label>
                                </div>

                            </div>
                            <hr />
                            <div className="d-flex justify-content-between">
                                <span><small><span></span><Link to="/check-customer">Volver a Información del cliente</Link></small></span>
                                <button type="submit" className="btn btn-primary" style={{ background: '#741b47', borderColor: 'black' }}
                                    onclick="location.href='../sucess/sucess.html'">
                                    Completa la orden
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="col-12 col-sm-5">
                        <div className="card pt-3 pb-3 px-4" style={{ background: 'rgb(222, 222, 222)' }}>
                            <div>
                                <h2><strong>Resumen ({context.contador} Item{context.contador > 1 ? 's' : ''})</strong></h2>
                            </div>
                            <div className="d-flex justify-content-between">
                                <span>Subtotal</span><span>${context.subTotal()}</span>
                            </div>
                            <div className="d-flex justify-content-between">
                                <span>Envio</span><span>${context.domicilio ? '5000' : '-'}</span>
                            </div>
                            <div className="d-flex justify-content-between">
                                <span>Impuestos</span><span>$-</span>
                            </div>
                            <hr />
                            <span>Tarjeta de regalo o código de descuento</span>
                            <div className="mt-3 mb-3 row">
                                <div className="col-9">
                                    <input type="text" className="form-control" id="name1" />
                                </div>
                                <div className="col-3">
                                    <button type="button" className="btn btn-secondary">
                                        Aplicar
                                    </button>
                                </div>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between">
                                <span><strong>Total</strong> </span><span><strong>${context.total()}</strong></span>
                            </div>
                            <br />

                            <hr />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export { Payment };