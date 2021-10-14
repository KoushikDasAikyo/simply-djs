import {
  ButtonInteraction,
  Client,
  ColorResolvable,
  CommandInteraction,
  EmojiResolvable,
  Message,
  MessageActionRow,
  MessageEmbed,
  MessageReaction,
  TextChannel,
  User,
  MessageButtonStyle,
  GuildMember
} from 'discord.js';
import { Database } from 'quickmongo';

export type DB = Database;
/** Colors that discord.js support */
type BtnColor = MessageButtonStyle;
type HexColorString = `#${string}` | string;

export type btnroleOptions = {
  embed: MessageEmbed,
  data: {
    role: string,
    /** default: *role name* */
    label?: string,
    /** default: SECONDARY */
    color?: HexColorString,
    emoji?: EmojiResolvable,
  }[]
}
export declare function btnrole(client: Client, message: Message, options?: btnroleOptions): Promise<void>;

export type bumpSystemOptions = {
  event: 'ready' | 'messageCreate'
  /** Message when the event is messageCreate */
  message?: Message,
  /** Channel id of the bump channel */
  chid: string[],
  /** Embed that sends when the bump is needed */
  bumpEmbed?: MessageEmbed
  /** Embed that sends when someone bumps the server */
  thanksEmbed?: MessageEmbed
}
export declare function bumpSystem(client: Client, db: DB, options?: bumpSystemOptions): Promise<any>;

export type calculatorOptions = {
  /** The Embed Color of the calculator embed, default: #075FFF */
  embedColor: HexColorString,
  /** Slash support */
  slash?: boolean,
  /**  Credit the package. (Only Boolean [true/false]) */
  credit?: boolean,
  /** Have Custom Calculator footer when credits are false */
  embedFooter?: string //Not in the docs, but in the code
}
export declare function calculator(interaction: CommandInteraction, options?: calculatorOptions): Promise<void>;

export type chatbotOptions = {
  /** Channel id for where to speak (Can be an array) */
  chid: string | string[], // Not a array in the docs
  /** ChatBot name, default: Your bot name */
  name?: string,
  /** Toggle the chatbot */
  toggle?: boolean //Not in the docs, but in the code
  /** Your name */
  developer?: string
}
export declare function chatbot(client: Client, message: Message, options?: chatbotOptions): Promise<void>;

export type clickBtnOptions = {
  /**  The Embed Description of the embed which is sent when the ticket has been opened */
  embedDesc?: string,
  /** Database */
  db?: DB,
  /** The Embed Color of the embed which is sent when the ticket has been opened */
  embedColor?: HexColorString,
  /** Give credits to this package (Boolean[true / false]) Default: true */
  credit?: boolean,
  // Close Ticket Button
  /** The color of the Close Ticket Button */
  closeColor: BtnColor,
  /** The emoji for the Close Ticket Button */
  closeEmoji: EmojiResolvable
  //Delete Ticket Button
  /** The color of the Delete Ticket Button */
  delColor: BtnColor,
  /** The emoji for the Delete Ticket Button */
  delEmoji: string,
  //Reopen Ticket Button
  /** The color of the Delete Ticket Button */
  openColor: BtnColor,
  /**  The emoji for the Delete Ticket Button */
  openEmoji: EmojiResolvable,
  //Other
  /** Timeout which deletes the ticket after 10 minutes to reduce clutter */
  timeout: boolean,
  /** Message sent when a ticket is already opened by the user. */
  cooldownMsg: string
}
export declare function clickBtn(button: ButtonInteraction, options?: clickBtnOptions): Promise<void>;

export type embedCreateOptions = {
  slash?: boolean
}
export declare function embedCreate(message: Message | CommandInteraction, options?: embedCreateOptions): Promise<void>;

export type embedPagesOptions = {
  /** default: ⏪ */
  firstEmoji?: EmojiResolvable,
  /** default: ◀️ */
  backEmoji?: EmojiResolvable,
  /** default: 🗑️ */
  delEmoji?: EmojiResolvable,
  /** default: ▶️ */
  forwardEmoji?: EmojiResolvable,
  /** default: ⏩ */
  lastEmoji?: EmojiResolvable,

  /** Slash support */
  slash?: boolean,

  /** default: SUCCESS */
  btncolor?: BtnColor,
  /** default: true */
  delBtn?: boolean,
  /** default: DANGER */
  delcolor?: BtnColor, // 
  /** Turn on/off the Last/First Page Buttons. */
  skipBtn: boolean
  /** default: PRIMARY */
  skipcolor?: BtnColor
}
// client argument in the docs, but not in the code
export declare function embedPages(message: CommandInteraction, pages: MessageEmbed[], style?: embedPagesOptions): Promise<void>;
export declare function embedPages(message: Message, pages: MessageEmbed[], style?: embedPagesOptions): Promise<void>;

export type ghostPingOptions = {
  /** default: (*a long message*) */
  embedDesc?: string,
  /** default: #075FFF */
  embedColor?: HexColorString,
  /** default: 'Ghost Ping.' */
  embedFoot?: string,
  /** Credit the package */
  credits?: boolean

} | { embed: MessageEmbed }
export declare function ghostPing(message: Message, options?: ghostPingOptions): Promise<void>;

