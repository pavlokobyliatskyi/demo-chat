import { IRouting } from './interfaces/routing.interface';
import { Exchanges } from '../../exchanges';

export class Routings {
  public static readonly newChatEvent: IRouting = {
    name: `${Exchanges.chats.name}.new-chat.event.routing`,
  };

  public static readonly getChatQuery: IRouting = {
    name: `${Exchanges.chats.name}.get-chat.query.routing`,
  };

  public static readonly getChatListQuery: IRouting = {
    name: `${Exchanges.chats.name}.get-chat-list.query.routing`,
  };
}
