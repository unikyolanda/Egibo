import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

function LoginPage() {
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

    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisibility = () => {
      setPasswordShown(!passwordShown);
    };

    const [inputPassword, setInputPassword] = useState('');
    const handleInputPw = (e) => {
        const value = e.target.value;
        setInputPassword(value);
    };

    const { login } = useAuth();
    const navigate = useNavigate();
    const [showDiv, setShowDiv] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const handleLogin = async () => {
        try {
            const response = await axios.post('http://125.228.62.164:5006/login', {
                email: input,
                passWord: inputPassword
            });

            if (response.data.status === '登入成功' && response.data.success === true) {
                login(response.data.user_id);
                localStorage.setItem('email', input);
                setShowLogin(true);

                setTimeout(() => {
                    setShowLogin(false);
                    navigate('/home');
                }, 1500);
            } else {
                console.error('登入失敗');
                setShowDiv(true);
            }
        } catch (error) {
            console.error('登入請求錯誤', error);
        }
    }

    return (
        <div className="flex justify-center items-center w-screen h-screen car bg-center bg-no-repeat bg-cover">
            <div className="w-[343px] sm:w-[540px] h-[544px] relative">
                <div className="w-[343px] sm:w-[540px] h-[544px] bg-white bottom-mark relative z-10 rounded-[25px]">
                        <div className="flex flex-col px-10 pt-7 relative">
                            <p className="text-[28px] text-pr font-medium mb-[56px]">登入</p>
                            <p className='text-sc text-lg mb-1'>Email</p>
                            <input className={`w-full h-14 pl-5 checkout-name rounded-xl border-[1px] border-[#dedede] text-base text-[#545454] mb-10
                            focus:border-[1px] focus:border-[#4339e4] focus:outline-none focus:ring-4 focus:ring-[rgba(67,57,228,0.2)]
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
                            <p className='text-sc mb-2'>密碼</p>
                            <input className={`w-full h-14 pl-5 checkout-name rounded-xl border-[1px] border-[#dedede] text-base mb-14
                            focus:border-[1px] focus:border-[#4339e4] focus:outline-none focus:ring-4 focus:ring-[rgba(67,57,228,0.2)] text-[#545454]`}
                                placeholder="請輸入密碼"
                                type={passwordShown ? 'text' : 'password'}
                                name="password"
                                value={inputPassword}
                                onChange={handleInputPw}
                            />
                            {passwordShown
                                ? <div className="eye-slash-icon eye-icon-all absolute top-[260px] right-10" onClick={togglePasswordVisibility}></div> 
                                : <div className="eye-icon eye-icon-all absolute top-[260px] right-10" onClick={togglePasswordVisibility}></div>}
                            <Link to='/resetpassword'>
                                <button className="text-[#20c374] font-medium underline underline-offset-2 absolute top-[344px] right-10">重設密碼</button>
                            </Link>
                            <button className={`rounded-full w-full py-4 text-lg font-medium ${inputPassword.length > 0 ? 'bg-[#4339e4] text-white hover:bg-[#2e26a3]' : 'bg-[#f0f0f0] text-[#b0b0b0]'}`}
                                onClick={handleLogin}>下一步</button>
                            <div className="flex justify-center py-7">
                                <p className="text-sc">還沒有建立帳號？</p>
                                <Link to='/'>
                                    <button className="text-[#20c374] font-medium underline underline-offset-2">註冊</button>
                                </Link>
                            </div>
                        </div>
                </div>
                        {showDiv && <div className='bg-black/70 fixed inset-0 flex justify-center items-center z-40'>
                            <div className='w-[343px] h-[177px] bg-white z-10 flex flex-col rounded-md justify-center items-center'>
                                <p className='text-base text-pr w-[243px] text-center mb-6'>請檢查是否已註冊<br />或輸入正確的Email或密碼</p>
                                <div>
                                    <button className='w-[160px] h-[55px] bg-purple-pr text-white font-bold rounded-md'
                                        onClick={() => setShowDiv(false)}>確認</button>
                                </div>
                            </div>
                        </div>}
                        {showLogin && <div className='bg-black/70 fixed inset-0 flex justify-center items-center z-30'>
                            <div className='w-[400px] h-[184px] bg-white flex flex-col rounded-xl p-6 relative'>
                                <div className="check w-8 h-8 bg-no-repeat bg-contain mb-4"></div>
                                <p className='text-lg text-[#101828] font-bold w-[243px] mb-1'>登入成功</p>
                                <p className='text-sm text-[#475467] w-[350px]'>現在您可以使用網站功能。</p>
                                <div className="cross w-6 h-6 bg-no-repeat bg-contain absolute top-6 right-6 cursor-pointer"></div>
                            </div>
                        </div>}
            </div>
        </div>
    )
}

export default LoginPage;