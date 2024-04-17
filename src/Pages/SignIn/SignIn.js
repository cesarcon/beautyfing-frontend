import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../../Components/Layout/Layout";
import Swal from "sweetalert2";
import { ShoppingCarContext } from "../../Context";

function SignIn() {

    const context = useContext(ShoppingCarContext)
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        numeroDocumento: '',
        password: '',
    });

    // Función para manejar los cambios en los campos del formulario
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    // Función para manejar el envío del formulario
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const user = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            }).then(response => response.json())
                .then(data => {
                    return data;
                });
            if (user != null) {
                const token = user.token;
                const claims = JSON.parse(window.atob(token.split(".")[1]));
                console.log(claims);
                sessionStorage.setItem('login', JSON.stringify({
                    isAuth: true,
                    isAdmin: claims.isAdmin,
                    isSeller: claims.isSeller,
                    isBuyer: claims.isBuyer,
                    username: claims.username,
                    idUsuario: claims.idUsuario,
                }));
                sessionStorage.setItem('token', `Bearer ${token}`);
                context.setUser(JSON.parse(sessionStorage.getItem('login')))
                navigate('/shop');
            }
        } catch (error) {
            console.error('Error en la solicitud: ', error);
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('login');
            sessionStorage.clear();
            Swal.fire({
                icon: "error",
                title: "Credenciales incorrectas",
                text: "El usuario y/o contraseña no corresponden a un usuario creado"
            });
            navigate('/sign-in');
            return;
        }

        // Limpia los campos del formulario después del envío
        setFormData({
            numeroDocumento: '',
            password: '',
        });
    };

    return (
        <Layout>
            <div className="d-flex justify-content-center mb-3">
                <div style={{ maxWidth: "540px" }}>
                    <h2>Iniciar Sesión</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="numeroDocumento">Número de Documento:</label>
                            <input
                                className="form-control"
                                type="text"
                                id="numeroDocumento"
                                name="numeroDocumento"
                                value={formData.numeroDocumento}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="password">Contraseña:</label>
                            <input
                                className="form-control"
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <button className="btn btn-primary mb-3" style={{ background: "#741b47", borderColor: "black" }} type="submit">Iniciar Sesión</button>
                    </form>
                </div>
            </div>
        </Layout>
    );
}

export { SignIn };