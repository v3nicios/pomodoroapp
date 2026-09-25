import notifee, { AuthorizationStatus } from "@notifee/react-native"
import { Alert } from "react-native";


notifee.onBackgroundEvent( async (event) => {
    console.log('BACKGROUND', event);
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
                ongoing:true,
                timeoutAfter:1000,
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