import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { StyleSheet } from 'react-native';


const CityPicker = ({ label, value, items, setValue, setItems, ...props }) => {
  const [open, setOpen] = useState(false);

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      placeholder={label}
      zIndex={5000}
      dropDownContainerStyle={styles.dropDownContainer}   
      labelStyle={styles.label}
      arrowStyle={styles.arrow}
      {...props}
    />
  );
};

export default CityPicker;

const styles = StyleSheet.create({

  dropDownContainer: {
    borderWidth: 5,
    borderColor: '#ccc',
    borderRadius: 3,
   
    zIndex: 5000,
  },
 
  label: {
    fontSize: 16,
    textAlign: 'left',
    color: '#000',
  },
  arrow: {
    color: '#000',
  },
});
