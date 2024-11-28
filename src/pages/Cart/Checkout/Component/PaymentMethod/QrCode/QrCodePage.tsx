import React, { useState } from 'react';
import './QrCodePage.css';
import Navbar from '../../../../../../components/ui/Navbar/Navbar';

const QrCodePage: React.FC = () => {
  const [isTermsChecked, setIsTermsChecked] = useState<boolean>(false);

  const handleTermsChange = () => {
    setIsTermsChecked(!isTermsChecked);
  };

  const handleConfirm = () => {
    if (!isTermsChecked) {
      swal('Warning', 'Please agree to the terms and conditions.', 'warning');
    } else {
      swal('Success!', 'Payment confirmed!', 'success');
    }
  };

  return (
    
    <div className="qr-code-page">
    <Navbar />
      <h3>Pay via QR Code</h3>
      <div className="qr-container">
        <img
          src="https://qrcode.io.vn/api/generate/mb/678928072003/100000/Order?frame=1&is_mask=1"
          alt="QR Code"
          className="qr-code-img"
        />
        <p>Scan the QR code to pay.</p>
        <div className="additional-info">
          <p>
            If you are unable to scan the QR code, please use the account number shown in the image.
          </p>
          <p>
            Once the payment is completed, you will receive a transaction ID. Please save it to avoid
            any issues.
          </p>
        </div>
      </div>

      <div className="terms">
        <label>
          <input
            type="checkbox"
            checked={isTermsChecked}
            onChange={handleTermsChange}
          />
          I agree to the terms and conditions.
        </label>
      </div>

      <button className="confirm-btn" onClick={handleConfirm}>
        Confirm Payment
      </button>
    </div>
  );
};

export default QrCodePage;
