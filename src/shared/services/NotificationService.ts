import notifee, { AuthorizationStatus, EventType } from "@notifee/react-native"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { updateStateByElapsedTime } from "../helpers/UpdateStatebElapsedTime";


notifee.onBackgroundEvent(async (event) => {
    console.log('BACKGROUND', event);

    if (event.type !== EventType.DISMISSED && event.type !== EventType.DELIVERED) return;

    await new Promise((resolve) => setTimeout(() => resolve({}), 1000))

    const appState = await AsyncStorage
        .getItem('APP_STATE')
        .then(value => JSON.parse(value || 'null'));
    if (!appState) return;

    const updatedAppState = updateStateByElapsedTime(appState)

    const getMaxTime = () => {
        switch (updatedAppState.currentStatus) {
            case 'focus': return updatedAppState.currentFocuscicleTime;
            case 'short-breack': return updatedAppState.currentShortBreackcicleTime;
            case 'long-breake': return updatedAppState.currentLongBreakecicleTime;

            default: return updatedAppState.currentFocuscicleTime;
        }
    }

    const getTitle = () => {
        switch (updatedAppState.currentStatus) {
            case 'focus': return 'Hora de se concentrar';
            case 'short-breack': return 'Pausa curta';
            case 'long-breake': return 'Pausa longa';

            default: return 'Iniciando notificações';
        }
    }

    const MaxTime = getMaxTime();

    await notifee.displayNotification({
        id: 'pomodoro_progress',
        title: getTitle(),
        body: `Tempo restante ${Math.floor(updatedAppState.countercicleTime / 60)}: ${(updatedAppState.countercicleTime % 60).toString().padStart(2, '0')}`,

        android: {
            ongoing: true,
            channelId: 'default',
            progress: {
                max: MaxTime,
                current: MaxTime - updatedAppState.countercicleTime
            }
        }
    });

})


const requestPermission = async () => {
    const { authorizationStatus } = await notifee.requestPermission();
    if (authorizationStatus !== AuthorizationStatus.AUTHORIZED) {
        Alert.alert(
            'Permissão negada',
            'A permissão para mostar notificações foi negada',
        );
    }

}

const desactivateNottification = async () => {
    await notifee.cancelAllNotifications();

}

const activateNottification = async () => {
    await notifee.createChannel({
        id: 'default',
        name: 'pomodoro'
    })

    await notifee.displayNotification
        ({
            id: 'pomodoro_progress',
            title: 'Pomodoro',
            body: 'Iniciando notificações',

            android: {
                ongoing: true,
                timeoutAfter: 1000,
                channelId: 'default',
                progress: {
                    max: 1,
                    current: 1,
                    indeterminate: true
                }
            }
        });
}


export const NotificationService = {
    requestPermission,
    desactivateNottification,
    activateNottification
}