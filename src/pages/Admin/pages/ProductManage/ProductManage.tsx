import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import './ProductManage.css';

const ProductManage = () => {
    const products = [
        { id: 1, name: "HOKUBEE STEAK", quantity: 10, price: 235.0, description: "Steak Bo Hokubee, phần thịt thăn.", image: "image_url", status: true },
        { id: 2, name: "USA RIB EYE STEAK", quantity: 10, price: 195.0, description: "USA Rib eye steak.", image: "image_url", status: true },
        // Add more products as needed
    ];

    return (
        <div className="admin-dashboard-hungkc">
            <Navbar />
            <div className="dashboard-container-hungkc">
                <Sidebar />
                <main className="dashboard-main-hungkc">
                    <div className="product-manage-hungkc">
                        <div className="product-manage-header-hungkc">
                            <button className="add-product-btn-hungkc">Add Product</button>
                            <input type="text" placeholder="Search" className="search-bar-hungkc" />
                        </div>

                        <table className="product-table-hungkc">
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>Name</th>
                                    <th>Image</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Description</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product, index) => (
                                    <tr key={product.id}>
                                        <td>{index + 1}</td>
                                        <td>{product.name}</td>
                                        <td><img src={product.image} alt={product.name} className="product-image-hungkc" /></td>
                                        <td>{product.quantity}</td>
                                        <td>{product.price}</td>
                                        <td>{product.description}</td>
                                        <td>
                                            {product.status ? <FontAwesomeIcon icon={faCheck} className="status-icon-hungkc" /> : ''}
                                        </td>
                                        <td>
                                            <FontAwesomeIcon icon={faEdit} className="action-icon-hungkc edit-icon-hungkc" />
                                            <FontAwesomeIcon icon={faTrash} className="action-icon-hungkc delete-icon-hungkc" />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ProductManage;
