import React, { Fragment } from 'react';
import { Avatar } from '@material-ui/core';

const CustomAvatar = ({ src, fallback }) => (
  <>
    {src ? (
      <Avatar src={`/uploads/${face}`} />
    ) : (
      <Avatar>{fallback}</Avatar>
    )}
  </>
);

export default CustomAvatar;
