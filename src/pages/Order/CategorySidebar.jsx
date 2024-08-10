/* eslint-disable react/prop-types */
import React from "react";
import { ListGroup } from "react-bootstrap";


const CategorySidebar = ({ categories, selectedCategory, setSelectedCategory }) => {
  return (
    <ListGroup>
      <ListGroup.Item
        active={selectedCategory === null}
        onClick={() => setSelectedCategory(null)}
        className="category-item"
      >
        All Categories
      </ListGroup.Item>
      {categories.map(category => (
        <ListGroup.Item
          key={category.id}
          active={selectedCategory === category.id}
          onClick={() => setSelectedCategory(category.id)}
          className="category-item"
        >
          {category.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default CategorySidebar;