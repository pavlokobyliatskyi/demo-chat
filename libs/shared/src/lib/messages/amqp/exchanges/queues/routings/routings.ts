import { IRouting } from './interfaces/routing.interface';
import { Exchanges } from '../../exchanges';

export class Routings {
  public static readonly sendMessageCommand: IRouting = {
    name: `${Exchanges.messages.name}.send-message.command.routing`,
  };

  public static readonly newMessageEvent: IRouting = {
    name: `${Exchanges.messages.name}.new-message.event.routing`,
  };

  public static readonly getMessageListQuery: IRouting = {
    name: `${Exchanges.messages.name}.get-message-list.query.routing`,
  };

  public static readonly getChatMessagesQuery: IRouting = {
    name: `${Exchanges.messages.name}.get-chat-messages.query.routing`,
  };
}
