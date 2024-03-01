import React, { useState, useEffect } from 'react';
import check from '../images/success_2.svg'
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink, PDFViewer, Font, Image } from '@react-pdf/renderer';
import axios from 'axios';
import { Link } from 'react-router-dom';

function FormSuccessPage() {
    const getSavedEmail = () => localStorage.getItem('email');

    const [email, setEmail] = useState(getSavedEmail());
    const [data, setData] = useState(null);
    const [data2, setData2] = useState(null);
    const [data3, setData3] = useState(null);
    const [data4, setData4] = useState(null);

    useEffect(() => {
        setEmail(getSavedEmail());
        console.log(email);
    }, []);


    useEffect(() => {
        if (email) {
            const fetchUserData = async () => {
                try {
                    const [response1, response2, response3, response4] = await Promise.all([
                        axios.post('http://192.168.0.120:5006/get_vehicle_owner_info', { email }),
                        axios.post('http://192.168.0.120:5006/get_business_source', { email }),
                        axios.post('http://192.168.0.120:5006/get_insurance_requirements', { email }),
                        axios.post('http://192.168.0.120:5006/get_user_files', { email }),
                    ]);
                    setData(response1.data.length > 0 ? response1.data[response1.data.length - 1] : null);
                    console.log(data);

                    setData2(response2.data.length > 0 ? response2.data[response2.data.length - 1] : null);
                    console.log(data2);

                    setData3(response3.data.length > 0 ? response3.data[response3.data.length - 1] : null);
                    console.log(data3);

                    setData4(response4.data.file_urls);
                    console.log(data4);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };

            fetchUserData();
        }
    }, [email]);

    Font.register({
        family: 'NotoSansTC',
        src: 'http://localhost:3000/NotoSansTC-Regular.ttf'
    });

    Font.register({
        family: 'NotoSansTC-Bold',
        src: 'http://localhost:3000/NotoSansTC-Bold.ttf'
    });

    const styles = StyleSheet.create({
        page: {
          flexDirection: 'column',
        },
        header: {
            margin: 10,
            padding: 10,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
        headerText: {
            fontSize: 18,
            fontFamily: 'NotoSansTC-Bold',
        },
        section: {
          marginTop: 5,
          marginLeft: 10,
          padding: 5
        },
        text: {
            fontFamily: 'NotoSansTC',
            fontSize: 13
        },
        title1: {
            fontSize: 16,
            fontFamily: 'NotoSansTC-Bold',
            marginBottom: '8px'
        },
        title2: {
            fontSize: 13,
            fontFamily: 'NotoSansTC-Bold',
        },
        section1: {
            marginTop: 5,
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        section2: {
            flexDirection: 'row',
            justifyContent: 'start'
        },
        textDiv: {
            width: '33%'
        },
        image: {
            height: 150
        }
    });

    const customPageSize = [595.28, 841.89];

    const MyDocument = () => (
        <Document>
          <Page size={customPageSize} style={styles.page}>
            <View style={styles.section}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>汽車險限保業務出單報告書</Text>
                </View>
                <View style={styles.section}>
                    <View style={styles.section1}>
                        <View style={styles.textDiv}>
                            <Text style={styles.title2}>公司</Text>
                            {data && <Text style={styles.text}>{data.company}</Text>}
                        </View>
                        <View style={styles.textDiv}>
                            <Text style={styles.title2}>營業廠</Text>
                            {data && <Text style={styles.text}>{data.business_factory}</Text>}
                        </View>
                        <View style={styles.textDiv}>
                            <Text style={styles.title2}>日期</Text>
                            {data && <Text style={styles.text}>{
                                (() => {
                                    const dateObj = new Date(data.date);
                                    const year = dateObj.getFullYear();
                                    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
                                    const day = dateObj.getDate().toString().padStart(2, '0');
                                    return `${year}/${month}/${day}`;
                                })()
                            }</Text>}
                        </View>
                    </View>
                </View>
                <View style={styles.section}>
                    <Text style={styles.title1}>車主背景資料</Text>
                    <View style={styles.section1}>
                        <View style={styles.textDiv}>
                            <Text style={styles.title2}>被保險人</Text>
                            {data && <Text style={styles.text}>{data.insured_name}</Text>}
                        </View>
                        <View style={styles.textDiv}>
                            <Text style={styles.title2}>ID或統編</Text>
                            {data && <Text style={styles.text}>{data.insured_id}</Text>}
                        </View>
                        <View style={styles.textDiv}>
                            <Text style={styles.title2}>車牌號碼</Text>
                            {data && <Text style={styles.text}>{data.license_plate_number}</Text>}
                        </View>
                    </View>
                    <View style={styles.section1}>
                        <View style={styles.textDiv}>
                            <Text style={styles.title2}>使用人</Text>
                            {data && <Text style={styles.text}>{data.user_name}</Text>}
                        </View>
                        <View style={styles.textDiv}>
                            <Text style={styles.title2}>ID</Text>
                            {data && <Text style={styles.text}>{data.user_id}</Text>}
                        </View>
                        <View style={styles.textDiv}>
                            <Text style={styles.title2}>使用人年齡</Text>
                            {data && <Text style={styles.text}>{data.user_age}</Text>}
                        </View>
                    </View>
                    <View style={styles.section1}>
                        <View style={styles.textDiv}>
                            <Text style={styles.title2}>投保性質</Text>
                            {data && <Text style={styles.text}>{data.insurance_nature}</Text>}
                        </View>
                    </View>
                    <View style={styles.section1}>
                        <View style={styles.textDiv}>
                            <Text style={styles.title2}>營業項目（任職公司）</Text>
                            {data && <Text style={styles.text}>{data.business_activity}</Text>}
                        </View>
                        <View style={styles.textDiv}>
                            <Text style={styles.title2}>職務職稱</Text>
                            {data && <Text style={styles.text}>{data.job_title}</Text>}
                        </View>
                        <View style={styles.textDiv}>
                            <Text style={styles.title2}>公司所在地</Text>
                            {data && <Text style={styles.text}>{data.company_location}</Text>}
                        </View>
                    </View>
                    <View style={styles.section1}>
                        <View style={styles.textDiv}>
                            <Text style={styles.title2}>里程數</Text>
                            {data && <Text style={styles.text}>{data.mileage}</Text>}
                        </View>
                        <View style={styles.textDiv}>
                            <Text style={styles.title2}>有無車庫</Text>
                            {data && <Text style={styles.text}>{data.has_garage === 1 ? '是' : '否'}</Text>}
                        </View>
                        <View style={styles.textDiv}>
                            <Text style={styles.title2}>有無專任司機</Text>
                            {data && <Text style={styles.text}>{data.has_dedicated_driver === 1 ? '是' : '否'}</Text>}
                        </View>
                    </View>
                </View>
                <View style={styles.section}>
                    <Text style={styles.title1}>業務來源</Text>
                    <View style={styles.section1}>
                        {data2 && parseFloat(data2.business_channel_name) ? (
                            <View style={styles.textDiv}>
                                <Text style={styles.text}>業務通路名稱：{data2.business_channel_name}</Text>
                            </View>
                        ) : null}
                        {data2 && parseFloat(data2.insurance_annual_premium) !== 0 ? (
                            <View style={styles.textDiv}>
                                <Text style={styles.text}>水火險客戶，年保費：{data2.insurance_annual_premium}</Text>
                            </View>
                        ) : null}
                        {data2 && data2.original_insurance_customer ? (
                            <View style={styles.textDiv}>
                                <Text style={styles.text}>原車險客戶</Text>
                            </View>
                        ) : null}
                        {data2 && data2.referral_relationship ? (
                            <View style={styles.textDiv}>
                                <Text style={styles.text}>同仁、親友介紹，關係：{data2.referral_relationship}</Text>
                            </View>
                        ) : null}
                        {data2 && data2.direct_customer_inquiry ? (
                            <View style={styles.textDiv}>
                                <Text style={styles.text}>客戶自行要保</Text>
                            </View>
                        ) : null}
                        {data2 && data2.other_source ? (
                            <View style={styles.textDiv}>
                                <Text style={styles.text}>其他</Text>
                            </View>
                        ) : null}
                    </View>
                </View>
                <View style={styles.section}>
                    <Text style={styles.title1}>投保需求</Text>
                    <View style={styles.section2}>
                        {data3 && data3.deductible_exemption ? ( 
                            <View style={styles.textDiv}>
                                <Text style={styles.text}>乙式免自負額</Text>
                            </View>
                        ) : null}
                        {data3 && data3.depreciation_exemption ? (
                            <View style={styles.textDiv}>
                                <Text style={styles.text}>免折舊</Text>
                            </View>
                        ) : null}
                        {data3 && data3.body_damage_waiver ? (
                            <View style={styles.textDiv}>
                                <Text style={styles.text}>車體免追償險</Text>
                            </View>
                        ) : null}
                        {data3 && data3.compulsory_insurance ? (
                            <View style={styles.textDiv}>
                                <Text style={styles.text}>強制險</Text>
                            </View>
                        ) : null}
                    </View>
                    <View style={styles.section2}>
                        {data3 && parseFloat(data3.theft_deductible_percentage) ? (
                            <View style={styles.textDiv}>
                                <Text style={styles.text}>竊盜自負額{data3.theft_deductible_percentage}萬</Text>
                            </View>
                        ) : null}
                        {data3 && parseFloat(data3.third_party_bodily_injury_cost) ? (
                            <View style={styles.textDiv}>
                                <Text style={styles.text}>第三人責任傷害險{data3.third_party_bodily_injury_cost}萬</Text>
                            </View>
                        ) : null}
                        {data3 && parseFloat(data3.third_party_property_damage_cost) ? (
                            <View style={styles.textDiv}>
                                <Text style={styles.text}>第三人責任財損{data3.third_party_property_damage_cost}萬</Text>
                            </View>
                        ) : null}
                    </View>
                    <View style={styles.section2}>
                        {data3 && parseFloat(data3.driver_insurance_cost) ? (
                            <View style={styles.textDiv}>
                                <Text style={styles.text}>駕駛險{data3.driver_insurance_cost}萬</Text>
                            </View>
                        ) : null}
                        {data3 && parseFloat(data3.passenger_insurance_cost) ? (
                            <View style={styles.textDiv}>
                                <Text style={styles.text}>乘客險{data3.passenger_insurance_cost}萬</Text>
                            </View>
                        ) : null}
                        {data3 && parseFloat(data3.excess_clause_cost) ? (
                            <View style={styles.textDiv}>
                                <Text style={styles.text}>超額險{data3.excess_clause_cost}萬</Text>
                            </View>
                        ) : null}
                        {data3 && parseFloat(data3.other) ? (
                            <View style={styles.textDiv}>
                                <Text style={styles.text}>{data3.other}</Text>
                            </View>
                        ) : null}
                    </View>
                </View>
                <View style={styles.section}>
                    <Text style={styles.title1}>上傳文件</Text>
                    <View style={styles.section2}>
                       {data4 && data4.map((url, index) => (
                        <Image key={index} style={styles.image} src={url} />
                       ))}
                    </View>
                </View>
            </View>
          </Page>
        </Document>
    );


    return (
        <div className="bg-[#f7f7f9] w-full h-screen flex flex-col justify-center items-center">
            <div className='flex justify-center items-center mb-4'>
                <img alt='check' src={check} className='w-7 h-7' />
                <p className='text-2xl font-bold ml-2'>表單提交成功</p>
            </div>
            <p className='text-[#545454] mb-2'>感謝您提交保險申請表格！您的資訊已經成功收到。</p>
            <p className='text-[#545454] mb-2'>需求單編號： AB-1234567</p>
            <p className='text-[#545454] mb-2'>您將可以在後台觀看此保單的狀態，</p>
            <p className='text-[#545454] mb-8'>如有任何問題可加入官方line查詢訂單。</p>
                {data ? (
                    <PDFDownloadLink
                        document={<MyDocument />}
                        fileName="Egibo.pdf"
                        className='rounded-full w-[397px] py-4 text-lg flex justify-center font-medium bg-[#4339e4] text-white hover:bg-[#2e26a3] mb-4'
                        >
                    下载 PDF 文件
                    </PDFDownloadLink>
                ) : (
                    <button
                        className={`rounded-full w-[397px] py-4 text-lg font-medium bg-[#4339e4] text-white mb-4`}
                        disabled
                    >
                        下载中...
                    </button>
                )}
            <Link to='/home'>
                <button className={`rounded-full w-[397px] py-4 text-lg font-medium text-[#4339e4] border-[3px] border-[#4339e4] hover:bg-[#eeebfb]`}>返回首頁</button>
            </Link>
            <div>
            </div>
                {/* <PDFViewer style={{width: '100%', height: '60vh'}}>
                    <MyDocument />
                </PDFViewer> */}
        </div>
    )
}

export default FormSuccessPage;