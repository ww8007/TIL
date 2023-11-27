import { EventHandler } from "../core/types";

const EVENT_TYPES = Object.freeze({
	ITEM_ADDED: "ITEM_ADDED",
	ITEM_UPDATED: "ITEM_UPDATED",
	ITEM_DELETED: "ITEM_DELETED",
	ITEMS_COMPLETED_TOGGLED: "ITEMS_COMPLETED_TOGGLED",
	ITEMS_MARKED_AS_COMPLETED: "ITEMS_MARKED_AS_COMPLETED",
	COMPLETED_ITEM_DELETED: "COMPLETED_ITEM_DELETED",
	FILTER_CHANGED: "FILTER_CHANGED"
});

export type EVENT_TYPES = typeof EVENT_TYPES;

export const eventCreators = {
	addItem: (text: string) => ({
		type: EVENT_TYPES.ITEM_ADDED,
		payload: text
	}),
	updateItem: (index: number, text: string) => ({
		type: EVENT_TYPES.ITEM_UPDATED,
		payload: {
			text,
			index
		}
	}),
	deleteItem: (index: number) => ({
		type: EVENT_TYPES.ITEM_DELETED,
		payload: index
	}),
	toggleItemCompleted: (index: number) => ({
		type: EVENT_TYPES.ITEMS_COMPLETED_TOGGLED,
		payload: index
	}),
	completeAll: () => ({
		type: EVENT_TYPES.ITEMS_MARKED_AS_COMPLETED
	}),
	clearCompleted: () => ({
		type: EVENT_TYPES.COMPLETED_ITEM_DELETED
	}),
	changeFilter: (filter: string) => ({
		type: EVENT_TYPES.FILTER_CHANGED,
		payload: filter
	})
};

export function createEventHandler<
	State,
	Key extends keyof typeof eventCreators
>(
	handler: EventHandler<State, (typeof eventCreators)[Key]>
): EventHandler<State, (typeof eventCreators)[Key]> {
	return handler;
}