export type giveawaySystemOptions = {
  /** Slash Support */
  slash?: boolean
  /** Args when using message event (non slash) */
  args: string[], //Not in the docs, but in the code
  /** Giveaway Options */
  prize?: string,
  winners?: string,
  time?: string,
  channel?: TextChannel, //Not in the docs, but in the code

  /** Embed Customization */
  embedTitle?: string, //Not in the docs, but in the code
}
export declare function giveawaySystem(client: Client, db: DB, interaction: CommandInteraction, options?: giveawaySystemOptions): Promise<any>;
export declare function giveawaySystem(client: Client, db: DB, message: Message, options?: giveawaySystemOptions): Promise<any>;

export type dropdownPagesOptions = {
  /** Type 1: Send as ephemeral message (invisible message) | Type 2: Edit previous message */
  type?: 1 | 2,
  /** Name that shows when nothing is selected */
  placeHolder?: string, //Broken in the docs
  /** Slash support */
  slash?: boolean,
  /** Custom rows to send the message with more buttons(only need to be row) */
  rows: MessageActionRow[],
  embed: MessageEmbed,
  /** Label of the delete option in menu */
  delLabel?: string,
  /** Description of delete option in menu */
  delDesc?: string,
  /** Emoji of Delete Message Button */
  delEmoji?: EmojiResolvable,
  data: {
    label: string,
    desc: string,
    emoji?: string,
    embed: MessageEmbed, // embed sent when clicked
  }[]
}
export declare function dropdownPages(interaction: Message, options?: dropdownPagesOptions): Promise<void>;
export declare function dropdownPages(interaction: CommandInteraction, options?: dropdownPagesOptions): Promise<void>;

export type modmailOptions = {
  /** Message Content outside of the embed, default: ***Support Team*** */
  content?: string,
  /** Support Role ID (also mentions when creating if there is no options.content) */
  role?: string,
  /** Toggle ON/OFF the dm modmail feature, default: true */
  dmToggle?: boolean,
  /** Blacklist users if they are spamming */
  blacklistUser?: string[],
  /** Set Guilds in blacklist zone so you can't create modmails in that guild */
  blacklistGuild?: string[],
  categoryID?: string,
  /** default: #075FFF */
  embedColor?: HexColorString,
  /**  Button Color which discord supports, default: DANGER */
  delColor?: BtnColor,
  /** Emoji that the button has.. (Emoji ID), default: '❌' */
  delEmoji?: EmojiResolvable,
  /** Give credits to the package by making it true */
  credit?: boolean
}
export declare function modmail(client: Client, message: Message, options?: modmailOptions): Promise<any>;

export type rankCardOptions = {
  /**Provide a member into the system (Identifies the member automatically if not provided) */
  member?: GuildMember,
  level: string,
  currentXP: string,
  /** Required XP for the next level of the user */
  neededXP: string,
  rank: string,
  /** Slash support */
  slash?: boolean,
  /** Background Image of the rank card (URL) */
  background?: string
}
export declare function rankCard(client: Client, message: Message, options?: rankCardOptions): Promise<void>;
export declare function rankCard(client: Client, interaction: CommandInteraction, options?: rankCardOptions): Promise<void>;


export type rpsOptions = {
  embedColor?: HexColorString, // default: #075FFF
  timeoutEmbedColor?: HexColorString, // default: #c90000
  drawEmbedColor?: HexColorString, // default: #075FFF
  winEmbedColor?: HexColorString, // default: #06bd00
  embedFooter?: string, //Not in the docs, but in the code
  rockColor?: BtnColor, // default: grey
  paperColor?: BtnColor, // default: grey
  scissorsColor?: BtnColor, // default: grey
  /** Slash support */
  slash?: boolean,
  /** Credit the package */
  credit?: boolean
}
export declare function rps(message: Message, options?: rpsOptions): Promise<any>;
export declare function rps(interaction: CommandInteraction, options?: rpsOptions): Promise<any>;

export type starboardOptions = {
  event: 'messageReactionAdd' | 'messageReactionRemove' | 'messageDelete',
  chid: string,
  /** default: #FFC83D */
  embedColor?: ColorResolvable,
  embedFoot?: string, //Not in the docs, but in the code
  /** default: ⭐ */
  emoji?: EmojiResolvable,
  /** inimum stars needed to be on starboard, default: 2 */
  min?: number,
  credit?: boolean
}
export declare function starboard(client: Client, reaction: Message, options?: starboardOptions): Promise<void>;
export declare function starboard(client: Client, reaction: MessageReaction, options?: starboardOptions): Promise<void>;

export type stealEmojiOptions = {
  /**  The Embed Title of the embed which is sent after uploading the emoji, default: `Emoji Added ;)` */
  embedTitle?: string,
  /** The Embed Color of the embed which is sent after uploading the emoji, default: #075FFF; */
  embedColor?: HexColorString,
  /** The Embed Footer of the embed which is sent after uploading the emoji, default: 'Stop stealing.. its illegal.' */
  embedFoot?: string,
  /** The message sent when emoji id is invalid (or) emoji not found, default: "Couldn't find an emoji from it", */
  failedMsg?: string
  credit?: boolean
}
export declare function stealEmoji(message: Message, args: string[], options?: stealEmojiOptions): Promise<any>;

