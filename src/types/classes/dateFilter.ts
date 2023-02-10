import {DateFilters} from "../interfaces/dateFilters";
import {DateFilterType} from "../enumerations/dateFilterType";

export class DateFilter {
    dateFilterType? : DateFilterType;
    date1? : Date;
    date2?: Date;
    isModal?: Boolean;
    dialog?: HTMLDialogElement
    cancelForm = () => {
        this.dialog?.close();
    }
    openForm = () => {
        this.isModal ? this.dialog?.showModal() : this.dialog?.show();
    }
    submitForm = () => {

    }
    constructor(dateFilterType : DateFilterType = DateFilterType.EXACT,
                date1: Date = new Date(Date.now().toString()),
                date2: Date = new Date(Date.now().toString()),
                isModal : Boolean = true,
                dialog = new HTMLDialogElement()) {
        this.dateFilterType = dateFilterType;
        this.date1 = date1;
        this.date2 = date2;
        this.isModal = isModal;
        this.dialog = dialog;
    }
}