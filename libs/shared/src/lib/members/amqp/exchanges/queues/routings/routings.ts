import { IRouting } from './interfaces/routing.interface';
import { Exchanges } from '../../exchanges';

export class Routings {
  public static readonly addMemberToChatCommand: IRouting = {
    name: `${Exchanges.members.name}.add-member-to-chat.command.routing`,
  };

  public static readonly inviteMemberToChatCommand: IRouting = {
    name: `${Exchanges.members.name}.invite-member-to-chat.command.routing`,
  };

  public static readonly newMemberEvent: IRouting = {
    name: `${Exchanges.members.name}.new-member.event.routing`,
  };

  public static readonly getChatMembersQuery: IRouting = {
    name: `${Exchanges.members.name}.get-chat-members.query.routing`,
  };

  public static readonly getUserChatsQuery: IRouting = {
    name: `${Exchanges.members.name}.get-user-chats.query.routing`,
  };
}
