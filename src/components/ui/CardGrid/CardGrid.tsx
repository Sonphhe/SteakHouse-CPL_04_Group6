import { useNavigate } from 'react-router-dom';
import './CardGrid.css';

const CardGrid = () => {
  const navigate = useNavigate();

  // Dữ liệu các loại sản phẩm
  const categories = [
    { name: "Steak", image: "/assets/images/steak1.jpg", route: "/menu?category=Steak" },
    { name: "Drinks", image: "/assets/images/drinkcard.jpg", route: "/menu?category=Drinks" },
    { name: "Spaghetti", image: "/assets/images/spaghetticard.jpg", route: "/menu?category=Spaghetti" },
    { name: "Salad", image: "/assets/images/SALAD1.jpeg", route: "/menu?category=Salad" },
  ];

  return (
    <div className="card-row">
      {categories.map((category) => (
        <div
          key={category.name}
          className="card"
          // onClick={() => navigate(`/menu?category=${category.name}`)}
          onClick={() => navigate(category.route)}  // Điều hướng đến Menu tương ứng
          style={{ cursor: "pointer" }}
        >
          <img src={category.image} alt={category.name} className="card-image" />
          <div className="card-title">{category.name}</div> 
        </div>
      ))}
    </div>
  );
};

export default CardGrid;
