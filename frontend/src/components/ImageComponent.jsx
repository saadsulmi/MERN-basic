import React from 'react';

const ImageComponent = ({ userProfile }) => (
  <img
    src={userProfile.image ? userProfile.image : 'https://cdn-icons-png.flaticon.com/512/666/666201.png'}
    alt="Profile Image"
  />
);

export default ImageComponent;
