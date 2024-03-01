import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function SignUp () {
    const [input, setInput] = useState('');
    const [error, setError] = useState(false);

    const validateEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }    

    const handleInputChange = (e) => {
        const email = e.target.value;
    if (validateEmail(email)) {
        setError(false);
    } else {
        setError(true);
    }
    setInput(email);
    }

    const navigate = useNavigate();

    const sendEmail = async () => {
        try {
            const response = await axios.post('http://192.168.0.120:5006/send_email_register', {
                email: input
            });
            if (response.status === 200) {
                localStorage.setItem('email', input);
                navigate('/password');
            }
        } catch (error) {
            console.error('Failed to fetch info:', error.response ? error.response.statusText : error.message);
        }
    }

    return (
        <div className="flex flex-col px-6 sm:px-10 pt-7 relative">
            <p className="text-[28px] text-pr font-medium">註冊</p>
            <p className="text-base text-pr mt-1 mb-7">我們將發送預設密碼和驗證碼至您的信箱。</p>
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
                onClick={sendEmail}>下一步</button>
            <div className="flex justify-center py-7">
                <p className="text-sc">我已經有帳號了？</p>
                <Link to='/login'>
                    <button className="text-[#20c374] font-medium underline underline-offset-2">登入</button>
                </Link>
            </div>
        </div>
    )
}

export default SignUp;