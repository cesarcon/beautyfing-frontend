import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ShoppingCarContext } from "../../Context";
function LoggedUser() {
    const context = useContext(ShoppingCarContext);

    const handleSignOut = () => {
        console.log("saliendo...");
        context.setIsLogged(false);
    }

    return (
        <>
            <div >
                <NavLink className={`${context.isLogged ? 'visually-hidden' : 'nav-link'}`}
                    to='/sign-in'>
                    Login
                </NavLink>
            </div>
            <div className={`${context.isLogged ? 'text-center' : 'visually-hidden'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    className="bi bi-person-circle text-center" viewBox="0 0 16 16"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseUser"
                    aria-expanded="false"
                    aria-controls="collapseUser">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                    <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                </svg>
                <div className="collapse" id="collapseUser">
                    <span>{context.user.nombre}</span>
                    <NavLink
                        to='/sign-in'
                        onClick={() => handleSignOut()}>
                        <div>
                            Sign out
                        </div>
                    </NavLink>
                </div>
            </div>
        </>
    );

}

export { LoggedUser };