import './FavouriteFood.css'
import beff_wellington1 from '../../../assets/images/beef-wellington-brocolini.webp'
import beff_wellington2 from '../../../assets/images/beef-wellington-steak-dish.avif'
import t_bone1 from '../../../assets/images/T-bone-oven.jpg'
import t_bone2 from '../../../assets/images/tbone3.jpg'
import regular_steak1 from '../../../assets/images/regular-steak1.jpg'
import regular_steak2 from '../../../assets/images/regular3.jpg'
import FavouriteFoodData from './FavouriteFoodData'

const FavouriteFood = () => {
  return (
    <div className='favourite-food'>
      <h1>Popular Meal</h1>
      <p>
        The aroma of sizzling steak filled the air, mingling with the sweet scent of roasted vegetables. As I took my
        first bite of the perfectly cooked meat, a symphony of flavors exploded on my palate.{' '}
      </p>
      <FavouriteFoodData 
        heading = 'Wellington Beef, Chef Micheal'
        text = 'Beef Wellington is a culinary masterpiece that marries the elegance of French cuisine with the hearty flavors of British gastronomy. This iconic dish features a tender fillet of beef, enveloped in a rich, savory duxelles of mushrooms and shallots, and then encased in a delicate layer of flaky puff pastry.'
        imageStr1 = {beff_wellington1}
        imageStr2 = {beff_wellington2}
        nameCSS = 'first-des'
      />
      <FavouriteFoodData 
        heading = 'T-Bone Steak Beef, Chef  Pham'
        text = 'A T-bone steak is a prime cut of beef that offers a unique dining experience. It’s renowned for its distinctive T-shaped bone, which separates a tender filet mignon from a juicy New York strip steak. This dual nature provides a contrast of flavors and textures in each bite.'
        imageStr1 = {t_bone1}
        imageStr2 = {t_bone2}
        nameCSS = 'first-des-reverse'
      />
      <FavouriteFoodData 
        heading = 'Regular Steak, Chef Hai'
        text = 'Steak, a timeless culinary delight, is a cut of beef that has captivated palates for centuries. Its rich, savory flavor and tender texture make it a versatile ingredient in countless dishes.'
        imageStr1 = {regular_steak1}
        imageStr2 = {regular_steak2}
        nameCSS = 'first-des'
      />
    </div>
  )
}

export default FavouriteFood
