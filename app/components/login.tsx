import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  AppstoreOutlined,
  CompassOutlined,
  SmileOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Input, Button, Select, Space, Menu, Tabs, Spin, message } from "antd";
import { Path, SlotID } from "../constant";
import { useNodeServerStore } from "@/app/store";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./login.module.scss"; // 引入自定义的CSS文件
import { userLogin, userLoginByCode } from "../api/user-info";

const { Search } = Input;

interface Response {
  code: number;
  msg: string;
  data: any;
  token: any;
}

interface Event {
  target: EventValue;
}

interface EventValue {
  value: string;
}

export function Login() {
  const navigate = useNavigate();
  const accessStore = useNodeServerStore();

  const [token, setToken] = useState("");

  const [messageApi, contextHolder] = message.useMessage();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [tabIndex, setTabIndex] = useState("1");

  const handleEmailChange = (e: Event) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: Event) => {
    setPassword(e.target.value);
  };

  const handleVerificationCodeChange = (e: Event) => {
    setVerificationCode(e.target.value);
  };

  const handleToRegister = () => {
    navigate(Path.Register);
  };

  const tabChangeEvent = (key: string) => {
    setTabIndex(key);
  };

  const getVerificationCode = (e: any) => {
    // 处理获取验证码逻辑
    e.preventDefault();
  };

  const fetchUserLogin = async () => {
    const res = await userLogin({
      email,
      password,
    });
    if (res.status == 200) {
      accessStore.updateToken(res.token);
      if (typeof window !== "undefined") {
        // 检查是否在客户端环境下
        localStorage.setItem("token", res.token);
      }
      messageApi.open({
        type: "success",
        content: "登录成功",
      });
      navigate(Path.UserInfo);
    } else {
      messageApi.open({
        type: "error",
        content: res.msg ? res.msg : "登录失败，请稍后重试",
      });
    }
  };

  const fetchUserLoginCode = async () => {
    const res = await userLoginByCode({
      email,
      verificationCode,
    });
    if (res.status == 200) {
      messageApi.open({
        type: "success",
        content: "登录成功",
      });
      accessStore.updateToken(res.token);
      navigate(Path.UserInfo);
    } else {
      messageApi.open({
        type: "error",
        content: res.msg ? res.msg : "登录失败，请稍后重试",
      });
    }
  };
  const handleLogin = (e: any) => {
    // 处理登录逻辑
    e.preventDefault();
    if (tabIndex == "1") {
      // 密码登录
      fetchUserLogin();
    } else if (tabIndex == "2") {
      // 验证码登录
      messageApi.open({
        type: "info",
        content: "暂无开发，敬请期待",
      });
      // fetchUserLoginCode()
    }
  };

  return (
    <div className={styles["register-container"]}>
      {contextHolder}
      <Tabs
        defaultActiveKey="1"
        onChange={tabChangeEvent}
        items={[CompassOutlined, SmileOutlined].map((icon, i) => {
          return {
            label: i == 0 ? "密码登录" : "验证码登录",
            key: String(i + 1),
            children: (
              <div>
                <h1 className={styles["register-heading"]}>登录</h1>
                <form>
                  <div className={styles["register-input-container"]}>
                    <label className={styles["register-label"]}>邮箱:</label>
                    <Input
                      className={styles["register-input"]}
                      value={email}
                      onChange={handleEmailChange}
                      placeholder="请输入邮箱"
                    />
                  </div>
                  {i == 0 && (
                    <div className={styles["register-input-container"]}>
                      <label className={styles["register-label"]}>密码:</label>
                      <Input.Password
                        className={styles["login-password-input"]}
                        value={password}
                        onChange={handlePasswordChange}
                        placeholder="请输入密码"
                      />
                    </div>
                  )}
                  {i == 1 && (
                    <div className={styles["register-input-container"]}>
                      <label className={styles["register-label"]}>
                        验证码:
                      </label>
                      <Input
                        className={styles["register-input"]}
                        value={verificationCode}
                        onChange={handleVerificationCodeChange}
                        placeholder="请输入验证码"
                      />
                      <button
                        className={styles["register-button"]}
                        onClick={getVerificationCode}
                      >
                        获取验证码
                      </button>
                    </div>
                  )}
                  <div className={styles["r-container"]}>
                    <button
                      type="button"
                      className={styles["register-button"]}
                      style={{ width: "100px" }}
                      onClick={handleLogin}
                    >
                      登录
                    </button>
                    <div
                      className={styles["to-register"]}
                      style={{ width: "200px" }}
                      onClick={handleToRegister}
                    >
                      没有账号？去注册
                    </div>
                  </div>
                </form>
              </div>
            ),
          };
        })}
      />
    </div>
  );
}
