import React from 'react'
import { 
    Text, 
    StyleSheet,
    View
} from 'react-native';

import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { SvgFromUri } from 'react-native-svg';

import colors from '../../styles/colors'
import fonts from '../../styles/fonts';

interface PlantProps extends RectButtonProps {
    data: {
        name: string,
        photo: string,
        hour: string
    }    
}

export const PlantCardSecundary = ({ data, ... rest } : PlantProps) => {
    return (
        <RectButton style={styles.container} {... rest} >
            <SvgFromUri uri={data.photo } height={70} width={70}/>

            <Text style={styles.title }> 
                { data.name }
            </Text>
            
            <View style={styles.details }>
                <Text style={styles.timeLabel }> 
                    Regar às
                </Text>

                <Text style={styles.time }> 
                    { data.hour }
                </Text>
            </View>
        </RectButton>
    )
} 


const styles = StyleSheet.create({
    container: {    
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.shape,
        marginVertical: 5
    },
    title: {
        flex: 1,
        marginLeft: 10,        
        fontFamily: fonts.heading,
        fontSize: 20,
        color: colors.heading
    },
    details: {
        alignItems: 'flex-end'
    },
    timeLabel: {
        fontSize: 16,
        fontFamily: fonts.heading,
        color: colors.body_light
    },
    time: {
        marginTop: 5,
        fontSize: 16,
        fontFamily: fonts.heading,
        color: colors.body_dark
    }
})