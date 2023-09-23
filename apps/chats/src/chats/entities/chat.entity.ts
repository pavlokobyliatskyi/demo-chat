import { Chats } from '@demo-chat/shared';

export class ChatEntity implements Chats.IChat {
  _id: string;
  userId: string;
  tmc?: number;

  constructor(args: Chats.IChat) {
    this._id = args._id;
    this.userId = args.userId;
    this.tmc = args.tmc;
  }
}
