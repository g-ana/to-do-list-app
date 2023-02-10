import {ToDoItem} from "../classes/toDoItem";
import {ToDoItemStatus} from "../enumerations/toDoItemStatus";

export interface ItemActions {
    editItem(name: String, status: ToDoItemStatus, date : Date) : ToDoItem,
    removeItem() : Boolean,
}