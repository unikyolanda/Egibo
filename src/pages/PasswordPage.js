import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function PasswordPage() {
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
            const response = await axios.post('http://125.228.62.164:5006/verify_code_register',{
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
            <div className="w-[343px] sm:w-[540px] h-[544px] relative">
                <div className="w-[343px] sm:w-[540px] h-[544px] bg-white bottom-mark relative z-10 rounded-[25px]">
                        <div className="flex flex-col px-6 sm:px-10 pt-7 relative">
                            <p className="text-[28px] text-pr font-medium mb-1">註冊</p>
                            <p className="text-sm text-pr mb-[12px]">如果您沒有收到預設密碼與驗證碼，請檢查您的垃圾郵件匣，有時可能會被誤判為垃圾郵件。</p>
                            <p className='text-sc mb-2'>密碼</p>
                            <input className={`w-full h-14 pl-5 checkout-name rounded-xl border-[1px] border-[#dedede] text-base mb-10
                            focus:border-[1px] focus:border-[#4339e4] focus:outline-none focus:ring-4 focus:ring-[rgba(67,57,228,0.2)] text-[#545454]
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
                            <input className={`w-full h-14 pl-5 checkout-name rounded-xl border-[1px] border-[#dedede] text-base mb-14
                            focus:border-[1px] focus:border-[#4339e4] focus:outline-none focus:ring-4 focus:ring-[rgba(67,57,228,0.2)] text-[#545454]`}
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