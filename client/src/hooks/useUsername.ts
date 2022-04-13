import { useState } from 'react';

export function useUsername() {
  const getUsername = () => {
    const usernameString = localStorage.getItem('username');
    const username = JSON.parse(usernameString!);
    return username?.username;
  };

  const [username, setUsername] = useState(getUsername());

  const saveUsername = (username: { username: string }) => {
    localStorage.setItem('username', JSON.stringify(username));
    setUsername(username.username);
  };

  const removeUsername = () => {
    localStorage.removeItem('username');
  };

  return {
    username: username,
    setUsername: saveUsername,
    unsetUsername: removeUsername,
  };
}
