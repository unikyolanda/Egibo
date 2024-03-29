import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function ResetPasswordPage() {
    const [input, setInput] = useState('');
    const [error, setError] = useState(false);

    const validateEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }    

    const handleInputChange = (e) => {
        const email = e.target.value;
    if (validateEmail(email)) {
        console.log("Email is valid");
        setError(false);
    } else {
        console.log("Email is invalid");
        setError(true);
    }
    setInput(email);
    }

    const navigate = useNavigate();
    const handleSendEmail = async () => {
        if (error) {
            alert('請輸入正確的Email');
            return;
        }

        try {
            const response = await axios.post('http://125.228.62.164:5006/send_email_reset', {
                email: input
            });

            if (response.data.status === '信件已寄出' && response.data.success === true) {
                console.log('驗證碼發送成功:', response.data);
                localStorage.setItem('email', input);
                navigate('/verifycode');

            } else {
                console.log('驗證碼發送失敗:', response.data);
            }
        } catch (error) {
            console.error('驗證碼發送請求出錯:', error);
        }
    }

    return (
        <div className="flex justify-center items-center w-screen h-screen car bg-center bg-no-repeat bg-cover">
            <div className="w-[343px] sm:w-[540px] h-[544px] relative">
                <div className="w-[343px] sm:w-[540px] h-[544px] bg-white bottom-mark relative z-10 rounded-[25px]">
                        <div className="flex flex-col px-10 pt-7 relative">
                            <p className="text-[28px] text-pr font-medium">重設密碼</p>
                            <p className="text-base text-pr mt-1 mb-7">我們將發送驗證碼至您的信箱。</p>
                            <p className='text-sc text-lg mb-1'>Email</p>
                            <input className={`w-full h-14 pl-5 checkout-name rounded-xl border-[1px] border-[#dedede] text-base mb-[184px]
                            focus:border-[1px] focus:border-[#4339e4] focus:outline-none focus:ring-4 focus:ring-[rgba(67,57,228,0.2)] text-[#545454]
                            ${error ? 'border-[#ff5b60]' : ''}`}
                                placeholder="mail@example.com"
                                type="text"
                                name="email"
                                value={input}
                                onChange={handleInputChange}
                            />
                            {error && <div className="text-[#ff5b60] absolute top-[218px]">
                                請輸入正確的電子信箱
                            </div>}
                            <button className={`rounded-full w-full py-4 text-lg font-medium ${input.length > 0 ? 'bg-[#4339e4] text-white hover:bg-[#2e26a3]' : 'bg-[#f0f0f0] text-[#b0b0b0]'}`}
                                onClick={handleSendEmail}>取得驗證碼</button>
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

export default ResetPasswordPage;