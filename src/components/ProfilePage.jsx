import React, { useState } from "react";

const ProfilePage = ({ userProfile, userPosts }) => {
  const [selectedPost, setSelectedPost] = useState(null);

  //handle post click
  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  //handle pop up close
  const closePopup = () => {
    setSelectedPost(null);
  };

  return (
    // user details and their posts
    <div className="user-details">
      <div className="profile">
        <h2 style={{ textAlign: "center" }}>Profile Page</h2>
        <div className="profile-info">
          <div className="name">
            <p>{userProfile.name}</p>
            <p>
              {userProfile.username} | {userProfile.company?.catchPhrase}
            </p>
          </div>
          <div className="address">
            <p>
              {userProfile.address?.city}, {userProfile.address?.street}
            </p>
            <p>
              {userProfile.email} | {userProfile.phone}
            </p>
          </div>
        </div>
      </div>
      <div className="user-posts">
        <div className="posts">
          {userPosts.map((post, index) => (
            <div
              key={index}
              className="post-card"
              onClick={() => handlePostClick(post)}
              onTouchStart={() => handlePostClick(post)}
            >
              <h3 className="post-title">{post.title}</h3>
              <p>{post.body}</p>
            </div>
          ))}
        </div>
      </div>
      {selectedPost && (
        <div className="post-popup-overlay" onClick={closePopup}>
          <div className="post-popup" onClick={(e) => e.stopPropagation()}>
            <h3 className="post-title">{selectedPost.title}</h3>
            <p>{selectedPost.body}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
