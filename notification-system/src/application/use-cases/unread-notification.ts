/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found';

interface UnReadlNotificationRequest{
    notificationId: string;

}
type UnReadlNotificationResponse = void
@Injectable()
export class UnreadlNotification{
  constructor(
    private notificationsRepository: NotificationsRepository
  ) {}

    async execute(
        request: UnReadlNotificationRequest):
         Promise<UnReadlNotificationResponse> {
        const {notificationId } = request;

        const notification = await this.notificationsRepository.findById(
            notificationId,
            );

            if(!notification){
                throw new NotificationNotFound;
                }
                notification.unread();

                await this.notificationsRepository.save(notification)
    }
}