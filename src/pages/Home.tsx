import { useNavigation } from "@react-navigation/native"
import { StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native"
import { TNavigationScreenProps } from "../AppRoutes";
import { Theme } from '../shared/themes/Theme';
import CircularProgress, { AnimatedCircularProgress } from 'react-native-circular-progress'

export const Home = () => {
    const navigation = useNavigation<TNavigationScreenProps>();

    return (
        <View>
             <View style={styles.progressContainer}>
                
            <AnimatedCircularProgress
                size={160}
                width={7}
                fill={90}
                rotation={0}
                tintColor={Theme.colors.divider}
                backgroundColor={Theme.colors.primary}
                children={()=> (
                    <Text style={styles.progressText} >
                        12:45
                    </Text>
                )}
                />
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
    progressContainer: {alignItems: 'center'},
    progressText: {color: Theme.colors.text,
        fontSize: Theme.fontSize.body,
        fontFamily: Theme.fonts.interBold
}


})