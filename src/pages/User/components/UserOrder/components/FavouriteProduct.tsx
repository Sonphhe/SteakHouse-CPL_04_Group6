import React, { useEffect, useState } from 'react';
import './FavouriteProduct.css';
import { useSteakHouseContext } from '../../../../../hooks/useSteakHouseContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
const FavouriteProduct = () => {
  const [favouriteProducts, setFavouriteProducts] = useState<any[]>([]);
  const { currentAccount } = useSteakHouseContext()
  const navigate = useNavigate();
  const userId = currentAccount?.id; // User ID tạm thời
  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const response = await fetch("http://localhost:9999/favourite");
        console.log("Response status:", response.status);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched data:", data);

        // Kiểm tra userId
        const userFavourites = data.find((item: any) => item.userId === userId);
        console.log("User favourites:", userFavourites);

        if (userFavourites) {
          setFavouriteProducts(userFavourites.favoriteItems);
        } else {
          setFavouriteProducts([]);
        }
      } catch (error) {
        console.error("Error fetching favourites:", error);
      }
    };

    fetchFavourites();
  }, []);


  const handleProductClick = (product: any) => {
    navigate(`/productdetail/${product.productName}`, { state: { product } });
  };


  return (
    <div className="favourite-product">
      <h2>Favourite Products</h2>
      {favouriteProducts.length > 0 ? (
        <div className="favourite-list">
          {favouriteProducts.map((product) => (
            <div className="favourite-item" key={product.id}>
              <div onClick={() => handleProductClick(product)}>
                <img src={product.image} alt={product.productName} />
                <h3>{product.productName}</h3>
                <p>Price: ${product.productPrice}</p>
                {/* <p>{product.description}</p> */}
              </div>
            </div>

          ))}
        </div>
      ) : (
        <p>Your wishlist is currently empty.</p>
      )}
    </div>
  );
};

export default FavouriteProduct;
