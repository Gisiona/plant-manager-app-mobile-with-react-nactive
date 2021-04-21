import React from 'react'
import { Text, StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import colors from '../../styles/colors'
import { Feather } from '@expo/vector-icons'

interface ButtonProps extends TouchableOpacityProps {
    title: any
}

export function Button( {title, ... rest } : ButtonProps) {
    return (
        <TouchableOpacity style={styles.button} 
        activeOpacity={0.6}
        {...rest}>
        <Text style={styles.buttonText}>
            { title }
        </Text>
       </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.green,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 28,
        height: 56,
        borderRadius: 10,
        paddingBottom: 10
    },
    buttonText: {
        color: colors.white,
        fontSize:20
    },
    buttonIcon: {
        fontSize: 32,
        color: colors.white
    }
  })