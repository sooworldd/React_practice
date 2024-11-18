import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddressInput from './DaumPostCode';
import axios from 'axios';
import './Join.css';

function Join() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        userId: '',
        password: '',
        confirmPassword: '',
        birthDate: '',
        address: '',
        email: '',
        phone: '',
    });

    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "phone" && !/^\d*$/.test(value)) {
            return;
        }

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validateForm = () => {
        if (!formData.userId || formData.userId.trim() === '') {
            alert('아이디를 입력해주세요.');
            return false;
        }

        const userIdRegex = /^[a-zA-Z0-9]+$/;
        if (!userIdRegex.test(formData.userId)) {
            alert('아이디는 영문과 숫자만 사용 가능합니다.');
            return false;
        }

        if (formData.userId.length > 50) {
            alert('아이디는 50자 이내로 작성해주세요.');
            return false;
        }

        if (!formData.password || formData.password.trim() === '') {
            alert('비밀번호를 입력해주세요.');
            return false;
        }

        if (!formData.confirmPassword || formData.confirmPassword.trim() === '') {
            alert('비밀번호 확인을 입력해주세요.');
            return false;
        }

        if (formData.password !== formData.confirmPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            return false;
        }

        if (!formData.username || formData.username.trim() === '') {
            alert('성명을 입력해주세요.');
            return false;
        }

        if (formData.username.length > 100) {
            alert('사용자 이름은 100자를 초과할 수 없습니다.');
            return false;
        }

        if (!formData.birthDate || formData.birthDate.trim() === '') {
            alert('생년월일은 필수 입력 사항입니다.');
            return false;
        }

        if (!formData.address || formData.address.trim() === '') {
            alert('주소를 입력해주세요.');
            return false;
        }

        if (formData.address.length > 255) {
            alert('주소는 255자를 초과할 수 없습니다.');
            return false;
        }

        if (!formData.email || formData.email.trim() === '') {
            alert('이메일을 입력해주세요.');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert('잘못된 이메일 형식입니다.');
            return false;
        }

        if (formData.email.length > 100) {
            alert('이메일은 100자를 초과할 수 없습니다.');
            return false;
        }

        if (!formData.phone || formData.phone.trim() === '') {
            alert('전화번호를 입력해주세요.');
            return false;
        }

        const phoneRegex = /^\d{11}$/;
        if (!phoneRegex.test(formData.phone)) {
            alert('전화번호는 11자리 숫자만 입력해주세요.');
            return false;
        }

        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("회원가입 시작")

        if (!validateForm()) {
            return;
        }

        const signupData = {
            userId: formData.userId,
            password: formData.password,
            username: formData.username,
            birthDate: formData.birthDate,
            address: formData.address,
            email: formData.email,
            phone: formData.phone,
        };

        axios.post('http://localhost:8080/main/join', signupData)
            .then(response => {
                if (response.data === 'Join_Success') {
                    alert('회원 가입이 완료되었습니다.');
                    navigate('/');
                } else {
                    setErrorMessage('회원가입 실패: ' + response.data);
                }
            })
            .catch(error => {
                console.error('Error during registration:', error);
                setErrorMessage('서버와 연결할 수 없습니다.');
            });
    };

    const goToLogin = () => {
        navigate('/');
    };

    return (
        <div className="join-container">
            <h1 className="join-title">회원가입</h1>
            <form className="join-form">
                <label className="label">
                    <span className="label-text">ID</span>
                    <input
                        type="text"
                        name="userId"
                        value={formData.userId}
                        onChange={handleChange}
                        className="input"
                        required
                    />
                </label>

                <label className="label">
                    <span className="label-text">PW</span>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="input"
                        required
                    />
                </label>

                <label className="label">
                    <span className="label-text">PW 확인</span>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="input"
                        required
                    />
                </label>
                <br />


                <label className="label">
                    <span className="label-text">성명</span>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="input"
                        required
                    />
                </label>

                <label className="label">
                    <span className="label-text">생년월일</span>
                    <input
                        type="date"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleChange}
                        className="input"
                        required
                    />
                </label>

                <label className="label">
                    <AddressInput
                        onChange={(value) => setFormData((prevData) => ({ ...prevData, address: value }))}
                    />
                </label>

                {/* <label className="label">
                    <span className="label-text">주소</span>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="input"
                        required
                    />
                </label> */}

                <label className="label">
                    <span className="label-text">이메일 주소</span>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="input"
                        required
                    />
                </label>

                <label className="label">
                    <span className="label-text">휴대폰 번호</span>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={(e) => handleChange(e, /^[0-9]*$/)}
                        className="input"
                        pattern="[0-9]*"
                        placeholder="01012345678"
                        required
                    />
                </label>

                <button type="submit" className="submit-btn" onClick={handleSubmit}>회원가입</button>
                &nbsp;
                <button onClick={goToLogin} className="back-btn">돌아가기</button>
            </form>
        </div>
    );
}

export default Join;