import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function VerifyCodePage() {
    const [verifycode, setVerifyCode] = useState('');

    const handleInputChange = (e) => {
        const value = e.target.value;
        setVerifyCode(value);
    }
    
    const getSavedEmail = () => {
        return localStorage.getItem('email');
    }

    const [email, setEmail] = useState(getSavedEmail());
    useEffect(() => {
        const savedEmail = getSavedEmail();
        if (savedEmail) {
            setEmail(savedEmail);
        }
        console.log(savedEmail);
    }, []);

    const [verificationError, setVerificationError] = useState('');

    const navigate = useNavigate();
    const handeleVerify = async () => {
        try {
            const response = await axios.post('http://125.228.62.164:5006/verify_code_reset', {
                email: email,
                code: verifycode
            })
            if (response.data.message === '驗證成功' && response.data.success === true) {
                console.log('驗證成功:', response.data);
                navigate('/newpassword');
                setVerificationError('');
            } else {
                setVerificationError('驗證碼不正確，請重新輸入。');
                console.log('驗證失敗:', response.data);
            }
        } catch (error) {
            setVerificationError('發送請求出錯，請檢查網路連線。');
            console.error('驗證請求出錯:', error);
        }
    }

    const handleSendEmail = async () => {
        setIsButtonDisabled(true);
        setCountdown(60);

        try {
            const response = await axios.post('http://125.228.62.164:5006/send_email_reset', { email });

            if (response.data.status === '信件已寄出' && response.data.success === true) {
                console.log('驗證碼發送成功:', response.data);
                localStorage.setItem('email', email);
            } else {
                console.log('驗證碼發送失敗:', response.data);
                setIsButtonDisabled(false);
            }
        } catch (error) {
            console.error('驗證碼發送請求出錯:', error);
            setIsButtonDisabled(false);
        }
    }

    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [countdown, setCountdown] = useState(0);

    useEffect(() => {
        let interval;
        if (isButtonDisabled) {
            interval = setInterval(() => {
                setCountdown((prevCountdown) => {
                    if (prevCountdown > 0) {
                        return prevCountdown - 1;
                    }
                    clearInterval(interval);
                    setIsButtonDisabled(false);
                    return 0;
                });
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isButtonDisabled]);

    return (
        <div className="flex justify-center items-center w-screen h-screen car bg-center bg-no-repeat bg-cover">
            <div className="w-[343px] sm:w-[540px] h-[544px] relative">
                <div className="w-[343px] sm:w-[540px] h-[544px] bg-white bottom-mark relative z-10 rounded-[25px]">
                        <div className="flex flex-col px-10 pt-7 relative">
                            <p className="text-[28px] text-pr font-medium mb-[56px]">重設密碼</p>
                            <p className='text-sc text-lg mb-1'>驗證碼</p>
                            <div className="flex relative">
                                <input className={`w-[290px] h-14 pl-5 checkout-name rounded-xl border-[1px] border-[#dedede] text-base mb-[184px]
                                focus:border-[1px] focus:border-[#4339e4] focus:outline-none focus:ring-4 focus:ring-[rgba(67,57,228,0.2)] text-[#545454]`}
                                placeholder="驗證碼"
                                type="text"
                                name="verifycode"
                                value={verifycode}
                                onChange={handleInputChange}
                                />
                                {verificationError && <p className="absolute top-16 left-2 text-red-500">{verificationError}</p>}
                                <button className={`w-[160px] h-14 border-2 border-[#4339e4] text-[#4339e4] rounded-xl ml-2 hover:bg-[#eeebfb]
                                    ${isButtonDisabled ? 'opacity-50' : ''}`}
                                    disabled={isButtonDisabled}
                                    onClick={handleSendEmail}>重新取得驗證碼</button>
                                {isButtonDisabled && <p className="absolute top-16 right-6 text-xs text-[#4339e4]/70">{`請等待 ${countdown} 秒`}</p>}
                            </div>
                            <button className={`rounded-full w-full py-4 text-lg font-medium ${verifycode.length > 0 ? 'bg-[#4339e4] text-white hover:bg-[#2e26a3]' : 'bg-[#f0f0f0] text-[#b0b0b0]'}`}
                                onClick={handeleVerify}>下一步</button>
                            <div className="flex justify-center py-7">
                                <p className="text-sc">取消重設密碼？</p>
                                <Link to='/login'>
                                    <button className="text-[#20c374] font-medium underline underline-offset-2">返回登入頁</button>
                                </Link>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default VerifyCodePage;