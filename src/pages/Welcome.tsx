import React, {useState } from 'react'
import { Text, StyleSheet, Image, SafeAreaView } from 'react-native'
import colors from '../../styles/colors'


import wateringImg from '../assets/watering.png'
import { Button } from '../components/Button'

export function Welcome() {
    const [visible, setVisibleImage] = useState(true);

    function hendleVisibility () {
        setVisibleImage(false);
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Gerencie {'\n'} 
            suas plantas  {'\n'} 
            de forma fácil</Text>

        {
            visible && 
            <Image source={wateringImg} style={styles.imageCentral}/>
        }           

            <Text style={styles.subtitle}>Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar você sempre que precisar.</Text>

            <Button title="Continuar" onPress={hendleVisibility}/>
        </SafeAreaView>  
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: 50
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        color: colors.heading,
        marginTop: 38
    },
    imageCentral: {
        width: 292,
        height: 284
    },
    subtitle: {
        textAlign: 'center',
        fontSize: 18,
        paddingHorizontal: 20,
        color: colors.heading
    }
    
  })