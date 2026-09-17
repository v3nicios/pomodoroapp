import { useNavigation } from "@react-navigation/native"
import { StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native"
import { TNavigationScreenProps } from "../AppRoutes";
import { Theme } from '../shared/themes/Theme';
import CircularProgress, { AnimatedCircularProgress } from 'react-native-circular-progress'
import { MaterialIcons } from '@expo/vector-icons'
import { useState } from "react";

export const Settings = () => {
    const navigation = useNavigation<TNavigationScreenProps>();

    const [focusPeriod, setFocusPeriod] = useState(25);
    const [shortBreakPeriod, setshortBreakPeriod] = useState(7);
    const [longBreakPeriod, setlongBreakPeriod] = useState(15);
    const [notificationPeriod, setnotificationPeriod] = useState(true);

    return (
        <View style={styles.mainContainer} >
            <TouchableOpacity
                style={styles.settingButto}
                onPress={() => navigation.goBack()}    >

                <MaterialIcons
                    size={28}
                    name="close"
                    color={Theme.colors.divider}
                />
            </TouchableOpacity>
            <View style={styles.container} >


                <View style={styles.titlegroup} >
                    <View style={styles.titlecontainer}  >

                        <Text style={styles.titletext}>Configurações</Text>
                    </View>



                </View>
                <View style={styles.fomrContainer}>

                    <View style={styles.formFiledContainer}>
                        <Text style={styles.formFiledLabel} >
                            perido de foco
                        </Text>
                    </View>
                    <View style={styles.formFiledButtons}>

                        <TouchableOpacity
                            style={focusPeriod === 15 ? styles.primeryButton : styles.SecundaryButton}
                            onPress={() => setFocusPeriod(15)} >
                            <Text style={styles.primeryButtonText}>
                                15 min
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={focusPeriod === 25 ? styles.primeryButton : styles.SecundaryButton}
                            onPress={() => setFocusPeriod(25)} >
                            <Text style={styles.primeryButtonText}>
                                25 min
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={focusPeriod === 35 ? styles.primeryButton : styles.SecundaryButton}
                            onPress={() => setFocusPeriod(35)} >
                            <Text style={styles.primeryButtonText}>
                                35 min
                            </Text>
                        </TouchableOpacity>


                    </View>

                </View>

                <View style={styles.fomrContainer}>

                    <View style={styles.formFiledContainer}>
                        <Text style={styles.formFiledLabel} >
                            pausa curta                        </Text>
                    </View>
                    <View style={styles.formFiledButtons}>

                        <TouchableOpacity style={shortBreakPeriod === 3 ? styles.primeryButton : styles.SecundaryButton}
                            onPress={() => setshortBreakPeriod(3)}>
                            <Text style={styles.primeryButtonText}>
                                3 min
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={shortBreakPeriod === 5 ? styles.primeryButton : styles.SecundaryButton}
                            onPress={() => setshortBreakPeriod(5)}    >
                            <Text style={styles.primeryButtonText}>
                                5 min
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={shortBreakPeriod === 7 ? styles.primeryButton : styles.SecundaryButton}
                            onPress={() => setshortBreakPeriod(7)}>
                            <Text style={styles.primeryButtonText}>
                                7 min
                            </Text>
                        </TouchableOpacity>


                    </View>

                </View>

                <View style={styles.fomrContainer}>

                    <View style={styles.formFiledContainer}>
                        <Text style={styles.formFiledLabel} >
                            pausa longa                        </Text>
                    </View>
                    <View style={styles.formFiledButtons}>

                        <TouchableOpacity style={longBreakPeriod === 10 ? styles.primeryButton : styles.SecundaryButton}
                            onPress={() => setlongBreakPeriod(10)}>
                            <Text style={styles.primeryButtonText}>
                                10 min
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={longBreakPeriod === 15 ? styles.primeryButton : styles.SecundaryButton}
                            onPress={() => setlongBreakPeriod(15)}    >
                            <Text style={styles.primeryButtonText}>
                                15 min
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={longBreakPeriod === 20 ? styles.primeryButton : styles.SecundaryButton}
                            onPress={() => setlongBreakPeriod(20)}>
                            <Text style={styles.primeryButtonText}>
                                20 min
                            </Text>
                        </TouchableOpacity>


                    </View>

                </View>

                <View style={styles.fomrContainer}>

                    <View style={styles.formFiledContainer}>
                        <Text style={styles.formFiledLabel} >
                            Notificações
                        </Text>
                    </View>
                    <View style={styles.formFiledButtons}>


                        <TouchableOpacity style={notificationPeriod === false ? styles.primeryButton : styles.SecundaryButton}
                            onPress={() => setnotificationPeriod(false)}>
                            <Text style={styles.primeryButtonText}>desativado</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={notificationPeriod === true ? styles.primeryButton : styles.SecundaryButton}
                            onPress={() => setnotificationPeriod(true)}>
                            <Text style={styles.primeryButtonText}>Ativado</Text>
                        </TouchableOpacity>


                    </View>

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
        paddingHorizontal: 16,
        borderRadius: 55,
        borderColor: Theme.colors.divider,

        borderWidth: 2
    },
    primeryButtonText: {
        color: Theme.colors.text,
        fontSize: Theme.fontSize.body,
        fontFamily: Theme.fonts.interRegular

    },
    SecundaryButton: {
        backgroundColor: Theme.colors.divider,
        borderColor: Theme.colors.divider,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 55,
        borderWidth: 2
    },
    SecundaryButtontext: {
        color: Theme.colors.text,
        fontSize: Theme.fontSize.body,
        fontFamily: Theme.fonts.interRegular

    },

    fomrContainer: {
        flexDirection: 'column',
        justifyContent: "center",
        gap: 16,
        width: '80%',
        maxWidth: 300

    },

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
    }, settingButto: {
        alignSelf: 'flex-end'
    },
    formFiledContainer: {
        gap: 8,
        width: '100%'
    },
    formFiledLabel: {
        color: Theme.colors.text,
        fontSize: Theme.fontSize.label,
        fontFamily: Theme.fonts.interRegular
    },
    formFiledButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'


    }
})