import {FieldType} from "../enumerations/fieldType";
import {SortOrder} from "../enumerations/sortOrder";
import {DateFilterType} from "../enumerations/dateFilterType";
import {ToDoItemList} from "../classes/toDoItemList";
import {ToDoItem} from "../classes/toDoItem";
import {ToDoItemStatus} from "../enumerations/toDoItemStatus";

export interface ListActions {
    addItem(newItem : ToDoItem) : Boolean,
    removeItem(itemPosition : number) : Boolean;
    editItem(itemPosition : number, newName : String, newStatus:
        ToDoItemStatus, newDate : Date) : ToDoItem | undefined,
    sortList(fieldType? : FieldType, sortOrder? : SortOrder, value? : String) : ToDoItemList,
    filterList(fieldType? : FieldType, dateFilterType? : DateFilterType) : ToDoItemList
}