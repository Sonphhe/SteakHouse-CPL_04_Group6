import { FunctionCall } from 'firebase/vertexai';
import './SearchBox.css'
import { CiSearch } from "react-icons/ci";

const SearchBox = (props: {title: string}) => {
  return <div className='search-box'>
    <div className="search-box-container">
        <input type="text" onClick={() => console.log(props.title)} value={props.title} disabled />
        <i><CiSearch/></i>
    </div>
  </div>
}

export default SearchBox
