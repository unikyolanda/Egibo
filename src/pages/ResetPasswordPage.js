import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function ResetPasswordPage() {
    const [active, setActive] = useState(true);
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
            const response = await axios.post('http://192.168.0.120:5006/send_email_reset', {
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
            <div className="w-[343px] sm:w-[540px] h-[544px] relative"
            style={{borderRadius: active ? '0% 5% 5% 5% / 0% 5% 5% 5%' : '5% 0% 5% 5% / 5% 0% 5% 5%'}}>
                <div className="flex">
                    <div className={`w-[204px] sm:w-[300px] h-[61px] left-mark absolute flex justify-center items-center top-[-60px]  cursor-pointer ${active ? 'z-20 bg-white' : 'z-0 bg-white h-[81px]'}`}
                        onClick={() => setActive(true)}>
                            <p className={`text-xl flex relative text-pr pb-2 ${active ? 'gradient-underline' : 'mb-5 mr-14'}`}>使用者</p>
                        </div>
                    <div className={`w-[204px] sm:w-[300px] h-[61px] right-mark absolute flex justify-center items-center right-0 top-[-60px] cursor-pointer ${active ? 'z-0 bg-white h-[81px]' : 'z-20 bg-white'}`}
                        onClick={() => setActive(false)}>
                            <p className={`text-xl flex relative text-pr pb-2 ${active ? 'mb-5 ml-14' : 'gradient-underline'}`}>從業人員</p>
                        </div>
                </div>
                <div className="w-[343px] sm:w-[540px] h-[544px] bg-white bottom-mark relative z-10"
                    style={{borderRadius: active ? '0% 5% 5% 5% / 0% 5% 5% 5%' : '5% 0% 5% 5% / 5% 0% 5% 5%'}}>
                        <div className="flex flex-col px-10 pt-7 relative">
                            <p className="text-[28px] text-pr font-medium">重設密碼</p>
                            <p className="text-base text-pr mt-1 mb-7">我們將發送驗證碼至您的信箱。</p>
                            <p className='text-sc text-lg mb-1'>Email</p>
                            <input className={`w-full h-14 pl-5 checkout-name rounded-xl border-[1px] border-[#dedede] text-base text-[#aaaeb6] mb-[184px]
                            focus:border-[1px] focus:border-[#4339e4] focus:outline-none focus:ring-4 focus:ring-[rgba(67,57,228,0.2)] focus:text-[#545454]
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