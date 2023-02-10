import {ComponentProps, useRef, useState} from "react";
import {ToDoForm as TDF} from "../../types/classes/toDoForm";
import {FormType} from "../../types/enumerations/formType";

export const ToDoForm = (props: ComponentProps<any>) => {
    const [toDoForm, setToDoForm] = useState(new TDF());
    const [toDoItem, setToDoItem] = useState(toDoForm.toDoItem);
    const [formType, setFormType] = useState(toDoForm.formType);
    const [isEditing, setIsEditing] = useState(toDoForm.isEditing);
    const [itemPosition, setItemPosition] = useState(props.itemPosition);
    const [isModal, setIsModal] = useState(true);
    const dialog = useRef(null);
    const form = useRef(null);
    const remove = () => {
        setFormType(FormType.REMOVE);
        setIsEditing(false);
        setToDoForm(new TDF(toDoItem, formType, isEditing));
        setItemPosition(props.itemPosition);
        setIsModal(true);
        return toDoForm;
    }
    const add = () => {
        setFormType(FormType.ADD);
        setIsEditing(false);
        setToDoForm(new TDF(toDoItem, formType, isEditing));
        setItemPosition(props.itemPosition);
        setIsModal(true)
        return toDoForm;
    }
    const edit = () => {
        setFormType(FormType.EDIT)
        setIsEditing(true);
        setToDoForm(new TDF(toDoItem, formType, isEditing));
        setItemPosition(props.itemPosition);
        setIsModal(true);
        return toDoForm;
    }

    const generateForm = (formType? : FormType) : JSX.Element => {
        let form: JSX.Element = new Element();
        switch (formType) {
            case FormType.REMOVE:
                form = (
                    <dialog open aria-modal={"true"} ref={dialog}>
                        <header role={"contentinfo"}>
                            <h1 aria-level={1}>Delete todo</h1>
                        </header>
                        <main role={"main"}>
                            <h6 aria-level={6}>Are you sure that you want to delete this item? </h6>
                        </main>
                        <footer role={"menu"}>
                            <menu role={"menubar"}>
                                <input type={"submit"} name={"delete"} id={"delete"} value={"Delete"}
                                        onClick={() => toDoForm.submitForm()}/>
                                <input type={"button"} name={"cancel"} id={"cancel"} value={"Cancel"}
                                        onClick={() => toDoForm.cancelForm()}/>
                            </menu>
                        </footer>
                    </dialog>
                );
                break;
            case FormType.ADD:
                form = (
                    <dialog aria-modal={"true"} open ref={dialog}>
                        <header role={"contentinfo"}>
                            <h1 aria-level={1}>Add todo</h1>
                        </header>
                        <main role={"main"}>
                            <form method={"dialog"} acceptCharset={"UTF-8"} id={"addTodo"} ref={form}>
                                <fieldset name={"addTodo"} form={"addTodo"} aria-describedby={"legend"} role={"region"}>
                                    <legend id={"legend"} role={"note"}>Add todo</legend>
                                    <div role={"group"}>
                                        <label htmlFor={"name"} id={"nameLabel"} role={"complementary"}>Name</label>
                                        <input type={"text"} inputMode={"text"} minLength={3} maxLength={500} size={500}
                                               name={"name"} id={"name"} placeholder={"Name"}
                                               required autoFocus aria-labelledby={"nameLabel"} aria-required={"true"}
                                               aria-placeholder={"Name"} aria-label={"Enter todo name"}/>
                                    </div>
                                    <div role={"group"}>
                                        <label htmlFor={"date"} id={"dateLabel"} role={"complementary"}>Date</label>
                                        <input type={"date"} inputMode={"text"} name={"date"} id={"date"} placeholder={"Date"} required
                                               aria-labelledby={"dateLabel"} aria-placeholder={"Date"}
                                               aria-label={"Enter todo date"} aria-required={"true"}/>
                                    </div>
                                    <div role={"group"}>
                                        <label htmlFor={"status"} role={"complementary"}>Status</label>
                                        <div role={"radiogroup"} id={"status"}>
                                            <input type={"radio"} name={"status"} value={"Active"}
                                                   checked aria-checked={"true"}/>
                                            <input type={"radio"} name={"status"} value={"Completed"}/>
                                        </div>
                                    </div>
                                </fieldset>
                            </form>
                        </main>
                        <footer role={"menu"}>
                            <menu role={"menubar"}>
                                <input type={"submit"} name={"save"} id={"save"} value={"Save"}
                                       onClick={() => toDoForm.submitForm()}/>
                                <input type={"button"} name={"cancel"} id={"cancel"} value={"Cancel"}
                                        onClick={() => toDoForm.cancelForm()}/>
                            </menu>
                        </footer>
                    </dialog>
                );
                break;
            case FormType.EDIT:
                form = (
                    <dialog aria-modal={"true"} open ref={dialog}>
                        <header role={"contentinfo"}>
                            <h1 aria-level={1}>Edit todo</h1>
                        </header>
                        <main>
                            <form method={"dialog"} acceptCharset={"UTF-8"} id={"editTodo"}>
                                <fieldset name={"editTodo"} form={"editTodo"} aria-describedby={"legend"} role={"region"}>
                                    <legend id={"legend"} role={"note"}>Edit todo</legend>
                                    <div role={"group"}>
                                        <label htmlFor={"name"} id={"nameLabel"} role={"complementary"}>Name</label>
                                        <input type={"text"} inputMode={"text"} minLength={3} maxLength={500} size={500} name={"name"} id={"name"}
                                               required value={props.todo.name} autoFocus aria-required={"true"}
                                               aria-labelledby={"nameLabel"} aria-placeholder={"Name"} aria-label={"Enter todo name"}/>
                                    </div>
                                    <div role={"group"}>
                                        <label htmlFor={"date"} id={"dateLabel"} role={"complementary"}>Date</label>
                                        <input type={"date"} inputMode={"text"} name={"date"} id={"date"} required value={props.todo.date}
                                               aria-labelledby={"dateLabel"} aria-placeholder={"Date"}
                                               aria-label={"Enter todo date"} aria-required={"true"}/>
                                    </div>
                                    <div role={"group"}>
                                        <label htmlFor={"status"}>Status</label>
                                        <div role={"radiogroup"}>
                                            <input type={"radio"} name={"status"} value={"Active"}
                                                   checked={props.todo.status === "Active"} aria-checked={props.todo.status === "Active"}/>
                                            <input type={"radio"} name={"status"} value={"Completed"}
                                                   checked={props.todo.status === "Completed"} aria-checked={props.todo.status === "Completed"}/>
                                        </div>
                                    </div>
                                </fieldset>
                            </form>
                        </main>
                        <footer role={"menu"}>
                            <menu role={"menubar"}>
                                <input type={"submit"} name={"update"} id={"update"} value={"Update"}
                                       onClick={() => toDoForm.submitForm()}/>
                                <input type={"button"} name={"cancel"} id={"cancel"} value={"Cancel"}
                                        onClick={() => toDoForm.cancelForm()}/>
                            </menu>
                        </footer>
                    </dialog>
                );
                break;
        }
        return form;
    }
}