import React, { createContext, useContext, useState } from 'react';

interface ITransaction {
    // Define your transaction structure here
}

interface UserDataContextType {
    userData: ITransaction[] | undefined;
    setUserData: React.Dispatch<React.SetStateAction<ITransaction[] | undefined>>;
}

const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

export const UserDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [userData, setUserData] = useState<ITransaction[]>();

    return (
        <UserDataContext.Provider value={{ userData, setUserData }}>
            {children}
        </UserDataContext.Provider>
    );
};

export const useUserData = () => {
    const context = useContext(UserDataContext);
    if (!context) {
        throw new Error("useUserData must be used within a UserDataProvider");
    }
    return context;
};
