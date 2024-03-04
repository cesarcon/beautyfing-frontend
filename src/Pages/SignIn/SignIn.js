import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCarContext } from "../../Context";
import { Layout } from "../../Components/Layout/Layout";
import Swal from "sweetalert2";

function SignIn() {

    const context = useContext(ShoppingCarContext);

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
    const handleSubmit = async(event) => {
        event.preventDefault();
        try {
            const user = await fetch ('http://localhost:5000/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            }).then(response => response.json())
            .then(data => {
                console.log(data);
                return data;
            });
            if (user != null) {
                context.setIsLogged(true);
                context.setUser(user);
                console.log(user);
                navigate('/shop');
            }
        } catch (error) {
            console.error('Error en la solicitud: ', error);
            context.setIsLogged(false);
            Swal.fire({
                icon: "error",
                title: "Credenciales incorrectas",
                text: "El usuario y/o contraseña no corresponden a un usuario creado"
              });
            return;
            navigate('/sign-in');
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