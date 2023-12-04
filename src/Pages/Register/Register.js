import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../../Components/Layout/Layout";
import "./style.css"
import { FeaturedUsers } from "../../Components/FeaturedUsers/FeaturedUsers";

function Register() {

    const navigate = useNavigate();
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch ('http://localhost:5000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formulario)
            });
            if (response.ok) {
                navigate('/shop');
            }
        } catch (error) {
            console.error('Error en la solicitud: ', error);
            navigate('/');
        }
    }

    const [formulario, setFormulario] = useState(
        {
            nombre: '', numeroDocumento: '', numeroTelefono: '', edad: 0,
            genero: '', ciudad: '', direccion: '', email: '', password: '',
            idTipoUsuario: 1
        }
    );
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
                                <div className="row">
                                    <div className="col linea mt-3"></div>
                                    registro rápido
                                    <div className="col linea mt-3"></div>
                                </div>
                                <div className="px-5 pb-2">
                                    <input type="text" className="intext form-control" placeholder="Tu numero movil" />
                                </div>
                                <button type="button" className="btn btn-primary" style={{ background: "#741b47", borderColor: "black" }}
                                    onclick="location.href='../home/home.html'">
                                    <svg id="google" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="LgbsSe-Bz112c"><g><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path><path fill="none" d="M0 0h48v48H0z"></path></g></svg>
                                    Sign in with Google
                                </button>
                                <span className="pt-2">O use su direccion de correo electrónico</span>
                                <form className="form" onSubmit={onSubmit}>
                                    <div className="row pt-2 pb-2">
                                        <div className="col-12 pb-1">
                                            <select className="form-select" aria-label="Default select example"
                                                onChange={(e) => {
                                                    setFormulario(
                                                        { ...formulario, ['idTipoUsuario']: e.target.value }
                                                    )
                                                }}>
                                                <option selected>Registrarse como: </option>
                                                <option value="1">Comprador</option>
                                                <option value="2">Vendedor</option>
                                            </select>
                                        </div>
                                        <div className="col-12 pb-1">
                                            <input type="text" placeholder="Tu nombre completo"
                                                onChange={(e) => {
                                                    setFormulario(
                                                        { ...formulario, ['nombre']: e.target.value }
                                                    )
                                                }} value={formulario.nombre} />
                                        </div>
                                        <div className="col-12 col-lg-6 pb-1">
                                            <input type="text" placeholder="Número de documento"
                                                onChange={(e) => {
                                                    setFormulario(
                                                        { ...formulario, ['numeroDocumento']: e.target.value }
                                                    )
                                                }} value={formulario.documento} />
                                        </div>
                                        <div className="col-12 col-lg-6 pb-1">
                                            <input type="text" placeholder="Tu numero de telefono"
                                                onChange={(e) => {
                                                    setFormulario(
                                                        { ...formulario, ['numeroTelefono']: e.target.value }
                                                    )
                                                }} value={formulario.numeroTelefono} />
                                        </div>
                                        <div className="col-6 pb-1">
                                            <input type="number" placeholder="Tu edad"
                                                onChange={(e) => {
                                                    setFormulario(
                                                        { ...formulario, ['edad']: e.target.value }
                                                    )
                                                }} value={formulario.edad} />
                                        </div>
                                        <div className="col-6 pb-1">
                                            <input type="text" placeholder="Genero"
                                                onChange={(e) => {
                                                    setFormulario(
                                                        { ...formulario, ['genero']: e.target.value }
                                                    )
                                                }} value={formulario.genero} />
                                        </div>
                                        <div className="col-12 col-md-6 pb-1">
                                            <input type="text" placeholder="Ciudad"
                                                onChange={(e) => {
                                                    setFormulario(
                                                        { ...formulario, ['ciudad']: e.target.value }
                                                    )
                                                }} value={formulario.ciudad} />
                                        </div>
                                        <div className="col-12 col-md-6 pb-1">
                                            <input type="text" placeholder="Dirección"
                                                onChange={(e) => {
                                                    setFormulario(
                                                        { ...formulario, ['direccion']: e.target.value }
                                                    )
                                                }} value={formulario.direccion} />
                                        </div>
                                        <div className="col-12 col-md-6 pb-1">
                                            <input type="email" placeholder="Tu correo electrónico"
                                                onChange={(e) => {
                                                    setFormulario(
                                                        { ...formulario, ['email']: e.target.value }
                                                    )
                                                }} value={formulario.email} />
                                        </div>
                                        <div className="col-12 col-md-6 pb-1">
                                            <input type="password" placeholder="Contraseña" 
                                            onChange={(e) => {
                                                setFormulario(
                                                    { ...formulario, ['password']: e.target.value }
                                                )
                                            }}/>
                                        </div>
                                    </div>
                                    <div>
                                        <button type="submit" className="btn btn-primary" style={{ background: "#741b47", borderColor: "black" }} >
                                            Registrarse
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <FeaturedUsers />
        </Layout>
    );
}

export { Register };