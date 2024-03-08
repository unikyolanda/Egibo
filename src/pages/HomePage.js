import React, { useState, useEffect, useCallback } from 'react';
import dashboard from '../images/dashboard.svg';
import logoutpic from '../images/logout.svg';
import pen from '../images/pen.svg';
import search from '../images/search.svg';
import dashboardbg from '../images/dashboard with bg.svg';
import upload from '../images/upload.svg';
import hamburger from '../images/hamburger.svg';
import cross from '../images/cross.svg';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Switch from '../components/Switch';
import failure from '../images/failure.svg';
import question from '../images/question.svg';

function HomePage() {
    const [isNavOpen, setIsNavOpen] = useState(false);

    const [isGarageToggled, setIsGarageToggled] = useState(false);
    const toggleGarageSwitch = () => {
        setIsGarageToggled(current => {
            setFormData2(prevState => ({
                ...prevState,
                has_garage: !current,
            }));
            return !current;
        });
    };

    const [isDriverToggled, setIsDriverToggled] = useState(false);
    const toggleDriverSwitch = () => {
        setIsDriverToggled(current => {
            setFormData2(prevState => ({
                ...prevState,
                has_dedicated_driver: !current,
            }));
            return !current;
        });
    };

    const getResponsiveScrollPosition = (positionSmall, positionMiddle, positionLarge) => {
        if (window.matchMedia('(min-width: 415px)').matches) {
            return positionLarge;
        } else if (window.matchMedia('(min-width: 376px)').matches) {
            return positionMiddle;
        } else {
            return positionSmall;
        }
    };    

    const scrollTo = (pixel) => {
        window.scrollTo({
          top: pixel,
          behavior: 'smooth'
        });
    };

    const { logout } = useAuth();
    const navigate = useNavigate();
    const [showDiv, setShowDiv] = useState(false);
    const handleLogout = async () => {
        try {
            const response = await axios.post('http://125.228.62.164:5006/logout')
            if (response.data.status === '您已成功登出' && response.data.success === true) {
                logout();
                setShowDiv(true);

                setTimeout(() => {
                    setShowDiv(false);
                    navigate('/login');
                }, 1500);
            } else {
                console.error('登出失敗');
            }
        } catch (error) {
            console.error('登出請求錯誤', error);
        }
    }
    
    const getSavedEmail = () => {
        return localStorage.getItem('email');
    }

    const [email, setEmail] = useState(getSavedEmail());
    const [backstage, setBackstage] = useState(false);

    useEffect(() => {
        const savedEmail = getSavedEmail();
        if (savedEmail) {
            setEmail(savedEmail);
        }
        console.log(savedEmail);

        const getRole = async () => {
            try {
                const response = await axios.post('http://125.228.62.164:5006/get_role', { email })
                if (response.data.role === '行政人員' || response.data.role === '業務') {
                    setBackstage(true);
                } else {
                    setBackstage(false);
                }
            } catch (error) {
                console.error('身份請求錯誤', error);
            }
        }

        getRole();
    }, []);

    const [formData2, setFormData2] = useState({
        email: email,
        insured_name: '',
        insured_id: '',
        license_plate_number: '',
        user_name: '',
        user_id: '',
        user_age: 0,
        insurance_nature: '',
        business_activity: '',
        job_title: '',
        company_location: '',
        mileage: 0,
        has_garage: isGarageToggled,
        has_dedicated_driver: isDriverToggled,
        company: '公司A',
        business_factory: '營業廠A',
        date: ''
    });
    
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        let finalValue = value;
        if (name === 'user_age' || name === 'mileage') {
            finalValue = value === '' ? '' : Number(value);
        }

        setFormData2(prevState => ({
          ...prevState,
          [name]: type === 'checkbox' ? checked : finalValue,
        }));
    };
    
    const [formData3, setFormData3] = useState({
        email: email,
        business_channel_name:'',
        insurance_annual_premium: 0,
        referral_relationship:'',
        original_insurance_customer: false,
        direct_customer_inquiry: false,
        other_source: false,
    });

    const handleBusinessChange = (e) => {
        setFormData3(prevState => ({
            ...prevState,
            business_channel_name: e.target.value,
        }));
    }

    const handleInsuranceChange = (e) => {
        const insuranceValue = e.target.value.trim();
        let validNumber = 0;
    
        if (/^[0-9]+(\.[0-9]*)?$/.test(insuranceValue)) {
            validNumber = parseFloat(insuranceValue);
        }
    
        setFormData3(prevState => ({
            ...prevState,
            insurance_annual_premium: validNumber,
        }));
    };

    const handleRelationshipChange = (e) => {
        setFormData3(prevState => ({
            ...prevState,
            referral_relationship: e.target.value,
        }));
    }

    const handleInputChange3 = (e) => {
        const { value, type } = e.target;
        let updates = {};

        if (type === 'radio') {
            updates = {
                business_channel_name: '',
                insurance_annual_premium: 0,
                referral_relationship: '',
                original_insurance_customer: false,
                direct_customer_inquiry: false,
                other_source: false,
            };
    
            if (value === '業務通路名稱') {
                updates.business_channel_name = formData3.business_channel_name;
            } else if (value === '水火險業務客戶') {
                updates.insurance_annual_premium = formData3.insurance_annual_premium;
            } else if (value === '同仁親友介紹') {
                updates.referral_relationship = formData3.referral_relationship;
            } else if (value === '原車險客戶') {
                updates.original_insurance_customer = true;
            } else if (value === '客戶自行來電') {
                updates.direct_customer_inquiry = true;
            } else if (value === '其他') {
                updates.other_source = true;
            }

            if (value !== '業務通路名稱') updates.business_channel_name = '';
            if (value !== '水火險業務客戶') updates.insurance_annual_premium = '';
            if (value !== '同仁親友介紹') updates.referral_relationship = '';
        }

        setFormData3(prevState => ({
            ...prevState,
            ...updates,
        }));
    };

    const [formData4, setFormData4] = useState({
        email: email,
        deductible_exemption: false,
        depreciation_exemption: false,
        compulsory_insurance: false,
        theft_deductible_percentage: '',
        third_party_bodily_injury_cost: '',
        third_party_property_damage_cost: '',
        driver_insurance_cost: '',
        passenger_insurance_cost: '',
        excess_clause_cost: '',
        other:''
    });

    const handleInputChange4 = (e) => {
        const { name, value, type, checked } = e.target;
    
        let finalValue = value;
    
        if (['theft_deductible_percentage', 'third_party_bodily_injury_cost', 'third_party_property_damage_cost', 
            'driver_insurance_cost', 'passenger_insurance_cost', 'excess_clause_cost'].includes(name)) {
            const numericValue = value.replace(/[^0-9.]/g, '');
            
            finalValue = numericValue === '' ? 0 : parseFloat(numericValue) || 0;
        }
    
        setFormData4(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : finalValue,
        }));
    };

    const [showAlert, setShowAlert] = useState(false);
    const [alert, setAlert] = useState('');

    const validateForm2 = (formData) => {
        if (!formData.date) {
            setShowAlert(true);
            setAlert('請確認是否已填寫日期及公司。')
            return false;
        }
    
        if (!formData.insured_name || !formData.insured_id || !formData.license_plate_number ||
            !formData.user_name || !formData.user_id || !formData.user_age || !formData.insurance_nature ||
            !formData.business_activity || !formData.job_title || !formData.company_location || !formData.mileage) {
            setShowAlert(true);
            setAlert('請確認是否每一個欄位都已填寫完成。')
            return false;
        }
    
        return true;
    };

    const validateForm3 = (formData) => {
        if (!formData.business_channel_name && !formData.insurance_annual_premium && !formData.original_insurance_customer &&
            !formData.referral_relationship && !formData.direct_customer_inquiry && !formData.other_source) {
            setShowAlert(true);
            setAlert('請填寫業務來源。')
            return false;
        }
                
        return true;
    };

    //Fifth Div
    const [dragOver, setDragOver] = useState(false);

    const handleDragEnter = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragOver(true);
    }, []);

    const handleDragLeave = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragOver(false);
    }, []);

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!dragOver) {
        setDragOver(true);
        }
    }, [dragOver]);
    
    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragOver(false);
        const droppedFiles = e.dataTransfer.files;
        processFiles(droppedFiles);
    }, []);

    const processFiles = (selectedFiles) => {
        Array.from(selectedFiles).forEach((file, index) => {
            const uniqueId = `${Date.now()}-${index}`;
            const sizeInMB = (file.size / 1024 ** 2).toFixed(2); 
            const readableSize = `${sizeInMB} MB`;
    
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const fileObject = {
                        id: uniqueId,
                        file,
                        size: readableSize,
                        progress: 0,
                        uploaded: false,
                        thumbnail: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
                    };
                    setFiles(prevFiles => [...prevFiles, fileObject]);
                    uploadFile(fileObject);
                };
                reader.readAsDataURL(file);
            } else {
                const fileObject = {
                    file,
                    size: readableSize,
                    progress: 0,
                    uploaded: false,
                    thumbnail: null,
                };
                setFiles(prevFiles => [...prevFiles, fileObject]);
                uploadFile(fileObject);
            }
        });
    };

    const [files, setFiles] = useState([]);
  
    const uploadFile = (fileObj) => {
        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            setFiles(prevFiles => prevFiles.map(file => {
                if (file.file.name === fileObj.file.name) {
                    return { ...file, progress: Math.min(progress, 100) }; // 更新進度
                }
                return file;
            }));
    
            if (progress >= 100) {
                clearInterval(interval);
                setFiles(prevFiles => prevFiles.map(file => {
                    if (file.file.name === fileObj.file.name) {
                        return { ...file, uploaded: true }; // 標記為已上傳
                    }
                    return file;
                }));
            }
        }, 300);
    };        

    const deleteFile = (fileId) => {
        setFiles(prevFiles => prevFiles.filter(file => file.id !== fileId));
    };    

    const handleFileSelect = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const selectedFiles = e.target.files;
        processFiles(selectedFiles);
    };
    //Fifth Div

    const handleSubmit = async () => {
        const updatedFormData2 = {
            ...formData2,
            has_garage: isGarageToggled,
            has_dedicated_driver: isDriverToggled,
        };

        const updatedFormData3 = {
            ...formData3,
            insurance_annual_premium: formData3.insurance_annual_premium || 0
        }

        const updatedFormData4 = {
            ...formData4,
            theft_deductible_percentage: formData4.theft_deductible_percentage || 0,
            third_party_bodily_injury_cost: formData4.third_party_bodily_injury_cost || 0,
            third_party_property_damage_cost: formData4.third_party_property_damage_cost || 0,
            driver_insurance_cost: formData4.driver_insurance_cost || 0,
            passenger_insurance_cost: formData4.passenger_insurance_cost || 0,
            excess_clause_cost: formData4.excess_clause_cost || 0,
        };

        const hasImage = files.some(file => file.file.type.startsWith('image/') && file.uploaded);

        if (!validateForm2(formData2)) {
            return;
        }
        if (!validateForm3(formData3)) {
            return;
        }
        if (!hasImage) {
            setShowAlert(true);
            setAlert('請上傳圖檔');
            return;
        }

        try {
            console.log(updatedFormData2);
            const response2 = await axios.post('http://125.228.62.164:5006/add_vehicle_owner_info', updatedFormData2);
            console.log(response2.data);

            console.log(updatedFormData3);
            const response3 = await axios.post('http://125.228.62.164:5006/add_business_source', updatedFormData3);
            console.log(response3.data);

            console.log(updatedFormData4);
            const response4 = await axios.post('http://125.228.62.164:5006/add_insurance_requirement', updatedFormData4);
            console.log(response4.data);

            const formData = new FormData();
            files.forEach((file) => {
                if (file.uploaded) {
                    formData.append('file', file.file);
                }
            });
            formData.append('json_data', JSON.stringify({ email: email }));
        
            const uploadResponse = await axios.post('http://125.228.62.164:5006/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(uploadResponse.data);

            navigate('/formsuccess');
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div className='w-full h-auto bg-[#f7f8fd]'>
            <div className={`${isNavOpen ? 'drop-shadow-md' : ''} flex w-full h-10 sm:h-[88px] z-30 relative bg-white items-center justify-between py-6 px-5 sm:px-6 lg:px-16`}>
                <div className="opacity-0 sm:opacity-100 w-6 sm:w-[150px] lg:w-[312px] text-2xl font-black text-[#4339e4]">LOGO</div>
                <p className="text-base sm:text-xl lg:text-2xl font-bold text-[#1b1c46]">汽車險限保業務出單報告書</p>
                <div className="sm:hidden">
                <button onClick={() => setIsNavOpen(!isNavOpen)}>
                    {isNavOpen ? <img alt='cross' src={cross} className="h-6 w-6" /> : <img alt='menu' src={hamburger} className="h-6 w-6" />}
                </button>
                </div>
                <div className="hidden sm:flex w-[200px] lg:w-[312px] h-10 justify-end">
                    {backstage ? (
                        <div className="w-[86px] h-10 flex items-center cursor-pointer mr-3 lg:mr-7">
                            <img alt='dashboard' src={dashboard} />
                            <p className='text-xl font-bold text-[#1b1c46] pl-1'>後台</p>
                        </div>
                    ) : (
                        <div className="w-[86px] h-10 flex items-center cursor-pointer mr-7">
                            <img className='h-10' alt='search' src={question} />
                            <p className='text-xl font-bold text-[#1b1c46] pl-1'>查詢</p>
                        </div>
                    )}
                    <div className="w-[86px] h-10 flex items-center cursor-pointer"
                        onClick={handleLogout}>
                        <img alt='logout' src={logoutpic} />
                        <p className='text-xl font-bold text-[#1b1c46] pl-1'>登出</p>
                    </div>
                </div>
            </div>
            {isNavOpen ? <div className='bg-black/60 fixed inset-0 z-10'></div> : ''}
            <div className={`${isNavOpen ? 'flex' : 'hidden'} flex-col items-center sm:hidden z-20 relative`}>
                {backstage ? (
                <div className='w-full h-12 flex justify-center items-center border-b-2 border-[black/30] drop-shadow-sm bg-white cursor-pointer'>
                    <img alt='dashboard' src={dashboard} className='h-6' />
                    <p className="text-base font-bold text-[#1b1c46] ml-2 drop-shadow-sm bg-white">後台</p>
                </div>
                ) : (
                <div className='w-full h-12 flex justify-center items-center border-b-2 border-[black/30] drop-shadow-sm bg-white cursor-pointer'>
                    <img alt='search' src={question} className='h-6' />
                    <p className="text-base font-bold text-[#1b1c46] ml-2 drop-shadow-sm bg-white">查詢</p>
                </div>
                )}
                <div className='w-full h-12 flex justify-center items-center drop-shadow-sm bg-white cursor-pointer'
                    onClick={handleLogout}>
                    <img alt='logout' src={logoutpic} className='h-6' />
                    <p className="text-base font-bold text-[#1b1c46] ml-2">登出</p>
                </div>
            </div>
            <div className='hidden sm:flex sm:flex-col bg-[#e4eaf9] w-full h-[694px] py-[54px] px-[70px]'>
                <p className="text-[32px] font-bold text-[#1b1c46] pb-[54px]">汽車險限保業務建立表單流程</p>
                <div className='bg-white w-full h-[148px] rounded-[32px] py-6 px-8 flex items-center mb-6'>
                    <img alt='pen' src={pen}/>
                    <div className='flex flex-col ml-8'>
                        <p className='text-2xl text-[#545454] font-bold mb-2'>快速填寫保單</p>
                        <p className='text-lg text-[#858a94]'>在這裡，您可以迅速完成所有必要的保險資料填寫，節省您寶貴的時間。</p>
                    </div>
                </div>
                <div className='bg-white w-full h-[148px] rounded-[32px] py-6 px-8 flex items-center mb-6'>
                    <img alt='search' src={search}/>
                    <div className='flex flex-col ml-8'>
                        <p className='text-2xl text-[#545454] font-bold mb-2'>查詢保單結果</p>
                        <p className='text-lg text-[#858a94]'>運用簡單的查詢功能，您可以迅速查詢保單是否成功生效，讓您輕鬆掌握保險進展。</p>
                    </div>
                </div>
                <div className='bg-white w-full h-[148px] rounded-[32px] py-6 px-8 flex items-center'>
                    <img alt='dashboardbg' src={dashboardbg}/>
                    <div className='flex flex-col ml-8'>
                        <p className='text-2xl text-[#545454] font-bold mb-2'>後台管理系統</p>
                        <p className='text-lg text-[#858a94]'>從業人員可以透過我們專屬的後台管理系統，輕鬆管理所有客戶填寫的表單資料。</p>
                    </div>
                </div>
            </div>

            {/* First Div */}
            <div className='flex justify-center items-center bg-[#f7f7f9] w-full'>
                <div className='w-full sm:w-[700px] lg:w-[954px] h-[1280px] sm:h-[1200px] lg:h-[1130px] pt-[80px] px-4'>
                    <div className='w-full lg:w-[445px] h-[64px] flex justify-center relative mb-6 lg:mb-0 ml-[-2px]'>
                        <p className='hidden lg:flex font-bold text-[#1b1c46] mr-4'>公司/個人：</p>
                        <p className='lg:hidden flex font-bold text-[#1b1c46] mr-4 text-sm sm:text-base mt-3 ml-1'>單位：</p>
                        <select className='appearance-none arrowdown w-[130px] sm:w-[10rem] h-10 bg-no-repeat pl-3 text-sm text-gray-pr rounded-lg border-[1px] border-[#dedede] mr-4 cursor-pointer'
                            name="company"
                            onChange={handleInputChange}>
                            <option value='公司A'>公司A</option>
                            <option value='公司B'>公司B</option>
                            <option value='公司C'>公司C</option>
                        </select>
                        <select className='appearance-none arrowdown w-[130px] sm:w-[10rem] h-10 bg-no-repeat pl-3 text-sm text-gray-pr rounded-lg border-[1px] border-[#dedede] cursor-pointer'
                            name="business_factory"
                            onChange={handleInputChange}>
                            <option value='營業廠A'>營業廠A</option>
                            <option value='營業廠B'>營業廠B</option>
                            <option value='營業廠C'>營業廠C</option>
                        </select>
                        <p className='text-sm text-[#20c374] absolute top-[-25px] right-20 sm:right-28'>*非必填</p>
                    </div>
                    <div className='w-full h-[52px] flex flex-col-reverse lg:flex-row items-center justify-between mb-6'>
                        <div className='flex items-center'>
                            <div className='w-7 h-7 bg-[#4339e4] text-white rounded-lg flex justify-center items-center pb-1'>1</div>
                            <div className='w-[300px] sm:w-[413px] h-2 bg-[#4339e4] text-white rounded-full ml-2'></div>
                        </div>
                        <div className='flex items-center mb-6 sm:mb-1 lg:mb-0'>
                            <p className='font-bold text-[#1b1c46] mr-2 sm:mr-4 text-sm sm:text-base'>日期：</p>
                            <input type='date'
                                className='w-[284px] sm:w-[307px] h-10 sm:h-[52px] rounded-lg px-3'
                                name='date'
                                onChange={handleInputChange}></input>
                        </div>
                    </div>
                    <div className='w-full h-[384px] sm:h-[390px] lg:h-[360px] bg-white rounded-lg py-6 px-4 shadow-md mb-6'>
                        <p className='text-sm sm:text-xl text-[#1b1c46] font-bold mb-6'>投保須知   一般限保業務:</p>
                        <p className='text-sm sm:text-base text-[#545454] mb-3 sm:mb-4 leading-[1.4]'>． 車體或第三人賠款紀錄不佳。</p>
                        <p className='text-sm sm:text-base text-[#545454] mb-3 sm:mb-4 leading-[1.4]'>． 營業小客車、個人計程車投保任意險者。</p>
                        <p className='text-sm sm:text-base text-[#545454] mb-3 sm:mb-4 leading-[1.4]'>． 大型重型機車投保車體險、竊盜險保額超過100萬，或駕駛人傷害險、乘客險每一人保額超過100萬。</p>
                        <p className='text-sm sm:text-base text-[#545454] mb-3 sm:mb-4 leading-[1.4]'>． 大貨車、曳引車第三人保額高於300/1500/50萬或雇主責任險500萬(含)以上。</p>
                        <p className='text-sm sm:text-base text-[#545454] mb-3 sm:mb-4 leading-[1.4]'>． 保額300萬(含)以上承保車體或竊盜險(經汽車保險部部核可之車商保代除外)。</p>
                        <p className='text-sm sm:text-base text-[#545454] mb-3 sm:mb-4 leading-[1.4]'>． 投保5台以上約駕名冊為同一人者。</p>
                        <p className='text-sm sm:text-base text-[#545454] leading-[1.4]'>． 其他由系統進行管控之業務。</p>
                    </div>
                    <div className='w-full h-[488px] sm:h-[441px] bg-white rounded-lg py-6 px-4 shadow-md mb-6'>
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
                            onClick={() => scrollTo(getResponsiveScrollPosition(1400, 1400, 1980))}>已了解</button>
                    </div>
                </div>
            </div>

            {/* Second Div */}
            <div className='flex justify-center items-center bg-[#f7f7f9]'>
                <div className='w-[343px] sm:w-[668px] lg:w-[954px] h-[1650px] sm:h-[830px] mt-[80px]'>
                    <div className='w-full h-[52px] flex items-center justify-between mb-6'>
                        <div className='flex items-center'>
                            <div className='w-7 h-7 bg-[#4339e4] text-white rounded-lg flex justify-center items-center pb-1'>2</div>
                            <div className='w-[300px] sm:w-[413px] h-2 bg-[#4339e4] text-white rounded-full ml-2'></div>
                        </div>
                    </div>
                    <div className='w-full h-[1400px] sm:h-[608px] bg-white rounded-lg py-6 px-4 shadow-md mb-6'>
                        <p className='text-xl text-[#1b1c46] font-bold mb-6'>車主背景資料</p>
                        <div className='flex flex-col sm:flex-row'>
                            <div className='flex flex-col mr-8'>
                                <p className='text-base text-[#1b1c46] mb-4 leading-[1.4] font-bold'>被保險人</p>
                                <input className={`w-[286px] sm:w-[185px] lg:w-[286px] h-[50px] pl-5 checkout-name rounded-xl border-[1px] border-[#dedede] text-base bg-[#f7f7f9] mb-6
                                focus:border-[1px] focus:border-[#4339e4] focus:outline-none focus:ring-4 focus:ring-[rgba(67,57,228,0.2)] text-[#545454]`}
                                    placeholder="被保險人的全名"
                                    type="text"
                                    name="insured_name"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className='flex flex-col mr-8'>
                                <p className='text-base text-[#1b1c46] mb-4 leading-[1.4] font-bold'>ID或統編</p>
                                <input className={`w-[286px] sm:w-[185px] lg:w-[286px] h-[50px] pl-5 checkout-name rounded-xl border-[1px] border-[#dedede] text-base bg-[#f7f7f9] mb-6
                                focus:border-[1px] focus:border-[#4339e4] focus:outline-none focus:ring-4 focus:ring-[rgba(67,57,228,0.2)] text-[#545454]`}
                                    placeholder="被保險人的ID或統編"
                                    type="text"
                                    name="insured_id"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className='flex flex-col'>
                                <p className='text-base text-[#1b1c46] mb-4 leading-[1.4] font-bold'>車牌號碼</p>
                                <input className={`w-[286px] sm:w-[185px] lg:w-[286px] h-[50px] pl-5 checkout-name rounded-xl border-[1px] border-[#dedede] text-base bg-[#f7f7f9] mb-6
                                focus:border-[1px] focus:border-[#4339e4] focus:outline-none focus:ring-4 focus:ring-[rgba(67,57,228,0.2)] text-[#545454]`}
                                    placeholder="被保險人的車牌號碼"
                                    type="text"
                                    name="license_plate_number"
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className='flex flex-col sm:flex-row'>
                            <div className='flex flex-col mr-8'>
                                <p className='text-base text-[#1b1c46] mb-4 leading-[1.4] font-bold'>使用人</p>
                                <input className={`w-[286px] sm:w-[185px] lg:w-[286px] h-[50px] pl-5 checkout-name rounded-xl border-[1px] border-[#dedede] text-base bg-[#f7f7f9] mb-6
                                focus:border-[1px] focus:border-[#4339e4] focus:outline-none focus:ring-4 focus:ring-[rgba(67,57,228,0.2)] text-[#545454]`}
                                    placeholder="輸入使用人名稱"
                                    type="text"
                                    name="user_name"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className='flex flex-col mr-8'>
                                <p className='text-base text-[#1b1c46] mb-4 leading-[1.4] font-bold'>ID</p>
                                <input className={`w-[286px] sm:w-[185px] lg:w-[286px] h-[50px] pl-5 checkout-name rounded-xl border-[1px] border-[#dedede] text-base bg-[#f7f7f9] mb-6
                                focus:border-[1px] focus:border-[#4339e4] focus:outline-none focus:ring-4 focus:ring-[rgba(67,57,228,0.2)] text-[#545454]`}
                                    placeholder="輸入使用人的ID"
                                    type="text"
                                    name="user_id"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className='flex flex-col'>
                                <p className='text-base text-[#1b1c46] mb-4 leading-[1.4] font-bold'>使用人年齡</p>
                                <input className={`w-[286px] sm:w-[185px] lg:w-[286px] h-[50px] pl-5 checkout-name rounded-xl border-[1px] border-[#dedede] text-base bg-[#f7f7f9] mb-6
                                focus:border-[1px] focus:border-[#4339e4] focus:outline-none focus:ring-4 focus:ring-[rgba(67,57,228,0.2)] text-[#545454]`}
                                    placeholder="輸入使用人年齡"
                                    type="text"
                                    name="user_age"
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className='h-[60px] mb-6'>
                            <p className='text-base text-[#1b1c46] mb-4 leading-[1.4] font-bold'>投保性質</p>
                            <div className='flex justify-between'>
                                <div className="flex w-[230px]">
                                    <label className='text-sm text-[#545454] mb-4 leading-[1.4] flex items-center'>
                                        <input className='mx-2 w-5 h-5'
                                            type="radio"
                                            name="insurance_nature"
                                            value="新車"
                                            onChange={handleInputChange}/>
                                        新車
                                    </label>
                                </div>
                                <div className="flex w-[230px]">
                                    <label className='text-sm text-[#545454] mb-4 leading-[1.4] flex items-center'>
                                        <input className='mx-2 w-5 h-5'
                                            type="radio"
                                            name="insurance_nature" 
                                            value="續保"
                                            onChange={handleInputChange}/>
                                        續保
                                    </label>
                                </div>
                                <div className="flex w-[230px]">
                                    <label className='text-sm text-[#545454] mb-4 leading-[1.4] flex items-center'>
                                        <input className='mx-2 w-5 h-5'
                                            type="radio"
                                            name="insurance_nature" 
                                            value="轉保"
                                            onChange={handleInputChange}/>
                                        轉保
                                    </label>
                                </div>
                                <div className="flex w-[230px]">
                                    <label className='text-sm text-[#545454] mb-4 leading-[1.4] flex items-center'>
                                        <input className='mx-2 w-5 h-5'
                                            type="radio"
                                            name="insurance_nature" 
                                            value="過戶"
                                            onChange={handleInputChange}/>
                                        過戶
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col sm:flex-row'>
                            <div className='flex flex-col mr-8'>
                                <p className='text-base text-[#1b1c46] mb-4 leading-[1.4] font-bold'>營業項目（任職公司）</p>
                                <input className={`w-[286px] sm:w-[185px] lg:w-[286px] h-[50px] pl-5 checkout-name rounded-xl border-[1px] border-[#dedede] text-base bg-[#f7f7f9] mb-6
                                focus:border-[1px] focus:border-[#4339e4] focus:outline-none focus:ring-4 focus:ring-[rgba(67,57,228,0.2)] text-[#545454]`}
                                    placeholder="被保險人的營業項目"
                                    type="text"
                                    name="business_activity"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className='flex flex-col mr-8'>
                                <p className='text-base text-[#1b1c46] mb-4 leading-[1.4] font-bold'>職務職稱</p>
                                <input className={`w-[286px] sm:w-[185px] lg:w-[286px] h-[50px] pl-5 checkout-name rounded-xl border-[1px] border-[#dedede] text-base bg-[#f7f7f9] mb-6
                                focus:border-[1px] focus:border-[#4339e4] focus:outline-none focus:ring-4 focus:ring-[rgba(67,57,228,0.2)] text-[#545454]`}
                                    placeholder="被保險人的職務職稱"
                                    type="text"
                                    name="job_title"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className='flex flex-col'>
                                <p className='text-base text-[#1b1c46] mb-4 leading-[1.4] font-bold'>公司所在地</p>
                                <input className={`w-[286px] sm:w-[185px] lg:w-[286px] h-[50px] pl-5 checkout-name rounded-xl border-[1px] border-[#dedede] text-base bg-[#f7f7f9] mb-6
                                focus:border-[1px] focus:border-[#4339e4] focus:outline-none focus:ring-4 focus:ring-[rgba(67,57,228,0.2)] text-[#545454]`}
                                    placeholder="公司所在地"
                                    type="text"
                                    name="company_location"
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className='flex flex-col sm:flex-row'>
                            <div className='flex flex-col mr-8'>
                                <p className='text-base text-[#1b1c46] mb-4 leading-[1.4] font-bold'>里程數</p>
                                <input className={`w-[286px] sm:w-[185px] lg:w-[286px] h-[50px] pl-5 checkout-name rounded-xl border-[1px] border-[#dedede] text-base bg-[#f7f7f9] mb-6
                                focus:border-[1px] focus:border-[#4339e4] focus:outline-none focus:ring-4 focus:ring-[rgba(67,57,228,0.2)] text-[#545454]`}
                                    placeholder="被保險人的里程數"
                                    type="text"
                                    name="mileage"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className='flex'>
                                <div className='flex flex-col mr-8'>
                                    <p className='text-base text-[#1b1c46] mb-4 leading-[1.4] font-bold'>有無車庫</p>
                                    <div className='flex h-[50px] w-[155px] sm:w-[185px] lg:w-[286px]'>
                                        <p className='text-sm text-[#545454] leading-[1.4] flex items-center mb-1 mr-4'>無</p>
                                        <Switch id="garageSwitch" isToggled={isGarageToggled} toggleSwitch={toggleGarageSwitch} />
                                        <p className='text-sm text-[#545454] leading-[1.4] flex items-center mb-1 ml-4'>有</p>
                                    </div>
                                </div>
                                <div className='flex flex-col'>
                                    <p className='text-base text-[#1b1c46] mb-4 leading-[1.4] font-bold'>有無專任司機</p>
                                    <div className='flex h-[50px] w-[155px] sm:w-[286px]'>
                                        <p className='text-sm text-[#545454] leading-[1.4] flex items-center mb-1 mr-4'>無</p>
                                        <Switch id="driverSwitch" isToggled={isDriverToggled} toggleSwitch={toggleDriverSwitch} />
                                        <p className='text-sm text-[#545454] leading-[1.4] flex items-center mb-1 ml-4'>有</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-full flex justify-end'>
                        <button className='border-2 border-[#4339e4] text-[#4339e4] bg-white font-bold w-[120px] h-[57px] rounded-[32px] mr-6 hover:bg-[#eeebfb]'
                            onClick={() => scrollTo(getResponsiveScrollPosition(100, 100, 800))}>上一步</button>
                        <button className='bg-[#4339e4] text-white font-bold w-[197px] h-[57px] rounded-[32px] hover:bg-[#2e26a3]'
                            onClick={() => scrollTo(getResponsiveScrollPosition(3100, 3130, 2900))}>下一步</button>
                    </div>
                </div>
            </div>

             {/* Third Div */}
            <div className='flex justify-center items-center bg-[#f7f7f9]'>
                <div className='w-[343px] sm:w-[668px] lg:w-[954px] h-[750px] sm:h-[650px] pt-[80px]'>
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
                                            name="sourceType" 
                                            value="業務通路名稱"
                                            onChange={handleInputChange3}/>
                                        業務通路名稱：
                                    </label>
                                    <input className={`w-[286px] h-[50px] pl-5 checkout-name rounded-xl border-[1px] border-[#dedede] text-base bg-[#f7f7f9] mb-4
                                    focus:border-[1px] focus:border-[#4339e4] focus:outline-none focus:ring-4 focus:ring-[rgba(67,57,228,0.2)] text-[#545454]`}
                                    placeholder="被保險人的業務通路名稱"
                                    type="text"
                                    name="business_channel_name"
                                    value={formData3.business_channel_name}
                                    onChange={handleBusinessChange}
                                    />
                                </div>
                                <div className="flex flex-col sm:flex-row">
                                    <label className='text-sm text-[#545454] mb-4 mr-2 leading-[1.4] flex items-center'>
                                        <input className='mx-2 w-5 h-5'
                                            type="radio"
                                            name="sourceType" 
                                            value="水火險業務客戶"
                                            onChange={handleInputChange3}/>
                                        水、火險業務客戶，年保費
                                    </label>
                                    <input className={`w-[286px] h-[50px] pl-5 checkout-name rounded-xl border-[1px] border-[#dedede] text-base bg-[#f7f7f9] mb-4
                                    focus:border-[1px] focus:border-[#4339e4] focus:outline-none focus:ring-4 focus:ring-[rgba(67,57,228,0.2)] text-[#545454]`}
                                    placeholder="輸入被保險人的年保費"
                                    type="text"
                                    name="insurance_annual_premium"
                                    value={formData3.insurance_annual_premium}
                                    onChange={handleInsuranceChange}
                                    />
                                </div>
                                <div className="flex flex-col sm:flex-row">
                                    <label className='text-sm text-[#545454] mb-4 mr-2 leading-[1.4] flex items-center'>
                                        <input className='mx-2 w-5 h-5'
                                            type="radio"
                                            name="sourceType" 
                                            value="同仁親友介紹"
                                            onChange={handleInputChange3}/>
                                        同仁、親友介紹 關係：
                                    </label>
                                    <input className={`w-[286px] h-[50px] pl-5 checkout-name rounded-xl border-[1px] border-[#dedede] text-base bg-[#f7f7f9] mb-4
                                focus:border-[1px] focus:border-[#4339e4] focus:outline-none focus:ring-4 focus:ring-[rgba(67,57,228,0.2)] text-[#545454]`}
                                    placeholder="被保險人與業務來源的關係"
                                    type="text"
                                    name="referral_relationship"
                                    value={formData3.referral_relationship}
                                    onChange={handleRelationshipChange}
                                    />
                                </div>
                                <div className="flex">
                                    <label className='text-sm text-[#545454] mb-4 leading-[1.4] flex items-center'>
                                        <input className='mx-2 w-5 h-5'
                                            type="radio"
                                            name="sourceType" 
                                            value="原車險客戶"
                                            onChange={handleInputChange3}
                                        />
                                        原車險客戶
                                    </label>
                                </div>
                                <div className="flex">
                                    <label className='text-sm text-[#545454] mb-4 leading-[1.4] flex items-center'>
                                        <input className='mx-2 w-5 h-5'
                                            type="radio"
                                            name="sourceType" 
                                            value="客戶自行來電"
                                            onChange={handleInputChange3}
                                        />
                                        客戶自行來電要保
                                    </label>
                                </div>
                                <div className="flex">
                                    <label className='text-sm text-[#545454] mb-4 leading-[1.4] flex items-center'>
                                        <input className='mx-2 w-5 h-5'
                                            type="radio"
                                            name="sourceType" 
                                            value="其他"
                                            onChange={handleInputChange3}
                                        />
                                        其他
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-full flex justify-end'>
                        <button className='border-2 border-[#4339e4] text-[#4339e4] bg-white font-bold w-[120px] h-[57px] rounded-[32px] mr-6 hover:bg-[#eeebfb]'
                            onClick={() => scrollTo(getResponsiveScrollPosition(1400, 1400, 1980))}>上一步</button>
                        <button className='bg-[#4339e4] text-white font-bold w-[197px] h-[57px] rounded-[32px] hover:bg-[#2e26a3]'
                            onClick={() => scrollTo(getResponsiveScrollPosition(3880, 3870, 3530))}>下一步</button>
                    </div>
                </div>
            </div>

            {/* Forth Div */}
            <div className='flex justify-center items-center bg-[#f7f7f9]'>
                <div className='w-[343px] sm:w-[668px] lg:w-[954px] h-[950px] sm:h-[1000px] pt-[80px]'>
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
                                            name="deductible_exemption" 
                                            value="乙式"
                                            onChange={handleInputChange4}/>
                                        乙式 免自負額
                                    </label>
                                </div>
                                <div className="flex">
                                    <label className='text-sm text-[#545454] mb-4 leading-[1.4] flex items-center'>
                                        <input className='mx-2 w-5 h-5'
                                            type="checkbox"
                                            name="depreciation_exemption" 
                                            value="免折舊"
                                            onChange={handleInputChange4}/>
                                        免折舊
                                    </label>
                                </div>
                                <div className="flex">
                                    <label className='text-sm text-[#545454] mb-4 leading-[1.4] flex items-center'>
                                        <input className='mx-2 w-5 h-5'
                                            type="checkbox"
                                            name="body_damage_waiver" 
                                            value="車體免追償險"
                                            onChange={handleInputChange4}/>
                                        車體免追償險
                                    </label>
                                </div>
                                <div className="flex">
                                    <label className='text-sm text-[#545454] mb-4 leading-[1.4] flex items-center'>
                                        <input className='mx-2 w-5 h-5'
                                            type="checkbox"
                                            name="compulsory_insurance" 
                                            value="強制險"
                                            onChange={handleInputChange4}/>
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
                                    <input className={`w-[180px] sm:w-[500px] lg:w-[782px] h-[50px] pl-5 checkout-name rounded-xl border-[1px] border-[#dedede] text-base bg-[#f7f7f9] mb-4
                                        focus:border-[1px] focus:border-[#4339e4] focus:outline-none focus:ring-4 focus:ring-[rgba(67,57,228,0.2)] text-[#545454]`}
                                        placeholder="輸入竊盜自負額"
                                        type="text"
                                        name="theft_deductible_percentage"
                                        onChange={handleInputChange4}
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
                                    <input className={`w-[150px] sm:w-[470px] lg:w-[752px] h-[50px] pl-5 checkout-name rounded-xl border-[1px] border-[#dedede] text-base bg-[#f7f7f9] mb-4
                                        focus:border-[1px] focus:border-[#4339e4] focus:outline-none focus:ring-4 focus:ring-[rgba(67,57,228,0.2)] text-[#545454]`}
                                        placeholder="輸入第三人責任傷害費用"
                                        type="text"
                                        name="third_party_bodily_injury_cost"
                                        onChange={handleInputChange4}
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
                                    <input className={`w-[150px] sm:w-[470px] lg:w-[752px] h-[50px] pl-5 checkout-name rounded-xl border-[1px] border-[#dedede] text-base bg-[#f7f7f9] mb-4
                                        focus:border-[1px] focus:border-[#4339e4] focus:outline-none focus:ring-4 focus:ring-[rgba(67,57,228,0.2)] text-[#545454]`}
                                        placeholder="輸入第三人責任財損費用"
                                        type="text"
                                        name="third_party_property_damage_cost"
                                        onChange={handleInputChange4}
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
                                    <input className={`w-[206px] sm:w-[526px] lg:w-[808px] h-[50px] pl-5 checkout-name rounded-xl border-[1px] border-[#dedede] text-base bg-[#f7f7f9] mb-4
                                        focus:border-[1px] focus:border-[#4339e4] focus:outline-none focus:ring-4 focus:ring-[rgba(67,57,228,0.2)] text-[#545454]`}
                                        placeholder="輸入駕駛險的費用"
                                        type="text"
                                        name="driver_insurance_cost"
                                        onChange={handleInputChange4}
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
                                    <input className={`w-[108px] sm:w-[428px] lg:w-[710px] h-[50px] pl-5 checkout-name rounded-xl border-[1px] border-[#dedede] text-base bg-[#f7f7f9] mb-4
                                        focus:border-[1px] focus:border-[#4339e4] focus:outline-none focus:ring-4 focus:ring-[rgba(67,57,228,0.2)] text-[#545454]`}
                                        placeholder="輸入乘客險"
                                        type="text"
                                        name="passenger_insurance_cost"
                                        onChange={handleInputChange4}
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
                                    <input className={`w-[136px] sm:w-[456px] lg:w-[738px] h-[50px] pl-5 checkout-name rounded-xl border-[1px] border-[#dedede] text-base bg-[#f7f7f9] mb-4
                                        focus:border-[1px] focus:border-[#4339e4] focus:outline-none focus:ring-4 focus:ring-[rgba(67,57,228,0.2)] text-[#545454]`}
                                        placeholder="輸入超額險"
                                        type="text"
                                        name="excess_clause_cost"
                                        onChange={handleInputChange4}
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
                                    <input className={`w-[200px] sm:w-[520px] lg:w-[800px] h-[50px] pl-5 checkout-name rounded-xl border-[1px] border-[#dedede] text-base bg-[#f7f7f9]
                                        focus:border-[1px] focus:border-[#4339e4] focus:outline-none focus:ring-4 focus:ring-[rgba(67,57,228,0.2)] text-[#545454]`}
                                        placeholder="請自行增加投保需求"
                                        type="text"
                                        name="other"
                                        onChange={handleInputChange4}
                                    />
                                    <button className='bg-[#20c374] h-7 w-7 flex justify-center items-center text-white text-2xl pb-1 rounded-[4px] ml-4'>+</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className='hidden sm:flex text-lg text-[#20c374] my-6 w-full'>＊此區域為非必填，如有疑問請洽從業人員</p>
                    <div className='w-full flex justify-end'>
                        <button className='border-2 border-[#4339e4] text-[#4339e4] bg-white font-bold w-[120px] h-[57px] rounded-[32px] mr-6 hover:bg-[#eeebfb]'
                            onClick={() => scrollTo(getResponsiveScrollPosition(3100, 3130, 2900))}>上一步</button>
                        <button className='bg-[#4339e4] text-white font-bold w-[197px] h-[57px] rounded-[32px] hover:bg-[#2e26a3]'
                            onClick={() => scrollTo(4800, 4800, 4550)}>下一步</button>
                    </div>
                </div>
            </div>

            {/* Fifth Div */}
            <div className='flex justify-center items-center bg-[#f7f7f9]'>
                <div className='w-[343px] sm:w-[668px] lg:w-[954px] h-auto pt-[80px] mb-10'>
                    <div className='w-full h-[52px] flex items-center justify-between mb-6'>
                        <div className='flex items-center'>
                            <div className='w-7 h-7 bg-[#4339e4] text-white rounded-lg flex justify-center items-center pb-1'>5</div>
                            <div className='w-[300px] sm:w-[413px] h-2 bg-[#4339e4] text-white rounded-full ml-2'></div>
                        </div>
                    </div>
                    <div className='w-full h-auto bg-white rounded-lg py-6 px-4 shadow-md mb-6'>
                        <p className='text-xl text-[#1b1c46] font-bold mb-2'>上傳文件</p>
                        <p className='text-[#1b1c46] mb-2'>請上傳您的身分證、合約書</p>
                        <div className="flex justify-center mt-4">
                            <div 
                                className={`h-[100px] sm:h-[306px] w-[300px] sm:w-[922px] ${dragOver ? 'bg-blue-100' : 'bg-[#f7f7f9]'} border-2 border-[#dedede] rounded-lg border-dotted flex flex-col justify-center items-center`}
                                onDragEnter={handleDragEnter}
                                onDragLeave={handleDragLeave}
                                onDragOver={handleDragOver}
                                onDrop={handleDrop}
                            >
                                <img alt='upload' src={upload} className='h-8 sm:h-12 w-12 mb-2'/>
                                <div className="flex pb-2">
                                    <p className='text-[#1b1c46] hidden sm:flex'>拖曳檔案至此輸入欄或</p>
                                    <p className='text-[#1b1c46] flex sm:hidden'>點擊</p>
                                    <button className="text-[#20c374] font-bold underline underline-offset-2"
                                        onClick={() => document.getElementById('fileInput').click()}>選擇檔案</button>
                                    <button className="flex sm:hidden text-[#20c374] font-bold underline underline-offset-2"
                                        onClick={() => document.getElementById('fileInput').click()}>或開啟相機</button>
                                </div>
                            </div>
                            {/* <div
                                id="cameraDiv"
                                className="flex sm:hidden ml-2 h-[100px] w-[152px] border-2 border-[#dedede] bg-[#f7f7f9] rounded-lg border-dotted flex-col justify-center items-center"
                                onClick={handleDivClick}
                            >
                                <img alt='camera' src={camera} className='h-10 w-10 mb-[2px]'/>
                                <div className="flex pb-2">
                                    <p className='text-[#1b1c46]'>點擊</p>
                                    <button className="text-[#20c374] font-bold underline underline-offset-2"
                                        onClick={handleDivClick}>開啟相機</button>
                                </div>
                            </div> */}
                        </div>
                        {files.map((fileObj) => (
                            <div key={fileObj.id} className="w-full py-2 bg-[#f9f9fa] mt-7 rounded-lg relative">
                                <div className="flex m-2">
                                    {fileObj.thumbnail && (
                                        <img src={fileObj.thumbnail} alt="Thumbnail" className="w-20 h-16 object-cover object-center ml-6 rounded-md" />
                                    )}
                                    <div className="flex flex-col pl-5">
                                        <p className="text-sm text-[#1b1c46] font-bold my-2">{fileObj.file.name}</p>
                                        <p className="text-sm text-[#858a94] mb-1">{fileObj.size}</p>
                                    </div>
                                </div>
                                <div className="flex items-center my-4">
                                    <div className="w-full bg-white rounded-full h-6 ml-6">
                                        <div className="upload-line h-6 rounded-full" style={{ width: `${fileObj.progress}%` }}></div>
                                    </div>
                                    <span className="text-sm text-[#1b1c46] mx-5">{fileObj.progress}%</span>
                                </div>
                                <button onClick={() => deleteFile(fileObj.id)} className="ml-2 cross h-6 w-6 absolute top-4 right-4"></button>
                            </div>
                        ))}
                        <input
                            type="file"
                            id="fileInput"
                            style={{ display: 'none' }}
                            onChange={handleFileSelect}
                            multiple // if you want to allow multiple file uploads
                            accept="image/*"
                        />
                    </div>
                    <div className='w-full flex justify-end'>
                        <button className='border-2 border-[#4339e4] text-[#4339e4] bg-white font-bold w-[120px] h-[57px] rounded-[32px] mr-6 hover:bg-[#eeebfb]'
                            onClick={() => scrollTo(getResponsiveScrollPosition(3880, 3880, 3540))}>上一步</button>
                        <button className='bg-[#4339e4] text-white font-bold w-[197px] h-[57px] rounded-[32px] hover:bg-[#2e26a3]'
                            onClick={handleSubmit}>提交</button>
                    </div>
                </div>
            </div>

            {showDiv && <div className='bg-black/70 fixed inset-0 flex justify-center items-center z-30'>
                <div className='w-[400px] h-[184px] bg-white flex flex-col rounded-xl p-6 relative'>
                    <div className="check w-8 h-8 bg-no-repeat bg-contain mb-4"></div>
                    <p className='text-lg text-[#101828] font-bold w-[243px] mb-1'>登出成功</p>
                    <p className='text-sm text-[#475467] w-[350px]'>您已成功登出。</p>
                    <div className="cross w-6 h-6 bg-no-repeat bg-contain absolute top-6 right-6 cursor-pointer"
                        onClick={() => setShowDiv(false)}></div>
                </div>
            </div>}
            {showAlert && <div className='bg-black/70 fixed inset-0 flex justify-center items-center z-30'>
                <div className='w-[400px] h-[204px] bg-white flex flex-col rounded-xl p-6 relative'>
                    <img className="check w-8 h-8 bg-no-repeat bg-contain mb-4" alt='alert' src={failure} />
                    <p className='text-lg text-[#101828] font-bold w-[243px] mb-1'>填寫不完全</p>
                    <p className='text-sm text-[#475467] w-[350px]'>{alert}</p>
                    <button className='w-[352px] py-2 bg-[#4339e4] rounded-full mt-4 text-white font-medium hover:bg-[#2e26a3]'
                        onClick={() => setShowAlert(false)}>繼續填寫</button>
                    <div className="cross w-6 h-6 bg-no-repeat bg-contain absolute top-6 right-6 cursor-pointer"
                        onClick={() => setShowAlert(false)}></div>
                </div>
            </div>}
        </div>
    )
}

export default HomePage;