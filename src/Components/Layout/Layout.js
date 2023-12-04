import {Footer} from "../common/Footer/Footer"
function Layout ({ children }) {
    return (
        <div className="pt-3 pb-3">
            {children}
            <Footer/>
        </div>
    )
}

export {Layout};