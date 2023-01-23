/* eslint-disable prettier/prettier */
import { CancelNotification } from "@application/use-cases/cancel-notification";
import { CountRecepientNotification } from "@application/use-cases/count-recepient-notifications";
import { GetRecepientNotifications } from "@application/use-cases/get-recepient-notifications";
import { ReadNotification } from "@application/use-cases/read-notification";
import { SendNotification } from "@application/use-cases/send-notification";
import { UnreadlNotification } from "@application/use-cases/unread-notification";
import { Body, Post,Param, Patch, Controller, Get } from "@nestjs/common";
import { CreateNotificationBody } from "../dtos/create-notification-body";
import { NotificationViewModel } from "../view/notification-view-modules";


@Controller('notifications')
export class NotificationsController {
  constructor(private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadlNotification,
    private countRecepientNotification: CountRecepientNotification,
    private getRecepientNotification: GetRecepientNotifications){
  }
  @Patch(':id/cancel')
  async cancel(@Param('id') id:string ){
    await this.cancelNotification.execute({
      notificationId:id,
    })
  }
@Get('count/from/:recepientId')
  async countFromRecipient(@Param('recepientId') recepientId: string ){
    const {count} = await this.countRecepientNotification.execute({
      recepientId
    })
  return{count, }
}

@Get('from/:recepientId')
  async getFromRecipient(@Param('recepientId') recepientId: string ){
    const {notifications } = await this.getRecepientNotification.execute({
      recepientId
    })
  return{notifications: notifications.map(NotificationViewModel.toHTTP), }
}

  @Patch(':id/read')
  async read(@Param('id') id:string ){
    await this.readNotification.execute({
      notificationId:id,
    })
  }
  @Patch(':id/unread')
  async unread(@Param('id') id:string ){
    await this.unreadNotification.execute({
      notificationId:id,
    })
  }
  

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body;
    
    const {notification} = await this.sendNotification.execute({
      recipientId, content, category
    });

    return {
      notification: {
        id: notification.id,
        content: notification.content,
        category: notification.category,
        recipientId: notification.recipientId,
      }
    }
  }
}
