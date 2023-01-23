/* eslint-disable prettier/prettier */


import { InMermoryNotificationsRepository } from "../../../test/repositories/in-memory-notifications-repository";
import {CountRecepientNotification} from './count-recepient-notifications'
import { makeNotification } from "test/factories/notification-factory";


describe('Count recepients notifications',  ()=> {
    it('should be able to count recipient notifications', async () => {
        const notificationsRepository = new InMermoryNotificationsRepository()
        const countRecipientNotifications = new  CountRecepientNotification(notificationsRepository);
        
        await notificationsRepository.create(makeNotification({recipientId: 'recepient-1'}));
        await notificationsRepository.create(makeNotification({recipientId: 'recepient-1'}));
        await notificationsRepository.create(makeNotification({recipientId: 'recepient-2'}));
     
        const {count } = await countRecipientNotifications.execute({
        recepientId: 'recepient-1',
    })
        expect(count).toEqual(2);
        
    });
});