import React, { useEffect, useState } from "react";
import axios from "axios";
import UserCardData from "./UserCardData";

const UserCards = () => {
  const [users, setUsers] = useState([]);
  //fetch users and their related posts
  const fetchUsersAndPosts = async () => {
    try {
      const userResponse = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      const postResponse = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const userData = userResponse.data.map((user) => {
        const userPosts = postResponse.data.filter(
          (post) => post.userId === user.id
        );
        return {
          ...user,
          postCount: userPosts.length,
        };
      });
      setUsers(userData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUsersAndPosts();
  }, []);
  return (
    <div className="user-directory">
      <h4 className="directory-title">Directory</h4>
      <UserCardData users={users} />
    </div>
  );
};

export default UserCards;
