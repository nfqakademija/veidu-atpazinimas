import React from 'react';
import { Hidden } from '@material-ui/core';

import { Desktop, Mobile } from './*';
import Routes from 'components/Routes';

const Layout = ({routes, nav}) => (
    <>
        <Hidden mdUp>
            <Mobile content={<Routes routes={routes} />} nav={nav} />
        </Hidden>
        <Hidden smDown>
            <Desktop content={<Routes routes={routes} />} nav={nav} />
        </Hidden>
    </>
);

export default Layout
