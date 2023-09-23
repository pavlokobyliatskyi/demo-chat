import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MemberModel } from '../models/member.model';
import { FilterQuery, Model } from 'mongoose';
import { MemberEntity } from '../entities/member.entity';

@Injectable()
export class MemberRepository {
  constructor(
    @InjectModel(MemberModel.name)
    private readonly memberModel: Model<MemberModel>
  ) {}

  public async create(args: MemberEntity) {
    return await new this.memberModel(args).save();
  }

  public async findMany(
    args: Partial<Pick<FilterQuery<MemberModel>, 'chatId' | 'userId'>>
  ) {
    return await this.memberModel.find(args).exec();
  }
}
