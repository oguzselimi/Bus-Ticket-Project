
import React, { useState } from 'react';
import { View, Button, Platform, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';


const DatePicker = ({ selectedDate, setSelectedDate }) => {
  
  const [showPicker, setShowPicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(false);
    setSelectedDate(currentDate);
  };

  const showDateTimePicker = () => {
    setShowPicker(true);
  };

  return (
    <View style={{ backgroundColor: "yellow", marginTop: 300 }}>
      <Button title="Tarih Seçin" onPress={showDateTimePicker} />
      {showPicker && (
        <DateTimePicker
        value={selectedDate || new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
          locale='tr'
          minimumDate={new Date()}
        />
      )}

      <Text style={{ height: 40, fontSize: 20 }}>
      {selectedDate ? `Sefer Tarihi: ${selectedDate.toLocaleDateString()}` : 'Lütfen Bir Tarih Seçiniz'}
      </Text>



    </View>
  );
};

export default DatePicker;
