import { CgClose } from "react-icons/cg";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { toggleModalAlert } from "../../store/slices/pageActions";

const ModalAlert = ({ children, title }) => {
    const dispatch = useDispatch();
    const isModalOpen = useSelector(state => state.pageActions.isModalAlertOpen); 

    const handleClose = (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            dispatch(toggleModalAlert());
        }
    };

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden'; 
        } else {
            document.body.style.overflow = 'auto'; 
        }

        return () => {
            document.body.style.overflow = 'auto'; 
        };
    }, [isModalOpen]);

    return (
        <div 
            className='fixed z-20 top-0 left-0 right-0 bottom-0 bg-opacity-25 bg-black backdrop-blur-[2px] flex justify-center items-center modal-overlay'
            onClick={handleClose}
        >
            <div 
                className='p-[10px] rounded-md shadow-md bg-white w-[600px] max-h-[90vh] overflow-auto'
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-4">
                    <span className="text-[18px] font-semibold">{title}</span>
                    <button 
                        onClick={() => dispatch(toggleModalAlert())} 
                        className="p-[5px] rounded-md hover:bg-gray-100 active:scale-95">
                        <CgClose />
                    </button>
                </div>
                <div>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default ModalAlert;
