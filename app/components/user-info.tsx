import React, { useEffect, useState } from "react";
import { ErrorBoundary } from "./error";
import { IconButton } from "./button";
import LeftIcon from "../icons/left.svg";
import Locale from "../locales";
import { useLocation, useNavigate } from "react-router-dom";
import { Path, SlotID } from "../constant";
import { EmojiAvatar } from "./emoji";
import newChatStyles from "./new-chat.module.scss";
import styles from "./user-info.module.scss";
import { Image, Button, Modal, message } from "antd";
import { userLogin, getUserInfo, getWXaCode } from "../api/user-info";
import { useNodeServerStore } from "@/app/store";

interface UserInfo {
  id: number;
  avatar: string;
  username: string;
  email: string;
  canProblemCount: number;
  totalProblemCount: number;
  wxcodeUrl: string;
}

export function UserInfo() {
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const accessStore = useNodeServerStore.getState();

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const res = await getUserInfo();
      if (res.status == 200) {
        setLoggedIn(true);
        setUserInfo(res.data);
        if (
          !res.data?.wxcodeUrl ||
          res.data.wxcodeUrl == "" ||
          res.data.wxcodeUrl == null ||
          res.data.wxcodeUrl == undefined
        ) {
          fetchWXaCode();
        }
      } else if (res.status == 401) {
        navigate(Path.Login);
      } else {
        messageApi.open({
          type: "error",
          content: res.msg,
        });
      }
    } catch (err) {
      navigate(Path.Login);
    }
  };

  const fetchWXaCode = async () => {
    try {
      const res = await getWXaCode();
      if (res.status == 200) {
        setUserInfo((wxcodeUrl) => (wxcodeUrl = res.data.url));
      }
    } catch (err) {
      navigate(Path.Login);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleLogout = (e: any) => {
    e.preventDefault();
    setLoggedIn(false);
    accessStore.updateToken("");
    navigate(Path.Login);
  };

  return (
    <div className={styles["user-info-container"]}>
      {contextHolder}
      <div className={styles["mask-header"]}>
        <IconButton
          icon={<LeftIcon />}
          text={Locale.NewChat.Return}
          onClick={() => navigate(Path.Home)}
        ></IconButton>
      </div>
      <div className={styles["user-info"]}>
        <div className={styles["mask-cards"]}>
          <Image alt="加载中" width={200} src={userInfo?.avatar} />
        </div>
        <div className={styles["user-info-detail"]}>
          <div className={styles["user-info-name"]}>
            邮箱：
            <span>{userInfo?.email}</span>
          </div>
          <div className={styles["can-count"]}>
            可用次数：
            <span className={styles["can-num-count"]}>
              {userInfo?.canProblemCount}次
            </span>
          </div>
          <div className={styles["all-count"]}>
            总次数：
            <span>{userInfo?.totalProblemCount}次</span>
          </div>
        </div>
        <div className={styles["user-info-btn"]}>
          <Button
            className={styles["user-info-btn1"]}
            type="primary"
            onClick={showModal}
          >
            观看广告获取5次数
          </Button>
          <Button
            className={styles["user-info-btn2"]}
            type="primary"
            danger
            onClick={handleLogout}
          >
            退出登录
          </Button>
        </div>
        <div className={styles["contact-con"]}>
          <div className={styles["qrcode-contact"]}>
            次数不够用？又不想看广告？还想使用GPT-4？请扫描右边二维码，联系客服，商谈事宜
          </div>
          <Image
            alt="加载中"
            className={styles["contact-c"]}
            width={200}
            src="https://image.xiaosaturn.com/Photo/20231216/215137/qhddww91mo1702734697563.png"
          />
        </div>
      </div>
      <Modal
        title="观看广告"
        centered
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div
          className={styles["qrcode-con"]}
          style={{ display: "flex", justifyContent: "space-around" }}
        >
          <div className={styles["qrcode"]}>
            <p>打开微信扫一扫</p>
            <Image alt="加载中" width={200} src={userInfo?.wxcodeUrl} />
          </div>
          {/* <div>
                        <p>打开抖音扫一扫</p>
                        <Image width={200} src="https://image.xiaosaturn.com/wxacode/2023726/4.png" />
                    </div> */}
        </div>
      </Modal>
    </div>
  );
}
