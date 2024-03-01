function ForthDiv() {
    const scrollTo = (pixel) => {
        window.scrollTo({
          top: pixel,
          behavior: 'smooth'
        });
    };

    return (
        <div className='flex justify-center items-center bg-[#f7f7f9]'>
            <div className='w-[343px] sm:w-[954px] h-[950px] sm:h-[1000px] pt-[80px]'>
                <div className='w-full h-[52px] flex items-center justify-between mb-6'>
                    <div className='flex items-center'>
                        <div className='w-7 h-7 bg-[#4339e4] text-white rounded-lg flex justify-center items-center pb-1'>4</div>
                        <div className='w-[300px] sm:w-[413px] h-2 bg-[#4339e4] text-white rounded-full ml-2'></div>
                    </div>
                </div>
                <div className='w-full h-[698px] bg-white rounded-lg py-6 px-4 shadow-md mb-6'>
                    <p className='text-xl text-[#1b1c46] font-bold mb-6'>投保需求</p>
                    <div className='flex'>
                        <div className='flex flex-col justify-between'>
                            <div className="flex">
                                <label className='text-sm text-[#545454] mb-4 leading-[1.4] flex items-center'>
                                    <input className='mx-2 w-5 h-5'
                                        type="checkbox"
                                        name="insuranceRequirement" 
                                        value="乙式"/>
                                    乙式 免自負額
                                </label>
                            </div>
                            <div className="flex">
                                <label className='text-sm text-[#545454] mb-4 leading-[1.4] flex items-center'>
                                    <input className='mx-2 w-5 h-5'
                                        type="checkbox"
                                        name="insuranceRequirement" 
                                        value="免折舊"/>
                                    免折舊
                                </label>
                            </div>
                            <div className="flex">
                                <label className='text-sm text-[#545454] mb-4 leading-[1.4] flex items-center'>
                                    <input className='mx-2 w-5 h-5'
                                        type="checkbox"
                                        name="insuranceRequirement" 
                                        value="車體免追償險"/>
                                    車體免追償險
                                </label>
                            </div>
                            <div className="flex">
                                <label className='text-sm text-[#545454] mb-4 leading-[1.4] flex items-center'>
                                    <input className='mx-2 w-5 h-5'
                                        type="checkbox"
                                        name="insuranceRequirement" 
                                        value="強制險"/>
                                    強制險
                                </label>
                            </div>
                            <div className="flex">
                                <label className='text-sm text-[#545454] mb-4 mr-2 leading-[1.4] flex items-center'>
                                    <input className='mx-2 w-5 h-5'
                                        type="checkbox"
                                        name="insuranceRequirement" 
                                        value="竊盜自付額"/>
                                    竊盜自負額
                                </label>
                                <input className={`w-[180px] sm:w-[782px] h-[50px] pl-5 checkout-name rounded-xl border-[1px] border-[#dedede] text-base text-[#aaaeb6] bg-[#f7f7f9] mb-4
                                    focus:border-[1px] focus:border-[#4339e4] focus:outline-none focus:ring-4 focus:ring-[rgba(67,57,228,0.2)] focus:text-[#545454]`}
                                    placeholder="輸入竊盜自負額"
                                    type="text"
                                    name="amount"
                                />
                                <p className='text-sm text-[#545454] mb-4 ml-2 leading-[1.4] flex items-center'>%</p>
                            </div>
                            <div className="flex">
                                <label className='text-sm text-[#545454] mb-4 mr-2 leading-[1.4] flex items-center'>
                                    <input className='mx-2 w-5 h-5'
                                        type="checkbox"
                                        name="insuranceRequirement" 
                                        value="第三責任傷害"/>
                                    第三人責任傷害
                                </label>
                                <input className={`w-[150px] sm:w-[752px] h-[50px] pl-5 checkout-name rounded-xl border-[1px] border-[#dedede] text-base text-[#aaaeb6] bg-[#f7f7f9] mb-4
                                    focus:border-[1px] focus:border-[#4339e4] focus:outline-none focus:ring-4 focus:ring-[rgba(67,57,228,0.2)] focus:text-[#545454]`}
                                    placeholder="輸入第三人責任傷害費用"
                                    type="text"
                                    name="amount"
                                />
                                <p className='text-sm text-[#545454] mb-4 ml-2 leading-[1.4] flex items-center'>萬</p>
                            </div>
                            <div className="flex">
                                <label className='text-sm text-[#545454] mb-4 mr-2 leading-[1.4] flex items-center'>
                                    <input className='mx-2 w-5 h-5'
                                        type="checkbox"
                                        name="insuranceRequirement" 
                                        value="第三責任財損"/>
                                    第三人責任財損
                                </label>
                                <input className={`w-[150px] sm:w-[752px] h-[50px] pl-5 checkout-name rounded-xl border-[1px] border-[#dedede] text-base text-[#aaaeb6] bg-[#f7f7f9] mb-4
                                    focus:border-[1px] focus:border-[#4339e4] focus:outline-none focus:ring-4 focus:ring-[rgba(67,57,228,0.2)] focus:text-[#545454]`}
                                    placeholder="輸入第三人責任財損費用"
                                    type="text"
                                    name="amount"
                                />
                                <p className='text-sm text-[#545454] mb-4 ml-2 leading-[1.4] flex items-center'>萬</p>
                            </div>
                            <div className="flex">
                                <label className='text-sm text-[#545454] mb-4 mr-2 leading-[1.4] flex items-center'>
                                    <input className='mx-2 w-5 h-5'
                                        type="checkbox"
                                        name="insuranceRequirement" 
                                        value="駕駛險"/>
                                    駕駛險
                                </label>
                                <input className={`w-[206px] sm:w-[808px] h-[50px] pl-5 checkout-name rounded-xl border-[1px] border-[#dedede] text-base text-[#aaaeb6] bg-[#f7f7f9] mb-4
                                    focus:border-[1px] focus:border-[#4339e4] focus:outline-none focus:ring-4 focus:ring-[rgba(67,57,228,0.2)] focus:text-[#545454]`}
                                    placeholder="輸入駕駛險的費用"
                                    type="text"
                                    name="amount"
                                />
                                <p className='text-sm text-[#545454] mb-4 ml-2 leading-[1.4] flex items-center'>萬</p>
                            </div>
                            <div className="flex">
                                <label className='text-sm text-[#545454] mb-4 mr-2 leading-[1.4] flex items-center'>
                                    <input className='mx-2 w-5 h-5'
                                        type="checkbox"
                                        name="insuranceRequirement" 
                                        value="乘客險"/>
                                    乘客險（共四人）每人
                                </label>
                                <input className={`w-[108px] sm:w-[710px] h-[50px] pl-5 checkout-name rounded-xl border-[1px] border-[#dedede] text-base text-[#aaaeb6] bg-[#f7f7f9] mb-4
                                    focus:border-[1px] focus:border-[#4339e4] focus:outline-none focus:ring-4 focus:ring-[rgba(67,57,228,0.2)] focus:text-[#545454]`}
                                    placeholder="輸入乘客險"
                                    type="text"
                                    name="amount"
                                />
                                <p className='text-sm text-[#545454] mb-4 ml-2 leading-[1.4] flex items-center'>萬</p>
                            </div>
                            <div className="flex">
                                <label className='text-sm text-[#545454] mb-4 mr-2 leading-[1.4] flex items-center'>
                                    <input className='mx-2 w-5 h-5'
                                        type="checkbox"
                                        name="insuranceRequirement" 
                                        value="超額險"/>
                                    超額險（含乘客）
                                </label>
                                <input className={`w-[136px] sm:w-[738px] h-[50px] pl-5 checkout-name rounded-xl border-[1px] border-[#dedede] text-base text-[#aaaeb6] bg-[#f7f7f9] mb-4
                                    focus:border-[1px] focus:border-[#4339e4] focus:outline-none focus:ring-4 focus:ring-[rgba(67,57,228,0.2)] focus:text-[#545454]`}
                                    placeholder="輸入超額險"
                                    type="text"
                                    name="amount"
                                />
                                <p className='text-sm text-[#545454] mb-4 ml-2 leading-[1.4] flex items-center'>萬</p>
                            </div>
                            <div className="flex items-center">
                                <label className='text-sm text-[#545454] w-[70px] leading-[1.4] flex items-center'>
                                    <input className='mx-2 w-5 h-5'
                                        type="checkbox"
                                        name="insuranceRequirement" 
                                        value="其他"/>
                                    其他
                                </label>
                                <input className={`w-[200px] sm:w-[800px] h-[50px] pl-5 checkout-name rounded-xl border-[1px] border-[#dedede] text-base text-[#aaaeb6] bg-[#f7f7f9]
                                    focus:border-[1px] focus:border-[#4339e4] focus:outline-none focus:ring-4 focus:ring-[rgba(67,57,228,0.2)] focus:text-[#545454]`}
                                    placeholder="請自行增加投保需求"
                                    type="text"
                                    name="amount"
                                />
                                <button className='bg-[#20c374] h-7 w-7 flex justify-center items-center text-white text-2xl pb-1 rounded-[4px] ml-4'>+</button>
                            </div>
                        </div>
                    </div>
                </div>
                <p className='hidden sm:flex text-lg text-[#20c374] my-6 w-full'>＊此區域為非必填，如有疑問請洽從業人員</p>
                <div className='w-full flex justify-end'>
                    <button className='border-2 border-[#4339e4] text-[#4339e4] bg-white font-bold w-[120px] h-[57px] rounded-[32px] mr-6 hover:bg-[#eeebfb]'
                        onClick={() => scrollTo(2800)}>上一步</button>
                    <button className='bg-[#4339e4] text-white font-bold w-[197px] h-[57px] rounded-[32px] hover:bg-[#2e26a3]'
                        onClick={() => scrollTo(4450)}>下一步</button>
                </div>
            </div>
        </div>
    )
}

export default ForthDiv;