
import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const [alerts, setAlerts] = useState([]);

    return (
        <AppContext.Provider value={{
            alerts,
            setAlerts
            }}>
            { children }
        </AppContext.Provider>
    )
};
