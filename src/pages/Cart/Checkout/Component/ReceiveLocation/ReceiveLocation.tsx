import { Dispatch, SetStateAction, useState } from 'react'
import './ReceiveLocation.css'
import { CiShop } from 'react-icons/ci'
import { IoIosArrowForward } from 'react-icons/io'
import { FaChevronDown } from 'react-icons/fa6'
import { CiSearch } from 'react-icons/ci'
import { LiaTimesCircle } from 'react-icons/lia'

const ReceiveLocation = (props: {onDistanceChange: Dispatch<SetStateAction<number>>}) => {
  const [enable, setEnable] = useState(true)

  const communeList = [
    { name: 'Binh Phu', distance: 10 },
    { name: 'Binh Yen', distance: 15 },
    { name: 'Cam Yen', distance: 20 },
    { name: 'Canh Nau', distance: 25 },
    { name: 'Chang Son', distance: 5 },
    { name: 'Dai Dong', distance: 12 },
    { name: 'Ha Bang', distance: 8 },
    { name: 'Huu Bang', distance: 18 },
    { name: 'Kim Quan', distance: 22 },
    { name: 'Lai Thuong', distance: 30 },
    { name: 'Phu Kim', distance: 14 },
    { name: 'Phung Xa', distance: 7 },
    { name: 'Tan Xa', distance: 2 },
    { name: 'Thach Hoa', distance: 0 },
    { name: 'Thach Xa', distance: 6 },
    { name: 'Tien Xuan', distance: 28 },
    { name: 'Yen Binh', distance: 35 },
    { name: 'Yen Trung', distance: 40 },
    { name: 'Can Kiem', distance: 16 },
    { name: 'Lien Quan', distance: 10 }
  ]

  const [openSearchPanel, setOpenSearchPanel] = useState(false)
  const [commune, setCommune] = useState('Your Location...')
  const [searchValue, setSearchValue] = useState('')

  const handleSetCommune = (item: string) => {
    setCommune(item)
    setOpenSearchPanel(false)
  }

  const filteredCommunes = communeList.filter((item) => item.name.toLowerCase().startsWith(searchValue.toLowerCase()))

  return (
    <div className='receive-location'>
      <div className='receive-location-container'>
        <div className='title'>
          <p>Receive meals location</p>
        </div>
        <div className='checkbox-action'>
          <div>
            <input type='radio' name='receiveWay' defaultChecked={enable} onChange={() => setEnable(true)} /> Delivery
          </div>
          <div>
            <input type='radio' name='receiveWay' defaultChecked={!enable} onChange={() => setEnable(false)} /> In-store
            pickup
          </div>
        </div>
        {enable ? (
          <div className='content-1'>
            <div className='current-location'>
              <div onClick={() => setOpenSearchPanel(!openSearchPanel)} className='current-location-content'>
                <span>Ha Noi / Thach That / {commune}</span>
                <FaChevronDown size={12} />
              </div>
              {openSearchPanel && (
                <div className='expand'>
                  <div className='expand-search'>
                    <CiSearch size={30} className='search-icon' />
                    <input
                      type='text'
                      onChange={(e) => setSearchValue(e.target.value)}
                      value={searchValue}
                      placeholder='Choose your ward/commune'
                    />
                    {searchValue && (
                      <LiaTimesCircle onClick={() => setSearchValue('')} size={20} className='search-icon-times' />
                    )}
                  </div>
                  <div className='search-value'>
                    <ul>
                      {filteredCommunes.length > 0 ? (
                        filteredCommunes.map((item, i) => (
                          <li onClick={() => handleSetCommune(item.name)} key={`${item.name}-${i}`}>
                            {item.name}
                          </li>
                        ))
                      ) : (
                        <p>
                          Not found key with value <strong>{searchValue}</strong>
                        </p>
                      )}
                    </ul>
                  </div>
                </div>
              )}
            </div>
            <textarea maxLength={128} rows={4} placeholder='Notes (Your exact location)'></textarea>
          </div>
        ) : (
          <div className='content-2'>
            <CiShop /> <p>Shop location: Fpt University - Thach Hoa - Thach That - Ha Noi</p>
            <textarea maxLength={128} rows={4} placeholder='Notes (Example: Call me when you are done)'></textarea>
          </div>
        )}
      </div>
    </div>
  )
}

export default ReceiveLocation
