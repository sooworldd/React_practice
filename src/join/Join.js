import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Join.css';

function Join() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }
        alert('회원가입 성공!');
    };

    const goToLogin = () => {
        navigate('/');
    };

    return (
        <div className="join-container">
            <h1 className="join-title">회원가입</h1>
            <form onSubmit={handleSubmit} className="join-form">
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
                    <span className="label-text">이름</span>
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
                    <span className="label-text">주소</span>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="input"
                        required
                    />
                </label>

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
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="input"
                        pattern="[0-9]{3}-[0-9]{3,4}-[0-9]{4}"
                        placeholder="010-1234-5678"
                        required
                    />
                </label>

                <button type="submit" className="submit-btn">회원가입</button>
                &nbsp;
                <button onClick={goToLogin} className="back-btn">돌아가기</button>
            </form>
        </div>
    );
}

export default Join;