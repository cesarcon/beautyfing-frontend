import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { ShoppingCarContext } from "../../Context";
import { useNavigate } from "react-router-dom";

function ModalServicio({ servicio, actualizarTabla }) {

    const navigate = useNavigate();
    const context = useContext(ShoppingCarContext);

    const [formulario, setFormulario] = useState(
        {
            idServicio: servicio.idServicio,
            nombre: servicio.nombre, precio: servicio.precio, descripcion: servicio.descripcion, urlImagen: servicio.urlImagen,
            idCategoria: servicio.idCategoria, idUsuario: context.user?.idUsuario
        }
    );
    const confirm = () => {
        const url = 'http://localhost:5000/services';
        const options = {
            method: servicio.idServicio ? 'PUT' : 'POST', // Método HTTP
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('token')
            },
            body: JSON.stringify(formulario)

        };
        fetch(url, options).then(response => {
            if (response.status==200) {
                Swal.fire({
                    title: "Ok!",
                    text: "Servicio Actualizado!",
                    icon: "success"
                });
                actualizarTabla();
            }
            if (response.status==201) {
                Swal.fire({
                    title: "Ok!",
                    text: "Servicio Creado!",
                    icon: "success"
                });
                actualizarTabla();
            }
            if (response.status==403) {
                Swal.fire({
                    title: "La sesion terminó!",
                    text: "Inicie sesion nuevamente",
                    icon: "error"
                });
                context.handleSignOut();
                navigate('/sign-in');
            }
        }).catch(e => {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Algo falló!",
                footer: 'No se pudo cargar la información del servicio'
            });
        })
    }
    return (
        <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">{servicio.idServicio ? 'Actualizando ': 'Creando '} servicio</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <form className="form" >
                    <div className="row pt-2 pb-2">
                        <div className="col-12 pb-1 form-floating">
                            <input className="form-control" type="text" placeholder="Nombre del servicio"

                                onChange={(e) => {
                                    setFormulario(
                                        { ...formulario, ['nombre']: e.target.value }
                                    )
                                }} value={formulario.nombre} />
                            <label>Nombre</label>
                        </div>
                        <div className="col-12 pb-1 form-floating">
                            <input className="form-control" type="text" placeholder="Descripción detallada del servicio"
                                onChange={(e) => {
                                    setFormulario(
                                        { ...formulario, ['descripcion']: e.target.value }
                                    )
                                }} value={formulario.descripcion} />
                            <label>Descripción</label>
                        </div>                        
                        <div className="col-12 pb-1 form-floating">
                            <input className="form-control" type="text" placeholder="Ingrese la URL de la imagen del servicio"
                                onChange={(e) => {
                                    setFormulario(
                                        { ...formulario, ['urlImagen']: e.target.value }
                                    )
                                }} value={formulario.urlImagen} />
                            <label>Imagen del servicio</label>
                        </div>
                        <div className="col-12 col-lg-6 pb-1 form-floating">
                            <input className="form-control" type="number" placeholder="Precio unitario del servicio"
                                onChange={(e) => {
                                    setFormulario(
                                        { ...formulario, ['precio']: e.target.value }
                                    )
                                }} value={formulario.precio} />
                            <label>Precio</label>
                        </div>
                        <div className="col-12 col-lg-6 pb-1 form-floating">
                            <select className="form-select" aria-label="Default select example"
                                onChange={(e) => {
                                    setFormulario(
                                        { ...formulario, ['idCategoria']: e.target.value }
                                    )
                                }}>
                                <option value="1" selected={servicio.idCategoria == 1}>Cortes</option>
                                <option value="2" selected={servicio.idCategoria == 2}>Manicure</option>
                                <option value="3" selected={servicio.idCategoria == 3}>Pedicure</option>
                                <option value="4" selected={servicio.idCategoria == 4}>Peinados</option>
                                <option value="5" selected={servicio.idCategoria == 5}>Maquillaje</option>
                            </select>
                            <label>Categoria del servicio</label>
                        </div>
                    </div>
                    <div>
                    </div>
                </form>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button type="button" className="btn btn-primary" onClick={() => confirm()} data-bs-dismiss="modal">{servicio.idServicio ? 'Actualizar' : 'Crear'}</button>
            </div>
        </div>

    )

}
export { ModalServicio }