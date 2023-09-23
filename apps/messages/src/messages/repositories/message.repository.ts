import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MessageModel } from '../models/message.model';
import { FilterQuery, Model } from 'mongoose';
import { MessageEntity } from '../entities/message.entity';

@Injectable()
export class MessageRepository {
  constructor(
    @InjectModel(MessageModel.name)
    private readonly messageModel: Model<MessageModel>
  ) {}

  public async create(args: MessageEntity) {
    return await new this.messageModel(args).save();
  }

  public async findAsc(
    args: Pick<FilterQuery<MessageModel>, 'chatId'>,
    limit: number
  ) {
    return await this.messageModel
      .find(args)
      .limit(limit)
      .sort({ createdAt: 'asc' })
      .exec();
  }

  public async findByIds(ids: string[], limit: number) {
    return await this.messageModel
      .find()
      .where('_id')
      .in(ids)
      .limit(limit)
      .exec();
  }
}
