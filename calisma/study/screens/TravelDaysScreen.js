import { Text, View, StyleSheet } from "react-native";
import { useRoute } from '@react-navigation/native';
import { useState, useEffect } from "react";
import {TRAVEL_DATA} from "../constants/TravelData"

export default function TravelDaysScreen() {
  const route = useRoute();
  const { fromValue, toValue, selectedDate } = route.params;

  const travelDate = new Date(selectedDate);
  
  const formattedTravelDate = travelDate ? travelDate.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" }) : '';
 
  const [isAvailable, setIsAvailable] = useState(false);

  const travelDataForDate = TRAVEL_DATA.find((data) => {
    const sefer = data.seferler.find((sefer) => sefer.date === formattedTravelDate);
    return sefer !== undefined;
  });
  
  useEffect(() => {
    if (travelDataForDate) {
      setIsAvailable(true);
    }
  }, [travelDataForDate]);

  if (!travelDataForDate) {
    return (
      <View>
        <Text>Seçtiğiniz tarihte sefer bulunmamaktadır.</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>{`Seçtiğiniz tarih: ${formattedTravelDate}`}</Text>
      <Text>{`Kalkış: ${fromValue}`}</Text>
      <Text>{`Varış: ${toValue}`}</Text>
    </View>
  );
}


  