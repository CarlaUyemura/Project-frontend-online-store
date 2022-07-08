import PropTypes from 'prop-types';
import React from 'react';

class CategoryCard extends React.Component {
  render() {
    const { id, name, onRadioChange } = this.props;
    return (
      <div>
        <label
          htmlFor={ id }
          data-testid="category"
        >
          {name}
          <input
            type="radio"
            name="category"
            value={ name }
            id={ id }
            onChange={ onRadioChange }
          />
        </label>
      </div>
    );
  }
}

CategoryCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onRadioChange: PropTypes.func.isRequired,
};

export default CategoryCard;
