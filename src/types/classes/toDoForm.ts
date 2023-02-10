import {ToDoItemStatus} from "../enumerations/toDoItemStatus";
import {ToDoItem} from "./toDoItem";
import {FormType} from "../enumerations/formType";

export class ToDoForm /*implements ItemActions*/ {
    toDoItem? : ToDoItem;
    formType? : FormType;
    isEditing? : Boolean;
    dialog? : HTMLDialogElement;
    isModal? : Boolean;
    editItem(): ToDoForm {
        const editForm : ToDoForm = new ToDoForm();
        editForm.formType = FormType.EDIT;
        editForm.isEditing = true;
        return editForm;
    }
    removeItem = (): ToDoForm => {
        const removeForm : ToDoForm = new ToDoForm();
        removeForm.formType = FormType.REMOVE;
        removeForm.isEditing = false;
        return removeForm;
    }
    addItem = (): ToDoForm => {
        const addForm : ToDoForm = new ToDoForm();
        addForm.formType = FormType.ADD;
        addForm.isEditing = false;
        return addForm;
    }
    cancelForm = () => {
        this.dialog?.close();
    }
    openForm = () => {
        this.isModal ? this.dialog?.showModal() : this.dialog?.show();
    }
    submitForm = () => {
        switch (this.formType)
        {
            case FormType.ADD:
                this.addItem();
                this.cancelForm();
                break;
            case FormType.REMOVE:
                this.removeItem();
                this.cancelForm();
                break;
            case FormType.EDIT:
                this.editItem();
                this.cancelForm();
        }
    }
    constructor(toDoItem : ToDoItem = new ToDoItem(),
                formType : FormType = FormType.ADD,
                isEditing : Boolean = false,
                isModal : Boolean = true,
                dialog : HTMLDialogElement = new HTMLDialogElement()) {
        this.toDoItem = toDoItem;
        this.formType = formType;
        this.isEditing = isEditing;
        this.isModal = isModal;
        this.dialog = dialog;
    }
}