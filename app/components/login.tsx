import React, { useState } from 'react';
import { AppstoreOutlined, CompassOutlined, SmileOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Input, Button, Select, Space, Menu, Tabs } from 'antd';
import styles from './login.module.scss' // 引入自定义的CSS文件

const { Search } = Input;


export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [verificationCode, setVerificationCode] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleVerificationCodeChange = (e) => {
        setVerificationCode(e.target.value);
    }

    const getVerificationCode = () => {
        // 处理获取验证码逻辑

    }

    const handleLogin = () => {
        // 处理登录逻辑

    };

    return (
        <div className={styles["register-container"]}>
            <Tabs defaultActiveKey='1' items={[CompassOutlined, SmileOutlined].map((icon, i) => {

                return {
                   label: (
                        i == 0 ? '密码登录' : '验证码登录'
                   ),
                   key: String(i + 1),
                   children: (
                        <div>
                            <h1 className={styles["register-heading"]}>登录</h1>
                            <form>
                                <div className={styles["register-input-container"]}>
                                    <label className={styles["register-label"]}>邮箱:</label>
                                    <Input className={styles["register-input"]} value={email} onChange={handleEmailChange} placeholder='请输入邮箱' />
                                </div>
                                <div className={styles["register-input-container"]}>
                                    { i == 0 && (
                                        <div>
                                            <label className={styles["register-label"]}>密码:</label>
                                            <Input className={styles["register-input"]}  value={password} onChange={handlePasswordChange} placeholder='请输入密码' />
                                        </div>
                                    )}
                                    { i == 1 && (
                                        <div>
                                            <label className={styles["register-label"]}>验证码:</label>
                                            <Input className={styles["register-input"]}  value={verificationCode} onChange={handleVerificationCodeChange} placeholder='请输入验证码' />
                                            <button className={styles["register-button"]} onClick={getVerificationCode}>获取验证码</button>
                                        </div>
                                    )}
                                </div>
                                <button className={styles["register-button"]} style={{ width: '100px' }} onClick={handleLogin}>登录</button>
                            </form>
                        </div>
                    )
                }
            })} />

            
        </div>
    );
}
