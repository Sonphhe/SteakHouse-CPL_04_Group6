import React from 'react';
interface ProductItemsProps {
  product: {
    id: string;
    productName: string;
    productOldPrice: number;
    productPrice: number;
    image: string;
    description: string;
    quantity: number;
  };
  status: string; // Thêm status từ đơn hàng
}


const ProductItems: React.FC<ProductItemsProps> = ({ product, status }) => {
   // Hàm để xác định trạng thái dựa trên giá trị status
  // const getStatusLabel = (status: string): string => {
  //   switch (status) {
  //     case 'Waiting for Payment':
  //       return 'Pending Payment';
  //     case 'Waiting for Confirmation':
  //       return 'Pending Confirmation';
  //     case 'Complete':
  //       return 'Completed';
  //     case 'Cancel':
  //       return 'Cancelled';
  //     default:
  //       return status;
  //   }
  // };
  return (
    <div className='product-items-container'>
      <div className='product-header'>
        <div className='category'>
          {/* <p>Drinks</p> */}
        </div>
        {/* <p style={{ color: '#7d161c' }}>{getStatusLabel(status)}</p> */}
      </div>
      <div className='productItems-detail'>
        <div className='leftside'>
          <div className='image'>
            <img src={product.image || '/default-image.jpg'} alt={product.productName} /> {/* Thêm giá trị mặc định nếu image trống */}
          </div>
          <div className='productName'>
            <p>{product.productName}</p>
            <p >x{product.quantity}</p>
          </div>
        </div>
        <div className='rightside'>
          <span className='old-price'>{product.productOldPrice}đ</span>
          <span className='new-price'>{product.productPrice}đ</span>
        </div>
      </div>
      {/* <div className='productItems-action'>
        <div className='total'>
          <p className='total-text'>Total: </p>
          <p className='total-money'>{product.productPrice * product.quantity}đ</p>
        </div>
      </div> */}
    </div>
  )
}

export default ProductItems
