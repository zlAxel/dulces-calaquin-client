
import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const [alerts, setAlerts] = useState([]);
    const [toggleModal, setToggleModal] = useState(false);
    const [user, setUser] = useState({});

    return (
        <AppContext.Provider value={{
            user, setUser,
            alerts, setAlerts,
            toggleModal, setToggleModal,
            }}>
            { children }
        </AppContext.Provider>
    )
};
