import { useCartContext } from '../../../../../context/CartContext'
import { useSteakHouseContext } from '../../../../../hooks/useSteakHouseContext'
import './ProductInCart.css'
import { FaTimes } from 'react-icons/fa'

const ProductInCart = () => {
  const { currentAccount } = useSteakHouseContext()
  const { cartItems, selectedItems } = useCartContext()

  const cartCheckoutItem: any = cartItems?.cartItem.filter(item => selectedItems.includes(item.id))

  return (
    <div className='productInCart'>
      {!currentAccount?.id ? (
        <p>You need to log in to see your cart.</p>
      ) : (
        <div className='productInCart-container'>
          <div className='cart'>
            <div className='title'>
              <p>Products to checkout ({cartCheckoutItem.length || 0})</p>
            </div>

            {cartItems?.cartItem && cartItems.cartItem.length > 0 ? (
              cartItems.cartItem
                .filter((cart) => selectedItems.includes(cart.id))
                .map((cart) => (
                  <div key={cart.id} className='product'>
                    <div className='left-side'>
                      <div className='image'>
                        <img src={cart.image} alt={cart.productName} />
                      </div>
                      <div>
                        <p>{cart.productName}</p>
                        <div className='quantity'>
                          <FaTimes />
                          <p>{cart.quantity}</p>
                        </div>
                      </div>
                    </div>
                    <div className='price'>
                      <p className='new-price'>{(cart.productPrice * 1000).toLocaleString('vi-VN')}₫</p>
                      <p className='old-price'>{(cart.productOldPrice * 1000).toLocaleString('vi-VN')}₫</p>
                    </div>
                  </div>
                ))
            ) : (
              <p>No items in the cart</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductInCart
