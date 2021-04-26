import React, { useEffect, useState } from 'react'
import { 
    Text, 
    StyleSheet, 
    View,
    Image,
    Alert
} from 'react-native';

import { useNavigation } from '@react-navigation/core';

import colors from '../../styles/colors'
import fonts from '../../styles/fonts'
import { Entypo } from '@expo/vector-icons'
import { Button } from '../components/Button'
import { Header } from '../components/Header';

import waterDrop from '../assets/waterdrop.png';
import { loadPlants, PlantsDataProps, removePlant } from '../libs/storage';
import { formatDistance } from 'date-fns';
import pt from 'date-fns/esm/locale/pt/index.js';
import { FlatList } from 'react-native-gesture-handler';
import { PlantCardSecundary } from '../components/PlantCardSecundary';
import { Load } from '../components/Load';

export function MyPlants() {
    const navigation = useNavigation();

    const [myPlants, setMyPlants] = useState<PlantsDataProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [nextWatered, setNextWatered] = useState<string>();

    useEffect(() => {
        async function loadDataStorage() {
            const plantsStoraged = await loadPlants();

            const nextTime = formatDistance(
                new Date(plantsStoraged[0].dateTimeNotification).getTime(),
                new Date().getTime(),
                { 
                    locale: pt
                }
            );

            setNextWatered(
                `Não esqueça de regar a ${ plantsStoraged[0].name } à ${nextTime} horas.`
            )

            setMyPlants(plantsStoraged);
            setLoading(false);
        }

        loadDataStorage();
    }, [])

    if(loading) {
        return <Load />
    }

    function handleRemove(plant: PlantsDataProps) {
        Alert.alert('Remover', `Deseja realmente remover a planta ${plant.name} ?`, [
            {
                text: 'Não',
                style: 'cancel'
            },
            {
                text: 'Sim',
                onPress: async () => {
                    try {
                        await removePlant(plant.id);

                        setMyPlants((oldData) => 
                            oldData.filter((item) => item.id != plant.id)
                        );

                    } catch (error) {
                        console.log(error);
                        Alert.alert('Não foi possível remover.');
                    }
                }
            }
        ])
    }

    return (
        <View style={styles.container}>            
            <Header />
            <View style={styles.spotligth}>
                <Image source={waterDrop} style={styles.spotligthImage}/>
                    
                <Text style={styles.spotligthText}>
                    Regue sua Aningapara daqui a 2 horas
                </Text>
            </View>

            <View style={styles.plants}>                    
                <Text style={styles.plantsTitle}>
                    Próximas regadas
                </Text>

                <FlatList 
                    data={myPlants}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                        <PlantCardSecundary 
                            data={item}
                            handleRemove={() => {handleRemove(item)}}
                        />
                    )}
                    showsVerticalScrollIndicator={true}
                    contentContainerStyle={{ flex: 1 }}
                />
            </View>
        </View>
    );    
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent:'space-between',
        paddingHorizontal: 30,
        paddingTop: 20,
        backgroundColor: colors.background,
    },
    spotligth: {
        backgroundColor: colors.blue_light,
        paddingHorizontal: 20,
        borderRadius: 15,
        height: 90,        
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        
    },
    spotligthImage: {
        width: 60,
        height: 60
    },
    spotligthText: {
        flex: 1,
        color: colors.blue,
        paddingHorizontal: 20,
        textAlign: 'justify',
        fontFamily: fonts.heading,
        fontSize: 17,        
    },
    plants: {
        flex: 1,
        width: '100%'
    },
    plantsTitle: {        
        fontSize: 27, 
        fontFamily: fonts.text,
        color: colors.heading,
        marginVertical: 20
    },
   
   
    
})