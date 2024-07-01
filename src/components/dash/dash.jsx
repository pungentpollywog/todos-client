import List from "../list/list";
import { useState } from "react";
import "./dash.css";

export default function Dash() {
  const [listName, setListName] = useState("");
  const [lists, setLists] = useState([]);

  function addList() {
    if (listName.length) {
      setLists((lists) => [...lists, { name: listName, tasks: [], id: crypto.randomUUID() }]);
      setListName("");
    }
  }

  function removeList(id) {
    setLists((lists) => lists.filter((list) => list.id !== id));
  }

  function addListOnEnter(ev) {
    if (ev.key === "Enter") {
      addList();
    }
  }

  return (
    <>
      <div className="dash">
        {lists.map((list) => (
          <List key={list.id} name={list.name} items={list.tasks} deleteList={() => removeList(list.id)} />
        ))}
      </div>
      <div className="controls">
        <input
          type="text"
          placeholder="new list name"
          value={listName}
          onChange={(ev) => setListName(ev.target.value)}
          onKeyDown={addListOnEnter}
        />
        <button onClick={addList} disabled={listName.length === 0}>
          Create List
        </button>
      </div>
    </>
  );
}
