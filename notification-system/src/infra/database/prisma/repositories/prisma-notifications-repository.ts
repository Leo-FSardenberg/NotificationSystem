/* eslint-disable prettier/prettier */

import { Injectable } from "@nestjs/common";
import { Notification } from "@application/entities/notification";
import { NotificationsRepository } from "@application/repositories/notifications-repository";
import { PrismaService } from "../prisma.service";
import { PrismaNotificationMapper } from "../mappers/prisma-notification-mapper";


@Injectable()
export class PrismaNotificationsRepositories implements NotificationsRepository{
    constructor(
        private prisma: PrismaService
    ){}
async findManyByRecepientId(recepientId: any): Promise<Notification[]> {
      const notification = await this.prisma.notification.findMany({
        where: {
            recepientId
        }
      })
      return notification.map(PrismaNotificationMapper.toDomain)
   }
   async findById(notificationId: string): Promise<Notification | null> {
     const notification = await this.prisma.notification.findUnique({
        where: {
            id: notificationId,
        },
     
     })
     if(!Notification){
        return null
    }
    return PrismaNotificationMapper.toDomain(notification);
    }
   async save(notification: Notification): Promise<void> {
        const raw = PrismaNotificationMapper.toDomain(notification);
        await this.prisma.notification.update({
            where:{
                id: raw.id
            },
            data: raw,
        })
    }
  async countManyByRecepientId(recepientId: any): Promise<number> {
        const count = await this.prisma.notification.count({
            where: {
                recepientId,
            }
        })
        return count;
    }
    async create(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification)    
    
    await this.prisma.notification.create({
            data: raw,
        })
    }

}