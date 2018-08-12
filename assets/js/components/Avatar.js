import React, { Fragment } from 'react';
import { Avatar } from '@material-ui/core';

const CustomAvatar = ({ src, fallback }) => (
  <Fragment>
    {src ? (
      <Avatar src={`/uploads/${face}`} />
    ) : (
      <Avatar>{fallback}</Avatar>
    )}
  </Fragment>
);

export default CustomAvatar;
