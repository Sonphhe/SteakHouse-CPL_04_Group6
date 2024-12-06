import React, { useEffect, useState } from 'react';

interface ProductItemsProps {
  product: {
    id: string;
    productName: string;
    productOldPrice: number;
    productPrice: number;
    image: string;
    description: string;
    quantity: number;
    categoryId: string;
    orderTime: string;
  };
  status: string;
}

const ProductItems: React.FC<ProductItemsProps> = ({ product}) => {
  // Tạo một state để lưu danh mục
  const [categories, setCategories] = useState<{ id: string; categoryName: string }[]>([]);

  // Fetch dữ liệu danh mục từ API hoặc sử dụng dữ liệu tĩnh
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch('http://localhost:9999/productCategory'); // Thay URL API nếu cần
      const data = await response.json();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  // Tìm tên danh mục từ categoryId của sản phẩm
  const categoryName =
    categories.find((category) => category.id == product.categoryId)?.categoryName || "Unknown";

  console.log(product.orderTime);
  return (
    <div className="product-items-container">
      <div className="product-header">
        <div className="category">
          {/* Có thể hiển thị tên danh mục ở đây nếu cần */}
        </div>
      </div>
      <div className="productItems-detail">
        <div className="leftside">
          <div className="image">
            <img
              src={product.image || '/default-image.jpg'}
              alt={product.productName}
            /> {/* Thêm giá trị mặc định nếu image trống */}
          </div>
          <div className="productName">
            <p>{product.productName}</p>
            <p>x{product.quantity}</p>
            <p className="categoryName">{categoryName}</p> {/* Hiển thị tên danh mục */}
            <p className="order-time">Order Time: {product.orderTime}</p>
          </div>
        </div>
        <div className="rightside">
          <span className="old-price">{(product.productOldPrice * 1000).toLocaleString('vi-VN')}đ</span>
          <span className="new-price">{(product.productPrice * 1000).toLocaleString('vi-VN')}đ</span>
        </div>
      </div>
    </div>
  );
}

export default ProductItems;
