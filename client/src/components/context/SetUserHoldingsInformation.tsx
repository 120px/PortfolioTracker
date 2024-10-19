import IHolding from "@/interfaces/IHolding";
import React, { createContext, useContext, useState } from 'react';

interface IUserHoldingsInformationContext {
    userHoldingsInformation: IHolding[] | undefined,
    setUserHoldingsInformation: React.Dispatch<React.SetStateAction<IHolding[] | undefined>>

}

export const UserHoldingsInformationContext = createContext<IUserHoldingsInformationContext | undefined>(undefined)

export const UserHoldingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [userHoldingsInformation, setUserHoldingsInformation] = useState<IHolding[]>()

    return (
        <UserHoldingsInformationContext.Provider value={{ userHoldingsInformation, setUserHoldingsInformation }}>
            {children}
        </UserHoldingsInformationContext.Provider>
    );
};

export const useUserHoldingsInformation = () => {
    const context = useContext(UserHoldingsInformationContext);
    if (!context) {
        throw new Error("setUserHoldingsInformation");
    }
    return context;
};
