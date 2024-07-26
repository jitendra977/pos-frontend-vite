import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import defaultImage from '../assets/images/Item/image.png';

const ItemCard = ({ name, price, image = 'default-image.png'}) => {
  
  return (
    <Card className="item-card border-0 shadow-lg rounded-lg overflow-hidden">
      <Card.Img variant="top" src={image || defaultImage} alt={name} className="img-fluid" />
      <Card.Body className="d-flex flex-column p-4">
        <div className="mb-3">
          <Card.Title className="h4 font-weight-bold text-dark">{name}</Card.Title>
          <Card.Text className="text-muted">
            Customize the description of the item here.
          </Card.Text>
        </div>
        <div className="d-flex justify-content-between align-items-center mt-auto">
          <div className="text-lg font-weight-bold text-success">
            ${price.toFixed(2)}
          </div>
          <Button
            variant="success"
            className="rounded-circle p-3 d-flex align-items-center justify-content-center"
            title="Add to Cart"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

ItemCard.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string,
};

ItemCard.defaultProps = {
  image: defaultImage,
};

export default ItemCard;
