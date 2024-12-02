import { CiSearch } from 'react-icons/ci'
import './SearchBarFilter.css'
import { LiaTimesCircle } from 'react-icons/lia'

const SearchBarFilter = (props: { title: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {
  return (
    <div className='searchbar-input-wrapper'>
      <CiSearch size={25} id='search-icon' />
      <input
        type='text'
        value={props.value} // Sử dụng value từ props
        onChange={props.onChange} // Sử dụng onChange từ props
        placeholder={props.title}
      />
      {props.value === '' ? null : (
        <LiaTimesCircle onClick={() => props.onChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>)} id='del-icon'/>
      )}
    </div>
  )
}

export default SearchBarFilter
