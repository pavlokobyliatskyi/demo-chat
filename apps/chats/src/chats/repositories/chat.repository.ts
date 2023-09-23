import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { ChatModel } from '../models/chat.model';
import { ChatEntity } from '../entities/chat.entity';

@Injectable()
export class ChatRepository {
  constructor(
    @InjectModel(ChatModel.name) private readonly chatModel: Model<ChatModel>
  ) {}

  public async create(args: ChatEntity) {
    return await new this.chatModel(args).save();
  }

  public async increment(args: Partial<Pick<FilterQuery<ChatModel>, '_id'>>) {
    return await this.chatModel
      .findOneAndUpdate(args, { $inc: { tmc: 1 } })
      .exec();
  }

  public async findOne(args: Pick<Partial<FilterQuery<ChatModel>>, '_id'>) {
    return await this.chatModel.findOne(args).exec();
  }

  public async findByIds(ids: string[], limit: number) {
    return await this.chatModel.find().where('_id').in(ids).limit(limit).exec();
  }
}
