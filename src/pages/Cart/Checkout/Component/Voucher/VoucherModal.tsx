import React, { useState, useEffect } from 'react'
import './VoucherModal.css'

interface VoucherModalProps {
  isVisible: boolean
  onClose: () => void
  onApply: (discount: number) => void
}

const VoucherModal: React.FC<VoucherModalProps> = ({ isVisible, onClose, onApply }) => {
  const [vouchers, setVouchers] = useState<any[]>([]) // Dữ liệu voucher
  const [selectedDiscount, setSelectedDiscount] = useState<number | null>(null) // Mã giảm giá được chọn

  // Lấy dữ liệu từ file database.json (nằm ngoài thư mục public)
  useEffect(() => {
    fetch('/database.json') // Cập nhật đường dẫn đúng tới tệp JSON của bạn
      .then((response) => response.json())
      .then((data) => setVouchers(data.discountTicket))
      .catch((error) => console.error('Error fetching vouchers:', error))
  }, [])

  if (!isVisible) return null

  const handleApply = () => {
    if (selectedDiscount !== null) {
      onApply(selectedDiscount) // Truyền giá trị giảm giá vào callback
      onClose() // Đóng modal sau khi áp dụng
    }
  }

  return (
    <div className='voucher-modal-overlay'>
      <div className='voucher-modal'>
        <button className='close-btn' onClick={onClose}>
          ✕
        </button>
        <h2 className='voucher-title'>Your Offers</h2>
        <div className='voucher-list'>
          {vouchers.map((voucher) => (
            <div key={voucher.id} className='voucher-item'>
              <input
                type='radio'
                id={`voucher-${voucher.id}`}
                name='voucher'
                value={voucher.discountValue}
                checked={selectedDiscount === voucher.discountValue}
                onChange={() => setSelectedDiscount(voucher.discountValue)}
              />
              <div className='voucher-info'>
                <label htmlFor={`voucher-${voucher.id}`} className='voucher-label'>
                  <span className='voucher-title-text'>{voucher.title}</span>
                  <span className='voucher-discount'> - {voucher.discountValue}% off</span>
                </label>
              </div>
            </div>
          ))}
        </div>

        <button className='apply-btn' onClick={handleApply}>
          Apply
        </button>
        <div className='voucher-description'>Enter your voucher code to enjoy available offers</div>
      </div>
    </div>
  )
}

export default VoucherModal
