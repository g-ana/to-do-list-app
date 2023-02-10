import React, {Component, ComponentProps, ReactElement, ReactNode, useState} from "react";
import {FieldType} from "../../types/enumerations/fieldType";
import {SortOrder} from "../../types/enumerations/sortOrder";
import {DateFilter} from "../../types/classes/dateFilter";
import {ToDoItemList as TDIL} from "../../types/classes/toDoItemList";
import {ToDoItem as TDI} from "../../types/classes/toDoItem";
import {ToDoItemStatus} from "../../types/enumerations/toDoItemStatus";
import {ToDoForm} from "../../types/classes/toDoForm";
import {ToDoItem} from "../ToDoItem/toDoItem";
import {ReactComponent} from "*.svg";

export const TodoItemsList = (props : ComponentProps<any>) => {
    const [todos, setTodos] = useState(/* [
        {
            text: "Learn React",
            name: "Task 1",
            status: "Active",
            date: new Date().toString(),
            isCompleted: false
        },
        {
            text: "Learn Hooks",
            name: "Task 2",
            status: "Active",
            date: new Date().toString(),
            isCompleted: false
        },
        {
            text: "Build a Todo List app",
            name: "Task 3",
            status: "Active",
            date: new Date().toString(),
            isCompleted: false
        }
    ] */
        new TDIL());

    const [sortFieldType, setSortFieldType] = useState(FieldType.NAME);
    const [sortOrder, setSortOrder] = useState(SortOrder.ASC);
    const [filterFieldType, setFilterFieldType] = useState(FieldType.NAME);
    const [dateFilter, setDateFilter] = useState(new DateFilter());
    const [index, setIndex] = useState(props.itemPosition);
/*    const addToDo = () => {
        return new ToDoForm().addItem(props.name, props.status, props.date);
    }
       const removeToDo = () => {
           return new ToDoForm().removeItem();
       }
    const editToDo = () => {
        return new ToDoForm().editItem(props.name, props.status, props.date);
    } */

    const [sortMethod, setSortMethod] = useState({
        field: 'name',
        order: 'asc'
    });

    const [filterName, setFilterName] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    const [filterDate, setFilterDate] = useState(null);
    const [filterDateType, setFilterDateType] = useState('exact');
    const [startDate, setStartDate] = useState(new Date(Date.now().toString()));
    const [endDate, setEndDate] = useState(new Date(Date.now().toString()));

    const addTodo = () => {
        const newTodos = new TDIL([
            ...todos.toDoItemList as Array<TDI>,
            new TDI(`Task ${todos.toDoItemList?.length! + 1} `,
            ToDoItemStatus.Active,
            new Date(Date.now().toString()))]);
        setTodos(newTodos);
    };

    const completeTodo = (index: number) => {
        const newTodos = new TDIL([...todos.toDoItemList as Array<TDI>]);
    //    (newTodos?.at(index?).isCompleted = true;
        if (index !== null && index !== undefined && index < newTodos.count()!)
            (newTodos?.toDoItemList?.at(index)! as TDI).completeItem();
        setTodos(newTodos);
    };
    const removeToDo = (index: number) => {
        const newTodos = new TDIL([...todos.toDoItemList as Array<TDI>]);
        newTodos.removeItem(index);
        setTodos(newTodos);
    };

    const updateTodo = (index: number, newName: string) => {
        const newTodos = new TDIL([...todos.toDoItemList as Array<TDI>]);
        if (index !== null && index !== undefined && index < newTodos.count()!)
            (newTodos?.toDoItemList?.at(index) as TDI).name = newName;
        setTodos(newTodos);
    };
    const getItemList = () : ReactNode => {
        const todos = [...props.todos];
        todos.map((todo, index) => {
            return (
                <ToDoItem key={index}
                  onEdit={() => updateTodo(props.itemIndex, props.name)}
                  onDelete={() => removeToDo(props.itemIndex)} todo={todo}/>
            ) as ReactNode;
        });
    }
    const sortTodos = (field: FieldType, order: SortOrder) => {
        setSortFieldType(field);
        setSortOrder(order);
        setSortMethod({field, order});
        setTodos(todos.sortList(field, order));
    }
    const filterTodos = (field : FieldType, dateFilter?: DateFilter) => {
        setFilterFieldType(field);
        if (filterFieldType === FieldType.DATE) {
            setDateFilter(dateFilter!);
            setFilterDateType(dateFilter?.dateFilterType!);
            setStartDate(new Date(dateFilter?.date1!));
            setEndDate(dateFilter?.date2 ? new Date(dateFilter?.date2) : new Date(Date.now().toString()));
        }
    }
    return (
    /*    <TodoItemsList todoItemList = {props.todos}
                       sortFieldType = {props.sortFieldType} sortOrder = {props.sortOrder}
                       filterFieldType = {props.filterFieldType} dateFilterType = {props.dateFilterType}
                       startDate = {props.startDate} endDate = {props.endDate}/> */
        (todos.isEmpty() && props.todos.length === 0) ?
            (
                <>
                    <h6 aria-level={6} style={{color: "green"}}>Everything is completed! Your todo list is empty.</h6>
                    <button type={"button"} id={"addNewItem"} name={"addNewItem"}
                    onClick={() => new ToDoForm()}>Add a new todo item</button>
                </>
            )
            :
            (
                <>
                <template aria-busy={"true"} aria-atomic={"true"} aria-relevant={"all"} aria-live={"polite"}>

                    <table aria-colcount={5} aria-describedby={"tableDescription"}
                           aria-rowcount={props.todos.length} aria-sort={"none"}>
                        <caption id={"tableDescription"} role={"note"}>Todo list</caption>
                        <colgroup>
                            <col span={3} style={{backgroundColor: "grey"}}/>
                            <col style={{backgroundColor: "white"}}/>
                        </colgroup>
                        <thead>
                        <tr aria-rowindex={0} role={"rowheader"}>
                            <th scope={"col"} id={"name"} aria-colindex={1} role={"columnheader"}>Name</th>
                            <th scope={"col"} id={"date"} aria-colindex={2} role={"columnheader"}>Date</th>
                            <th scope={"col"} id={"status"} aria-colindex={3} role={"columnheader"}>Status</th>
                            <th scope={"col"} colSpan={2} id={"actions"} headers={"edit delete"}
                                aria-colspan={2} role={"columnheader"}>Actions
                            <button type={"button"}
                                onClick={() => todos.editItem(props.todo.index, props.todo.name, props.todo.status, props.todo.date)}>
                                Edit</button>
                            <button type={"button"}
                                    onClick={() => todos.removeItem(props.todo.index)}>Delete</button>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {getItemList}
                        </tbody>
                        <tfoot style={{backgroundColor: "yellow"}}>
                        <tr  role={"row"} id={"filters"}>
                            <td headers={"filters"} role={"cell"}>
                                <button type={"button"} id={"nameFilter"} onClick={() => filterTodos(FieldType.NAME)}
                                        name={"nameFilter"}>Filter by name</button>
                            </td>
                            <td headers={"filters"} role={"cell"}>
                                <button type={"button"} id={"dateFilter"} name={"dateFilter"}
                                        onClick={() => filterTodos(FieldType.DATE)}>Filter by date</button>
                            </td>
                            <td headers={"filters"} role={"cell"}>
                                <button type={"button"} id={"statusFilter"} name={"statusFilter"}
                                        onClick={() => filterTodos(FieldType.STATUS)}>Filter by status</button>
                            </td>
                        </tr>
                        </tfoot>
                    </table>

                    <button type={"button"} id={"addNewItem"} name={"addNewItem"} onClick={() => new ToDoForm()}>Add a new todo item</button>
                </template>
                </>
            )
    );
}