import React, { useState } from 'react'
import { 
    Text, 
    StyleSheet, 
    Image, 
    SafeAreaView,
    Dimensions,
    View
} from 'react-native';

import { useNavigation } from '@react-navigation/core';

import colors from '../../styles/colors'
import fonts from '../../styles/fonts'

import wateringImg from '../assets/watering.png'
import { Button } from '../components/Button'

export function Welcome() {
    const [visible, setVisibleImage] = useState(true);

    const navigation = useNavigation();

    function hendleStart () {
        navigation.navigate('UserIdentification');
    }

    function hendleVisibility () {
        setVisibleImage(false);
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapperView}>            
                <Text style={styles.title}>Gerencie {'\n'} 
                suas plantas de {'\n'} 
                forma fácil</Text>

                <Image 
                    source={wateringImg} 
                    style={styles.imageCentral}
                    resizeMode='contain'
                />
            
                <Text style={styles.subtitle}>Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar você sempre que precisar.</Text>

                <View style={styles.footerButtonView}>
                    <Button title="Continuar" onPress={hendleStart} />
                </View>
                
            </View>
        </SafeAreaView>  
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1          
    },
    wrapperView: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        color: colors.heading,
        marginTop: 38,
        fontFamily: fonts.heading,
        lineHeight: 34
    },
    imageCentral: {
        height: Dimensions.get("window").width * 0.7
    },
    subtitle: {
        textAlign: 'center',
        fontSize: 18,
        paddingHorizontal: 20,
        color: colors.heading,
        fontFamily: fonts.text
    },
    footerButtonView: {
        width: '100%',
        marginTop: 10,
        paddingHorizontal: 20,
        alignContent:'space-around'
    }
    
  })