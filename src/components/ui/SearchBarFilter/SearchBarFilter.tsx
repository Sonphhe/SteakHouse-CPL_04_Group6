import { useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import './SearchBarFilter.css'
import { LiaTimesCircle } from 'react-icons/lia'

const SearchBarFilter = (props: { title: string }) => {
  const [searchValue, setSearchValue] = useState('')
  return (
    <div className='searchbar-input-wrapper'>
      <CiSearch size={25} id='search-icon' />
      <input type='text' value={searchValue} onChange={(e) => setSearchValue(e.target.value) } placeholder={props.title} />
      {searchValue===''?<></>:<LiaTimesCircle onClick={() => setSearchValue('')} id='del-icon'/>}
    </div>
  )
}

export default SearchBarFilter
