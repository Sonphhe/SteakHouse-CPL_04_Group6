import './FavouriteFood.css'

const FavouriteFoodData = (props:{heading: string, text: string, imageStr1: string, imageStr2: string, nameCSS: string}) => {
  return (
    <div>
      <div className={props.nameCSS}>
        <div className='des-text'>
          <h2>{props.heading}</h2>
          <p>{props.text}</p>
        </div>
        <div className='favourite-food-image'>
          <img src={props.imageStr1} alt='' />
          <img src={props.imageStr2} alt='' />
        </div>
      </div>
    </div>
  )
}

export default FavouriteFoodData
