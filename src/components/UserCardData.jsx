import React from "react";
import { Link } from "react-router-dom";

const UserCardData = ({ users }) => {
  return (
    //User Card data component
    <div className="user-cards">
      {users.map((user) => (
        <Link to={`/user/${user.id}`} className="user-card-link">
          <div key={user.id} className="user-card">
            <div className="user-info">
              <p className="user-name">Name: {user.name}</p>
              <p className="post-count">
                Posts: <span>{user.postCount}</span>
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default UserCardData;
