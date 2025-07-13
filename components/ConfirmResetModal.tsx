
import React from 'react';

interface ConfirmResetModalProps {
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmResetModal: React.FC<ConfirmResetModalProps> = ({ onConfirm, onCancel }) => {
    return (
        <div 
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 font-minecraft"
            onClick={onCancel}
        >
            <div 
                className="w-full max-w-lg bg-gray-800 border-4 border-red-700 rounded-lg p-8 shadow-lg flex flex-col items-center text-center animate-fade-in-up"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-5xl text-red-500 mb-4">Confirm Reset</h2>
                <p className="text-2xl text-gray-300 mb-8">
                    Are you sure you want to reset all progress? This action is permanent and cannot be undone.
                </p>
                <div className="flex space-x-6">
                    <button 
                        onClick={onCancel} 
                        className="px-8 py-3 bg-gray-600 hover:bg-gray-500 text-white text-2xl rounded shadow-md transition-transform transform hover:scale-105"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={onConfirm} 
                        className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white text-2xl rounded shadow-md transition-transform transform hover:scale-105"
                    >
                        Confirm Reset
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmResetModal;