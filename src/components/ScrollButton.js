import React from 'react';

function ScrollButton() {
  // 定義一個函數來處理點擊事件
  const scrollTo = (pixel) => {
    // 使用window.scrollTo函數來滾動頁面
    window.scrollTo({
      top: pixel, // 指定要滾動到的垂直位置
      behavior: 'smooth' // 選擇平滑滾動
    });
  };
}

export default ScrollButton;