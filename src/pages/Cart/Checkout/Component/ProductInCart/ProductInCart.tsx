import { useCartContext } from '../../../../../context/CartContext';
import { useSteakHouseContext } from '../../../../../hooks/useSteakHouseContext';
import './ProductInCart.css';

const ProductInCart = () => {
  const { currentAccount } = useSteakHouseContext();
  const { cartItems } = useCartContext();

  return (
    <div className="productInCart">
      {!currentAccount?.id ? (
        <p>You need to log in to see your cart.</p>
      ) : (
        <div className="productInCart-container">
          <div className="cart">
            <div className="title">
              {/* Dynamic count of items */}
              <p>Products in the cart ({cartItems?.cartItem?.length || 0})</p>
            </div>

            {cartItems?.cartItem && cartItems.cartItem.length > 0 ? (
              cartItems.cartItem.map((cart) => (
                <div key={cart.id} className="product">
                  <div className="left-side">
                    <div className="image">
                      <img src={cart.image} alt={cart.productName} />
                    </div>
                    <p>{cart.productName}</p>
                  </div>
                  <div className="price">
                    <p className="new-price">{cart.productPrice.toLocaleString()}₫</p>
                    <p className="old-price">{cart.productOldPrice.toLocaleString()}₫</p>
                  </div>
                </div>
              ))
            ) : (
              // Fallback if no items in the cart
              <p>No items in the cart</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductInCart;
