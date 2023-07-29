/**
 * 用tsx 写一个个人中心页面， 包含邮箱，有效次数、总次数，一个按钮，点击可以弹出二维码
 */
import React, { useState } from 'react';
import { ErrorBoundary } from "./error";
import { IconButton } from "./button";
import LeftIcon from "../icons/left.svg";
import Locale from "../locales";
import { useLocation, useNavigate } from "react-router-dom";
import { Path, SlotID } from "../constant";
import { EmojiAvatar } from "./emoji";
import newChatStyles from "./new-chat.module.scss";
import styles from "./user-info.module.scss";
import { Image, Button, Modal } from 'antd';

const imgUrl = function () {
    const randomNum = Math.floor(Math.random() * 50) + 1;
    return `https://image.xiaosaturn.com/avatar/avatar-${randomNum}.png`;
}

export function UserInfo() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const navigate = useNavigate();
    return (
        <div className={styles["user-info-container"]}>
            <div className={styles["mask-header"]}>
                <IconButton
                    icon={<LeftIcon />}
                    text={Locale.NewChat.Return}
                    onClick={() => navigate(Path.Home)}
                ></IconButton>
            </div>
            <div className={styles["user-info"]}>
                <div className={styles["mask-cards"]}>
                    <Image width={200} src={imgUrl()} />
                </div>
                <div className={styles["user-info-detail"]}>
                    <div className={styles["user-info-name"]}>邮箱：
                        <span>mpcexiao@gamil.com</span>
                    </div>
                    <div className={styles["can-count"]}>可用次数：
                        <span className={styles["can-num-count"]}>5次</span>
                    </div>
                    <div className={styles["all-count"]}>总次数：
                        <span>5次</span>
                    </div>
                </div>
                <div className={styles["user-info-btn"]}>
                    <Button className={styles["user-info-btn1"]} type="primary" onClick={ showModal }>观看广告获取5次数</Button>
                    <Button className={styles["user-info-btn2"]} type="primary" danger onClick={() => { navigate(Path.Login) }}>退出登录</Button>
                </div>
            </div>
            <Modal title="观看广告" centered open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div className={styles["qrcode-con"]} style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <div>
                        <p>打开微信扫一扫</p>
                        <Image width={200} src="https://image.xiaosaturn.com/wxacode/2023726/4.png" />
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