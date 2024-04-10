import { useState } from "react";
import Swal from "sweetalert2";

function ModalUsuario({ usuario, actualizarTabla }) {

    const [formulario, setFormulario] = useState(
        {
            idUsuario: usuario.idUsuario,
            nombre: usuario.nombre, numeroDocumento: usuario.numeroDocumento, numeroTelefono: usuario.numeroTelefono, fechaNacimiento: usuario.fechaNacimiento,
            genero: usuario.genero, ciudad: usuario.ciudad, direccion: usuario.direccion, email: usuario.email, password: usuario.password,
            idTipoUsuario: usuario.idTipoUsuario
        }
    );
    const actualizar = () => {
        const url = 'http://localhost:5000/users/update?id='.concat(formulario.idUsuario);
        const options = {
            method: 'PUT', // Método HTTP
            headers: {
                'Content-Type': 'application/json' // Tipo de contenido que se está enviando (si es necesario)
                // Puedes añadir otros encabezados aquí según sea necesario
            },
            body: JSON.stringify(formulario)

        };
        fetch(url, options).then(response => {
            if (response.ok) {
                Swal.fire({
                    title: "Ok!",
                    text: "Usuario Actualizado!",
                    icon: "success"
                });
                actualizarTabla();
            }
        }).catch(e => {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Algo falló!",
                footer: 'No se pudo cargar la información del usuario'
            });
        })
    }
    return (
        <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Actualizando usuario</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="form" >
                                <div className="row pt-2 pb-2">
                                    <div className="col-12 pb-1 form-floating">
                                        <select className="form-select" aria-label="Default select example"
                                            onChange={(e) => {
                                                setFormulario(
                                                    { ...formulario, ['idTipoUsuario']: e.target.value }
                                                )
                                            }}>
                                            <option value="1" selected={usuario.idTipoUsuario == 1}>Vendedor</option>
                                            <option value="2" selected={usuario.idTipoUsuario == 2}>Comprador</option>
                                        </select>
                                        <label>Tipo de usuario</label>
                                    </div>
                                    <div className="col-12 pb-1 form-floating">
                                        <input className="form-control" type="text" placeholder="Tu nombre completo"

                                            onChange={(e) => {
                                                setFormulario(
                                                    { ...formulario, ['nombre']: e.target.value }
                                                )
                                            }} value={formulario.nombre} />
                                        <label>Nombre</label>
                                    </div>
                                    <div className="col-12 col-lg-6 pb-1 form-floating">
                                        <input className="form-control" type="text" placeholder="Número de documento"
                                            onChange={(e) => {
                                                setFormulario(
                                                    { ...formulario, ['numeroDocumento']: e.target.value }
                                                )
                                            }} value={formulario.numeroDocumento} />
                                        <label>Número de documento</label>
                                    </div>
                                    <div className="col-12 col-lg-6 pb-1 form-floating">
                                        <input className="form-control" type="text" placeholder="Tu numero de telefono"
                                            onChange={(e) => {
                                                setFormulario(
                                                    { ...formulario, ['numeroTelefono']: e.target.value }
                                                )
                                            }} value={formulario.numeroTelefono} />
                                        <label>Tu numero de telefono</label>
                                    </div>
                                    <div className="col-6 pb-1">
                                        <label>Fecha de nacimiento</label>
                                        <input type="date" placeholder="Fecha de nacimiento"
                                            onChange={(e) => {
                                                setFormulario(
                                                    { ...formulario, ['fechaNacimiento']: e.target.value }
                                                )
                                            }} value={formulario.fechaNacimiento} />
                                    </div>
                                    <div className="col-6 pb-1 form-floating">
                                        <select className="form-select" aria-label="Default select example"
                                            onChange={(e) => {
                                                setFormulario(
                                                    { ...formulario, ['genero']: e.target.value }
                                                )
                                            }} value={formulario.genero}>
                                            <option value="Masculino" selected={usuario.genero == "Masculino"}>Masculino</option>
                                            <option value="Femenino" selected={usuario.genero == "Femenino"}>Femenino</option>
                                        </select>
                                        <label>Genero:</label>
                                    </div>
                                    <div className="col-12 col-md-6 pb-1 form-floating">
                                        <input className="form-control" type="text" placeholder="Ciudad"
                                            onChange={(e) => {
                                                setFormulario(
                                                    { ...formulario, ['ciudad']: e.target.value }
                                                )
                                            }} value={formulario.ciudad} />
                                        <label>Ciudad:</label>
                                    </div>
                                    <div className="col-12 pb-1 form-floating">
                                        <input className="form-control" type="text" placeholder="Dirección"
                                            onChange={(e) => {
                                                setFormulario(
                                                    { ...formulario, ['direccion']: e.target.value }
                                                )
                                            }} value={formulario.direccion} />
                                        <label>Dirección:</label>
                                    </div>
                                    <div className="col-12 pb-1 form-floating">
                                        <input className="form-control" type="email" placeholder="Tu correo electrónico"
                                            onChange={(e) => {
                                                setFormulario(
                                                    { ...formulario, ['email']: e.target.value }
                                                )
                                            }} value={formulario.email} />
                                        <label>Correo electrónico:</label>
                                    </div>
                                </div>
                                <div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" className="btn btn-primary" onClick={() => actualizar()} data-bs-dismiss="modal">Actualizar</button>
                        </div>
                    </div>

    )

}
export { ModalUsuario }