import { Messages } from '@demo-chat/shared';

export class MessageEntity implements Messages.IMessage {
  _id?: string;
  chatId: string;
  text: string;
  userId: string;
  createdAt?: Date;

  constructor(args: MessageEntity) {
    this._id = args._id;
    this.chatId = args.chatId;
    this.text = args.text;
    this.userId = args.userId;
    this.createdAt = args.createdAt;
  }
}
