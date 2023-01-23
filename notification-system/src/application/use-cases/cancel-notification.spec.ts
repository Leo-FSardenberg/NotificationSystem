/* eslint-disable prettier/prettier */

import { InMermoryNotificationsRepository } from "../../../test/repositories/in-memory-notifications-repository";
import { CancelNotification } from "./cancel-notification";
import { NotificationNotFound } from "./errors/notification-not-found";
import { makeNotification } from "test/factories/notification-factory";


describe('Cancel Notification',  ()=> {
    it('should be able to Cancel a notification', async () => {
        const notificationsRepository = new InMermoryNotificationsRepository()
        const cancelNotification = new CancelNotification(notificationsRepository);
        
      const notification =makeNotification({recipientId: 'recepient-1'});
      await notificationsRepository.create(notification);
    await cancelNotification.execute({
        notificationId: notification.id,
    })
        expect(notificationsRepository.notifications[0].canceledAT).toEqual(
            expect.any(Date),
        );
        });
   it('should not be able to cancel a non existing notification, asy', 
   async () => {
    const notificationsRepository = new InMermoryNotificationsRepository()
    const cancelNotification = new CancelNotification(notificationsRepository);

    expect(() => {
        return cancelNotification.execute({
            notificationId: 'fake-notification-id',
        })
    }).rejects.toThrow(NotificationNotFound)
   })
} )