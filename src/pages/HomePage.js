import React, { useState, useEffect, useCallback } from 'react';
import dashboard from '../images/dashboard.svg';
import logoutpic from '../images/logout.svg';
import pen from '../images/pen.svg';
import search from '../images/search.svg';
import dashboardbg from '../images/dashboard with bg.svg';
import FirstDiv from '../components/FirstDiv';
import upload from '../images/upload.svg';
import camera from '../images/camera.svg'
import hamburger from '../images/hamburger.svg';
import cross from '../images/cross.svg';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Switch from '../components/Switch';

function HomePage() {
    const [isNavOpen, setIsNavOpen] = useState(false);

    const [isGarageToggled, setIsGarageToggled] = useState(false);
    const toggleGarageSwitch = () => setIsGarageToggled(!isGarageToggled);

    const [isDriverToggled, setIsDriverToggled] = useState(false);
    const toggleDriverSwitch = () => setIsDriverToggled(!isDriverToggled);

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
            const response = await axios.post('http://192.168.0.120:5006/logout')
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

    const processFiles = (selectedFiles) => {
        Array.from(selectedFiles).forEach(file => {
            const sizeInMB = (file.size / 1024 ** 2).toFixed(2); 
            const readableSize = `${sizeInMB} MB`;
    
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const fileObject = {
                        file,
                        size: readableSize,
                        progress: 0,
                        uploaded: false,
                        thumbnail: reader.result,
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
    
    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragOver(false);
        const droppedFiles = e.dataTransfer.files;
        processFiles(droppedFiles);
    }, []);

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

    const deleteFile = (fileName) => {
        setFiles(prevFiles => prevFiles.filter(file => file.file.name !== fileName));
    };

    const handleFileSelect = (e) => {
        const selectedFiles = e.target.files;
        processFiles(selectedFiles);
    };

    const handleDivClick = () => {
        document.getElementById('fileInput').click();
    };
    //Fifth Div

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
        has_dedicated_driver: isDriverToggled
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
        original_insurance_customer: false,
        referral_relationship:'',
        direct_customer_inquiry: false,
        other_source: false,
        sourceType: ''
    });

    const handleInputChange3 = (e) => {
        const { name, value, type, checked } = e.target;

        let updatedValue = value;

        if (type === 'checkbox') {
            updatedValue = checked;
        } else if (type === 'radio') {
            updatedValue = value;
        } else if (name === 'insurance_annual_premium') {
            updatedValue = value === '' ? '' : Number(value);
        }

        setFormData3(prevState => ({
            ...prevState,
            [name]: updatedValue,
            // 若為 radio，則更新 sourceType，否則不改變 sourceType
            ...(type === 'radio' && { sourceType: value })
        }));
    };

    const [formData4, setFormData4] = useState({
        email: email,
        deductible_exemption: false,
        depreciation_exemption: false,
        compulsory_insurance: false,
        theft_deductible_percentage: 0,
        third_party_bodily_injury_cost: 0,
        third_party_property_damage_cost: 0,
        driver_insurance_cost: 0,
        passenger_insurance_cost: 0,
        excess_clause_cost: 0,
        other:''
    });

    const handleInputChange4 = (e) => {
        const { name, value, type, checked } = e.target;

        let finalValue = value;
        if (name === 'theft_deductible_percentage' 
            || name === 'third_party_bodily_injury_cost'
            || name === 'third_party_property_damage_cost'
            || name === 'driver_insurance_cost'
            || name === 'passenger_insurance_cost'
            || name === 'excess_clause_cost'
        ) {
            finalValue = value === '' ? '' : Number(value);
        } else {
            setFormData4(prevState => ({
              ...prevState,
              [name]: type === 'checkbox' ? checked : finalValue,
            }));
        }

    };

    const handleSubmit = async () => {
        const updatedFormData2 = {
            ...formData2,
            has_garage: isGarageToggled,
            has_dedicated_driver: isDriverToggled,
        };

        const updatedFormData3 = {
            ...formData3,
            original_insurance_customer: formData3.sourceType === '原車險客戶',
            direct_customer_inquiry: formData3.sourceType === '客戶自行來電',
            other_source: formData3.sourceType 
                !== '原車險客戶' && formData3.sourceType
                !== '客戶自行來電' && formData3.sourceType
                !== '業務通路名稱' && formData3.sourceType
                !== '水火險業務客戶' && formData3.sourceType
                !== '同仁親友介紹',
        };

        try {
            console.log(updatedFormData2);
            const response2 = await axios.post('http://192.168.0.120:5006/add_vehicle_owner_info', updatedFormData2);
            console.log(response2.data);

            console.log(formData3);
            const response3 = await axios.post('http://192.168.0.120:5006/add_business_source', updatedFormData3);
            console.log(response3.data);

            console.log(formData4);
            const response4 = await axios.post('http://192.168.0.120:5006/add_insurance_requirement', formData4);
            console.log(response4.data);

            const formData = new FormData();
            files.forEach((fileObj) => {
                if (fileObj.uploaded) {
                    formData.append('file', fileObj.file);
                }
            });
            formData.append('json_data', JSON.stringify({ email: email }));
        
            const uploadResponse = await axios.post('http://192.168.0.120:5006/upload', formData, {
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
            <div className={`${isNavOpen ? 'drop-shadow-md' : ''} flex w-full h-10 sm:h-[88px] z-30 relative bg-white items-center justify-between py-6 px-5 sm:px-16`}>
                <div className="opacity-0 sm:opacity-100 w-6 sm:w-[312px] text-2xl font-black text-[#4339e4]">LOGO</div>
                <p className="text-base sm:text-2xl font-bold text-[#1b1c46]">汽車險限保業務出單報告書</p>
                <div className="sm:hidden">
                <button onClick={() => setIsNavOpen(!isNavOpen)}>
                    {isNavOpen ? <img alt='cross' src={cross} className="h-6 w-6" /> : <img alt='menu' src={hamburger} className="h-6 w-6" />}
                </button>
                </div>
                <div className="hidden sm:flex w-[312px] h-10 justify-end">
                    <div className="w-[86px] h-10 flex items-center cursor-pointer mr-7">
                        <img alt='dashboard' src={dashboard} />
                        <p className='text-xl font-bold text-[#1b1c46] pl-1'>後台</p>
                    </div>
                    <div className="w-[86px] h-10 flex items-center cursor-pointer"
                        onClick={handleLogout}>
                        <img alt='logout' src={logoutpic} />
                        <p className='text-xl font-bold text-[#1b1c46] pl-1'>登出</p>
                    </div>
                </div>
            </div>
            {isNavOpen ? <div className='bg-black/60 fixed inset-0 z-10'></div> : ''}
            <div className={`${isNavOpen ? 'flex' : 'hidden'} flex-col items-center sm:hidden z-20 relative`}>
                <div className='w-full h-12 flex justify-center items-center border-b-2 border-[black/30] drop-shadow-sm bg-white cursor-pointer'>
                    <img alt='dashboard' src={dashboard} className='h-6' />
                    <p className="text-base font-bold text-[#1b1c46] ml-2 drop-shadow-sm bg-white">後台</p>
                </div>
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
            <FirstDiv />

            {/* Second Div */}
            <div className='flex justify-center items-center bg-[#f7f7f9]'>
                <div className='w-[343px] sm:w-[954px] h-[1650px] sm:h-[830px] pt-[80px]'>
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
                                <input className={`w-[286px] h-[50px] pl-5 checkout-name rounded-xl border-[1px] border-[#dedede] text-base bg-[#f7f7f9] mb-6
                                focus:border-[1px] focus:border-[#4339e4] focus:outline-none focus:ring-4 focus:ring-[rgba(67,57,228,0.2)] text-[#545454]`}
                                    placeholder="輸入被保險人的全名"
                                    type="text"
                                    name="insured_name"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className='flex flex-col mr-8'>
                                <p className='text-base text-[#1b1c46] mb-4 leading-[1.4] font-bold'>ID或統編</p>
                                <input className={`w-[286px] h-[50px] pl-5 checkout-name rounded-xl border-[1px] border-[#dedede] text-base bg-[#f7f7f9] mb-6
                                focus:border-[1px] focus:border-[#4339e4] focus:outline-none focus:ring-4 focus:ring-[rgba(67,57,228,0.2)] text-[#545454]`}
                                    placeholder="輸入被保險人的ID或統編"
                                    type="text"
                                    name="insured_id"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className='flex flex-col'>
                                <p className='text-base text-[#1b1c46] mb-4 leading-[1.4] font-bold'>車牌號碼</p>
                                <input className={`w-[286px] h-[50px] pl-5 checkout-name rounded-xl border-[1px] border-[#dedede] text-base bg-[#f7f7f9] mb-6
                                focus:border-[1px] focus:border-[#4339e4] focus:outline-none focus:ring-4 focus:ring-[rgba(67,57,228,0.2)] text-[#545454]`}
                                    placeholder="輸入被保險人的車牌號碼"
                                    type="text"
                                    name="license_plate_number"
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className='flex flex-col sm:flex-row'>
                            <div className='flex flex-col mr-8'>
                                <p className='text-base text-[#1b1c46] mb-4 leading-[1.4] font-bold'>使用人</p>
                                <input className={`w-[286px] h-[50px] pl-5 checkout-name rounded-xl border-[1px] border-[#dedede] text-base bg-[#f7f7f9] mb-6
                                focus:border-[1px] focus:border-[#4339e4] focus:outline-none focus:ring-4 focus:ring-[rgba(67,57,228,0.2)] text-[#545454]`}
                                    placeholder="輸入使用人名稱"
                                    type="text"
                                    name="user_name"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className='flex flex-col mr-8'>
                                <p className='text-base text-[#1b1c46] mb-4 leading-[1.4] font-bold'>ID</p>
                                <input className={`w-[286px] h-[50px] pl-5 checkout-name rounded-xl border-[1px] border-[#dedede] text-base bg-[#f7f7f9] mb-6
                                focus:border-[1px] focus:border-[#4339e4] focus:outline-none focus:ring-4 focus:ring-[rgba(67,57,228,0.2)] text-[#545454]`}
                                    placeholder="輸入使用人的ID"
                                    type="text"
                                    name="user_id"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className='flex flex-col'>
                                <p className='text-base text-[#1b1c46] mb-4 leading-[1.4] font-bold'>使用人年齡</p>
                                <input className={`w-[286px] h-[50px] pl-5 checkout-name rounded-xl border-[1px] border-[#dedede] text-base bg-[#f7f7f9] mb-6
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
                                <input className={`w-[286px] h-[50px] pl-5 checkout-name rounded-xl border-[1px] border-[#dedede] text-base bg-[#f7f7f9] mb-6
                                focus:border-[1px] focus:border-[#4339e4] focus:outline-none focus:ring-4 focus:ring-[rgba(67,57,228,0.2)] text-[#545454]`}
                                    placeholder="輸入被保險人的營業項目"
                                    type="text"
                                    name="business_activity"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className='flex flex-col mr-8'>
                                <p className='text-base text-[#1b1c46] mb-4 leading-[1.4] font-bold'>職務職稱</p>
                                <input className={`w-[286px] h-[50px] pl-5 checkout-name rounded-xl border-[1px] border-[#dedede] text-base bg-[#f7f7f9] mb-6
                                focus:border-[1px] focus:border-[#4339e4] focus:outline-none focus:ring-4 focus:ring-[rgba(67,57,228,0.2)] text-[#545454]`}
                                    placeholder="輸入被保險人的職務職稱"
                                    type="text"
                                    name="job_title"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className='flex flex-col'>
                                <p className='text-base text-[#1b1c46] mb-4 leading-[1.4] font-bold'>公司所在地</p>
                                <input className={`w-[286px] h-[50px] pl-5 checkout-name rounded-xl border-[1px] border-[#dedede] text-base bg-[#f7f7f9] mb-6
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
                                <input className={`w-[286px] h-[50px] pl-5 checkout-name rounded-xl border-[1px] border-[#dedede] text-base bg-[#f7f7f9] mb-6
                                focus:border-[1px] focus:border-[#4339e4] focus:outline-none focus:ring-4 focus:ring-[rgba(67,57,228,0.2)] text-[#545454]`}
                                    placeholder="輸入被保險人的里程數"
                                    type="text"
                                    name="mileage"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className='flex'>
                                <div className='flex flex-col mr-8'>
                                    <p className='text-base text-[#1b1c46] mb-4 leading-[1.4] font-bold'>有無車庫</p>
                                    <div className='flex h-[50px] w-[155px] sm:w-[286px]'>
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
                            onClick={() => scrollTo(900)}>上一步</button>
                        <button className='bg-[#4339e4] text-white font-bold w-[197px] h-[57px] rounded-[32px] hover:bg-[#2e26a3]'
                            onClick={() => scrollTo(2800)}>下一步</button>
                    </div>
                </div>
            </div>

             {/* Third Div */}
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
                                            name="sourceType" 
                                            value="業務通路名稱"/>
                                        業務通路名稱：
                                    </label>
                                    <input className={`w-[286px] h-[50px] pl-5 checkout-name rounded-xl border-[1px] border-[#dedede] text-base bg-[#f7f7f9] mb-4
                                    focus:border-[1px] focus:border-[#4339e4] focus:outline-none focus:ring-4 focus:ring-[rgba(67,57,228,0.2)] text-[#545454]`}
                                    placeholder="輸入被保險人的業務通路名稱"
                                    type="text"
                                    name="business_channel_name"
                                    onChange={handleInputChange3}
                                />
                                </div>
                                <div className="flex flex-col sm:flex-row">
                                    <label className='text-sm text-[#545454] mb-4 mr-2 leading-[1.4] flex items-center'>
                                        <input className='mx-2 w-5 h-5'
                                            type="radio"
                                            name="sourceType" 
                                            value="水火險業務客戶"/>
                                        水、火險業務客戶，年保費
                                    </label>
                                    <input className={`w-[286px] h-[50px] pl-5 checkout-name rounded-xl border-[1px] border-[#dedede] text-base bg-[#f7f7f9] mb-4
                                    focus:border-[1px] focus:border-[#4339e4] focus:outline-none focus:ring-4 focus:ring-[rgba(67,57,228,0.2)] text-[#545454]`}
                                    placeholder="輸入被保險人的年保費"
                                    type="text"
                                    name="insurance_annual_premium"
                                    onChange={handleInputChange3}
                                />
                                </div>
                                <div className="flex flex-col sm:flex-row">
                                    <label className='text-sm text-[#545454] mb-4 mr-2 leading-[1.4] flex items-center'>
                                        <input className='mx-2 w-5 h-5'
                                            type="radio"
                                            name="sourceType" 
                                            value="同仁親友介紹"/>
                                        同仁、親友介紹 關係：
                                    </label>
                                    <input className={`w-[286px] h-[50px] pl-5 checkout-name rounded-xl border-[1px] border-[#dedede] text-base bg-[#f7f7f9] mb-4
                                focus:border-[1px] focus:border-[#4339e4] focus:outline-none focus:ring-4 focus:ring-[rgba(67,57,228,0.2)] text-[#545454]`}
                                    placeholder="輸入被保險人與業務來源的關係"
                                    type="text"
                                    name="referral_relationship"
                                    onChange={handleInputChange3}
                                />
                                </div>
                                <div className="flex">
                                    <label className='text-sm text-[#545454] mb-4 leading-[1.4] flex items-center'>
                                        <input className='mx-2 w-5 h-5'
                                            type="radio"
                                            name="sourceType" 
                                            value="原車險客戶"
                                            onChange={handleInputChange3}
                                            checked={formData3.sourceType === '原車險客戶'}/>
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
                                            checked={formData3.sourceType === '客戶自行來電'}/>
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
                                            checked={formData3.sourceType === '其他'}/>
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

            {/* Forth Div */}
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
                                    <input className={`w-[180px] sm:w-[782px] h-[50px] pl-5 checkout-name rounded-xl border-[1px] border-[#dedede] text-base bg-[#f7f7f9] mb-4
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
                                    <input className={`w-[150px] sm:w-[752px] h-[50px] pl-5 checkout-name rounded-xl border-[1px] border-[#dedede] text-base bg-[#f7f7f9] mb-4
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
                                    <input className={`w-[150px] sm:w-[752px] h-[50px] pl-5 checkout-name rounded-xl border-[1px] border-[#dedede] text-base bg-[#f7f7f9] mb-4
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
                                    <input className={`w-[206px] sm:w-[808px] h-[50px] pl-5 checkout-name rounded-xl border-[1px] border-[#dedede] text-base bg-[#f7f7f9] mb-4
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
                                    <input className={`w-[108px] sm:w-[710px] h-[50px] pl-5 checkout-name rounded-xl border-[1px] border-[#dedede] text-base bg-[#f7f7f9] mb-4
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
                                    <input className={`w-[136px] sm:w-[738px] h-[50px] pl-5 checkout-name rounded-xl border-[1px] border-[#dedede] text-base bg-[#f7f7f9] mb-4
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
                                    <input className={`w-[200px] sm:w-[800px] h-[50px] pl-5 checkout-name rounded-xl border-[1px] border-[#dedede] text-base bg-[#f7f7f9]
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
                            onClick={() => scrollTo(2800)}>上一步</button>
                        <button className='bg-[#4339e4] text-white font-bold w-[197px] h-[57px] rounded-[32px] hover:bg-[#2e26a3]'
                            onClick={() => scrollTo(4450)}>下一步</button>
                    </div>
                </div>
            </div>

            {/* Fifth Div */}
            <div className='flex justify-center items-center bg-[#f7f7f9]'>
                <div className='w-[343px] sm:w-[954px] h-auto pt-[80px] mb-10'>
                    <div className='w-full h-[52px] flex items-center justify-between mb-6'>
                        <div className='flex items-center'>
                            <div className='w-7 h-7 bg-[#4339e4] text-white rounded-lg flex justify-center items-center pb-1'>5</div>
                            <div className='w-[300px] sm:w-[413px] h-2 bg-[#4339e4] text-white rounded-full ml-2'></div>
                        </div>
                    </div>
                    <div className='w-full h-auto bg-white rounded-lg py-6 px-4 shadow-md mb-6'>
                        <p className='text-xl text-[#1b1c46] font-bold mb-2'>上傳文件</p>
                        <p className='text-[#1b1c46] mb-2'>請上傳您的身分證、合約書</p>
                        <div className="flex mt-4">
                            <div 
                                className={`h-[100px] sm:h-[306px] w-[152px] sm:w-[922px] ${dragOver ? 'bg-blue-100' : 'bg-[#f7f7f9]'} border-2 border-[#dedede] rounded-lg border-dotted flex flex-col justify-center items-center`}
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
                                </div>
                            </div>
                            <div
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
                            </div>
                        </div>
                        {files.map((fileObj, index) => (
                            <div key={index} className="w-full py-2 bg-[#f9f9fa] mt-7 rounded-lg relative">
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
                                <button onClick={() => deleteFile(fileObj.file.name)} className="ml-2 cross h-6 w-6 absolute top-4 right-4"></button>
                            </div>
                        ))}
                        <input
                            type="file"
                            id="fileInput"
                            style={{ display: 'none' }}
                            onChange={handleFileSelect}
                            multiple // if you want to allow multiple file uploads
                        />
                    </div>
                    <div className='w-full flex justify-end'>
                        <button className='border-2 border-[#4339e4] text-[#4339e4] bg-white font-bold w-[120px] h-[57px] rounded-[32px] mr-6 hover:bg-[#eeebfb]'
                            onClick={() => scrollTo(3460)}>上一步</button>
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
                    <div className="cross w-6 h-6 bg-no-repeat bg-contain absolute top-6 right-6 cursor-pointer"></div>
                </div>
            </div>}
        </div>
    )
}

export default HomePage;