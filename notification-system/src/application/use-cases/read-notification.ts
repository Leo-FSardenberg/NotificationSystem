/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found';

interface ReadlNotificationRequest{
    notificationId: string;

}
type ReadlNotificationResponse = void
@Injectable()
export class ReadNotification{
  constructor(
    private notificationsRepository: NotificationsRepository
  ) {}

    async execute(
        request: ReadlNotificationRequest):
         Promise<ReadlNotificationResponse> {
        const {notificationId } = request;

        const notification = await this.notificationsRepository.findById(
            notificationId,
            );

            if(!notification){
                throw new NotificationNotFound;
                }
                notification.read();

                await this.notificationsRepository.save(notification)
    }
}