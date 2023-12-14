import { createContext, useContext, useState } from 'react';

interface IModalContext {
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    showModal: () => void
}

const initialValue = {
    isOpen: false,
    setIsOpen: () => {},
    showModal: () => {}
};

const ModalContext = createContext<IModalContext>(initialValue);

function ModalProvider({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);

    function showModal() {
        setIsOpen(true);
    }

    const value = {
        isOpen,
        setIsOpen,
        showModal
    };

    return (
        <ModalContext.Provider value={value}>
            {children}
        </ModalContext.Provider>
    );
}

function useModalContext() {
    return useContext(ModalContext);
}

export {
    ModalContext,
    ModalProvider,
    useModalContext
};