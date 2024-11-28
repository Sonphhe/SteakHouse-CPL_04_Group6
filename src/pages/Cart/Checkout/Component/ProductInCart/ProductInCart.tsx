import { useCartContext } from '../../../../../context/CartContext'
import { useSteakHouseContext } from '../../../../../hooks/useSteakHouseContext'
import './ProductInCart.css'

const ProductInCart = () => {
  const { currentAccount } = useSteakHouseContext()
  const { cartItems } = useCartContext()

  return (
    <div className='productInCart'>
      {currentAccount?.id === '' ? (
        <p></p>
      ) : (
        <div className='productInCart-container'>
          {cartItems?.cartItem.map((cart, cartIndex) => (
            <div key={cartIndex} className='cart'>
              <div className='title'>
                {/* Dynamic count of items */}
                <p>Products in the cart ({cartItems.cartItem.length || 0})</p>
              </div>

              {/* Check if cart has items */}
              {cartItems.cartItem.length > 0 ? (
                <div key={cart.id} className='product'>
                  <div className='left-side'>
                    <div className='image'>
                      <img src={cart.image} alt={cart.productName} />
                    </div>
                    <p>{cart.productName}</p>
                  </div>
                  <div className='price'>
                    <p className='new-price'>{cart.productPrice}₫</p>
                    <p className='old-price'>{cart.productOldPrice}₫</p>
                  </div>
                </div>
              ) : (
                // Fallback if no items in the cart
                <p>No items in the cart</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductInCart
