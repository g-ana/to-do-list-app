import React from 'react';
import logo from './logo.svg';
import './App.css';
import {TodoItemsList} from "./components/ToDoItemsList/toDoItemsList";
import {FieldType} from "./types/enumerations/fieldType";
import {SortOrder} from "./types/enumerations/sortOrder";
import {DateFilter} from "./types/classes/dateFilter";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <main>
        <TodoItemsList todos={[]} sortFieldType={FieldType.NAME} sortOrder = {SortOrder.ASC}
                       filterFieldType={FieldType.NAME} dateFilter={new DateFilter()}/>
      </main>
    </div>
  );
}

export default App;
