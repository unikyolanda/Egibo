import React, { useCallback, useState } from "react";
import upload from '../images/upload.svg';
import camera from '../images/camera.svg'

function FifthDiv() {
    const scrollTo = (pixel) => {
        window.scrollTo({
          top: pixel,
          behavior: 'smooth'
        });
    };

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
      
    return (
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
                    <button className='bg-[#4339e4] text-white font-bold w-[197px] h-[57px] rounded-[32px] hover:bg-[#2e26a3]'>提交</button>
                </div>
            </div>
        </div>
    )
}

export default FifthDiv;