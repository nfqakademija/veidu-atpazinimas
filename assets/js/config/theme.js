import { createMuiTheme } from '@material-ui/core/styles/index';
import { colors } from '@material-ui/core/index';

export default createMuiTheme({
  palette: {
    primary: {
      main: '#4768FD',
      dark: '#3C54FE',
      light: '#C8D2FE',
    },
    secondary: colors.orange,
    action: {
      active: '#C8D2FE',
    },
  },
});
