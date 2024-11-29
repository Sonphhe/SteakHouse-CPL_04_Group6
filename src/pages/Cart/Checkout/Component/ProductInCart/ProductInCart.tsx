import { useCartContext } from '../../../../../context/CartContext'
import { useSteakHouseContext } from '../../../../../hooks/useSteakHouseContext'
import './ProductInCart.css'

const ProductInCart = () => {
  const { currentOwnCart, currentAccount } = useSteakHouseContext()
  const { cartItems } = useCartContext()

  console.log(cartItems)
  console.log(currentAccount)

  return (
    <div className='productInCart'>
      {currentAccount?.id === '' ? (
        <div className='productInCart-container'>
          <div className='title'>
            {/* Dynamic count of items */}
            <p>Products in a cart ({cartItems.length || 0})</p>
          </div>
          {/* Check if cart has items */}
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.id} className='product'>
                <div className='left-side'>
                  <div className='image'>
                    <img src={item.image} alt={item.productName} />
                  </div>
                  <p>{item.productName}</p>
                </div>
                <div className='price'>
                  <p className='new-price'>{item.productPrice}₫</p>
                  <p className='old-price'>{item.productPrice}₫</p>
                </div>
              </div>
            ))
          ) : (
            // Fallback if no items in the cart
            <p>No items in the cart</p>
          )}
        </div>
      ) : (
        <div className='productInCart-container'>
          <div className='title'>
            {/* Dynamic count of items */}
            <p>Products in a cart ({currentOwnCart.cartItem?.length || 0})</p>
          </div>
          {/* Check if cart has items */}
          {currentOwnCart.cartItem?.length > 0 ? (
            currentOwnCart.cartItem.map((item) => (
              <div key={item.id} className='product'>
                <div className='left-side'>
                  <div className='image'>
                    <img src={item.image} alt={item.productName} />
                  </div>
                  <p>{item.productName}</p>
                </div>
                <div className='price'>
                  <p className='new-price'>{item.productPrice}₫</p>
                  <p className='old-price'>{item.productOldPrice}₫</p>
                </div>
              </div>
            ))
          ) : (
            // Fallback if no items in the cart
            <p>No items in the cart</p>
          )}
        </div>
      )}
    </div>
  )
}

export default ProductInCart
