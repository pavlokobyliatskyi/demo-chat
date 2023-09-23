export interface IMessage {
  _id?: string;
  chatId: string;
  userId: string; // memberId
  text: string;
  createdAt?: Date;
}
