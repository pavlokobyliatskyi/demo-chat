import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserModel } from '../models/user.model';
import { FilterQuery, Model } from 'mongoose';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>
  ) {}

  public async create(args: UserEntity) {
    return await new this.userModel(args).save();
  }

  public async findOne(
    args: Partial<Pick<FilterQuery<UserEntity>, '_id' | 'email'>>
  ) {
    return await this.userModel.findOne(args).exec();
  }

  public async findByIds(ids: string[], limit: number) {
    return await this.userModel.find().where('_id').in(ids).limit(limit).exec();
  }

  public async updateOne({ _id, ...rest }: UserEntity) {
    return this.userModel.updateOne({ _id }, { $set: { ...rest } }).exec();
  }

  public async deleteOne(
    args: Partial<Pick<FilterQuery<UserEntity>, '_id' | 'email'>>
  ) {
    return await this.userModel.deleteOne(args).exec();
  }
}
