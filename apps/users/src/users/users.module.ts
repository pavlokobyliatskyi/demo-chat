import { Module } from '@nestjs/common';
import { MongooseInitModule } from '../mongoose-init/mongoose-init.module';
import { UserModel, UserSchema } from './models/user.model';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRepository } from './repositories/user.repository';
import { UsersService } from './services/users.service';

@Module({
  imports: [
    MongooseInitModule,
    MongooseModule.forFeature([
      {
        name: UserModel.name,
        schema: UserSchema,
      },
    ]),
  ],
  providers: [UserRepository, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
