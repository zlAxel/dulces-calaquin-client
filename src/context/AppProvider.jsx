
import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const [alerts, setAlerts] = useState([]);
    const [toggleModal, setToggleModal] = useState(false);

    return (
        <AppContext.Provider value={{
            alerts, setAlerts,
            toggleModal, setToggleModal,
            }}>
            { children }
        </AppContext.Provider>
    )
};
