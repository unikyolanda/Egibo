import React, { useState, useEffect } from "react";
import Select from "../components/Select";
import SignUp from "../components/SignUp";

function SignupPage() {
    const [active, setActive] = useState(true);
    const [selectedIdentity, setSelectedIdentity] = useState('車主');

    const handleSelectIdentity = (identity) => {
        setSelectedIdentity(identity);
    };

    const handleRoleChange = () => {
        setActive(true);
        setSelectedIdentity('車主');
        console.log(selectedIdentity);
    }

    useEffect(() => {
        localStorage.setItem('role', selectedIdentity);
        console.log(selectedIdentity);
    }, [selectedIdentity]);

    return (
        <div className="flex justify-center items-center w-screen h-screen car bg-center bg-no-repeat bg-cover">
            <div className="w-[343px] sm:w-[540px] h-[544px] relative mt-[60px]"
            style={{borderRadius: active ? '0% 5% 5% 5% / 0% 5% 5% 5%' : '5% 0% 5% 5% / 5% 0% 5% 5%'}}>
                <div className="flex">
                    <div className={`w-[204px] sm:w-[300px] h-[61px] left-mark absolute flex justify-center items-center top-[-60px]  cursor-pointer ${active ? 'z-20 bg-white' : 'z-0 bg-white h-[81px]'}`}
                        onClick={handleRoleChange}>
                            <p className={`text-xl flex relative text-pr pb-2 ${active ? 'gradient-underline' : 'mb-5 mr-14'}`}>車主</p>
                        </div>
                    <div className={`w-[204px] sm:w-[300px] h-[61px] right-mark absolute flex justify-center items-center right-0 top-[-60px] cursor-pointer ${active ? 'z-0 bg-white h-[81px]' : 'z-20 bg-white'}`}
                        onClick={() => setActive(false)}>
                            <p className={`text-xl flex relative text-pr pb-2 ${active ? 'mb-5 ml-14' : 'gradient-underline'}`}>從業人員</p>
                        </div>
                </div>
                <div className="w-[343px] sm:w-[540px] h-[544px] bg-white bottom-mark relative z-10"
                    style={{borderRadius: active ? '0% 5% 5% 5% / 0% 5% 5% 5%' : '5% 0% 5% 5% / 5% 0% 5% 5%'}}>
                        {active ? (
                            <SignUp />
                        ) : selectedIdentity === '車主' ? (
                            <Select onSelectIdentity={handleSelectIdentity} />
                        ) : (
                            <SignUp />
                        )}
                </div>
            </div>
        </div>
    )
}

export default SignupPage;