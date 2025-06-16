import { useRouter } from 'next/router';
import { useRef, useState, useContext, createContext } from 'react';

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [modalContent, setModalContent] = useState(null);
  const [onModalClose, setOnModalClose] = useState(null);

  const closeModal = async () => {
    setModalContent(null);
    if (typeof onModalClose === 'function') {
      setOnModalClose(null);
      onModalClose();
    }
  };

  const contextValue = {
    modalContent,
    setModalContent,
    setOnModalClose,
    closeModal
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      <Modal /> {/* Render modal inline here */}
    </ModalContext.Provider>
  );
}

export function Modal() {
  const { modalContent, closeModal } = useContext(ModalContext);
  const router = useRouter();
  const active = router.pathname.startsWith('/admin');

  if (!modalContent) return null;

  return (
    <div id="modal" style={{ position: 'fixed', top: 0, left: 0, zIndex: 1000,display:'flex', alignItems:'center',justifyContent:'center' }}>
      <div id="modal-background" onClick={closeModal} style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0, 0, 0, 0.5)'
      }} />
      <div id="modal-content" style={{
        position: 'absolute',
      }}>
        {modalContent}
      </div>
    </div>
  );
}

export const useModal = () => useContext(ModalContext);
