import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SleepEntry from '../components/SleepEntry';
import { colors, fontSizes, spacing, fonts } from '../customTheme';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

const HomeScreen = ({ navigation, route }) => {
    const [sleepData, setSleepData] = useState([]);

    const fetchSleepData = async () => {
        const data = await AsyncStorage.getItem('sleepData');
        if (data) {
            setSleepData(JSON.parse(data));
        }
    };

    useEffect(() => {
        fetchSleepData();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            if (route.params?.refresh) {
                fetchSleepData();
            }
        }, [route.params])
    );

    const deleteSleepEntry = async (id) => {
        const updatedData = sleepData.filter((item) => item.id !== id);
        setSleepData(updatedData);
        await AsyncStorage.setItem('sleepData', JSON.stringify(updatedData));
    };

    const renderItem = ({ item }) => (
        <SleepEntry {...item} onDelete={() => deleteSleepEntry(item.id)} />
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={sleepData}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
            />
            <Ionicons.Button
                name="add"
                backgroundColor={colors.secondary}
                onPress={() => navigation.navigate('Add Sleep')}
                style={styles.addButton}
            >
                <Text style={styles.addButtonText}>Add Sleep</Text>
            </Ionicons.Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        padding: spacing.medium,
    },
    list: {
        flexGrow: 1,
    },
    addButton: {
        marginTop: spacing.large,
    },
    addButtonText: {
        fontSize: fontSizes.medium,
        fontFamily: fonts.bold,
        color: '#fff',
    },
});

export default HomeScreen;
