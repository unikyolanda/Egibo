import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function NewPasswordPage() {
    const [active, setActive] = useState(true);

    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisibility = () => {
      setPasswordShown(!passwordShown);
    };

    const [repasswordShown, setRePasswordShown] = useState(false);
    const toggleRePasswordVisibility = () => {
      setRePasswordShown(!repasswordShown);
    };

    const [inputPassword, setInputPassword] = useState('');
    const [pwError, setPwError] = useState(false);
    const handleInputPw = (e) => {
        const value = e.target.value;
        setInputPassword(value);

        if(/^[A-Za-z0-9]{6,16}$/.test(value)) {
            setPwError(false);
        } else {
            setPwError(true);
        }
    }

    const [reinputPassword, setReInputPassword] = useState('');
    const [repwError, setRePwError] = useState(false);
    const handleReInputPw = (e) => {
        const value = e.target.value;
        setReInputPassword(value);

        if(inputPassword === value) {
            setRePwError(false);
        } else {
            setRePwError(true);
        }
    }

    const navigate = useNavigate();
    const [showDiv, setShowDiv] = useState(false);

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

    const handleNewPassword = async () => {
        if (pwError || repwError) {
            alert('請輸入符合格式的密碼');
            return;
        }

        try {
            const response = await axios.post('http://192.168.0.120:5006/update_password', {
                email: email,
                passWord: inputPassword
            })

            if (response.data.message === '密碼更新成功。' && response.data.success === true) {
                setShowDiv(true);

                setTimeout(() => {
                    setShowDiv(false);
                    navigate('/login');
                }, 1500);
            } else {
                console.error('更新失敗', response.data);
            } 
        } catch (error) {
            console.error('更新請求錯誤', error);
        }
    };

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
                            <p className="text-[28px] text-pr font-medium mb-[56px]">重設密碼</p>
                            <p className='text-sc mb-2'>新密碼</p>
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
                                ? <div className="eye-slash-icon eye-icon-all absolute top-[132px] right-10" onClick={togglePasswordVisibility}></div> 
                                : <div className="eye-icon eye-icon-all absolute top-[132px] right-10" onClick={togglePasswordVisibility}></div>}
                            {pwError && <div className="text-[#ff5b60] absolute top-[218px]">
                                請輸入6~16位英數組合
                            </div>}

                            <p className='text-sc mb-2'>再次輸入新密碼</p>
                            <input className={`w-full h-14 pl-5 checkout-name rounded-xl border-[1px] border-[#dedede] text-base text-[#aaaeb6] mb-14
                            focus:border-[1px] focus:border-[#4339e4] focus:outline-none focus:ring-4 focus:ring-[rgba(67,57,228,0.2)] focus:text-[#545454]
                            ${repwError ? 'border-[#ff5b60]' : ''}`}
                                placeholder="請輸入密碼"
                                type={repasswordShown ? 'text' : 'password'}
                                name="password"
                                value={reinputPassword}
                                onChange={handleReInputPw}
                            />
                            {repasswordShown
                                ? <div className="eye-slash-icon eye-icon-all absolute top-[260px] right-10" onClick={toggleRePasswordVisibility}></div> 
                                : <div className="eye-icon eye-icon-all absolute top-[260px] right-10" onClick={toggleRePasswordVisibility}></div>}
                            {repwError && <div className="text-[#ff5b60] absolute top-[348px]">
                                請確認兩次輸入的密碼完全相同
                            </div>}
                            <button className={`rounded-full w-full py-4 text-lg font-medium ${inputPassword.length > 0 ? 'bg-[#4339e4] text-white hover:bg-[#2e26a3]' : 'bg-[#f0f0f0] text-[#b0b0b0]'}`}
                                onClick={handleNewPassword}>提交</button>
                            <div className="flex justify-center py-7">
                                <p className="text-sc">取消重設密碼？</p>
                                <Link to='/login'>
                                    <button className="text-[#20c374] font-medium underline underline-offset-2">返回登入頁</button>
                                </Link>
                            </div>
                        </div>
                </div>
                        { showDiv && <div className='bg-black/70 fixed inset-0 flex justify-center items-center z-30'>
                                <div className='w-[400px] h-[184px] bg-white flex flex-col rounded-xl p-6 relative'>
                                    <div className="check w-8 h-8 bg-no-repeat bg-contain mb-4"></div>
                                    <p className='text-lg text-[#101828] font-bold w-[243px] mb-1'>重設密碼成功</p>
                                    <p className='text-sm text-[#475467] w-[350px]'>您的新密碼已成功建立，現在您可以使用新密碼登入網站。</p>
                                    <div className="cross w-6 h-6 bg-no-repeat bg-contain absolute top-6 right-6 cursor-pointer"></div>
                                </div>
                            </div>}
            </div>
        </div>
    )
}

export default NewPasswordPage;