import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { Users } from '@demo-chat/shared';
import { UserEntity } from '../entities/user.entity';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class UsersService {
  constructor(
    @Inject(UserRepository) private readonly userRepository: UserRepository
  ) {}

  public async create(
    args: Omit<Users.IUser, 'isEmailVerified' | 'pictureFileId'>
  ) {
    const userEntity = new UserEntity({
      name: args.name,
      email: args.email,
      isEmailVerified: false,
    });

    return await this.userRepository.create(userEntity);
  }

  public async findById(_id: string) {
    return await this.userRepository.findOne({ _id });
  }

  public async findByIds(ids: string[]) {
    return await this.userRepository.findByIds(ids, 100);
  }

  public async findByEmail(email: string) {
    return await this.userRepository.findOne({ email });
  }

  public async verifyEmail(email: string) {
    const existedUser = await this.userRepository.findOne({ email });

    const userEntity = new UserEntity(existedUser).verifyEmail();

    return await this.userRepository.updateOne(userEntity);
  }

  public async changeInfo(
    _id: string,
    args: Partial<Pick<Users.IUser, 'name' | 'pictureFileId'>>
  ) {
    const user = await this.userRepository.findOne({ _id });

    if (!user) {
      throw new RpcException(new NotFoundException('The user does not exist.'));
    }

    const userEntity = new UserEntity(user);

    if (args.name) {
      userEntity.updateName(args.name);
    }

    if (args.pictureFileId) {
      userEntity.updatePicture(args.pictureFileId);
    }

    return await this.userRepository.updateOne(userEntity);
  }
}
