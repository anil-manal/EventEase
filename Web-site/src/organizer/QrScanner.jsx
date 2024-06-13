import React, { useRef, useEffect, useState } from 'react';
import QrScanner from 'qr-scanner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';
import { useQrCheckingMutation } from '../redux/api/orderApi';

Modal.setAppElement('#root'); // Specify the app element

const QRScanner = () => {
    const videoRef = useRef();
    const [scannedData, setScannedData] = useState({});
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [isScanning, setIsScanning] = useState(true); // Initial scanning state is true
    const [qrCheckingfn, { data, error, }] = useQrCheckingMutation();

    useEffect(() => {
        if (isScanning) {
            const qrScanner = new QrScanner(videoRef.current, result => {
                try {
                    const parsedData = JSON.parse(result);
                    setScannedData(parsedData);
                    setModalIsOpen(true); // Open modal automatically when QR code is scanned successfully
                    // toast.success("QR Code Scanned Successfully!");
                    qrCheckingfn(parsedData.order_id);
                    setIsScanning(false); // Stop scanning after successful scan
                } catch (error) {
                    toast.error("Invalid QR Code!");
                }
            });
            qrScanner.start();

            // Cleanup function to stop scanning when component unmounts
            return () => {
                qrScanner.stop();
            };
        }
    }, [isScanning, qrCheckingfn]);

    const closeModal = () => {
        setModalIsOpen(false);
        setIsScanning(true); // Reset scanning state when modal is closed
    };
    useEffect(() => {
        if (data && data.scan === false) {
            toast("This Ticket is First Time Scan")
        }
    }, [data])
    useEffect(() => {
        if (error) {
            toast.error("This Ticket is Alreay used")
        }
    }, [error])

    return (
        <>
            <h1 className="text-4xl absolute w-full top-52 text-teal-500 font-bold text-center mb-8">Scan Qr Code</h1>

            <div className="relative flex flex-col w-full items-center justify-center h-screen">
                {isScanning && (
                    <div className="absolute inset-0 w-full h-screen flex items-center justify-center">
                        <video ref={videoRef} className="w-64 h-64 object-cover" />
                    </div>
                )}

                {/* Toast Container for notifications */}
                <ToastContainer />

                {/* Modal for displaying scanned data */}
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    className="Modal absolute w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow-lg"
                    overlayClassName="Overlay"
                    ariaHideApp={true}
                >
                    <div className="flex mt-24 flex-col w-full items-center justify-center">
                        <h2 className="text-3xl text-blue-600 font-bold mb-4">Scanned Data</h2>
                        <div className="w-full text-center">
                            <p className='mb-2 font-bold text-xl'>Event Name : <span className='font-semibold text-lg'>{scannedData.event_title}</span></p>
                            <p className='mb-2 font-bold text-xl'>No of Tickets : <span className='font-semibold text-lg'>{scannedData.No_Of_Ticket}</span></p>
                            <p className='mb-2 font-bold text-xl'>Event Name : <span className='font-semibold text-lg'>{scannedData.price}</span></p>
                            <p className='mb-2 font-bold text-xl'>User Name : <span className='font-semibold text-lg'>{scannedData.user_name}</span></p>
                            <p className='mb-2 font-bold text-xl'>Order id : <span className='font-semibold text-lg'>{scannedData.order_id}</span></p>
                            <p className='mb-2 font-bold text-xl'>Event id : <span className='font-semibold text-lg'>{scannedData.event_id}</span></p>
                        </div>
                        <button onClick={closeModal} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                            Close
                        </button>
                    </div>
                </Modal>
            </div>
        </>
    );
};

export default QRScanner;
