/* eslint-disable prettier/prettier */

import { Notification } from "@application/entities/notification";
import { NotificationsRepository } from "@application/repositories/notifications-repository";

export class InMermoryNotificationsRepository
implements NotificationsRepository{
  async findById(notificationId: string): Promise<Notification | null> {
       const notification = this.notifications.find((item) => (item.id === notification))

       if(!notification){
        return null;
       }
       return notification;
    }
   async save(notification: Notification): Promise<void> {
        const notificationIndex = this.notifications.findIndex(
            (item) => item.id === notification.id,
        )
        if(notificationIndex >= 0){ 
            this.notifications[notificationIndex] = notification;
        }
    }
    async countManyByRecepientId(recepientId: any): Promise<number> {
        return this.notifications.filter(
            (notification) => notification.recipientId === recepientId,
        ).length;
    }
    async findManyByRecepientId(recepientId: string): Promise<Notification[]> {
        return this.notifications.filter(
            (notification) => notification.recipientId === recepientId,
        ).length;
    }
    public notifications: Notification[] = [];

    async create(notification: Notification){
        this.notifications.push(notification);

      
    }
}
