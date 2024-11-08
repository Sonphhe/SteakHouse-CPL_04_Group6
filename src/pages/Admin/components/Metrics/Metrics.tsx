
import './Metrics.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingBag, faBoxOpen, faFileInvoice } from '@fortawesome/free-solid-svg-icons';

const Metrics = () => {
    return (
        <div className="metrics-container">
            <div className="row">
                {/* Total Users */}
                <div className="col-md-6">
                    <div className="widget-small primary coloured-icon">
                        <FontAwesomeIcon icon={faUser} className="icon fa-3x" />
                        <div className="info">
                            <h4>All Users</h4>
                            <p><b>6 users</b></p>
                        </div>
                    </div>
                </div>

                {/* Bills Booking */}
                <div className="col-md-6">
                    <div className="widget-small warning coloured-icon">
                        <FontAwesomeIcon icon={faShoppingBag} className="icon fa-3x" />
                        <div className="info">
                            <h4>Bills Booking</h4>
                            <p><b>4 bills</b></p>
                        </div>
                    </div>
                </div>

                {/* Total Products */}
                <div className="col-md-6">
                    <div className="widget-small success coloured-icon">
                        <FontAwesomeIcon icon={faBoxOpen} className="icon fa-3x" />
                        <div className="info">
                            <h4>Total Products</h4>
                            <p><b>30 products</b></p>
                        </div>
                    </div>
                </div>

                {/* Total Orders */}
                <div className="col-md-6">
                    <div className="widget-small danger coloured-icon">
                        <FontAwesomeIcon icon={faFileInvoice} className="icon fa-3x" />
                        <div className="info">
                            <h4>Total Orders</h4>
                            <p><b>72 orders</b></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Metrics;
