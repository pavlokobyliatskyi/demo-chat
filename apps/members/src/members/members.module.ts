import { Module } from '@nestjs/common';
import { MemberRepository } from './repositories/member.repository';
import { MembersService } from './services/members.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MemberModel, MemberSchema } from './models/member.model';
import { MongooseInitModule } from '../mongoose-init/mongoose-init.module';

@Module({
  imports: [
    MongooseInitModule,
    MongooseModule.forFeature([
      {
        name: MemberModel.name,
        schema: MemberSchema,
      },
    ]),
  ],
  providers: [MemberRepository, MembersService],
  exports: [MembersService],
})
export class MembersModule {}
