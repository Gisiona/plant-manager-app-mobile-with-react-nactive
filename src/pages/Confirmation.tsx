import React from 'react'
import { 
    Text, 
    StyleSheet, 
    SafeAreaView,
    View
} from 'react-native'
import colors from '../../styles/colors'
import fonts from '../../styles/fonts'
import { Entypo } from '@expo/vector-icons'
import { Button } from '../components/Button'


export function Confirmation () {
    return (
        <SafeAreaView style={styles.container}>
            
            <View style={styles.contentView}>   
                <Entypo name="emoji-happy" style={styles.emoji} />

                <Text style={styles.title}>Prontinho...</Text>
                
                <Text style={styles.subTitle}>Agora vamos começar a cuidar das suas plantinhas com muito cuidado. </Text>

                <View style={styles.footerButtonView}>
                    <Button title="Começar" />
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
        fontFamily: fonts.heading,
        lineHeight: 38,
        marginTop: 15
    },
    subTitle: {
        fontFamily: fonts.text,
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