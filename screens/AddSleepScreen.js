import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { colors, fontSizes, spacing, fonts } from '../customTheme';

const AddSleepScreen = ({ navigation }) => {
    const [date, setDate] = useState(new Date());
    const [hours, setHours] = useState('');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showDatePicker = () => {
        if (Platform.OS === 'web') {
            setShow(false);
            // Implement web-based date input logic here if needed
        } else {
            setShow(true);
        }
    };

    const saveSleepData = async () => {
        const sleepData = {
            id: Date.now(),
            date: date.toISOString().split('T')[0],
            hours,
        };

        const existingData = await AsyncStorage.getItem('sleepData');
        const newData = existingData ? [...JSON.parse(existingData), sleepData] : [sleepData];

        await AsyncStorage.setItem('sleepData', JSON.stringify(newData));
        navigation.navigate('Home', { refresh: true }); // Pass a parameter to refresh the data
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Date:</Text>
            {Platform.OS === 'web' ? (
                <TextInput
                    style={styles.input}
                    value={date.toISOString().split('T')[0]}
                    onChangeText={(text) => setDate(new Date(text))}
                    placeholder="YYYY-MM-DD"
                />
            ) : (
                <>
                    <Button onPress={showDatePicker} title={date.toDateString()} />
                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode="date"
                            display="default"
                            onChange={onChange}
                        />
                    )}
                </>
            )}
            <Text style={styles.label}>Hours of Sleep:</Text>
            <TextInput
                style={styles.input}
                value={hours}
                onChangeText={setHours}
                placeholder="8"
                keyboardType="numeric"
            />
            <Button title="Save" onPress={saveSleepData} color={colors.primary} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: spacing.medium,
    },
    label: {
        fontSize: fontSizes.medium,
        fontFamily: fonts.bold,
        marginVertical: spacing.small,
    },
    input: {
        width: '80%',
        padding: spacing.small,
        marginVertical: spacing.small,
        borderWidth: 1,
        borderColor: colors.primary,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
});

export default AddSleepScreen;
