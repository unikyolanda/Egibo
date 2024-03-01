import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function PasswordPage() {
    const [active, setActive] = useState(true);

    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisibility = () => {
      setPasswordShown(!passwordShown);
    };

    const [inputPassword, setInputPassword] = useState('');
    const [pwError, setPwError] = useState(false);
    const handleInputPw = (e) => {
        const value = e.target.value;
        setInputPassword(value);

        if(/^[a-z0-9]{6}$/.test(value)) {
            setPwError(false);
        } else {
            setPwError(true);
        }
    }

    const [inputVerifyCode, setInputVerifyCode] = useState('');
    const [verifyError, setVerifyError] = useState(false);
    const handleInputVerify = (e) => {
        const value = e.target.value;
        setInputVerifyCode(value);

        if (/^[0-9]{6}$/.test(value)) {
            setVerifyError(false);
        } else {
            setVerifyError(true);
        }
    }

    const getSavedEmail = () => {
        return localStorage.getItem('email');
    }

    const [email, setEmail] = useState(getSavedEmail());
    const [role, setRole] = useState('')

    useEffect(() => {
        const savedEmail = getSavedEmail();
        if (savedEmail) {
            setEmail(savedEmail);
        }
        console.log(savedEmail);

        const savedRole = localStorage.getItem('role');
        if (savedRole) {
            setRole(savedRole);
        }
        console.log(savedRole);
        console.log(role);
    }, []);

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (pwError || verifyError) {
            alert("請修正錯誤後提交");
            return;
        }

        try {
            const response = await axios.post('http://192.168.0.120:5006/verify_code_register',{
                email: email,
                passWord: inputPassword,
                code: inputVerifyCode,
                role: role
            })
            if (response.data.success) {
                navigate('/home');
            }
        } catch (error) {
            console.error('Failed to fetch info:', error.response ? error.response.statusText : error.message);
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
                        <div className="flex flex-col px-6 sm:px-10 pt-7 relative">
                            <p className="text-[28px] text-pr font-medium mb-1">註冊</p>
                            <p className="text-sm text-pr mb-[12px]">如果您沒有收到預設密碼與驗證碼，請檢查您的垃圾郵件匣，有時可能會被誤判為垃圾郵件。</p>
                            <p className='text-sc mb-2'>密碼</p>
                            <input className={`w-full h-14 pl-5 checkout-name rounded-xl border-[1px] border-[#dedede] text-base text-[#aaaeb6] mb-10
                            focus:border-[1px] focus:border-[#4339e4] focus:outline-none focus:ring-4 focus:ring-[rgba(67,57,228,0.2)] focus:text-[#545454]
                            ${pwError ? 'border-[#ff5b60]' : ''}`}
                                placeholder="請輸入密碼"
                                type={passwordShown ? 'text' : 'password'}
                                name="password"
                                value={inputPassword}
                                onChange={handleInputPw}
                            />
                            {passwordShown
                                ? <div className="eye-slash-icon eye-icon-all absolute top-[260px] right-10" onClick={togglePasswordVisibility}></div> 
                                : <div className="eye-icon eye-icon-all absolute top-[260px] right-6 sm:right-10" onClick={togglePasswordVisibility}></div>}
                            {pwError && <div className="text-[#ff5b60] absolute top-[218px]">
                                請輸入正確的預設密碼，應為6位英數組合
                            </div>}
                            <p className='text-sc mb-2'>驗證碼</p>
                            <input className={`w-full h-14 pl-5 checkout-name rounded-xl border-[1px] border-[#dedede] text-base text-[#aaaeb6] mb-14
                            focus:border-[1px] focus:border-[#4339e4] focus:outline-none focus:ring-4 focus:ring-[rgba(67,57,228,0.2)] focus:text-[#545454]`}
                                placeholder="請輸入驗證碼"
                                type="text"
                                name="verifycode"
                                value={inputVerifyCode}
                                onChange={handleInputVerify}
                            />
                            {verifyError && <div className="text-[#ff5b60] absolute top-[218px]">
                                請輸入正確的驗證碼，應為6位數字
                            </div>}
                            <button className={`rounded-full w-full py-4 text-lg font-medium ${inputPassword.length > 0 ? 'bg-[#4339e4] text-white hover:bg-[#2e26a3]' : 'bg-[#f0f0f0] text-[#b0b0b0]'}`}
                                onClick={handleSubmit}>下一步</button>
                            <div className="flex justify-center py-7">
                                <p className="text-sc">沒有收到密碼與驗證碼？</p>
                                <button className="text-[#20c374] font-medium underline underline-offset-2">重新傳送</button>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default PasswordPage;