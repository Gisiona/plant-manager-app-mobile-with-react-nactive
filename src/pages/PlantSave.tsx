import React, { useState } from 'react';

import { 
    Text, 
    StyleSheet, 
    Image,
    View,
    Platform,
    Alert
} from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { SvgFromUri } from 'react-native-svg';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import waterDrop from '../assets/waterdrop.png';
import { Button } from '../components/Button';
import { useRoute } from '@react-navigation/core';

import DateTimePicker, {Event} from '@react-native-community/datetimepicker'
import { isBefore } from 'date-fns'
import { PlantsDataProps, savePlant } from '../libs/storage';
import { useNavigation } from '@react-navigation/core';
import { ScrollView } from 'react-native-gesture-handler';

interface ParamsProps {
    plant: PlantsDataProps;
}

export function PlantSave() {
    const navigation = useNavigation();
    const [selectedDatePicker, setSelectedDatePicker] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(Platform.OS == 'ios');

    const route = useRoute();
    const { plant } = route.params as ParamsProps;


    function handleChangeTime(event: Event, dateTime: Date | undefined) {
        if(Platform.OS == 'android') {
            setShowDatePicker(oldState => !oldState)
        }

        if(dateTime && isBefore(dateTime, new Date())) {
            setSelectedDatePicker(new Date());
            return Alert.alert("Escolha uma hora maior que agora!")
        }

        if(dateTime) {
            setSelectedDatePicker(dateTime);
        }
    }

    async function handleSave() {
        try {
            await savePlant({
                ...plant,
                dateTimeNotification: selectedDatePicker
            });

            // Alert.alert("Dados salvo com sucesso!")

            navigation.navigate("Confirmation", {
                title: 'Tudo certo',
                subTitle: 'Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com bastante amor.',
                buttonTitle: 'Muito obrigado :D',
                nextScreem: 'MyPlants'
            });

        } catch (error) {
            Alert.alert("Não foi possível salvar.")
        }        
    }



    return (
        <ScrollView
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.container}
        >
            <View style={styles.container}>
                <View style={styles.plantInfo}>
                    <SvgFromUri
                        uri={plant.photo}
                        width={150}
                        height={150}
                    />

                    <Text style={styles.plantName}>
                        {plant.name}
                    </Text>

                    <Text style={styles.plantObout}>
                        {plant.about}
                    </Text>
                </View>

                <View style={styles.controller}>
                    <View style={styles.tipContainer}>
                        <Image source={waterDrop} style={styles.tipImage}/>
                            
                        <Text style={styles.tipText}>
                            {plant.water_tips}
                        </Text>
                    </View>

                    <Text style={styles.alertLabel}>
                        Ecolha o melhor horário para ser lembrado:
                    </Text>   

                    <DateTimePicker
                        value={selectedDatePicker}
                        mode="time"
                        display="spinner"
                        onChange={handleChangeTime}
                    />
                    <Button title="Cadastrar planta" 
                        onPress={handleSave}
                    />

                </View>
            </View>
        </ScrollView>        
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'space-between',
        backgroundColor: colors.shape,

    },
    plantInfo: {
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.shape
    },
    plantName: {
       fontFamily: fonts.text,
       fontSize: 24,
       color: colors.heading,
       marginTop: 5
    },
    plantObout: {
        textAlign: 'center',
        fontFamily: fonts.heading,
        color: colors.heading,
        fontSize: 17,
        marginTop: 5
    },
    controller: {
        backgroundColor: colors.white,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: getBottomSpace() || 20        
    },
    tipContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.blue_light,
        padding: 20, 
        borderRadius: 15,
        position: 'relative',
        bottom: 20,
        marginTop: 10
    },
    tipImage: {
        width: 45,
        height: 45
    },
    tipText: {
        flex: 1,
        marginLeft: 20,
        fontFamily: fonts.heading,
        color: colors.blue,
        fontSize: 17,
        textAlign: 'justify'
    },
    alertLabel: {
        fontFamily: fonts.text,
        color: colors.heading,
        fontSize: 15,
        textAlign: 'center'        
    }
})