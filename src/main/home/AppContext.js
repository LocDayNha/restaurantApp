import React, { createContext, useState } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [bookingData, setBookingData] = useState([]);
    const [reset, setReset] = useState(false);

    const addBooking = (newBooking) => {
        setBookingData([...bookingData, newBooking]);
    };
    const resetBooking = () => {
        setBookingData([]);
        setReset(true);
    };

    return (
        <AppContext.Provider value={{ addBooking, bookingData, setBookingData, resetBooking, reset }}>
            {children}
        </AppContext.Provider>
    );
};

export { AppProvider, AppContext };
export const useAppContext = () => React.useContext(AppContext)