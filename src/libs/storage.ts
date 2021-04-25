
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns'
import { da } from 'date-fns/locale';

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
    },
    dateTimeNotification: Date;
}

interface StoragePlantsProps {
    [id: string] : {
        data: PlantsDataProps;
    }
}

export async function savePlant(plant: PlantsDataProps) : Promise<void> {
    try {
        const data = await AsyncStorage.getItem('@planttmanager:plants')
        const oldPlants = data ? (JSON.parse(data)) as StoragePlantsProps : {};

        const newPlant = {
            [plant.id] : {
                data: plant
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