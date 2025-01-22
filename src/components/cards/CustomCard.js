/* eslint-disable react/prop-types */
import React from 'react'
import { CCard, CCardBody, CCardImage, CCardTitle, CCardText, CButton } from '@coreui/react'

const CustomCard = ({ data }) => {
  return (
    // <CCard className="mb-4" style={{ width: '18rem' }}>
    //   <CCardImage orientation="top" src={image} />
    //   <CCardBody>
    //     <CCardTitle>{title}</CCardTitle>
    //     <CCardText>{text}</CCardText>
    //     <CButton color="primary" href={buttonHref}>
    //       {buttonText}
    //     </CButton>
    //   </CCardBody>
    // </CCard>
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {data.map((card, index) => (
        <div className="card" style={{ width: '18rem', margin: '10px' }} key={index}>
          {card.imageUrl && <img src={card.imageUrl} className="card-img-top" alt={card.title} />}
          <div className="card-body">
            <h5 className="card-title">{card.title}</h5>
            <p className="card-text">{card.description}</p>
            <a href={card.buttonLink} className="btn btn-primary">
              {card.buttonText}
            </a>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CustomCard
