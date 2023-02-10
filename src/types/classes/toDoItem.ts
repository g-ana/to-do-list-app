import {ToDoItemStatus} from "../enumerations/toDoItemStatus";
import {ItemActions} from "../interfaces/itemActions";

export class ToDoItem  implements ItemActions {
    name? : String;
    date? : Date;
    status? : ToDoItemStatus;

    editItem(updatedName? : String, updatedStatus? : ToDoItemStatus, updatedDate? : Date): ToDoItem {
        const editedName : String = updatedName ? updatedName : this.name!;
        const editedDate : Date = updatedDate ? updatedDate : this.date!;
        const editedStatus : ToDoItemStatus = updatedStatus ? updatedStatus : this.status!;
        return new ToDoItem(editedName, editedStatus, editedDate);
    }
    completeItem = () => this.status = ToDoItemStatus.Completed;
    isCompleted = () => this.status === ToDoItemStatus.Completed;
    removeItem(): Boolean {
        return false;
    }
    constructor(name : String = "",
                status : ToDoItemStatus = ToDoItemStatus.Active,
                date : Date = new Date(Date.now().toString())) {
        this.name = name;
        this.date = date;
        this.status = status;
    }
}