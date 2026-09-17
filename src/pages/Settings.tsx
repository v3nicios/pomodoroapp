import { useNavigation } from "@react-navigation/native"
import { StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native"
import { TNavigationScreenProps } from "../AppRoutes";
import { Theme } from '../shared/themes/Theme';
import CircularProgress, { AnimatedCircularProgress } from 'react-native-circular-progress'
import {MaterialIcons} from '@expo/vector-icons'

export const Settings = () => {
    const navigation = useNavigation<TNavigationScreenProps>();

    return (
        <View style={styles.mainContainer} >
                 <TouchableOpacity
                 style={styles.settingButto}
                 onPress={() => navigation.navigate('Settings')                     
                 }
                 >
            <MaterialIcons
            size={28}
            name="settings"
            color={Theme.colors.divider}
            />
            </TouchableOpacity>
        <View style={styles.container} >
       

            <View style={styles.titlegroup} >
                <View style={styles.titlecontainer}  >

                    <Text style={styles.titletext}  >Configurações</Text>
                </View>

              
                
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.primeryButton}>
                    <Text style={styles.primeryButtonText}>
                        Iniciar
                    </Text>
                </TouchableOpacity>

            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.primeryButton}>
                    <Text style={styles.primeryButtonText}>
                        Pausar</Text>
                </TouchableOpacity>


                <TouchableOpacity style={styles.SecundaryButton}>
                    <Text style={styles.SecundaryButtontext}>
                        Parar</Text>
                </TouchableOpacity>

            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.primeryButton}>
                    <Text style={styles.primeryButtonText}>
                        Continuar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.SecundaryButton}>
                    <Text style={styles.SecundaryButtontext}>
                        Reiniciar</Text>
                </TouchableOpacity>


            </View>

         
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        gap: 36,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16
    },
    titlegroup: {
        gap: 24
    },
    primeryButton: {
        backgroundColor: Theme.colors.primary,
        paddingVertical: 8,
        paddingHorizontal: 24,
        borderRadius: 55,
    },
    primeryButtonText: {
        color: Theme.colors.text,
        fontSize: Theme.fontSize.body,
        fontFamily: Theme.fonts.interRegular

    },
    SecundaryButton: {
        borderColor: Theme.colors.primary,
        paddingVertical: 8,
        paddingHorizontal: 24,
        borderRadius: 55,
        borderWidth: 2
    },
    SecundaryButtontext: {
        color: Theme.colors.text,
        fontSize: Theme.fontSize.body,
        fontFamily: Theme.fonts.interRegular

    },

    buttonContainer: { flexDirection: 'row', justifyContent: "center", gap: 16 },
    progressContainer: { alignItems: 'center' },
    progressText: {
        color: Theme.colors.text,
        fontSize: Theme.fontSize.body,
        fontFamily: Theme.fonts.interBold
    },
    titlecontainer: {
        alignItems: 'center'
    },
    titletext: {
        color: Theme.colors.text,
        fontSize: Theme.fontSize.title,
        fontFamily: Theme.fonts.interBold
    },

    statecontainer: {
        alignItems: 'center'
    },
    statetext: {
        color: Theme.colors.text,
        fontSize: Theme.fontSize.body,
        fontFamily: Theme.fonts.interRegular
    },

    pomodorosContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center'
    },
    pomodorosText: {
        color: Theme.colors.text,
        fontSize: Theme.fontSize.body,
        fontFamily: Theme.fonts.interRegular
    },
    pomodorosIndicator: {
        width: 20,
        height: 20,
        borderRadius: '100%',
        backgroundColor: Theme.colors.divider

    },
    pomodorosIndicatorComplete: {
        width: 20,
        height: 20,
        borderRadius: '100%',
        backgroundColor: Theme.colors.primary

    },
    settingButto:{
        alignSelf: 'flex-end'
    }

})