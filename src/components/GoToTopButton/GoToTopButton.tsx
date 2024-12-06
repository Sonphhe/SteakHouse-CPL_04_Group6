import React, { useState, useEffect } from 'react';
import './GoToTopButton.css';

const GoToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Kiểm tra khi người dùng cuộn trang
  const checkScrollPosition = () => {
    if (window.scrollY > 150) { // Hiển thị nút khi cuộn xuống 300px
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Cuộn về đầu trang
  };

  useEffect(() => {
    window.addEventListener('scroll', checkScrollPosition); // Lắng nghe sự kiện cuộn trang
    return () => {
      window.removeEventListener('scroll', checkScrollPosition); // Xóa sự kiện khi component unmount
    };
  }, []);

  return (
    isVisible && (
      <button className="go-to-top" onClick={goToTop}>
        ↑
      </button>
    )
  );
};

export default GoToTopButton;
