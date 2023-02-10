import {ListActions} from "../interfaces/listActions";
import {FieldType} from "../enumerations/fieldType";
import {DateFilterType} from "../enumerations/dateFilterType";
import {SortOrder} from "../enumerations/sortOrder";
import {ToDoItem} from "./toDoItem";
import {DateFilters} from "../interfaces/dateFilters";
import {DateFilter} from "./dateFilter";
import {ToDoItemStatus} from "../enumerations/toDoItemStatus";

export class ToDoItemList implements ListActions, DateFilters {
    toDoItemList? : Array<ToDoItem>;
    dateFilter? : DateFilter;
    afterDate = (date?: Date): ToDoItemList => {
        let filteredList: Array<ToDoItem> = [];
        this.toDoItemList?.filter((item, index) => {
            return item?.date! > date!
        });
        return new ToDoItemList(filteredList);
    }
    beforeDate = (date?: Date): ToDoItemList => {
        let filteredList: Array<ToDoItem> = [];
        this.toDoItemList?.filter((item, index) => {
            return item?.date! < date!
        });
        return new ToDoItemList(filteredList);
    }
    betweenDates = (startDate?: Date, endDate?: Date): ToDoItemList => {
        let filteredList: Array<ToDoItem> = [];
        this.toDoItemList?.filter((item, index) => {
            return item?.date! >= startDate! && item.date! <= endDate!;
        });
        return new ToDoItemList(filteredList);
    }
    onExactDate = (date?: Date): ToDoItemList => {
        let filteredList: Array<ToDoItem> = [];
        this.toDoItemList?.filter((item, index) => {
            return item?.date! === date!
        });
        return new ToDoItemList(filteredList);
    }
    filterByDate = () => {
        switch (this.dateFilter?.dateFilterType) {
            case DateFilterType.EXACT:
                return this.onExactDate(this.dateFilter?.date1);
            case DateFilterType.BEFORE:
                return this.beforeDate(this.dateFilter?.date1);
            case DateFilterType.AFTER:
                return this.afterDate(this.dateFilter?.date1);
            case DateFilterType.BETWEEN:
                return this.betweenDates(this.dateFilter?.date1, this.dateFilter?.date2)
            default:

                break;
        }
    }
    addItem = (newItem? : ToDoItem) : Boolean => {
        const start : number | undefined = this.count();
        if (this.toDoItemList !== null && this.toDoItemList !== undefined
            && newItem !== null && newItem !== undefined)
                this.toDoItemList = [...this.toDoItemList!, newItem!]
        const end : number | undefined = this.count();
        return (end! > start!);
    }
    removeItem(itemPosition: number): Boolean {
        const start : number | undefined = this.count();
        if (start !== null && start !== undefined && start > 0)
        this.toDoItemList!.splice(itemPosition, 1);
        const end : number | undefined = this.count();
        return end! < start!;
    }
    filterList = (fieldType?: FieldType, dateFilterType?: DateFilterType, value? : String): ToDoItemList => {
        let filteredList : Array<ToDoItem> = [];
        if (this.toDoItemList !== null && this.toDoItemList !== undefined
        && value !== null && value !== undefined) {
            switch (fieldType) {
                case FieldType.NAME:
                    filteredList = this.toDoItemList.filter((item : ToDoItem, index : number) => {
                      return item?.name?.toLowerCase()?.includes(value!.toLowerCase());
                    });
                break;
                case FieldType.STATUS:
                    filteredList = this.toDoItemList.filter((item : ToDoItem, index : number) => {
                        return item?.status! === value!.toString();
                    });
                    break;
                case FieldType.DATE:
                    this.filterByDate();
                    break;
                default:

                    break;

                    }
            }
        return new ToDoItemList(filteredList);
        }
    sortList = (fieldType?: FieldType, sortOrder?: SortOrder): ToDoItemList => {
        let sortedList : Array<ToDoItem> = [];
        if (this.toDoItemList !== null && this.toDoItemList !== undefined) {
            switch (fieldType) {
                case FieldType.NAME:
                        sortedList = this.toDoItemList.sort((item1, item2) : number => {
                            return item1?.name!.localeCompare(item2?.name!.toString())!;
                        });
                break;
                case FieldType.STATUS:
                        sortedList = this.toDoItemList.sort((item1, item2) : number => {
                            return item1?.status! > item2?.status!.toString() ? 1 : -1;
                        });
                break;
                case FieldType.DATE:
                    sortedList = this.toDoItemList.sort((item1, item2) : number => {
                            return item1?.date! > item2?.date! ? 1 : -1;
                        });
                break;
                default:

                break;
            }
            if (sortOrder === SortOrder.DESC)
                sortedList = sortedList.reverse();
        }
        return new ToDoItemList(sortedList);
    }
   /* editItem = (itemPosition: number): ToDoItem => {
        this.toDoItemList?.at?(itemPosition).e
    } */

    constructor(toDoItemList : Array<ToDoItem> = [],
                dateFilter : DateFilter = new DateFilter()) {
        this.toDoItemList = toDoItemList;
        this.dateFilter = dateFilter;
    }
    emptyList = () => this.toDoItemList = [];
    count = () : number | undefined => {
        if (this.toDoItemList !== null && this.toDoItemList !== undefined)
            return this.toDoItemList!.length
    }
    isEmpty = () : Boolean | undefined => {
        if (this.count() !== undefined)
            return this.count()! > 0
    }

    editItem = (itemPosition: number, newName : String,
                newStatus : ToDoItemStatus, newDate : Date):
        ToDoItem | undefined => {
        if (itemPosition !== null && itemPosition !== undefined && this.count()! > 0) {
            const item: ToDoItem = (this.toDoItemList?.at(itemPosition)! as ToDoItem);
            item.editItem(newName, newStatus, newDate);
            return item;
        }
    }
}