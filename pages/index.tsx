import type {tasks} from '@prisma/client';

import React from 'react';
import Head from 'next/head';

export default function Home() {
  const [todos, setTodos] = React.useState<tasks[]>([]);
  React.useEffect(() => {
    fetch('/api/todos')
      .then(res => res.json())
      .then(data => setTodos(data))
      .catch(e => console.log(e));
  }, []);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>MY TODO APP</h1>
        <ul>
          {todos.map(todo => {
            return (
              <li>
                <h2>{todo.title}</h2>
                <p>{todo.content}</p>
              </li>
            );
          })}
        </ul>
      </main>
    </>
  );
}
