import React, { useState, useEffect } from 'react'
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import 'font-awesome/css/font-awesome.min.css';
import { useCartContext } from '../../../context/CartContext'
import './ProductDetail.css'

const ProductDetail: React.FC = () => {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const { addToCart } = useCartContext() // Import addToCart from context
  const [productData, setProductData] = useState<any>(null)
  const [quantity, setQuantity] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const fetchProductData = async () => {
      if (id) {
        try {
          const response = await fetch('/database.json')
          const data = await response.json()
          const foundProduct = data.find((item: any) => item.id === parseInt(id))
          if (foundProduct) {
            setProductData(foundProduct)
          } else {
            console.error('Product not found')
          }
        } catch (error) {
          console.error('Error fetching product:', error)
        }
      }
    }

    if (!location.state || !location.state.product) {
      fetchProductData()
    } else {
      setProductData(location.state.product)
    }
  }, [id, location.state])

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    setQuantity(value > 0 ? value : 1)
  }

  const handleAddToCart = () => {
    if (productData) {
      addToCart({ ...productData, quantity }) // Add product with quantity to cart
      setIsModalOpen(true) // Open modal after adding to cart
    }
  }

  const handleCloseModal = () => setIsModalOpen(false)
  const handleViewCart = () => {
    setIsModalOpen(false)
    navigate('/cart')
  }
  const handleBackToMenu = () => navigate('/menu')

  if (!productData) {
    return <div>Loading...</div>
  }

  return (
    <div className='product-detail'>
      <div className='product-image'>
        <img src={productData.image} alt={productData.productName} />
      </div>
      <div className='product-info'>
        <h2>{productData.productName}</h2>
        <p className='product-price'>Price: ${productData.productPrice}</p>

        <div className='quantity-container'>
          <label htmlFor='quantity'>Quantity:</label>
          <input type='number' id='quantity' value={quantity} onChange={handleQuantityChange} min='1' />
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
      </div>

      {/* Modal */}
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
  )
}

export default ProductDetail
