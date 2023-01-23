/* eslint-disable prettier/prettier */

import { InMermoryNotificationsRepository } from "../../../test/repositories/in-memory-notifications-repository";
import { NotificationNotFound } from "./errors/notification-not-found";
import { makeNotification } from "test/factories/notification-factory";
import {UnreadlNotification} from "./unread-notification"


describe('unread Notification',  ()=> {
    it('should be able to unread a notification', async () => {
        const notificationsRepository = new InMermoryNotificationsRepository()
        const unreadNotification = new UnreadlNotification(notificationsRepository);
        
      const notification =makeNotification({readAt: new Date()});

      await notificationsRepository.create(notification);
    await unreadNotification.execute({
        notificationId: notification.id,
    })
        expect(notificationsRepository.notifications[0].readAt).toBeNull()
        });
   it('should not be able to unread ton existing notification, asy', 
   async () => {
    const notificationsRepository = new InMermoryNotificationsRepository()
    const unreadNotification = new UnreadlNotification(notificationsRepository);

    expect(() => {
        return unreadNotification.execute({
            notificationId: 'fake-notification-id',
        })
    }).rejects.toThrow(NotificationNotFound)
   })
} )