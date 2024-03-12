import React from 'react';
import { View, Button } from 'react-native';

export default function Screen() {
    async function onDisplayNotification() {
        try {
            // Create a channel (required for Android)
            const channelId = await notifee.createChannel({
                id: 'default',
                name: 'Default Channel',
            })

            // Display a notification
            await notifee.displayNotification({
                title: 'Notification Title',
                body: 'Main body content of the notification',
                android: {
                    channelId,
                    smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
                    // pressAction is needed if you want the notification to open the app when pressed
                    pressAction: {
                        id: 'default',
                    },
                },
            });
        } catch (error) {
            console.error('Failed to display notification', error);
        }
    }

    return (
        <View style={{flex : 1 , justifyContent : 'center'}}>
            <Button title="Display Notification" onPress={() => onDisplayNotification()} />
        </View>
    );
}