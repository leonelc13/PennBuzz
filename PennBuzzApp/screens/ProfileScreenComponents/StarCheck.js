import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const StarCheck = ({ checked, onChange }) => {
  return (
    <TouchableOpacity onPress={onChange} style={styles.starCheckbox}>
      <Ionicons
        name={checked ? 'star' : 'star-outline'}
        size={24}
        color={checked ? '#f2b01e' : '#e5e5e5'}
      />
    </TouchableOpacity>
  );
};

const styles = {
  starCheckbox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    marginRight: 10,
  },
};

export default StarCheck;
