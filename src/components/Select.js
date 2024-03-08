import left from '../images/行政人員.svg';
import right from '../images/業務人員.svg';
import { useState, useEffect } from 'react';

function Select({ onSelectIdentity }) {
    const [chosen, setChosen] = useState('使用者');
    
    const handleNextClick = () => {
        if(chosen) {
            localStorage.setItem('role', chosen);
            onSelectIdentity(chosen);
        }
    };

    useEffect(() => {
        console.log(chosen);
    }, [chosen])

    return (
        <div className="flex flex-col px-6 sm:px-10 pt-7 relative">
            <p className="text-[28px] text-pr font-medium pl-4">註冊</p>
            <p className="text-base text-pr mt-1 mb-7 pl-4">請選擇您的職位。</p>
            <div className='flex justify-center'>
                <div 
                    className={`flex flex-col justify-center items-center w-[150px] h-[150px] bg-[#f4f6ff] rounded-[32px] ${chosen === '行政人員' ? 'dropshadow-pr' : 'dropshadow-sc'} cursor-pointer mr-3 sm:mr-20 hover:bg-[#e9edfd]`} 
                    onClick={() => setChosen('行政人員')}
                >
                    <img alt='left' src={left} />
                    <p className='text-[#4339e4] mt-3 font-bold'>行政人員</p>
                </div>
                <div 
                    className={`flex flex-col justify-center items-center w-[150px] h-[150px] bg-[#f4f6ff] rounded-[32px] ${chosen === '業務' ? 'dropshadow-pr' : 'dropshadow-sc'} cursor-pointer hover:bg-[#e9edfd]`} 
                    onClick={() => setChosen('業務')}
                >
                    <img alt='right' src={right} />
                    <p className='text-[#4339e4] mt-3 font-bold'>業務</p>
                </div>
            </div>
            <button className={`mt-28 rounded-full w-full py-4 text-lg font-medium bg-[#4339e4] text-white hover:bg-[#2e26a3]`}
                onClick={handleNextClick}>下一步</button>
        </div>
    )
}

export default Select;