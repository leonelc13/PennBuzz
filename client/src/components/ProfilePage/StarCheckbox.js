import React from 'react';
import './style.css';

const StarCheckbox = ({ checked, onChange }) => {
  return (
    <label className="star-checkbox">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <svg viewBox="0 0 24 24">
        <path d="M12 1.08l2.16 6.65h7.01l-5.67 4.12 2.16 6.66-5.67-4.12-5.67 4.12 2.16-6.66L2.83 7.73h7.01z" />
      </svg>
    </label>
  );
}

export default StarCheckbox;