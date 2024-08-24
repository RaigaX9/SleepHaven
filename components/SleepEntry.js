import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, fontSizes, spacing, fonts } from '../customTheme';
import { Ionicons } from '@expo/vector-icons';

const SleepEntry = ({ date, hours, onDelete }) => {
    return (
        <View style={styles.container}>
            <View style={styles.info}>
                <Text style={styles.dateText}>Date: {date}</Text>
                <Text style={styles.hoursText}>Hours: {hours}</Text>
            </View>
            <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
                <Ionicons name="trash" size={24} color={colors.primary} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: spacing.medium,
        marginVertical: spacing.small,
        backgroundColor: colors.secondary,
        borderRadius: 5,
    },
    info: {
        flex: 1,
    },
    dateText: {
        fontSize: fontSizes.medium,
        fontFamily: fonts.bold,
        color: '#fff',
    },
    hoursText: {
        fontSize: fontSizes.small,
        fontFamily: fonts.regular,
        color: '#fff',
    },
    deleteButton: {
        marginLeft: spacing.medium,
    },
});

export default SleepEntry;
