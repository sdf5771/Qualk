import LoginForm from 'components/login/LoginForm';
import GlobalNavBar from 'components/main/GlobalNavBar';
import React from 'react';
import styles from 'stylesheets/login/LoginPage.module.css'
import bgImage from 'assets/images/login/login_bg_image.png';
import { RootState } from 'reducers/reducers';
import { useSelector } from 'react-redux';
import ToastMsg from 'components/public/toast-msg/ToastMsg';
import FindPasswordModal from 'components/login/FindPasswordModal';
import SendMailModal from 'components/createAccount/SendMailModal';
import { ReponsivePC, ReponsiveMobile, ReponsiveTabletPC } from 'components/public/responsive-wrapper/ResponsiveWrapper';

function LoginPage(){
    const {isToast, toastType, toastMsg} = useSelector((state: RootState) => state.toastMsgReducer);
    const {isOpen: findPasswordModalIsOpen} = useSelector((state: RootState) => state.findPasswordModalReducer);
    const {isOpen: sendMailModalIsOpen} = useSelector((state: RootState) => state.sendMailModalReducer);

    return (
        <div className={styles.login_page_root}>
            <div className={styles.header_container}>
                <GlobalNavBar />
            </div>
            <div className={styles.body_container}>
                <section>
                    <LoginForm />
                </section>
                <section>
                    <ReponsivePC>
                        <img width={800} src={bgImage} />
                    </ReponsivePC>
                    <ReponsiveTabletPC>
                        <img width={480} height={'100%'} src={bgImage} />
                    </ReponsiveTabletPC>
                </section>
            </div>
            {isToast && toastMsg && toastType ? <ToastMsg type={toastType} msgText={toastMsg} /> : null}
            {findPasswordModalIsOpen ? <FindPasswordModal /> : null}
            {sendMailModalIsOpen ? <SendMailModal /> : null}
        </div>
    )
}

export default LoginPage;