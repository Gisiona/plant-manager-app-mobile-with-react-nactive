import React from 'react'
import {
    StyleSheet, 
    View
} from 'react-native';

import LottieView from 'lottie-react-native';
import loadLotieAnimationJson from '../assets/load.json';

export function Load() {
    return (
        <View style={styles.container}>
            <LottieView 
                style={styles.animationLotie}
                source={loadLotieAnimationJson}
                autoPlay={true}
                loop={true}
            />

        </View>
    )
}


const styles = StyleSheet.create({
    container: {      
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    animationLotie: {
        backgroundColor: 'transparent',
        width: 200,
        height: 200
    }    

  })