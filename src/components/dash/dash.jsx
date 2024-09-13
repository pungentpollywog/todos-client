import List from '../list/list';
import { useState } from 'react';
import './dash.css';

import { useLocalStorage } from '../../hooks/useLocalStorage';

export default function Dash() {
  const [listName, setListName] = useState('');
  const [lists, setLists] = useLocalStorage([], 'todos-app-dashboard');

  function addList() {
    const newList = {
      tasks: [], 
      id: crypto.randomUUID()
    };
    
    if (listName) {
      newList.name = listName;
    }

    setLists((lists) => [...lists, newList]);
    setListName('');
  }

  function removeList(id) {
    setLists((lists) => lists.filter((list) => list.id !== id));
  }

  function updateList(list, fields) {
    const updatedList = { ...list, ...fields};
    const idx = lists.findIndex(_list => _list.id === list.id);
    if (idx !== -1) {
      setLists(currentLists => {
        return currentLists.toSpliced(idx, 1, updatedList);
      });
    }
  }

  function addListOnEnter(ev) {
    if (ev.key === 'Enter') {
      addList();
    }
  }
  return (
    <>
      <div className="dash">
        {lists.map((list) => (
          <List
            key={list.id}
            list={list}
            updateList={updateList}
            deleteList={() => removeList(list.id)}
          />
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
        {/* <button onClick={addList} disabled={listName.length === 0}> */}
        <button onClick={addList}>Create List</button>
      </div>
    </>
  );
}
