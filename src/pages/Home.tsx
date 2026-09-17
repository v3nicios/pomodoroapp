import { useNavigation } from "@react-navigation/native"
import { StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native"
import { TNavigationScreenProps } from "../AppRoutes";
import { Theme } from '../shared/themes/Theme';
import CircularProgress, { AnimatedCircularProgress } from 'react-native-circular-progress'

export const Home = () => {
    const navigation = useNavigation<TNavigationScreenProps>();

    return (
        <View style={styles.container} >

            <View style={styles.titlegroup} >
                <View style={styles.titlecontainer}  >

                    <Text style={styles.titletext}  >Pomodoro</Text>
                </View>

                <View style={styles.statecontainer}  >
                    <Text style={styles.statetext}> Hora de se Concentrar</Text>
                    <Text style={styles.statetext}> Pausa curta</Text>

                    <Text style={styles.statetext}> Pausa longa</Text>

                    <Text style={styles.statetext}> Cronômetro em pausa </Text>

                </View>


                <View style={styles.progressContainer}>


                    <AnimatedCircularProgress
                        size={160}
                        width={7}
                        fill={90}
                        rotation={0}
                        tintColor={Theme.colors.divider}
                        backgroundColor={Theme.colors.primary}
                        children={() => (
                            <Text style={styles.progressText} >
                                12:45
                            </Text>
                        )}
                    />
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
    )
}

const styles = StyleSheet.create({
    container: {
        gap: 36,
        justifyContent: 'center'
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
    }

})