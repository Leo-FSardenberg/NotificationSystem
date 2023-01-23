/* eslint-disable prettier/prettier */


import { InMermoryNotificationsRepository } from "../../../test/repositories/in-memory-notifications-repository";
import {GetRecepientNotifications} from './get-recepient-notifications'
import { makeNotification } from "test/factories/notification-factory";


describe('Get recepients notifications',  ()=> {
    it('should be able to count recipient notifications', async () => {
        const notificationsRepository = new InMermoryNotificationsRepository()
        const getRecipientNotifications = new  GetRecepientNotifications(notificationsRepository);
        
        await notificationsRepository.create(makeNotification({recipientId: 'recepient-1'}));
        await notificationsRepository.create(makeNotification({recipientId: 'recepient-1'}));
        await notificationsRepository.create(makeNotification({recipientId: 'recepient-2'}));
     
        const {notifications } = await getRecipientNotifications.execute({
        recepientId: 'recepient-1',
    })
        expect(notifications).toEqual(2);
        expect(notifications).toEqual(expect.arrayContaining([
            expect.objectContaining({recepientId:'recepient-1'}),
            expect.objectContaining({recepientId:'recepient-1'})
        ]))
    });
});