"use client";

import { trpc } from './utils/trpc';
import { useState } from 'react';

const Home = () => {
  const { data: lists, refetch } = trpc.getLists.useQuery();
  const createList = trpc.createList.useMutation({
    onSuccess: () => refetch(),
  });

  const [listName, setListName] = useState('');

  const handleCreateList = () => {
    createList.mutate({ name: listName });
    setListName('');
  };

  return (
    <div>
      <h1>Kanban Board</h1>
      <input
        type="text"
        value={listName}
        onChange={(e) => setListName(e.target.value)}
        placeholder="New list name"
      />
      <button onClick={handleCreateList}>Create List</button>
      {lists?.map((list) => (
        <div key={list.id}>
          <h2>{list.name}</h2>
          <ul>
            {list.items.map((item) => (
              <li key={item.id}>{item.title}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Home;
