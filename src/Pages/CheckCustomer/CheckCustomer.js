import { Link, useNavigate } from "react-router-dom";
import { Layout } from "../../Components/Layout/Layout";
import { useContext, useState } from "react";
import { ShoppingCarContext } from "../../Context";
import Swal from "sweetalert2";

function CheckCustomer() {
    const navigate = useNavigate();
    const context = useContext(ShoppingCarContext);
    const user = context.user;
    const [formulario, setFormulario] = useState(
        {
            email: user?.email,
            nombre: user?.username,
            direccion: context.direccion ? context.direccion : user?.direccion,
            ciudad: user?.ciudad,
            barrio: ''
        }
    );
    const continuar = () => {
        if (!user || !formulario.nombre || !formulario.email || !formulario.direccion || !formulario.ciudad) {
            Swal.fire({
                icon: "error",
                title: "Error de validacion",
                text: "Debes iniciar sesión y llenar todos los campos en envío y el correo para continuar"
            });
            return;
        } 
        context.setDireccion(formulario.direccion);       
        navigate('/check-shipping');
    }
    
    return (
        <Layout>
            <div className="container">
                <nav className="breadcrumb-nav" aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/shopping-car">Carrito</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Informacion del cliente</li>
                        <li className="breadcrumb-item"><Link to="/check-shipping">Informacion de envío</Link></li>
                        <li className="breadcrumb-item"><Link to="/payment">Método de pago</Link></li>
                    </ol>
                </nav>
                <hr />
                <div className="row">
                    <div className="col-12 col-sm-7">
                        <form>
                            <div className="mb-3">
                                <div className="d-flex justify-content-between">
                                    <label for="exampleInputEmail1" className="form-label">Información del cliente</label>
                                    <span className={user ? 'visually-hidden' : ''}><small>
                                        <span>¿Aún no inicias sesión?</span><Link to="/sign-in">Acceso</Link>
                                    </small></span>
                                </div>
                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                    placeholder="Email"
                                    onChange={(e) => {
                                        setFormulario(
                                            { ...formulario, ['email']: e.target.value }
                                        )
                                    }} value={formulario.email} />
                            </div>
                            <hr />
                            <label for="exampleInputName1" className="form-label">Información de envío</label>
                            <div className="mb-3 row">
                                <div className="col-12">
                                    <label for="inputName1" className="visually-hidden">Nombre</label>
                                    <input type="text" className="form-control" id="name1" placeholder="Nombre"
                                        onChange={(e) => {
                                            setFormulario(
                                                { ...formulario, ['nombre']: e.target.value }
                                            )
                                        }} value={formulario.nombre} />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <div className="col-9">
                                    <input type="text" className="form-control" id="Address" placeholder="Direccion"
                                        onChange={(e) => {
                                            setFormulario(
                                                { ...formulario, ['direccion']: e.target.value }
                                            )
                                        }} value={formulario.direccion} />
                                </div>
                                <div className="col-3">
                                    <input type="text" className="form-control" id="apto" placeholder="Apto" />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <div className="col-4">
                                    <select className="form-select" aria-label="Default select example">
                                        <option selected>País</option>
                                        <option value="1">Colombia</option>
                                        <option value="2">Perú</option>
                                        <option value="3">Brasil</option>
                                    </select>
                                </div>
                                <div className="col-4">
                                    <select className="form-select" aria-label="Default select example">
                                        <option selected>Ciudad</option>
                                        <option value="1">Bogotá</option>
                                        <option value="2">Cali</option>
                                        <option value="3">Armenia</option>
                                        <option value="4">Barranquilla</option>
                                    </select>
                                </div>
                                <div className="col-4">
                                    <input type="text" className="form-control" id="barrio" placeholder="Barrio"
                                        onChange={(e) => {
                                            setFormulario(
                                                { ...formulario, ['barrio']: e.target.value }
                                            )
                                        }} value={formulario.barrio} />
                                </div>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between">
                                <span><small><span></span><Link to="/shopping-car">Volver al carrito</Link></small></span>
                                <button type="button" className="btn btn-primary" style={{ background: '#741b47', borderColor: 'black' }}
                                    onClick={()=> {
                                        continuar();
                                    }}>
                                    Continua el pago
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="col-12 col-sm-5 pb-3">
                        <div className="card pt-3 pb-3 px-4" style={{ background: 'rgb(222, 222, 222)' }}>
                            <div>
                                <h2><strong>Resumen ({context.contador} Item{context.contador>1 ? 's': ''})</strong></h2>
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

export { CheckCustomer };