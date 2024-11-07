import './Colaborator.css'

const ColaboratorData = (props: {location:string; image: string; heading: string; text: string }) => {
  return (
    <div className='c-card'>
      <a href={props.location} target='_blank'>
        <div className='c-image'>
          <img src={props.image} alt='' />
        </div>
        <h4>{props.heading}</h4>
        <p>{props.text}</p>
      </a>
    </div>
  )
}

export default ColaboratorData
