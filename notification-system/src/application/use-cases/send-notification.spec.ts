/* eslint-disable prettier/prettier */

import { InMermoryNotificationsRepository } from "../../../test/repositories/in-memory-notifications-repository";

import { SendNotification } from "./send-notification";


describe('Send Notification',  ()=> {
    it('should be able to send a notification', async () => {
        const notificationsRepository = new InMermoryNotificationsRepository()
        const sendNotification = new SendNotification(notificationsRepository);
        
       await sendNotification.execute({
            content: 'this is a notification',
            category: 'social',
            recipientId: 'recepient-1',
        })
    
        expect(notificationsRepository.notifications).toHaveLength(1);
    });
   
} )