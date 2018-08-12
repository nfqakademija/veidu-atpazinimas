import React from 'react';

import BottomNav from './BottomNav';

const Layout = props => {
  const { classes } = props;

  return (
    <div>
      {props.content}
      <BottomNav nav={props.nav} />
    </div>
  );
};

export default Layout;
