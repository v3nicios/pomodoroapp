import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { StyleSheet, Text, Touchable, TouchableOpacity, View, AppState } from "react-native"
import { TNavigationScreenProps } from "../AppRoutes";
import { Theme } from '../shared/themes/Theme';
import CircularProgress, { AnimatedCircularProgress } from 'react-native-circular-progress'
import { MaterialIcons } from '@expo/vector-icons'
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updateStateByElapsedTime } from "../shared/helpers/UpdateStatebElapsedTime";
import { NotificationService } from "../shared/services/NotificationService";
 
export const Home = () => {
    const navigation = useNavigation<TNavigationScreenProps>();

    const [appRunnigState, setappRunnigState] = useState(AppState.currentState);


    useEffect(() => {
        const listenr = AppState.addEventListener('change', setappRunnigState);
        return () => listenr.remove();
    },[]
)
 

    const [isRunning, setisRunning] = useState(false);
    const [isPaused, setisPaused] = useState(false);
    const [currentStatus, setcurrentStatus] = useState<'focus' | 'short-breack' | 'long-breake'>('focus');
    const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
    const [currentShortBreackcicleTime, setcurrentShortBreackcicleTime] = useState(5 * 60);
    const [currentLongBreakecicleTime, setcurrentLongBreackcicleTime] = useState(15 * 60);
    const [currentFocuscicleTime, setFocuesCicleTime] = useState(25 * 60);
    const [countercicleTime, setcountercicleTime] = useState(25 * 60);


    useFocusEffect(useCallback(() => {
        Promise.all([
            AsyncStorage.getItem('SHORT_BREAK'),
            AsyncStorage.getItem('LONG_BREAK'),
            AsyncStorage.getItem('FOCUS_PERIOD')
        ]).then(([short, long, focus]) => {
            setcurrentShortBreackcicleTime(JSON.parse(short || '5') * 60)
            setcurrentLongBreackcicleTime(JSON.parse(long || '15') * 60)
            setFocuesCicleTime(JSON.parse(focus || '25') * 60)

        })
    }, [])
    )



    useEffect(() => {
        if (!isRunning || isPaused) return;

        const ref = setInterval(() => {
            setcountercicleTime(old => old <= 0 ? old : old - 1)
        }, 1000);
        return () => clearInterval(ref)
    }, [isRunning, isPaused])

    useEffect(() => {
        switch (currentStatus) {

            case "focus": {

                if (countercicleTime > 0) break;

                if (step < 4) {
                    setcurrentStatus('short-breack');
                    setStep(old => (old + 1) as 1);
                    setcountercicleTime(currentShortBreackcicleTime)
                } else {
                    setcurrentStatus('long-breake');
                    setStep(1);
                    setcountercicleTime(currentLongBreakecicleTime)
                } break
            };
            case "short-breack":
            case "long-breake":
                {
                    if (countercicleTime <= 0) {
                        setcurrentStatus('focus');
                        setcountercicleTime(currentFocuscicleTime)
                    }

                    break;
                }
            default: break;
        }




    }, [countercicleTime, currentStatus, step, currentShortBreackcicleTime, currentFocuscicleTime, currentLongBreakecicleTime, isPaused,
        isRunning]
    )

    const handleStart = async () => {
        setisRunning(true);

        AsyncStorage.setItem('APP_STATE', JSON.stringify({
            time: Date.now(),
            isPaused,
            isRunning: true,
            currentStatus,
            step,
            countercicleTime,
            currentFocuscicleTime,
            currentShortBreackcicleTime,
            currentLongBreakecicleTime
        }))

        

        


    }
    const handlePause = () => {
        setisPaused(true);

        AsyncStorage.setItem('APP_STATE', JSON.stringify({
            time: Date.now(),
            isPaused: true,
            isRunning,
            currentStatus,
            step,
            countercicleTime,
            currentFocuscicleTime,
            currentShortBreackcicleTime,
            currentLongBreakecicleTime
        }))
    }
    const handleStop = () => {
        setisPaused(false);
        setisRunning(false);
        setcurrentStatus('focus');
        setStep(1);
        setcountercicleTime(currentFocuscicleTime);
        AsyncStorage.setItem('APP_STATE', JSON.stringify({
            time: Date.now(),
            isPaused: false,
            isRunning: false,
            currentStatus:'focus',
            step: 1,
            countercicleTime:currentFocuscicleTime ,
            currentFocuscicleTime,
            currentShortBreackcicleTime,
            currentLongBreakecicleTime
        }))
    }
    const handleContinuar = () => {
        setisPaused(false);
        AsyncStorage.setItem('APP_STATE', JSON.stringify({
            time: Date.now(),
            isPaused: false,
            isRunning,
            currentStatus,
            step,
            countercicleTime,
            currentFocuscicleTime,
            currentShortBreackcicleTime,
            currentLongBreakecicleTime
        }))
    }
    const isShouldUpdate = useRef(true);
    useEffect(() => {
        if (isShouldUpdate.current){
            isShouldUpdate.current = false;

            AsyncStorage.getItem('APP_STATE')
            .then(value => {
                const appState = JSON.parse(value || 'null');
                if (!appState) return;

                const updatedAppState = updateStateByElapsedTime(appState)
                setisPaused(updatedAppState.isPaused);
                setisRunning(updatedAppState.isRunning);
                setStep(updatedAppState.step);
                setcurrentStatus(updatedAppState.currentStatus);
                setcountercicleTime(updatedAppState.countercicleTime);
            })
        if (appRunnigState === 'background'){
            isShouldUpdate.current = true;
        }


        }
    
    },[appRunnigState])

    useEffect(()=>{
        NotificationService.requestPermission();

        if (appRunnigState !== 'active' && isRunning && !isPaused){
            NotificationService.activateNottification();
        }else{
            NotificationService.desactivateNottification();
        }


    }, [appRunnigState, isRunning, isPaused])



    const timeProgress = useMemo(() => {

        switch (currentStatus) {
            case 'focus': return 100 - (countercicleTime / currentFocuscicleTime * 100)
            case 'short-breack': return 100 - (countercicleTime / currentShortBreackcicleTime * 100)
            case 'long-breake': return 100 - (countercicleTime / currentLongBreakecicleTime * 100)
            default: return 0;
        }

    }, [
        currentStatus, countercicleTime,
        currentLongBreakecicleTime,
        currentShortBreackcicleTime, currentFocuscicleTime]);

    return (
        <View style={styles.mainContainer} >
            <TouchableOpacity
            disabled={isRunning}

                style={{...styles.settingButto, opacity: isRunning ? 0 : 1}}
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

                        <Text style={styles.titletext}  >Pomodoro</Text>
                    </View>

                    <View style={styles.statecontainer}  >
                        {!isRunning && !isPaused &&
                            (<Text style={styles.statetext}
                            > Vamos nos Concentrar</Text>)}

                        {isRunning && (
                            <>
                                {!isPaused && currentStatus === 'focus' &&
                                    (<Text style={styles.statetext}> Hora de se Concentrar</Text>)}

                                {isPaused &&
                                    (<Text style={styles.statetext}> Cronômetro em pausa </Text>)}
                            </>
                        )}

                        {!isPaused && currentStatus === 'short-breack' &&
                            (<Text style={styles.statetext}> Pausa curta</Text>
                            )}

                        {!isPaused && currentStatus === 'long-breake' &&
                            (<Text style={styles.statetext}> Pausa longa</Text>)}


                    </View>
                    <View style={styles.progressContainer}>
                        <AnimatedCircularProgress
                            size={160}
                            width={7}
                            fill={timeProgress}
                            rotation={0}
                            tintColor={Theme.colors.divider}
                            backgroundColor={Theme.colors.primary}
                            children={() => (
                                <Text style={styles.progressText} >
                                    {Math.floor(countercicleTime / 60)}:{(countercicleTime % 60).toString().padStart(2, '0')}
                                </Text>
                            )}
                        />
                    </View>
                </View>
                {!isRunning && (
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.primeryButton}
                            onPress={handleStart}
                        >
                            <Text style={styles.primeryButtonText}>
                                Iniciar
                            </Text>
                        </TouchableOpacity>

                    </View>
                )}

                {isRunning && !isPaused && (
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.primeryButton}>
                            <Text style={styles.primeryButtonText}
                                onPress={handlePause}>
                                Pausar </Text>
                        </TouchableOpacity>


                        <TouchableOpacity
                            style={styles.SecundaryButton}
                            onPress={handleStop}
                        >
                            <Text style={styles.SecundaryButtontext}>
                                Parar</Text>
                        </TouchableOpacity>

                    </View>
                )}

                {isRunning && isPaused &&
                    (
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.primeryButton}
                                onPress={handleContinuar}
                            >
                                <Text style={styles.primeryButtonText}>
                                    Continuar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.SecundaryButton}
                                onPress={() => setisRunning(false)}
                            >
                                <Text style={styles.SecundaryButtontext}>
                                    Parar</Text>
                            </TouchableOpacity>


                        </View>)}

                <View style={styles.pomodorosContainer}>

                    <Text style={styles.pomodorosText} >
                        Pomodoros:

                    </Text>

                    < View style={step >= 2 || currentStatus === 'long-breake' ? styles.pomodorosIndicatorComplete : styles.pomodorosIndicator} />
                    < View style={step >= 3 || currentStatus === 'long-breake' ? styles.pomodorosIndicatorComplete : styles.pomodorosIndicator} />
                    < View style={step >= 4 || currentStatus === 'long-breake' ? styles.pomodorosIndicatorComplete : styles.pomodorosIndicator} />
                    < View style={currentStatus === 'long-breake' ? styles.pomodorosIndicatorComplete : styles.pomodorosIndicator} />


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
        fontSize: Theme.fontSize.title2,
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
    settingButto: {
        alignSelf: 'flex-end'
    }

})