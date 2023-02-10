import {ComponentProps, useRef, useState} from "react";
import {ToDoItem as TDI} from "../../types/classes/toDoItem";
import {ToDoItemStatus} from "../../types/enumerations/toDoItemStatus";

export const ToDoItem = (props : ComponentProps<any>) => {
    const [toDoItem, setToDoItem] = useState(new TDI());
    const [name, setName] = useState(toDoItem.name);
    const [date, setDate] = useState(toDoItem.date);
    const [status, setStatus] = useState(toDoItem.status);
    const [itemPosition, setItemPosition] = useState(props.itemPosition);

    const editButton = useRef(null);
    const deleteButton = useRef(null);
    const itemList = useRef(null);
    const itemRow = useRef(null);
    const editItem = () => {
        const updatedItem : TDI = toDoItem.editItem(props.editedName, props.editedStatus, props.editedDate);
        setToDoItem(updatedItem);
        setName(updatedItem.name);
        setDate(updatedItem.date);
        setStatus(updatedItem.status);
        setItemPosition(props.itemPosition);
    }
    const removeItem = () => {
        setItemPosition(props.itemPosition);
    }

    return (
     /*   <ToDoItem itemPosition = {props.itemPosition} name = {props.name} status={props.status}
          date = {props.date} handleOnEdit={() => editItem()} handleOnRemove = {() => removeItem()}/> */
        <tr ref={itemRow}
            id={props.todo.name.replaceAll(" ", "-")} role={"row"}>
            <td aria-colindex={1} contentEditable={"true"} role={"cell"}>{props.todo.name}</td>
            <td aria-colindex={2} contentEditable={"true"} role={"cell"}>{props.todo.date}</td>
            <td aria-colindex={3} contentEditable={"true"} role={"cell"}>{props.todo.status}</td>
            <td colSpan={2} id={"actions"} headers={"edit delete"} aria-colspan={2} role={"cell"}>
                <td id={"actions"} role={"rowheader"} colSpan={2} aria-colspan={2}>
                    <td id={"edit"} headers={"actions"} aria-colindex={4} role={"cell"}>
                        <button type={"button"} id={"edit"} name={"edit"}
                                aria-controls={props.todo.name.replaceAll(" ", "-")} ref={editButton}
                                aria-haspopup={"dialog"} onClick={() => editItem()}>Edit</button>
                    </td>
                    <td id={"delete"} headers={"actions"} aria-colindex={5} contentEditable={true} role={"cell"}>
                        <button type={"button"} id={"delete"} name={"delete"}
                                aria-controls={props.todo.name.replaceAll(" ", "-")}
                                aria-haspopup={"dialog"} ref={deleteButton}
                                onClick={() => removeItem()}>Delete</button>
                    </td>
                </td>
            </td>
        </tr>
    )
}