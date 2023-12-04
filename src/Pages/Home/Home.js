import { Link } from "react-router-dom";
import { Layout } from "../../Components/Layout/Layout";
import "./index.css";
import { FeaturedUsers } from "../../Components/FeaturedUsers/FeaturedUsers";

function Home() {
    return (
        <Layout>
            <main id="main" className="pt-3 pb-3">
                <div className="container">
                    <div className="row">
                        <div className="title">
                            <h1>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-emoji-smile"
                                    viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                    <path
                                        d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
                                </svg>
                                Beautyfing Store Web App
                            </h1>
                        </div>
                        <hr />
                    </div>
                    <div className="row">
                        <div className="col-12 col-md">
                            <h3>
                                La mejor manera de contactar el profesional en estética y belleza
                                que se ajusta a tus necesidades
                            </h3>
                            <p>
                                Beautyfing soft toma como oportunidad de mejora la necesidad de
                                proporcionar una herramienta de contacto comercial localizado para
                                la oferta y demanda de servicios de estética y belleza en
                                modalidad domiciliaria o insitu, para lo cual proyecta un
                                desarrollo tecnológico en Desktop y App Mobil con conexión a
                                disferestes pasarelas de pago en linea
                            </p>
                        </div>
                        <div className="col-12 col-md text-center">
                            <div className="card pt-3 pb-3 px-4">
                                <h3>Registrate Aqui</h3>
                                <Link to="/register" className="btn btn-primary" style={{ background: "#741b47", borderColor: "black" }}>
                                Continuar
                                </Link>
                                <span className="pt-2 pb-2" style={{ color: "red", fontSize: "large" }}><strong>Si ya tienes cuenta
                                    creada:</strong></span>
                                <Link to="/login"
                                className="btn btn-primary" style={{ background: "#741b47", borderColor: "black" }}>
                                Ingresa aquí
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <FeaturedUsers/>
        </Layout>
    );
}

export { Home };