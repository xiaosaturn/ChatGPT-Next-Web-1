"use client";

import React, { useEffect, useState } from 'react';
import { Input, Button, Select, Space, message } from 'antd';
import styles from './register.module.scss' // 引入自定义的CSS文件
import { userRegister, getVerificationCode } from '../api/user-info';
import { useNavigate } from "react-router-dom";
import { Path, SlotID } from "../constant";
import { useNodeServerStore } from '@/app/store';

const { Search } = Input;

interface Event {
    target: EventValue;
}

interface EventValue {
    value: string;
}

export function Register() {
    const accessStore = useNodeServerStore.getState();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [countTime, setCountTime] = useState(0);
    const [countTimeStr, setCountTimeStr] = useState('获取验证码');

    const [messageApi, contextHolder] = message.useMessage();

    const navigate = useNavigate();

    useEffect(() => {
        if (countTime == 0) {
            setCountTimeStr(preStr => '获取验证码');
            return;
        }

        const timer = setInterval(() => {
            setCountTime(prevCount => prevCount - 1);
            setCountTimeStr(preStr => countTime + 's后重新获取');
        }, 1000);
        
        return () => clearInterval(timer);
    }, [countTime]);

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

    const getVeriCode = (e: any) => {
        // 处理获取验证码逻辑
        e.preventDefault();
        getCode();
    }

    const getCode = async () => {
        // 处理获取验证码逻辑
        if (!validateEmail(email)) {
            messageApi.open({
                type: 'error',
                content: '邮箱格式不正确'
            });
            return;
        }
        const res = await getVerificationCode({ email });
        if (res.status == 200) {
            setCountTime(60);
            messageApi.open({
                type: 'success',
                content: '验证码已发送'
            });
        } else {
            messageApi.open({
                type: 'error',
                content: res.msg ? res.msg : '验证码发送失败，请稍后重试'
            });
        }
    }

    const handleRegister = (e: any) => {
        e.preventDefault();
        // 处理注册逻辑
        if (!validateEmail(email)) {
            messageApi.open({
                type: 'error',
                content: '邮箱格式不正确'
            });
            return;
        }
        if (password !== confirmPassword) {
            messageApi.open({
                type: 'error',
                content: '两次密码不一致'
            });
            return;
        }
        if (!checkPassowrd(password)) {
            messageApi.open({
                type: 'error',
                content: '密码格式不正确，至少包含一个数字，一个大写字母，一个小写字母，一个特殊符号，8~24位'
            });
            return;
        }
        if (!verificationCode || verificationCode == '' || verificationCode == undefined || verificationCode == null) {
            messageApi.open({
                type: 'error',
                content: '验证码格式不正确'
            });
            return;
        }
        toRegister();
    };

    const toRegister = async () => {
        const res = await userRegister({ email, password, verificationCode });
        if (res.status == 200) {
            messageApi.open({
                type: 'success',
                content: '注册成功'
            });
            accessStore.updateToken(res.token);
            navigate(Path.UserInfo);
        } else {
            messageApi.open({
                type: 'error',
                content: res.msg ? res.msg : '注册失败'
            });
        }
    }

    return (
        <div className={styles["register-container"]}>
            {contextHolder}
            <div>
                <h1 className={styles["register-heading"]}>注册</h1>
                <form>
                    <div className={styles["register-input-container"]}>
                        <label className={styles["register-label"]}>邮箱:</label>
                        <Input className={styles["register-input"]} value={email} onChange={handleEmailChange} placeholder='请输入邮箱' />
                    </div>
                    <div className={styles["register-input-container"]}>
                        <label className={styles["register-label"]}>密码:</label>
                        <Input.Password className={styles["register-password-input"]}  value={password} onChange={handlePasswordChange} 
                        placeholder='请输入密码' />
                    </div>
                    <div className={styles["register-input-container"]}>
                        <label className={styles["register-label"]}>确认密码:</label>
                        <Input.Password className={styles["register-password-input"]} value={confirmPassword} onChange={handleConfirmPasswordChange} placeholder='再次输入密码' />
                    </div>
                    <div className={styles["register-input-container"]}>
                        <label className={styles["register-label"]}>验证码:</label>
                        <Input className={styles["register-input"]} value={verificationCode} onChange={handleVerificationCodeChange} placeholder='请输入验证码' />
                        {
                            countTime > 0 ? (
                                <button className={styles["register-button"]} disabled>{countTimeStr}</button>
                            ) : (
                                <button className={styles["register-button"]} onClick={getVeriCode}>获取验证码</button>
                            )
                        }
                    </div>
                    <button className={styles["register-button"]} style={{ width: '100px', marginLeft: '120px' }} onClick={handleRegister}>注册</button>
                </form>
            </div>
        </div>
    );
}

/**
 * Validates an email address format.
 *
 * @param {string} email - The email address to validate.
 * @returns {boolean} - Returns true if the email format is valid, otherwise false.
 */
function validateEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
const checkPassowrd = (value: string) => {
    const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,24}$/;
    return reg.test(value);
}

