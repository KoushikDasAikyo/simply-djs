import {
	ButtonStyle,
	Role,
	Message,
	EmbedBuilder,
	ButtonBuilder,
	ActionRowBuilder,
	PermissionFlagsBits
} from 'discord.js';
import {
	ExtendedInteraction,
	ExtendedMessage,
	ExtendedButtonStyle,
	CustomizableEmbed
} from './typedef';

import { SimplyError } from './error';
import { MessageButtonStyle, toRgb } from './misc';

// ------------------------------
// ------- T Y P I N G S --------
// ------------------------------

interface dataObject {
	role?: string | Role;
	label?: string;
	emoji?: string;
	style?: ExtendedButtonStyle;
	url?: `https://${string}`;
}

export type btnOptions = {
	embed?: CustomizableEmbed;
	content?: string;
	data?: dataObject[];
	strict?: boolean;
};

// ------------------------------
// ------ F U N C T I O N -------
// ------------------------------

/**
 * A **Button Role System** that lets you create button roles with your own message. | *Requires: [**manageBtn()**](https://simplyd.js.org/docs/handler/manageBtn)*
 * @param msgOrInt
 * @param options
 * @link `Documentation:` ***https://simplyd.js.org/docs/General/btnrole***
 * @example simplydjs.btnRole(message, { data: {...} })
 */

