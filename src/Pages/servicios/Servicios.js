import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ShoppingCarContext } from "../../Context";
import { Layout } from "../../Components/Layout/Layout";
import { ModalServicio } from "../../Components/servicios/ModalServicio";

function Servicios() {
    const navigate = useNavigate();
    const context = useContext(ShoppingCarContext);
    const [servicios, setServicios] = useState([]);
    const nuevoServicio = 
        {
            idServicio: null,
            nombre: "", precio: 0, descripcion: "", urlImagen: "",
            idCategoria: 1, idUsuario: context.user?.idUsuario
        };

    const cerrarSesion = () => {
        Swal.fire({
            title: "La sesion terminó!",
            text: "Inicia sesión nuevamente",
            icon: "error"
        });
        context.handleSignOut();
        navigate('/sign-in');
    }
    const consultarServicios = () => {
        const options = {
            method: 'GET', // Método HTTP
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('token')
            }
        };
        const url = 'http://localhost:5000/services/'.concat(context.user?.idUsuario)
        fetch(url, options)
            .then(response => {
                if (response.status == 403) {
                    cerrarSesion();
                }
                return response.json();
            })
            .then(data => {
                setServicios(data);
            })
            .catch(e => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Algo falló!",
                    footer: 'No se pudo cargar la información de los servicios'
                });
            });
        ;
    }

    const borrar = (id) => {
        const url = 'http://localhost:5000/services/'.concat(id);
        const options = {
            method: 'DELETE', // Método HTTP
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('token')
            }
        };
        fetch(url, options)
            .then(response => {
                if (response.status == 403) {
                    cerrarSesion();
                }
                if (!response.ok) {
                    throw new Error('Hubo un problema con la petición: ' + response.status);
                }
                Swal.fire({
                    title: "Borrado!",
                    text: "El servicio ha sido borrado.",
                    icon: "success"
                });
                consultarServicios();
                return response.json(); // Convertir la respuesta a JSON si es necesario
            })
            .then(data => {
                console.log('Respuesta del servidor:', data);
            })
            .catch(error => {
                console.error('Error al realizar la petición:', error);
            });
    }

    useEffect(() => {
        if (!context.user?.isSeller) {
            navigate('/shop');
        } else {
            consultarServicios();
        }

    }, []);
    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <div className=" d-flex justify-content-center">
                        <h1>Estos son tus Servicios {context.user?.username}</h1>
                    </div>
                </div>                
                <button
                    className="btn btn-primary my-2" data-bs-toggle="modal" data-bs-target={`#exampleModal0`}>
                    Crear Servicio
                </button>
                <div className="modal fade" id={`exampleModal0`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                <div className="modal-dialog">
                                                    <ModalServicio servicio={nuevoServicio} actualizarTabla={consultarServicios} />
                                                </div>
                                            </div>
                <div className="my-3">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Precio</th>
                                <th scope="col">Descripción</th>
                                <th scope="col">Actualizar</th>
                                <th scope="col">Borrar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {servicios?.map(
                                servicio => (
                                    <tr>
                                        <th scope="row">{servicio.idServicio}</th>
                                        <td>{servicio.nombre}</td>
                                        <td>{servicio.precio}</td>
                                        <td>{servicio.descripcion}</td>
                                        <td>
                                            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#exampleModal${servicio.idServicio}`}>
                                                Actualizar
                                            </button>

                                            <div className="modal fade" id={`exampleModal${servicio.idServicio}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                <div className="modal-dialog">
                                                    <ModalServicio servicio={servicio} actualizarTabla={consultarServicios} />
                                                </div>
                                            </div></td>


                                        <td><button onClick={() => {
                                            Swal.fire({
                                                title: "Estas seguro de borrar?",
                                                text: "si realizas este cambio no podrás revertirlo!",
                                                icon: "warning",
                                                showCancelButton: true,
                                                confirmButtonColor: "#3085d6",
                                                cancelButtonColor: "#d33",
                                                confirmButtonText: "Si, borrar!"
                                            }).then((result) => {
                                                if (result.isConfirmed) {
                                                    borrar(servicio.idServicio);
                                                }
                                            });

                                        }}
                                            type="button" class="btn btn-danger">Borrar</button></td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

        </Layout>
    )
}

export { Servicios };