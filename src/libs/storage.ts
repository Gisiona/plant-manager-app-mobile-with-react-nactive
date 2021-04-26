
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns'
import * as Notifications from 'expo-notifications';

export interface PlantsDataProps {
    id: string;
    name: string;
    about: string;
    water_tips: string;
    photo: string;
    environments: [string];
    frequency: {
        times: number;
        repeat_every: string
    };
    hour: string;
    dateTimeNotification: Date;
}

interface StoragePlantsProps {
    [id: string] : {
        data: PlantsDataProps;
        notificationId: string
    }
}

export async function savePlant(plant: PlantsDataProps) : Promise<void> {
    try {
        const nextTime = new Date(plant.dateTimeNotification);
        const nowTime = new Date();

        const { times, repeat_every } = plant.frequency;

        if(repeat_every == 'week') {
            const interval = Math.trunc( 7 / times );
            nextTime.setDate(nowTime.getDate() + interval);
        } else {
            nextTime.setDate(nextTime.getDate() + 1);
        }

        const seconds = Math.abs(
            Math.ceil((nowTime.getTime() - nextTime.getTime()) / 1000)
        )

        const notificationId = await Notifications.scheduleNotificationAsync({
            content: {
                title: 'Heeey...',
                body: `Está na hora de cuidar da sua planta ${plant.name}.`,
                sound: true,
                priority: Notifications.AndroidNotificationPriority.HIGH,
                data: {
                    plant
                },
            },
            trigger: {
                seconds: seconds < 60 ? 60 : seconds,
                repeats: true
            }
        })

        console.log("***NOTIFICATION ID AGENDADO:***" + notificationId);

        const data = await AsyncStorage.getItem('@planttmanager:plants')
        const oldPlants = data ? (JSON.parse(data)) as StoragePlantsProps : {};

        const newPlant = {
            [plant.id] : {
                data: plant,
                notificationId
            }
        }

        await AsyncStorage.setItem('@planttmanager:plants', JSON.stringify({
            ...newPlant,
            ...oldPlants
        }));
    
    } catch (error) {
        throw new Error(error);
    }
}


export async function loadPlants() : Promise<PlantsDataProps[]> {
    try {
        const data = await AsyncStorage.getItem('@planttmanager:plants')
        const plants = data ? (JSON.parse(data)) as StoragePlantsProps : {};

        const plantsSorted = Object.keys(plants).map((plant) => {
            return {
                ...plants[plant].data,
                hour: format(new Date(plants[plant].data.dateTimeNotification), 'HH:mm')
            }
        })
        .sort((a,b) => 
            Math.floor(
                new Date(a.dateTimeNotification).getTime() / 1000 - Math.floor(new Date(b.dateTimeNotification).getTime() / 100)
            ));
        
        return plantsSorted;
    } catch (error) {
        throw new Error(error);
    }
}

export async function removePlant(id: string): Promise<void> {
    const data = await AsyncStorage.getItem('@planttmanager:plants')
    const plants = data ? (JSON.parse(data)) as StoragePlantsProps : {};

    // remover as notificações da planta deletada
    await Notifications.cancelScheduledNotificationAsync(plants[id].notificationId);
    
    delete plants[id];

    await AsyncStorage.setItem(
        '@planttmanager:plants',
        JSON.stringify(plants)
    )
}