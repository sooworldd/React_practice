import React, { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import './modal.css';

const AddressInput = ({ onChange }) => {
    const [zonecode, setZonecode] = useState('');
    const [address, setAddress] = useState('');
    const [detailedAddress, setDetailedAddress] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const themeObj = {
        bgColor: '#FFFFFF',
        pageBgColor: '#FFFFFF',
        postcodeTextColor: '#C05850',
        emphTextColor: '#222222',
    };

    const postCodeStyle = {
        width: '400px',
        height: '500px',
    };

    const completeHandler = (data) => {
        const { address, zonecode } = data;
        setZonecode(zonecode);
        setAddress(address);
        setIsOpen(false);
        onChange(`${zonecode} ${address}`);
    };

    const toggleHandler = () => {
        setIsOpen((prevOpenState) => !prevOpenState);
    };

    return (
        <>
            <span>
                <button type="button" className="label-text" onClick={toggleHandler}>
                    주소
                </button>
            </span>
            {isOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <DaumPostcode
                            theme={themeObj}
                            style={postCodeStyle}
                            onComplete={completeHandler}
                        />
                    </div>
                </div>
            )}
            {/* <p>우편번호: {zonecode}</p> */}
            <div>
                <p>{address}</p>
                <div>
                    <input
                        type="text"
                        className="input"
                        value={detailedAddress}
                        placeholder="상세 주소를 입력해주세요."
                        onChange={(e) => {
                            setDetailedAddress(e.target.value);
                            onChange(`${zonecode} ${address} ${e.target.value}`);
                        }}
                    />
                </div>
            </div>
        </>
    );
};

export default AddressInput;
