import './SearchDropDown.css'
import { MdHistory } from 'react-icons/md'
import { FaTimes } from 'react-icons/fa'
import { useSteakHouseContext } from '../../../../hooks/useSteakHouseContext'
import SearchBox from '../../SearchBox/SearchBox'

const SearchDropDown = (props: { value: string; action: Function }) => {
  const { products, categories } = useSteakHouseContext()

  const onSearch = (searchTerm: string) => {
    console.log('search', searchTerm)
  }

  return (
    <div className='search-dropdown'>
      <div onClick={(e) => e.stopPropagation} className='search-dropdown-container'>
        <div className='search-keyload'>
          <ul>
            {products
              .filter((item) => {
                const searchTerm = props.value.toLowerCase()
                const itemName = item.productName.toLowerCase()
                return searchTerm && itemName.startsWith(searchTerm)
              })
              .map((item) => (
                <li onClick={() => onSearch(item.productName)} key={item.id}>
                  {item.productName}
                </li>
              ))}
          </ul>
        </div>
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
        <div className='search-category'>
          <h4>Search Categories</h4>
          <ul>
            {categories.map((item) => (
              <li key={item.id}>
                <SearchBox title={item.categoryName} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SearchDropDown
