/* eslint-disable prettier/prettier */

import { CancelNotification } from '@application/use-cases/cancel-notification';
import { CountRecepientNotification } from '@application/use-cases/count-recepient-notifications';
import { GetRecepientNotifications } from '@application/use-cases/get-recepient-notifications';
import { ReadNotification } from '@application/use-cases/read-notification';
import { UnreadlNotification } from '@application/use-cases/unread-notification';
import {Module} from '@nestjs/common'
import { SendNotification } from 'src/application/use-cases/send-notification';
import { DatabaseModule } from '../database/database.module';
import { NotificationsController } from './controllers/notifications.controller';



@Module({
    imports: [
        DatabaseModule
    ],
    controllers: [NotificationsController],
    providers: [SendNotification,CancelNotification,
    CountRecepientNotification,
GetRecepientNotifications,
ReadNotification,
UnreadlNotification],

})
export class HttpModule {}