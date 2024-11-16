import React, { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import { useCartContext } from '../../../context/CartContext';
import './ProductDetail.css';
import Navbar from '../../../components/ui/Navbar/Navbar';
import Footer from '../../../components/ui/Footer/Footer';

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCartContext();

  const [productData, setProductData] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [comments, setComments] = useState<any[]>([]);
  const [rating, setRating] = useState<number>(0);
  const [commentText, setCommentText] = useState<string>('');
  const [userName, setUserName] = useState<string>('');

  // Fetch dữ liệu sản phẩm
  useEffect(() => {
    const fetchProductData = async () => {
      if (id) {
        try {
          const response = await fetch('http://localhost:9999/products/' + id);
          const data = await response.json();

          if (data) {
            setProductData(data);
            setComments(data.reviews || []);
            setRating(
              data.reviews && data.reviews.length > 0
                ? data.reviews.reduce((acc: number, review: any) => acc + review.rating, 0) / data.reviews.length
                : 0
            );
          } else {
            console.error('Product not found');
          }
        } catch (error) {
          console.error('Error fetching product:', error);
        }
      }
    };

    if (!location.state || !location.state.product) {
      fetchProductData();
    } else {
      const product = location.state.product;
      setProductData(product);
      setComments(product.reviews || []);
      setRating(
        product.reviews && product.reviews.length > 0
          ? product.reviews.reduce((acc: number, review: any) => acc + review.rating, 0) / product.reviews.length
          : 0
      );
    }
  }, [id, location.state]);

  // Thay đổi số lượng
  const handleIncreaseQuantity = () => setQuantity(prev => prev + 1);
  const handleDecreaseQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  // Xử lý thêm vào giỏ hàng
  const handleAddToCart = () => {
    if (productData) {
      addToCart({ ...productData, quantity });
      setIsModalOpen(true);
    }
  };

  // Đóng modal
  const handleCloseModal = () => setIsModalOpen(false);
  const handleViewCart = () => {
    setIsModalOpen(false);
    navigate('/cart');
  };

  // Trở lại menu
  const handleBackToMenu = () => navigate('/menu');

  // Thêm bình luận
  const handleAddComment = async () => {
   if (commentText && userName) {
     const newComment = {
       userName,
       rating,
       comment: commentText, // Chú ý dùng 'comment' thay vì 'text'
       date: new Date().toISOString(), // Đảm bảo định dạng ngày chính xác
     };
 
     try {
       // Cập nhật bình luận mới vào sản phẩm
       const response = await fetch(`http://localhost:9999/products/${productData.id}`, {
         method: 'PATCH',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({
           reviews: [...productData.reviews, newComment], // Thêm bình luận vào mảng reviews
         }),
       });
 
       if (response.ok) {
         console.log('Comment added successfully');
         // Cập nhật lại state của comments sau khi thêm thành công
         const updatedProductData = { ...productData, reviews: [...productData.reviews, newComment] };
         setProductData(updatedProductData); // Cập nhật lại state của sản phẩm
         setComments(updatedProductData.reviews); // Cập nhật lại comments
       } else {
         const errorText = await response.text();
         console.error('Error updating product reviews:', errorText);
       }
     } catch (error) {
       console.error('Error submitting comment:', error);
     }
 
     // Xóa nội dung trong form sau khi gửi bình luận
     setCommentText('');
     setUserName('');
     setRating(0);
   } else {
     alert('Please provide your name and comment.');
   }
 };
 
 
 
 

  if (!productData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className='product-detail'>
        <div className='product-image'>
          <img src={productData.image} alt={productData.productName} />
        </div>

        <div className='product-info'>
          <h2>{productData.productName}</h2>
          <p className='product-price'>Price: ${productData.productPrice}</p>

          <div className='quantity-container'>
            <label htmlFor='quantity'>Quantity:</label>
            <div className='quantity-controls'>
              <button onClick={handleDecreaseQuantity} className='quantity-btn'>-</button>
              <input type='text' id='quantity' value={quantity} readOnly />
              <button onClick={handleIncreaseQuantity} className='quantity-btn'>+</button>
            </div>
          </div>

          <button className='add-to-cart' onClick={handleAddToCart}>
            <i className='fa fa-shopping-cart' style={{ marginRight: '8px' }}></i> Add to Cart
          </button>
          <br />
          <button className='add-to-cart' onClick={handleBackToMenu}>
            Back to Menu
          </button>

          <h3>Description</h3>
          <p className='product-description'>{productData.description}</p>

          <div className="product-comments">
  <h3>Reviews & Comments</h3>
  {comments.length === 0 ? (
    <p>No reviews yet. Be the first to comment!</p>
  ) : (
    <ul>
      {comments.map((review, index) => (
        <li key={index}>
          <p><strong>{review.userName}</strong> - <em>{new Date(review.date).toLocaleString()}</em></p>
          <p>{review.comment}</p>
          <p>Rating: {review.rating} stars</p>
        </li>
      ))}
    </ul>
  )}
</div>


          <div className='comment-form'>
            <h4>Leave a Review</h4>
            <div className='rating'>
              <label>Rating:</label>
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={rating >= star ? 'rated' : ''}>
                  ★
                </button>
              ))}
            </div>
            <input
              type="text"
              placeholder="Your Name"
              value={userName}
              onChange={e => setUserName(e.target.value)}
            />
            <textarea
              value={commentText}
              onChange={e => setCommentText(e.target.value)}
              placeholder="Write your comment here..."
            />
            <button onClick={handleAddComment}>Submit Comment</button>
          </div>
        </div>

        {isModalOpen && (
          <div className='modal'>
            <div className='modal-content'>
              <h3>Product added to cart!</h3>
              <p>Do you want to view your cart or continue shopping?</p>
              <div className='modal-buttons'>
                <button onClick={handleViewCart}>View Cart</button>
                <button onClick={handleCloseModal}>Continue Shopping</button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
