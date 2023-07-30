import React, { useState } from 'react';
import { Input, Button, Select, Space } from 'antd';
import styles from './register.module.scss' // 引入自定义的CSS文件

const { Search } = Input;

interface Event {
    target: EventValue;
}

interface EventValue {
    value: string;
}

const imgUrl = function () {
    const randomNum = Math.floor(Math.random() * 50) + 1;
    return `https://image.xiaosaturn.com/avatar/avatar-${randomNum}.png`;
}

export function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [verificationCode, setVerificationCode] = useState('');

    const handleNameChange = (e: Event) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e: Event) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: Event) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e: Event) => {
        setConfirmPassword(e.target.value);
    }

    const handleVerificationCodeChange = (e: Event) => {
        setVerificationCode(e.target.value);
    }

    const getVerificationCode = () => {
        // 处理获取验证码逻辑

    }

    const handleRegister = () => {
        // 处理注册逻辑

    };

    return (
        <div className={styles["register-container"]}>
            <div>
                <h1 className={styles["register-heading"]}>注册</h1>
                <form>
                    <div className={styles["register-input-container"]}>
                        <label className={styles["register-label"]}>邮箱:</label>
                        <Input className={styles["register-input"]} value={email} onChange={handleEmailChange} placeholder='请输入邮箱' />
                    </div>
                    <div className={styles["register-input-container"]}>
                        <label className={styles["register-label"]}>密码:</label>
                        <Input.Password className={styles["register-password-input"]}  value={password} onChange={handlePasswordChange} placeholder='请输入密码' />
                    </div>
                    <div className={styles["register-input-container"]}>
                        <label className={styles["register-label"]}>确认密码:</label>
                        <Input.Password className={styles["register-password-input"]} value={confirmPassword} onChange={handleConfirmPasswordChange} placeholder='再次输入密码' />
                    </div>
                    <div className={styles["register-input-container"]}>
                        <label className={styles["register-label"]}>验证码:</label>
                        <Input className={styles["register-input"]} value={verificationCode} onChange={handleVerificationCodeChange} placeholder='请输入验证码' />
                        <button className={styles["register-button"]} onClick={getVerificationCode}>获取验证码</button>
                    </div>
                    <button className={styles["register-button"]} style={{ width: '100px', marginLeft: '120px' }} onClick={handleRegister}>注册</button>
                </form>
            </div>
        </div>
    );
}
