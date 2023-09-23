import { Members } from '@demo-chat/shared';

export class MemberEntity implements Members.IMember {
  _id: string;
  chatId: string;
  userId: string;

  constructor(args: Members.IMember) {
    this._id = args._id;
    this.chatId = args.chatId;
    this.userId = args.userId;
  }
}
