import React from 'react'
import { 
    Text, 
    StyleSheet, 
    SafeAreaView,
    View
} from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/core';

import colors from '../../styles/colors'
import fonts from '../../styles/fonts'
import { Entypo } from '@expo/vector-icons'
import { Button } from '../components/Button'


interface ParamsRoute {
    title: string,
    subTitle: string,
    buttonTitle: string,
    nextScreem: string
}

export function Confirmation () {
    const navigation = useNavigation();

    const routes = useRoute();

    const {
        title,
        subTitle,
        buttonTitle,
        nextScreem
    } = routes.params as ParamsRoute;

    function hendleNextPageSelectPlant () {
        navigation.navigate(nextScreem);
    }

    return (
        <SafeAreaView style={styles.container}>
            
            <View style={styles.contentView}>   
                <Entypo name="emoji-happy" style={styles.emoji} />

                <Text style={styles.title}> {title} </Text>
                
                <Text style={styles.subTitle}> {subTitle} </Text>

                <View style={styles.footerButtonView}>
                    <Button title={buttonTitle} onPress={hendleNextPageSelectPlant}/>
                </View>
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    contentView: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30
    },
    emoji: {
        fontSize: 70,
        color: colors.green         
    },
    title: {
        fontSize: 28,
        textAlign: 'center',
        color: colors.heading,        
        fontFamily: fonts.text,
        lineHeight: 38,
        marginTop: 15
    },
    subTitle: {
        fontFamily: fonts.heading,
        textAlign: 'center',
        fontSize: 18,
        paddingHorizontal: 20,
        color: colors.heading,
        marginTop: 10
    },    
    footerButtonView: {
        width: '100%',        
        paddingHorizontal: 50,
        marginTop: 30
    }
  })