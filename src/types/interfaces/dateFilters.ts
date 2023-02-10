import {ToDoItemList} from "../classes/toDoItemList";

export interface DateFilters {
    onExactDate(date? : Date) : ToDoItemList;
    beforeDate(date? : Date) : ToDoItemList;
    afterDate(date? : Date) : ToDoItemList;
    betweenDates(startDate?: Date, endDate?: Date) : ToDoItemList;
}