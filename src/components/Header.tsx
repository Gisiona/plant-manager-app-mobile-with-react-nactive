import React from 'react'
import { 
    Text, 
    StyleSheet, 
    Image,
    View
} from 'react-native';

import { getStatusBarHeight } from 'react-native-iphone-x-helper'

import colors from '../../styles/colors'
import fonts from '../../styles/fonts';
import myUserFoto from '../assets/gisiona-foto-github.png'

export function Header() {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.greeting}>Olá,</Text>
                <Text style={styles.userName}>Gisiona Costa</Text>
            </View>

            <Image source={myUserFoto} style={styles.myimage}/>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {        
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 0,        
        marginTop: getStatusBarHeight(),
        padding: 10
    },
    greeting: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.heading
    },
    userName: {
        fontSize: 32,
        fontFamily: fonts.text,
        color: colors.heading,
        lineHeight: 40
    },
    myimage: {
        width: 70,
        height: 70,
        borderRadius: 40
    }

  })