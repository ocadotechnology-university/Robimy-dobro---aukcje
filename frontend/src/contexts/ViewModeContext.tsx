import {createContext, useContext, useState, ReactNode} from "react";

interface ViewModeContextType {
    adminViewMode: boolean;
    toggleViewMode: () => void;
}

const ViewModeContext = createContext<ViewModeContextType | undefined>(undefined);

export const useViewMode = () => {
    const context = useContext(ViewModeContext);
    if (!context) {
        throw new Error("useViewMode must be used within a ViewModeProvider");
    }
    return context;
};

export const ViewModeProvider = ({children}: { children: ReactNode }) => {
    const [adminViewMode, setAdminViewMode] = useState(true);

    const toggleViewMode = () => {
        setAdminViewMode((prev) => !prev);
    };

    return (
        <ViewModeContext.Provider value={{adminViewMode, toggleViewMode}}>
            {children}
        </ViewModeContext.Provider>
    );
};