

import DatePicker from "./DatePicker";
import CityPicker from "./CityPicker"
import { useState } from "react";
import { StyleSheet, View, Alert, Pressable, Text } from "react-native"

import { useNavigation } from '@react-navigation/native';

export default function MainPicker() {

    const navigation= useNavigation ();

    const [fromValue, setFromValue] = useState(null);
    const [toValue, setToValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'İzmir', value: 'izmir' },
        { label: 'İstanbul', value: 'istanbul' },
       
    ]);

    const [open, setOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    const handleShowRoutes = () => {
        if (fromValue === toValue ||
            fromValue === null ||
            toValue === null ||
            selectedDate === null) {
            Alert.alert('Hatali seçim yaptiniz, Lütfen Tüm Bilgileri Doldurunuz');
        } else {
            
                navigation.navigate("Sefer Saatleri", 
                {fromValue, toValue, selectedDate: selectedDate.getTime()}
                );
            
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.pickerContainer}>

                <CityPicker style={{ marginBottom: 120 }}
                    label="Nereden"
                    value={fromValue}
                    items={items}
                    setValue={(value) => {
                        setFromValue(value);
                        setOpen(false);
                    }}
                    setItems={setItems}

                />


                <CityPicker
                    label="Nereye"
                    value={toValue}
                    items={items}
                    setValue={(value) => {
                        setToValue(value);
                        setOpen(false);
                    }}
                    setItems={setItems}

                />

            </View>

            <DatePicker
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}

            />

            <Pressable
                style={({ pressed }) => [
                    styles.searchButton,
                    {
                        backgroundColor: pressed ? '#1565C0' : '#2196f3'
                    }
                ]}
                android_ripple={{
                    color: 'rgba(0, 0, 0, 0.1)',
                    borderless: false
                }}
                onPress={handleShowRoutes}
            >
                <Text style={styles.searchButtonText}>Seferleri Gör</Text>
            </Pressable>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    pickerContainer: {

        height: 50,
        width: "100%",

    },
    searchButton: {
        backgroundColor: '#2196f3',
        paddingVertical: 24,
        paddingHorizontal: 24,
        borderRadius: 8,
        marginTop: 10

    },
    searchButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
