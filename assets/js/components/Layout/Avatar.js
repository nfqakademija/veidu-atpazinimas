import React, { Fragment } from 'react';
import { Avatar } from '@material-ui/core';

const CustomAvatar = ({ face, name }) => (
  <Fragment>
    {face ? (
      <Avatar src={`/uploads/${face}`} />
    ) : (
      <Avatar>{getInitials(name)}</Avatar>
    )}
  </Fragment>
);

const getInitials = name => {
  const initials = name.match(/\b\w/g) || [];
  return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
};

export default CustomAvatar;
