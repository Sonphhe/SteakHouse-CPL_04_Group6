import React, { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { useCartContext } from '../../../context/CartContext';
import './ProductDetail.css';
import Navbar from '../../../components/ui/Navbar/Navbar';
import Footer from '../../../components/ui/Footer/Footer';
import Breadcrumb from '../../../pages/Breadcrumb/Breadcrumb';
import 'font-awesome/css/font-awesome.min.css';
import GoToTopButton from '../../../components/GoToTopButton/GoToTopButton';
import { useSteakHouseContext } from '../../../hooks/useSteakHouseContext';
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
  const [userName, setUserName] = useState<string | null>(null); // Khởi tạo userName với giá trị null

  // Phân trang bình luận
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 2; // Số bình luận hiển thị trên mỗi trang
  // Tính toán các bình luận hiển thị trên trang hiện tại
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);

  const totalPages = Math.ceil(comments.length / commentsPerPage);
  const { currentAccount } = useSteakHouseContext()
  // const handleFilter = useSteakHouseContext();
  // Fetch dữ liệu sản phẩm
  const { getPaginatedItems } = useSteakHouseContext();
  const handleProductClick = (product: any) => {
    navigate(`/productdetail/${product.productName}`, { state: { product } });
  };
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  useEffect(() => {
    const fetchProductData = async () => {
      if (id) {
        try {
          const response = await fetch('http://localhost:9999/products/' + id);
          const data = await response.json();

          if (data) {
            setProductData(data);
            setComments(data.reviews || []);
            setRating(calculateAverageRating(data.reviews));
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
      setRating(calculateAverageRating(product.reviews));
    }
  }, [id, location.state]);

  useEffect(() => {
    if (currentAccount) {
      setUserName(currentAccount.fullName); // Gán tên người dùng từ currentAccount
    }
  }, [currentAccount]); // Chạy khi currentAccount thay đổi

  const calculateAverageRating = (reviews: any[]) => {
    return reviews && reviews.length > 0
      ? reviews.reduce((acc: number, review: any) => acc + review.rating, 0) / reviews.length
      : 0;
  };

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

  // Thêm bình luận
  const handleAddComment = async () => {
    if (currentAccount?.id === '') {
      alert('You need to login to Comment and Rate.');
    } else {
      if (!commentText) {
        alert('Please provide your name and comment.');
        return;
      }

      const newComment = {
        userName,
        rating,
        comment: commentText,
        date: new Date().toISOString().split('T')[0], // Định dạng ngày
      };

      try {
        const response = await fetch(`http://localhost:9999/product/${productData?.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            reviews: [...(productData?.reviews || []), newComment], // Gộp bình luận mới
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Error updating product reviews:', errorText);
          return;
        }

        console.log('Comment added successfully');
        const updatedProduct = { ...productData, reviews: [...(productData?.reviews || []), newComment] };
        setProductData(updatedProduct);
        setComments(updatedProduct.reviews);
        setCommentText('');
        setUserName('');
        setRating(0);
      } catch (error) {
        console.error('Error submitting comment:', error);
      }
    }


  };

  const generateStars = (rating: number) => {
    return (
      <span className="rating-stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className={star <= rating ? "star-filled" : "star-empty"}>
            ★
          </span>
        ))}
      </span>
    );
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  if (!productData) {
    return <div>Loading...</div>;
  }

  
  return (
    <div>
      <Navbar />
      <Breadcrumb
        paths={[
          { name: 'Home', path: '/home' },
          { name: 'Menu', path: '/menu' },
          { name: productData.productName, path: '#' }
        ]}
      />
      <div style={{ display: "flex", justifyContent: "center" }}>

        <div>
          <div className="product-detail">

            <div className="product-image">
              <img src={productData.image} alt={productData.productName} />
              <p className="product-description"><h3>Description</h3> {productData.description}</p>
            </div>

            <div className="product-info">
              <h2>{productData.productName}</h2>
              <p className="product-price">Price: {productData.productPrice}$</p>
              <div className="product-sale">
                <h4>Hot Sale: </h4>
                <li>
                  <i className="fa fa-truck" style={{ marginRight: '8px', color: '#4CAF50' }}></i>
                  Shipping promotion with orders over 500$
                </li>
                <li>
                  <i className="fa fa-gift" style={{ marginRight: '8px', color: '#FFA500' }}></i>
                  GiffCard up to 100$
                </li>
                <li>
                  <i className="fa fa-ticket" style={{ marginRight: '8px', color: '#FF5722' }}></i>
                  50$ voucher discount for bill from $350
                </li>
              </div>


              <div className="quantity-container">
                <label htmlFor="quantity">Quantity:</label>
                <div className="quantity-controls">
                  <button onClick={handleDecreaseQuantity} className="quantity-btn">-</button>
                  <input type="text" id="quantity" value={quantity} readOnly />
                  <button onClick={handleIncreaseQuantity} className="quantity-btn">+</button>
                </div>
              </div>

              <button className="add-to-cart" onClick={handleAddToCart}>
                <i className="fa fa-shopping-cart cart-icon" style={{ marginRight: '8px' }}></i> Add to Cart
              </button>

            </div>

            {isModalOpen && (
              <div className="modal">
                <div className="modal-content">
                  <h3>Product added to cart!</h3>
                  <p>Do you want to view your cart or continue shopping?</p>
                  <div className="modal-buttons">
                    <button onClick={handleViewCart}>View Cart</button>
                    <button onClick={handleCloseModal}>Continue Shopping</button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <h3 className="related-title">Ralated Product</h3>
          <div className="related-products">
            {getPaginatedItems().map((product) => (
              <div className="related-product" key={product.id}>
                <div onClick={() => handleProductClick(product)} className="product-card-relate">
                  <img className="card-image-large-relate" src={product.image} alt={product.productName} />
                  <h4 className="card-title-centered-relate">{product.productName}</h4>
                  <p className="card-price-centered-relate">{product.productPrice}$</p>
                </div>
              </div>
            ))}
          </div>



          <div className="product-all">
            <div className="product-comments-container">
              <div className="comment-form">
                <h4>Leave a Review</h4>
                {/* Phần đánh giá sao */}
                <div className="rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      onClick={() => setRating(star)}
                      className={rating >= star ? "star-filled" : "star-empty"}
                    >
                      ★
                    </span>
                  ))}
                </div>

                {/* Phần nhập bình luận */}
                <textarea
                  placeholder="Your comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />

                {/* Phần nhập tên và nút gửi */}
                <div className="name-and-button">
                  <input
                    type="text"
                    placeholder="Your name"
                    value={userName || currentAccount?.fullName || ""}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                  <button onClick={handleAddComment}>Submit Review</button>
                </div>
              </div>

              {/* Phần hiển thị các bình luận đã có */}
              <div className="product-comments">
                <h3>Reviews & Comments</h3>
                {comments.length === 0 ? (
                  <p>No reviews yet. Be the first to comment!</p>
                ) : (
                  <ul>
                    {currentComments.map((review, index) => (
                      <li key={index}>
                        <p><strong>{review.userName}</strong> - <em>{new Date(review.date).toISOString().split('T')[0]}</em></p>
                        <div className="rating-container">
                          <i>Rating:</i> {generateStars(review.rating)}
                        </div>
                        <p>{review.comment}</p>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Phần phân trang */}
                <div className="pagination-controls">
                  <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
                  <span>{currentPage} / {totalPages}</span>
                  <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <Footer />
      <GoToTopButton /> {/* Nút Go to Top */}
    </div>
  );

};

export default ProductDetail;
