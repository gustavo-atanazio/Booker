import { createContext, useContext, useState } from 'react';
import IBook from 'types/IBook';

interface IModalContext {
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    data: IBook
    showModal: (data: IBook) => void
    closeModal: () => void
}

const initialValue = {
    isOpen: false,
    setIsOpen: () => {},
    data: {
        img: undefined,
        title: '',
        author: '',
        tags: [{ text: '', backgroundColor: '', id: '', selected: false }],
        id: ''
    },
    showModal: () => {},
    closeModal: () => {}
};

const ModalContext = createContext<IModalContext>(initialValue);

function ModalProvider({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState<IBook>(initialValue.data);

    function showModal(data: IBook) {
        setIsOpen(true);
        setData(data);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const value = {
        isOpen,
        setIsOpen,
        data,
        showModal,
        closeModal
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