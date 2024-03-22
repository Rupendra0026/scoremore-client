import './CardHeading.css'

const CardHeading = ({heading}) => {
  return (
    <div className="heading-content">
            <div className="heading">
                <h2 style={{textAlign:"center"}}>
                {heading}
                </h2>
            </div>
        </div>
  )
}

export default CardHeading