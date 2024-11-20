import './SearchDropDown.css'
import { MdHistory } from 'react-icons/md'
import { FaTimes } from 'react-icons/fa'

const SearchDropDown = () => {
  return (
    <div className='search-dropdown'>
      <div className='search-dropdown-container'>
        <div className='search-banner'></div>
        <div className='search-history'>
          <ul>
            <li>
              <div>
                <i>
                  <MdHistory />
                </i>
                <p>Regular Steak</p>
              </div>
              <i className='times'>
                <FaTimes />
              </i>
            </li>
          </ul>
          <h5 className='delete'>Delete All</h5>
        </div>
        <div className='search-category'></div>
      </div>
    </div>
  )
}

export default SearchDropDown