export async function btnRole(
	msgOrInt: ExtendedMessage | ExtendedInteraction,
	options: btnOptions = {}
): Promise<Message> {
	try {
		if (!options?.data) {
			if (options?.strict)
				throw new SimplyError({
					function: 'btnRole',
					title: 'Expected data object in options',
					tip: `Received ${options.data || 'undefined'}`
				});
			else
				console.log(
					`SimplyError - btnRole | Error:  Expected data object in options.. Received ${
						options?.data || 'undefined'
					}`
				);
		}

		const extMessage = msgOrInt as ExtendedMessage;
		const extInteraction = msgOrInt as ExtendedInteraction;

		if (msgOrInt.commandId) {
			if (
				!extInteraction.member.permissions.has(
					PermissionFlagsBits.Administrator
				)
			)
				extInteraction.followUp({
					content: 'You need `ADMINISTRATOR` permission to use this command'
				});
			return;
		} else if (!msgOrInt.customId) {
			if (!extMessage.member.permissions.has(PermissionFlagsBits.Administrator))
				return await extMessage.reply({
					content: 'You need `ADMINISTRATOR` permission to use this command'
				});
		}

		const row: ActionRowBuilder<ButtonBuilder>[] = [];
		const data = options.data;

		if (data.length <= 5) {
			const button: ButtonBuilder[][] = [[]];
			GenButton(data, button, row);
		} else if (data.length > 5 && data.length <= 10) {
			const button: ButtonBuilder[][] = [[], []];
			GenButton(data, button, row);
		} else if (data.length > 11 && data.length <= 15) {
			const button: ButtonBuilder[][] = [[], [], []];
			GenButton(data, button, row);
		} else if (data.length > 16 && data.length <= 20) {
			const button: ButtonBuilder[][] = [[], [], [], []];
			GenButton(data, button, row);
		} else if (data.length > 21 && data.length <= 25) {
			const button: ButtonBuilder[][] = [[], [], [], [], []];
			GenButton(data, button, row);
		} else if (data.length > 25) {
			if (options?.strict)
				throw new SimplyError({
					function: 'btnRole',
					title: 'Reached the limit of 25 buttons..',
					tip: 'Discord allows only 25 buttons in a message. Send a new message with more buttons.'
				});
			else
				console.log(
					`SimplyError - btnRole | Error: Reached the limit of 25 buttons..\n\nDiscord allows only 25 buttons in a message. Send a new message with more buttons.`
				);
		}

		// Generates buttons from the data provided
		async function GenButton(
			data: dataObject[],
			button: ButtonBuilder[][],
			row: ActionRowBuilder<ButtonBuilder>[]
		) {
			let current = 0;

			for (let i = 0; i < data.length; i++) {
				if (button[current].length === 5) current++;

				const emoji = data[i].emoji || null;
				const color = data[i].style || ButtonStyle.Secondary;
				let url = '';
				const role: Role | null = msgOrInt.guild.roles.cache.find(
					(r) => r.id === data[i].role
				);
				const label = data[i].label || role?.name;

				if (!role && color === 'LINK') {
					url = data[i].url;
					button[current].push(createLink(label, url, emoji));
				} else {
					button[current].push(createButton(label, role, color, emoji));
				}

				// push the row into array (So you can add more than a row of buttons)
				if (i === data.length - 1) {
					const newRow = addRow(button[current]);
					row.push(newRow);
				}
			}

			if (!options.embed && !options.content)
				throw new SimplyError({
					function: 'btnRole',
					title: 'Provide an embed (or) content in the options.',
					tip: `Expected embed (or) content options to send. Received ${
						options.embed || undefined
					}`
				});

			const embed = new EmbedBuilder()
				.setFooter(
					options?.embed?.footer
						? options?.embed?.footer
						: {
								text: '©️ Rahuletto. npm i simply-djs',
								iconURL: 'https://i.imgur.com/XFUIwPh.png'
						  }
				)
				.setColor(options?.embed?.color || toRgb('#406DBC'));

			if (options?.embed?.description)
				embed.setDescription(options.embed?.description);
			if (options?.embed?.fields) embed.setFields(options.embed?.fields);
			if (options?.embed?.author) embed.setAuthor(options.embed?.author);
			if (options?.embed?.image) embed.setImage(options.embed?.image);
			if (options?.embed?.thumbnail)
				embed.setThumbnail(options.embed?.thumbnail);
			if (options?.embed?.timestamp)
				embed.setTimestamp(options.embed?.timestamp);
			if (options?.embed?.title) embed.setTitle(options.embed?.title);
			if (options?.embed?.url) embed.setURL(options.embed?.url);

			if (extInteraction?.commandId) {
				if (!options.embed) {
					extInteraction.followUp({
						content: options?.content || '** **',
						components: row
					});
				} else
					extInteraction.followUp({
						content: options.content || '** **',
						embeds: [embed],
						components: row
					});
			} else if (!extInteraction?.commandId) {
				if (!options.embed) {
					extMessage.channel.send({
						content: options.content || '** **',
						components: row
					});
				} else
					extMessage.channel.send({
						content: options.content || '** **',
						embeds: [embed],
						components: row
					});
			}

			function addRow(btns: ButtonBuilder[]): ActionRowBuilder<ButtonBuilder> {
				const btnRow = new ActionRowBuilder<ButtonBuilder>();

				btnRow.addComponents(btns);

				return btnRow;
			}

			function createLink(
				label: string,
				url: string,
				emoji: string
			): ButtonBuilder {
				const button = new ButtonBuilder();
				if (!emoji || emoji === null) {
					button.setLabel(label).setStyle(ButtonStyle.Link).setURL(url);
				} else if (emoji && emoji !== null) {
					button
						.setLabel(label)
						.setStyle(ButtonStyle.Link)
						.setURL(url)
						.setEmoji(emoji);
				}
				return button;
			}

			function createButton(
				label: string,
				role: Role,
				color: ExtendedButtonStyle,
				emoji: string
			): ButtonBuilder {
				if (color as string) color = MessageButtonStyle(color as string);

				const btn = new ButtonBuilder();
				btn
					.setLabel(label)
					.setStyle((color as ButtonStyle) || ButtonStyle.Secondary)
					.setCustomId('role-' + role.id);

				if (emoji && emoji !== null) {
					btn.setEmoji(emoji);
				}
				return btn;
			}
		}
	} catch (err: any) {
		if (options?.strict)
			throw new SimplyError({
				function: 'btnRole',
				title: 'An Error occured when running the function ',
				tip: err.stack
			});
		else console.log(`SimplyError - btnRole | Error: ${err.stack}`);
	}
}
