import './SearchDropDown.css'
import { MdHistory } from 'react-icons/md'
import { FaTimes } from 'react-icons/fa'
import { useSteakHouseContext } from '../../../../hooks/useSteakHouseContext'
import SearchBox from '../../SearchBox/SearchBox'
import { useNavigate } from 'react-router-dom'

const SearchDropDown = (props: { value: string; action: Function }) => {
  const { products, categories } = useSteakHouseContext()
  const navigate = useNavigate()

  const onSearch = (product: any) => {
    navigate(`/productdetail/${product.id}`, { state: { product } })
  }

  const onCategoryClick = (categoryName: string) => {
    navigate(`/menu?category=${encodeURIComponent(categoryName)}`)
  }

  return (
    <div className='search-dropdown'>
      <div onClick={(e) => e.stopPropagation()} className='search-dropdown-container'>
        <div className='search-keyload'>
          <ul>
            {products.filter((item) => {
              const searchTerm = props.value.toLowerCase()
              const itemName = item.productName.toLowerCase()
              return searchTerm && itemName.startsWith(searchTerm)
            }).length > 0 ? (
              products
                .filter((item) => {
                  const searchTerm = props.value.toLowerCase()
                  const itemName = item.productName.toLowerCase()
                  return searchTerm && itemName.startsWith(searchTerm)
                })
                .map((item) => (
                  <li onClick={() => onSearch(item)} key={item.id}>
                    {item.productName}
                  </li>
                ))
            ) : (
              <p>No product is suitable</p>
            )}
          </ul>
        </div>
        {/* <div className='search-history'>
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
        </div> */}
        {/* <div className='search-category'>
          <h4>Search Categories</h4>
          <ul>
            {categories.map((item) => (
              <li key={item.id} onClick={() => onCategoryClick(item.categoryName)}>
                <SearchBox title={item.categoryName} />
              </li>
            ))}
          </ul>
        </div> */}
      </div>
    </div>
  )
}

export default SearchDropDown
