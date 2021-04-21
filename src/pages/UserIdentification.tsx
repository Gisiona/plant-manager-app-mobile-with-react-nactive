import React, { useState } from 'react'
import { 
    Text, 
    StyleSheet, 
    SafeAreaView,
    View,
    TextInput,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Platform,
    Keyboard
} from 'react-native';

import { useNavigation } from '@react-navigation/core';

import colors from '../../styles/colors'
import fonts from '../../styles/fonts'
import { Entypo } from '@expo/vector-icons'; 

import { Button } from '../components/Button'

export function UserIdentification() {
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const [name, setName] = useState<string>();

    const navigation = useNavigation();

    function hendleNextPageConfirmation () {
        navigation.navigate('Confirmation');
    }

    function hendleInputBlur () {
        setIsFocused(false);
        setIsFilled(!!name)
    }

    function hendleInputFocus () {
        setIsFocused(true);
    }

    function hendleInputChange (value: string) {
        setIsFilled(!!value)
        setName(value)
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView style={styles.container} behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.contentView}>      
                        <View style={styles.formView}>
                        
                            <Entypo name="emoji-happy" style={styles.emoji} />                            
                            <Text style={styles.title}>Como podemos {'\n'} chamar você? {'\n'} </Text>

                            <TextInput 
                                style={[
                                    styles.textImput,
                                    (isFocused || isFilled) && { borderColor: colors.green}                                
                                ]} 
                                placeholder="Digite seu nome"
                                onBlur={hendleInputBlur}  
                                onFocus={hendleInputFocus} 
                                onChangeText={hendleInputChange}
                            />                        
                            
                            <View style={styles.footerButtonView}>
                                <Button title="Continuar" onPress={hendleNextPageConfirmation}/>
                            </View>
                            
                        </View>                
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>  
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: colors.shape   
    },
    contentView: {
        flex: 1,
        width: '100%'
    },
    formView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 54
    },
    header: {
        textAlign: 'center'
    },
    emoji: {
        fontSize: 50,
        color: colors.green          
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        color: colors.heading,
        marginTop: 20,
        fontFamily: fonts.heading,
        lineHeight: 32
    },
    textImput: {
        borderBottomWidth: 1,
        borderColor: colors.gray,
        color: colors.heading,
        width: '100%',
        fontSize: 18,
        marginTop: 10,
        padding: 10,
        textAlign: 'center',
        borderRadius: 10,
        margin: 10
    },
    footerButtonView: {
        width: '100%',
        marginTop: 20,
        paddingHorizontal: 20,
        alignContent:'space-around'
    }
  })