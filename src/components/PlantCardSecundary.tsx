import { Feather } from '@expo/vector-icons';
import React from 'react'
import { 
    Text, 
    StyleSheet,
    View
} from 'react-native';

import { RectButton, RectButtonProps, Swipeable } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { SvgFromUri } from 'react-native-svg';

import colors from '../../styles/colors'
import fonts from '../../styles/fonts';

interface PlantProps extends RectButtonProps {
    data: {
        name: string,
        photo: string,
        hour: string
    };
    handleRemove: () => void;
}

export const PlantCardSecundary = ({ data, handleRemove, ... rest } : PlantProps) => {

    return (
        <Swipeable
            overshootRight={false}
            renderRightActions={() => (
                <Animated.View>
                    <View>
                        <RectButton 
                            style={styles.buttonRemove}
                            onPress={handleRemove}
                        >
                            <Feather name="trash" size={32} color={colors.white} />
                        </RectButton>
                    </View>
                </Animated.View>
            )}
        >
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
        </Swipeable>
    )
} 


const styles = StyleSheet.create({
    buttonRemove: {
        width: '100%',
        height: 88,
        backgroundColor: colors.red,
        marginTop: 7,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        right: 0,
        paddingLeft: 30,
        paddingRight: 20
    },
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