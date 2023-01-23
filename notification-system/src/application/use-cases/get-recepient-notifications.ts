/* eslint-disable prettier/prettier */
import { Notification } from '@application/entities/notification';
import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notifications-repository';

interface GetRecepientNotificationsRequest{
    recepientId: string;

}
interface GetRecepientNotificationsResponse {
    notifications: Notification[];
}
@Injectable()
export class GetRecepientNotifications{
  constructor(
    private notificationsRepository: NotificationsRepository
  ) {}

    async execute(
        request: GetRecepientNotificationsRequest
        ): Promise<GetRecepientNotificationsResponse> {
        const {recepientId } = request;

     const notifications = await this.notificationsRepository.findManyByRecepientId(recepientId)
      
     return {
        notifications,
    }
    }
}