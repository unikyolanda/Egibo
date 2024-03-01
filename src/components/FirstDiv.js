function FirstDiv () {
    const scrollTo = () => {
        let pixel;
        if (window.matchMedia("(max-width: 375px)").matches) {
            pixel = 500;
        } else {
            pixel = 1980;
        }

        window.scrollTo({
          top: pixel,
          behavior: 'smooth'
        });
    };

    return (
        <div className='flex justify-center items-center bg-[#f7f7f9] w-full overflow-x: hidden;'>
            <div className='w-full sm:w-[954px] h-[1280px] sm:h-[1130px] pt-[80px] px-4'>
                <div className='w-[343px] sm:w-[445px] h-[64px] flex relative mb-6 sm:mb-0'>
                    <p className='hidden sm:flex font-bold text-[#1b1c46] mr-4'>公司/個人：</p>
                    <p className='sm:hidden flex font-bold text-[#1b1c46] mr-4 text-sm sm:text-base mt-3 ml-1'>單位：</p>
                    <select className='appearance-none arrowdown w-[130px] sm:w-[10rem] h-10 bg-no-repeat pl-3 text-sm text-gray-pr rounded-lg border-[1px] border-[#dedede] mr-4 cursor-pointer'
                        name="company">
                        <option>公司Ａ</option>
                        <option>公司Ｂ</option>
                        <option>公司Ｃ</option>
                    </select>
                    <select className='appearance-none arrowdown w-[130px] sm:w-[10rem] h-10 bg-no-repeat pl-3 text-sm text-gray-pr rounded-lg border-[1px] border-[#dedede] cursor-pointer'
                        name="factory">
                        <option>營業廠Ａ</option>
                        <option>營業廠Ｂ</option>
                        <option>營業廠Ｃ</option>
                    </select>
                    <p className='text-sm text-[#20c374] absolute top-[-25px] right-20 sm:right-28'>*非必填</p>
                </div>
                <div className='w-full h-[52px] flex flex-col-reverse sm:flex-row items-center justify-between mb-6'>
                    <div className='flex items-center'>
                        <div className='w-7 h-7 bg-[#4339e4] text-white rounded-lg flex justify-center items-center pb-1'>1</div>
                        <div className='w-[300px] sm:w-[413px] h-2 bg-[#4339e4] text-white rounded-full ml-2'></div>
                    </div>
                    <div className='flex items-center mb-6 sm:mb-0'>
                        <p className='font-bold text-[#1b1c46] mr-2 sm:mr-4 text-sm sm:text-base'>日期：</p>
                        <input type='date' className='w-[284px] sm:w-[307px] h-10 sm:h-[52px] rounded-lg px-3'></input>
                    </div>
                </div>
                <div className='w-full h-[384px] sm:h-[350px] bg-white rounded-lg py-6 px-4 shadow-md mb-6'>
                    <p className='text-sm sm:text-xl text-[#1b1c46] font-bold mb-6'>投保須知   一般限保業務:</p>
                    <p className='text-sm sm:text-base text-[#545454] mb-3 sm:mb-4 leading-[1.4]'>． 車體或第三人賠款紀錄不佳。</p>
                    <p className='text-sm sm:text-base text-[#545454] mb-3 sm:mb-4 leading-[1.4]'>． 營業小客車、個人計程車投保任意險者。</p>
                    <p className='text-sm sm:text-base text-[#545454] mb-3 sm:mb-4 leading-[1.4]'>． 大型重型機車投保車體險、竊盜險保額超過100萬，或駕駛人傷害險、乘客險每一人保額超過100萬。</p>
                    <p className='text-sm sm:text-base text-[#545454] mb-3 sm:mb-4 leading-[1.4]'>． 大貨車、曳引車第三人保額高於300/1500/50萬或雇主責任險500萬(含)以上。</p>
                    <p className='text-sm sm:text-base text-[#545454] mb-3 sm:mb-4 leading-[1.4]'>． 保額300萬(含)以上承保車體或竊盜險(經汽車保險部部核可之車商保代除外)。</p>
                    <p className='text-sm sm:text-base text-[#545454] mb-3 sm:mb-4 leading-[1.4]'>． 投保5台以上約駕名冊為同一人者。</p>
                    <p className='text-sm sm:text-base text-[#545454] leading-[1.4]'>． 其他由系統進行管控之業務。</p>
                </div>
                <div className='w-full h-[488px] sm:h-[426px] bg-white rounded-lg py-6 px-4 shadow-md mb-6'>
                    <p className='text-sm sm:text-xl text-[#1b1c46] font-bold mb-6'>投保須知   特殊限保業務:</p>
                    <p className='text-sm sm:text-base text-[#545454] mb-3 sm:mb-4 leading-[1.4]'>． 大型重型機車投保車體或竊盜險其保額高於200萬者。</p>
                    <p className='text-sm sm:text-base text-[#545454] mb-3 sm:mb-4 leading-[1.4]'>． 大型重型機車投保駕駛人傷害或乘客險其每人保額高於200萬者。</p>
                    <p className='text-sm sm:text-base text-[#545454] mb-3 sm:mb-4 leading-[1.4]'>． 重型、輕型、小型輕型機車投保駕駛人傷害保險每人保額高於300萬者。</p>
                    <p className='text-sm sm:text-base text-[#545454] mb-3 sm:mb-4 leading-[1.4]'>． 泡水車投保車體或竊盜險者。</p>
                    <p className='text-sm sm:text-base text-[#545454] mb-3 sm:mb-4 leading-[1.4]'>． 投保竊盜含免折舊且0自負額者。</p>
                    <p className='text-sm sm:text-base text-[#545454] mb-3 sm:mb-4 leading-[1.4]'>． 高失竊車投保竊盜險者。</p>
                    <p className='text-sm sm:text-base text-[#545454] mb-3 sm:mb-4 leading-[1.4]'>． 救護車、營大客、短租車、拖吊車及預拌混泥車投保任意險。</p>
                    <p className='text-sm sm:text-base text-[#545454] mb-3 sm:mb-4 leading-[1.4]'>． 稀有車輛或各廠牌跑車承保車體或竊盜險者(重置價格700萬以上)。</p>
                    <p className='text-sm sm:text-base text-[#545454] leading-[1.4]'>． 貨物運送人責任險其載運物品為大理石、汽車、化學物品或高價電子成品者。</p>
                </div>
                <p className='text-sm sm:text-lg text-[#20c374] my-6 w-full'>＊以上資訊為投保需求單須知</p>
                <div className='w-full flex justify-end'>
                    <button className='bg-[#4339e4] text-white font-bold w-[197px] h-[57px] rounded-[32px] hover:bg-[#2e26a3]'
                        onClick={scrollTo}>已了解</button>
                </div>
            </div>
        </div>
    )
}

export default FirstDiv;