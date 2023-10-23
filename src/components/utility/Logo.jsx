
import logo from "/media/logos/logo_principal.webp";

export const Logo = ({ className }) => {
    return (
        <img 
            src={ logo }
            alt="Logo" 
            className={`w-auto ${ className }`}
         />
    )
}
