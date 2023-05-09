import React, { useState } from 'react';

function ButtonGroup(props) {
  const [selectedButton, setSelectedButton] = useState('Created');

  const handleClick = (button) => {
    setSelectedButton(button);
    props.onChange(button);
  };

  return (
    <div className="button-group">
      <button className={selectedButton === 'Created' ? 'selected' : ''} onClick={() => handleClick('Created')}>
        Created
      </button>
      <button className={selectedButton === 'Recent' ? 'selected' : ''} onClick={() => handleClick('Recent')}>
        Recent
      </button>
      <button className={selectedButton === 'Favorites' ? 'selected' : ''} onClick={() => handleClick('Favorites')}>
        Favorites
      </button>
    </div>
  );
}

export default ButtonGroup;