export type stealStickerOptions = {
  /**  The Embed Title of the embed which is sent after uploading the emoji, default: `Emoji Added ;)` */
  embedTitle?: string,
  /** The Embed Color of the embed which is sent after uploading the emoji, default: #075FFF; */
  embedColor?: HexColorString,
  /** The Embed Footer of the embed which is sent after uploading the emoji, default: 'Stop stealing.. its illegal.' */
  embedFoot?: string,
  /** The message sent when emoji id is invalid (or) emoji not found, default: "Couldn't find an emoji from it", */
  credit?: boolean
}
export declare function stealSticker(message: Message, args: string[], options?: stealStickerOptions): Promise<any>;

export type suggestBtnOptions = {
  /**  Emoji for Accept suggestion button (Only Emoji ID), default: ☑️ */
  yesEmoji?: EmojiResolvable,
  /** Color for the Accept Suggestion button, default: green  */
  yesColor?: ColorResolvable,
  /**  Emoji for Reject suggestion button, default: X */
  noEmoji?: EmojiResolvable,
  /** Color for the Reject suggestion button, default: red */
  noColor?: ColorResolvable,
  /** Color for the Rejected Suggestion embed, default: RED */
  denyEmbColor?: ColorResolvable,
  /**  Color for the Accepted Suggestion embed, default: GREEN */
  agreeEmbColor?: ColorResolvable,
}
export declare function suggestBtn(button: ButtonInteraction, users: DB, options?: suggestBtnOptions): Promise<void>;

export type suggestSystemOptions = {
  chid: string,
  /** Emoji for Accept suggestion button, default: ☑️ */
  yesEmoji?: EmojiResolvable,
  /** Color for the Accept Suggestion button, default: green */
  yesColor?: BtnColor,
  /** Emoji for Reject suggestion button, default: X */
  noEmoji?: EmojiResolvable,
  /** Color for the Reject suggestion button, default: red */
  noColor?: BtnColor,
  /** Color for the Suggestion embed, defaultL #075FFF */
  embedColor?: HexColorString,
  denyEmbColor?: HexColorString,
  agreeEmbColor?: HexColorString,
  /** Slash support */
  slash?: boolean,
  /**  Give credits to this package(Boolean[true / false]) Default: true */
  credit?: boolean
}

export declare function suggestSystem(client: Client, interaction: Message, args: string[], options?: suggestSystemOptions): Promise<void>;

export type ticketSystemOptions = {
  //Embed
  /** The Description for the Ticket System Embed(Embed that has ticket button that opens a ticket) */
  embedDesc?: string,
  /** The Color of the Ticket System Embed(Embed that has ticket button that opens a ticket) */
  embedColor?: HexColorString,
  /** The Footer for the Ticket System Embed(Embed that has ticket button that opens a ticket) */
  embedFoot?: string,
  /** Give credits to this package(Boolean[true / false]) Default: true */
  credit?: boolean,
  //Buttons
  /** The Emoji for the Ticket Button which opens a ticket */
  emoji?: EmojiResolvable,
  /** The Color for the Ticket Button which opens a ticket. */
  color?: ColorResolvable
}
export declare function ticketSystem(message: Message, channel: TextChannel, options?: ticketSystemOptions): Promise<any>;

export type tictactoeOptions = {
  //Embed
  /**  The Embed Foot of the How to play embed */
  embedFoot: string,
  /** The Embed Color of the How to play embed */
  embedColor: HexColorString,
  /**  Give credits to this package (Boolean[true / false]) Default: true */
  credit: boolean
  /** Slash support */
  slash?: boolean,
  //Buttons
  /** Emoji for X user[Player 1] */
  xEmoji: EmojiResolvable,
  /** Emoji for O user[Player 2] */
  oEmoji: EmojiResolvable,
  /** Emoji when the space is not occupied */
  idleEmoji: EmojiResolvable
}
export declare function tictactoe(message: Message, options?: tictactoeOptions): Promise<any>;
export declare function tictactoe(interaction: CommandInteraction, options?: tictactoeOptions): Promise<any>;

export type betterBtnRoleOptions = ({
  type: 'add' | 'remove'
})
export declare function betterBtnRole(client: Client, interaction: CommandInteraction, options: betterBtnRoleOptions): Promise<void>;

export type ytNotifyOptions = ({
  /** Youtube channel ID from the URL */
  ytID: string
} | {
  /** Youtube channel URL */
  ytURL: string
}) & {
  /** Discord channel id to post message there */
  chid: string,
  /** This checks if the video is posted after starting the bot. */
  startAt: Date,
  /** Message sent when the youtuber posts a video */
  msg?: string
}
export declare function ytNotify(client: Client, db: DB, options?: ytNotifyOptions): Promise<void>;