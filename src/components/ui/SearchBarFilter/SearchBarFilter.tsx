import { useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import './SearchBarFilter.css'
import { LiaTimesCircle } from 'react-icons/lia'

const SearchBarFilter = (props: {title:string}) => {
  const [searchValue, setSearchValue] = useState('')
  return (
    <div className='userorder'>
      <div className='userorder-search'>
        <CiSearch size={30} className='search-icon' />
        <input
          type='text'
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue}
          placeholder={props.title}
        />
        {searchValue && <LiaTimesCircle onClick={() => setSearchValue('')} size={20} className='search-icon-times' />}
      </div>
    </div>
  )
}

export default SearchBarFilter
