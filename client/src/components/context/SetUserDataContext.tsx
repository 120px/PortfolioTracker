import IUserData from '@/interfaces/IUserData';
import React, { createContext, useContext, useState } from 'react';

interface UserDataContextType {
    userData: IUserData[] | undefined;
    setUserData: React.Dispatch<React.SetStateAction<IUserData[] | undefined>>;
}

const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

export const UserDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [userData, setUserData] = useState<IUserData[]>();

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
