import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import UserModel from "../models/User";

interface UserResponse {
  username: string;
  name: string;
  url: string;
}

export default function Conversations() {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState<UserResponse[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch("http://127.0.0.1:8000/api/users/all/", {
        headers: {
          Authorization: `Token ${user?.token}`,
        },
      });
      const data = await res.json();
      setUsers(data);
    }
    fetchUsers();
  }, [user]);

  function createConversationName(username: string) {
    const namesAlph = [user?.username, username].sort();
    return `${namesAlph[0]}__${namesAlph[1]}`;
  }

  return (
    <div>
    {Object.values(users)
      .filter(( UserModel) => UserModel.username !== user?.username)
      .map((UserModel) => (
        <Link to={`chats/${createConversationName(UserModel.username)}`}>
          <div key={UserModel.username}>{UserModel.username}</div>
        </Link>
      ))}
    </div>
  );
}