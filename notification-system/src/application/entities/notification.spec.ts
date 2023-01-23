/* eslint-disable prettier/prettier */

import { Content } from "./content";
import { Notification } from "./notification";


describe('Notification', ()=> {
    it('should be able to create a notification', () => {
        const notification = new Notification({
            content: new Content('new request'),
            category: 'social',
            recipientId: 'recepient-1',
        })
    
        expect(notification).toBeTruthy();
    });
   
} )