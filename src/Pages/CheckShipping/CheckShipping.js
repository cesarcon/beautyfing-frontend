import { Link, useNavigate } from "react-router-dom";
import { Layout } from "../../Components/Layout/Layout";
import { useContext } from "react";
import { ShoppingCarContext } from "../../Context";

function CheckShipping() {
    const navigate = useNavigate();
    const context = useContext(ShoppingCarContext);
    const user = context.user;

    const handleOptionChange = (event) => {
        context.setDomicilio(event.target.id === 'flexRadioDefault1');
    };
    return (
        <Layout>
            <div className="container">
                <nav className="breadcrumb-nav" aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/shopping-car">Carrito</Link></li>
                        <li className="breadcrumb-item"><Link to="/check-customer">Informacion del cliente</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Informacion de envío</li>
                        <li className="breadcrumb-item"><Link to="/payment">Método de pago</Link></li>
                    </ol>
                </nav>
                <hr />
                <div className="row">
                    <div className="col-12 col-sm-7">
                        <form>
                            <div className="mb-3">
                                <div className="d-flex justify-content-between">
                                    <label for="exampleInputEmail1" className="form-label"><strong>Direccion de domicilio</strong></label>
                                    <span>{context.direccion}</span>
                                    <Link to="/check-customer">Editar</Link>
                                </div>
                            </div>
                            <hr />
                            <label for="exampleInputName1" className="form-label">Método de envío</label>
                            <div className="mb-3 pb-4 row">
                                <div className="form-check d-flex justify-content-between">
                                    <div>
                                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"
                                            checked={context.domicilio}
                                            onChange={handleOptionChange} />
                                        <label className="form-check-label" for="flexRadioDefault1">
                                            Domicilio a vivienda (10km)
                                        </label>
                                    </div>
                                    <span><strong>$5.000</strong></span>
                                </div>
                                <div className="form-check d-flex justify-content-between">
                                    <div>
                                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"
                                            checked={!context.domicilio}
                                            onChange={handleOptionChange} />
                                        <label className="form-check-label" for="flexRadioDefault2">
                                            Sin domicilio
                                        </label>
                                    </div>
                                    <span><strong>$0.0</strong></span>
                                </div>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between">
                                <span><small><span></span><Link to="/check-customer">Volver a Información del cliente</Link></small></span>
                                <button type="button" className="btn btn-primary" style={{ background: '#741b47', borderColor: 'black' }}
                                    onClick={() => {
                                        navigate('/payment');
                                    }}>
                                    Continua el método de pago
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

export { CheckShipping };