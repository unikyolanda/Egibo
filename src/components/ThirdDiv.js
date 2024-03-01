function ThirdDiv() {
    const scrollTo = (pixel) => {
        window.scrollTo({
          top: pixel,
          behavior: 'smooth'
        });
    };

    return (
        <div className='flex justify-center items-center bg-[#f7f7f9]'>
            <div className='w-[343px] sm:w-[954px] h-[750px] sm:h-[650px] pt-[80px]'>
                <div className='w-full h-[52px] flex items-center justify-between mb-6'>
                    <div className='flex items-center'>
                        <div className='w-7 h-7 bg-[#4339e4] text-white rounded-lg flex justify-center items-center pb-1'>3</div>
                        <div className='w-[300px] sm:w-[413px] h-2 bg-[#4339e4] text-white rounded-full ml-2'></div>
                    </div>
                </div>
                <div className='w-full h-[500px] sm:h-[396px] bg-white rounded-lg py-6 px-4 shadow-md mb-6'>
                    <p className='text-xl text-[#1b1c46] font-bold mb-6'>業務來源</p>
                    <div className='h-[60px] mb-6'>
                        <div className='flex flex-col justify-between'>
                            <div className="flex flex-col sm:flex-row">
                                <label className='text-sm text-[#545454] mb-4 mr-2 leading-[1.4] flex items-center'>
                                    <input className='mx-2 w-5 h-5'
                                        type="radio"
                                        name="source" 
                                        value="業務通路名稱"/>
                                    業務通路名稱：
                                </label>
                                <input className={`w-[286px] h-[50px] pl-5 checkout-name rounded-xl border-[1px] border-[#dedede] text-base text-[#aaaeb6] bg-[#f7f7f9] mb-4
                            focus:border-[1px] focus:border-[#4339e4] focus:outline-none focus:ring-4 focus:ring-[rgba(67,57,228,0.2)] focus:text-[#545454]`}
                                placeholder="輸入被保險人的業務通路名稱"
                                type="text"
                                name="name"
                            />
                            </div>
                            <div className="flex flex-col sm:flex-row">
                                <label className='text-sm text-[#545454] mb-4 mr-2 leading-[1.4] flex items-center'>
                                    <input className='mx-2 w-5 h-5'
                                        type="radio"
                                        name="source" 
                                        value="水火險業務客戶"/>
                                    水、火險業務客戶，年保費
                                </label>
                                <input className={`w-[286px] h-[50px] pl-5 checkout-name rounded-xl border-[1px] border-[#dedede] text-base text-[#aaaeb6] bg-[#f7f7f9] mb-4
                            focus:border-[1px] focus:border-[#4339e4] focus:outline-none focus:ring-4 focus:ring-[rgba(67,57,228,0.2)] focus:text-[#545454]`}
                                placeholder="輸入被保險人的年保費"
                                type="text"
                                name="id"
                            />
                            </div>
                            <div className="flex flex-col sm:flex-row">
                                <label className='text-sm text-[#545454] mb-4 mr-2 leading-[1.4] flex items-center'>
                                    <input className='mx-2 w-5 h-5'
                                        type="radio"
                                        name="source" 
                                        value="同仁親友介紹"/>
                                    同仁、親友介紹 關係：
                                </label>
                                <input className={`w-[286px] h-[50px] pl-5 checkout-name rounded-xl border-[1px] border-[#dedede] text-base text-[#aaaeb6] bg-[#f7f7f9] mb-4
                            focus:border-[1px] focus:border-[#4339e4] focus:outline-none focus:ring-4 focus:ring-[rgba(67,57,228,0.2)] focus:text-[#545454]`}
                                placeholder="輸入被保險人與業務來源的關係"
                                type="text"
                                name="car"
                            />
                            </div>
                            <div className="flex">
                                <label className='text-sm text-[#545454] mb-4 leading-[1.4] flex items-center'>
                                    <input className='mx-2 w-5 h-5'
                                        type="radio"
                                        name="source" 
                                        value="原車險客戶"/>
                                    原車險客戶
                                </label>
                            </div>
                            <div className="flex">
                                <label className='text-sm text-[#545454] mb-4 leading-[1.4] flex items-center'>
                                    <input className='mx-2 w-5 h-5'
                                        type="radio"
                                        name="source" 
                                        value="客戶自行來電"/>
                                    客戶自行來電要保
                                </label>
                            </div>
                            <div className="flex">
                                <label className='text-sm text-[#545454] mb-4 leading-[1.4] flex items-center'>
                                    <input className='mx-2 w-5 h-5'
                                        type="radio"
                                        name="source" 
                                        value="其他"/>
                                    其他
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full flex justify-end'>
                    <button className='border-2 border-[#4339e4] text-[#4339e4] bg-white font-bold w-[120px] h-[57px] rounded-[32px] mr-6 hover:bg-[#eeebfb]'
                        onClick={() => scrollTo(1980)}>上一步</button>
                    <button className='bg-[#4339e4] text-white font-bold w-[197px] h-[57px] rounded-[32px] hover:bg-[#2e26a3]'
                        onClick={() => scrollTo(3460)}>下一步</button>
                </div>
            </div>
        </div>
    )
}

export default ThirdDiv;