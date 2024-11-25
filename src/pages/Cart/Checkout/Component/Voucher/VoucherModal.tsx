import './VoucherModal.css';

interface VoucherModalProps {
  isVisible: boolean;
  onClose: () => void;
  onApply: (discount: number) => void;
}

const VoucherModal: React.FC<VoucherModalProps> = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="voucher-modal-overlay">
      <div className="voucher-modal">
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>
        <h2 className="voucher-title">Your Offers</h2>
        <input
          type="text"
          placeholder="Enter voucher code"
          className="voucher-input"
        />
        <img
          src="assets/images/voucherbg.jpg" 
          alt="No Offers"
          className="voucher-image"
        />
        <button className="apply-btn">Apply</button>
        <div className="voucher-description">
          Enter your voucher code to enjoy available offers
        </div>
        
      </div>
    </div>
  );
};

export default VoucherModal;
