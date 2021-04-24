import React, { useEffect, useState } from 'react'
import { 
    Text, 
    StyleSheet, 
    View,
    FlatList,
    ActivityIndicator
} from 'react-native';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import { EnviromentButton } from '../components/EnviromentButton';

import { Header } from '../components/Header'
import { PlantCardPrimary } from '../components/PlantCardPrimary';
import { Load } from '../components/Load';

import api from '../services/api';
import { ForeignObject } from 'react-native-svg';

interface EnviromentDataProps {
    key: string,
    title: string
}

interface PlantsDataProps {
    id: string;
    name: string;
    about: string;
    water_tips: string;
    photo: string;
    environments: [string];
    frequency: {
        times: number;
        repeat_every: string
    }
    
}

export function PlantSelect() {

    const [enviroments, setEnviroments] = useState<EnviromentDataProps[]>([]);
    const [plants, setPlants] = useState<PlantsDataProps[]>([]);
    const [filteredPlants, setFilteredPlants] = useState<PlantsDataProps[]>([]);
    const [enviromentSelected, setEnviromentSelected] = useState('all');
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [limitePage, setLimitePage] = useState(6);
    const [loadingMore, setLoadingMore] = useState(false);
    const [loadedAll, setLoadedAll] = useState(false);
    
    
    useEffect( () => {
        async function fetchEnviroment() {
            console.log("Get api plants")
            const { data } = await api.get('plants_environments?_sort=title&_order=asc');

            setEnviroments([
                {
                    key: 'all',
                    title: 'Todos'
                },
                ... data
            ])
            console.log("Retorno data plants_environments: " + data)
        }
        fetchEnviroment();        
    }, [])

    async function fetchPlants() {
        console.log("Get api plants")
        const { data } = await api.get(`plants?_sort=name&_order=asc&_page=${page}&_limit=${limitePage}`);

        if(!data) {
            return setLoading(true);
        }

        if(page > 1) {
            setPlants(oldValue => [...oldValue, ...data]);    
            setFilteredPlants(oldValue => [...oldValue, ...data]);
        } else {
            setPlants(data);
            setFilteredPlants(data);
        }
        
        // remove o carregamento do load
        setLoading(false)
        setLoadingMore(false)
    }


    // busca todas as plantas na api do json-server
    useEffect( () => {
        // executa a function
        fetchPlants();        
    }, [])


    function handleEnviromentSelected(enviroment: string){
        setEnviromentSelected(enviroment);

        // valida se o filto selecionado é todos para evitar que seja chamado a api novamente para carregar as plantas
        if (enviroment == "all") {
            return setFilteredPlants(plants);
        } 

        const filterPlants = plants.filter( plant => plant.environments.includes(enviroment));
        setFilteredPlants(filterPlants);    
    }

    // carregamento da lista de conforme o user rolar a barra de rolagem
    function handleFetchMore(distance: number) {
        if(distance < 1) {
            return;
        }

        setLoadingMore(true);
        setPage(oldValue => oldValue + 1)
        fetchPlants();
    }

    if(loading) {
        return <Load />
    }




    return (
        <View style={styles.container}>
            
            <View style={styles.header}>
                <Header />              

                <Text style={styles.title}> Em qual hambiente </Text>
                <Text style={styles.subtitle}> você quer colocar sua planta? </Text>
            </View>

            <View style={styles.viewlist}>
                <FlatList 
                    data={enviroments}
                    renderItem={( { item }) => (
                        <EnviromentButton 
                            title={item.title} 
                            active={item.key == enviromentSelected}
                            onPress={() => handleEnviromentSelected(item.key)}
                        />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.enviromentList}
                    key="1"
                />
            </View>

            <View style={styles.viewlistCard}>
                <FlatList 
                    data={filteredPlants}
                    renderItem={({ item }) => (
                        <PlantCardPrimary data={item} key={item.id} />
                    )}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    onEndReachedThreshold={0.1}
                    onEndReached={({ distanceFromEnd }) => handleFetchMore(distanceFromEnd)}
                    ListFooterComponent={loadingMore ?  <ActivityIndicator color={colors.green}/> : <></>}
                />
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    header: {
        paddingHorizontal: 20
    },
    title: {
        fontSize: 17,
        color: colors.heading,
        fontFamily: fonts.text,
        lineHeight: 20,
        marginTop: 15
    },
    subtitle: {
        fontSize: 17,
        fontFamily: fonts.heading,
        lineHeight: 25,
        color: colors.heading,        
    },
    viewlist: {
        marginTop: 20,
        marginBottom: 20
    },
    enviromentList: {
        height: 40,
        justifyContent: 'center',
        paddingBottom: 5,
        marginLeft: 20,
        marginRight: 20
    },
    viewlistCard: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'center',
        
    }
   
})