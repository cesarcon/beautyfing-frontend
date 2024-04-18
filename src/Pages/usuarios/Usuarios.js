import { useContext, useEffect, useState } from "react";
import { Layout } from "../../Components/Layout/Layout";
import Swal from "sweetalert2";
import { ModalUsuario } from "../../Components/Usuarios/ModalUsuario";
import { useNavigate } from "react-router-dom";
import { ShoppingCarContext } from "../../Context";


function Usuarios() {
    const context = useContext(ShoppingCarContext);
    const navigate = useNavigate();
    const [usuarios, setUsuarios] = useState([]);
    const consultarUsuarios = () => {
        const options = {
            method: 'GET', // Método HTTP
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('token')
            }
        };
        fetch('http://localhost:5000/users', options)
            .then(response => response.json())
            .then(data => setUsuarios(data))
            .catch(e => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Algo falló!",
                    footer: 'No se pudo cargar la información de los usuarios'
                });
            });
        ;
    }
    useEffect(() => {
        if (!context.user?.isAdmin) {
            navigate('/shop');
        } else {
            consultarUsuarios();
        }

    }, []);

    const traerTipoUsuario = (idTipoUsuario) => {
        switch (idTipoUsuario) {
            case 1:
                return 'Vendedor';
            case 2:
                return 'Comprador';
            default:
                return '';
        }
    }
    const borrar = (id) => {
        const url = 'http://localhost:5000/users/'.concat(id).concat('/delete');
        const options = {
            method: 'DELETE', // Método HTTP
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('token')
            }
        };
        fetch(url, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Hubo un problema con la petición: ' + response.status);
                }
                Swal.fire({
                    title: "Borrado!",
                    text: "El usuario ha sido borrado.",
                    icon: "success"
                });
                consultarUsuarios();
                return response.json(); // Convertir la respuesta a JSON si es necesario
            })
            .then(data => {
                console.log('Respuesta del servidor:', data);
            })
            .catch(error => {
                console.error('Error al realizar la petición:', error);
            });
    }
    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <div className=" d-flex justify-content-center">
                        <h1>Gestión de Usuarios</h1>
                    </div>
                </div>
                <div className="my-3">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Email</th>
                                <th scope="col">Direccion</th>
                                <th scope="col">Ciudad</th>
                                <th scope="col">Tipo</th>
                                <th scope="col">Puntuación</th>
                                <th scope="col">Actualizar</th>
                                <th scope="col">Borrar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios?.map(
                                usuario => (
                                    <tr>
                                        <th scope="row">{usuario.idUsuario}</th>
                                        <td>{usuario.nombre}</td>
                                        <td>{usuario.email}</td>
                                        <td>{usuario.direccion}</td>
                                        <td>{usuario.ciudad}</td>
                                        <td>{traerTipoUsuario(usuario.idTipoUsuario)}</td>
                                        <td>{usuario.puntuacion}</td>
                                        <td>
                                            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#exampleModal${usuario.idUsuario}`}>
                                                Actualizar
                                            </button>

                                            <div className="modal fade" id={`exampleModal${usuario.idUsuario}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                <div className="modal-dialog">
                                                <ModalUsuario usuario={usuario} actualizarTabla={consultarUsuarios} />
                                                </div>
                                            </div></td>
                                        

                                        <td><button onClick={() => {
                                            Swal.fire({
                                                title: "Esta seguro de borrar?",
                                                text: "si realiza este cambio no podrá revertirlo!",
                                                icon: "warning",
                                                showCancelButton: true,
                                                confirmButtonColor: "#3085d6",
                                                cancelButtonColor: "#d33",
                                                confirmButtonText: "Si, borrar!"
                                            }).then((result) => {
                                                if (result.isConfirmed) {
                                                    borrar(usuario.idUsuario);
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

    );
}

export { Usuarios };