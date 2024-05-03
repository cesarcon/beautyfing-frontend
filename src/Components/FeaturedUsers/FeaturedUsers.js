import { useEffect, useState } from "react";
import "./index.css";
import Swal from "sweetalert2";

function FeaturedUsers() {
    const [usuariosDestacados, setUsuariosDestacados] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/users/destacados')
            .then(response => response.json())
            .then(data => setUsuariosDestacados(data))
            .catch(e => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Algo falló!",
                    footer: 'No se pudo cargar la información de los usuarios destacados'
                  });
            });
    }, []);
    const estrellasLlenas = (numero) => {
        return Math.trunc(numero);
    }
    const estrellasMedias = (numero) => {
        if ( numero % 1 !== 0) {
            return 1;
        } else {
            return 0;
        }
    }
    const estrellasVacias = (numero) => {
        return Math.trunc(5-numero);
    }
    return (
        <section id="users" className="mt-4">
            <div className="container">
                <div className="row">
                    {usuariosDestacados.map(
                        usuario => (
                            <div className="col-6 col-sm-4 col-md-3 mb-4">
                                <div className="card mb-3" style={{ maxWidth: "540px" }}>
                                    <div className="row g-0">
                                        <div className="col-md-4">
                                            <img
                                                src={`data:image/jpeg;base64,${usuario.foto}`}
                                                className="img-fluid rounded-start" alt="..." />
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body">
                                                <p className="card-text">
                                                    <small className="text-body-secondary">Usuario</small>
                                                </p>
                                                <h5 className="card-title">{usuario.nombre}</h5>
                                                <p className="card-text">
                                                    {Array.from({ length: estrellasLlenas(usuario.puntuacion) }, (_, index) => (
                                                        <svg key={index} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                                            className="bi bi-star-fill" viewBox="0 0 16 16">
                                                            <path
                                                                d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                                        </svg>
                                                    ))}
                                                    {Array.from({ length: estrellasMedias(usuario.puntuacion) }, (_, index) => (
                                                        <svg key={index} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-half" viewBox="0 0 16 16">
                                                            <path d="M5.354 5.119 7.538.792A.52.52 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.54.54 0 0 1 16 6.32a.55.55 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.5.5 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.6.6 0 0 1 .085-.302.51.51 0 0 1 .37-.245zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.56.56 0 0 1 .162-.505l2.907-2.77-4.052-.576a.53.53 0 0 1-.393-.288L8.001 2.223 8 2.226z" />
                                                        </svg>
                                                    ))}
                                                    {Array.from({ length: estrellasVacias(usuario.puntuacion) }, (_, index) => (
                                                        <svg key={index} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                                            className="bi bi-star" viewBox="0 0 16 16">
                                                            <path
                                                                d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                                                        </svg>
                                                    ))}




                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    )}

                </div>
            </div>
        </section>
    );
}

export { FeaturedUsers };