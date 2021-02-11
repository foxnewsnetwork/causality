import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import red from '@material-ui/core/colors/red';

export default createMuiTheme({
  palette: {
    primary: {
      main: '#880e4f',
      light: '#9f3e72',
      dark: '#5f0937',
      contrastText: '#fff',
    },
    secondary: {
      main: '#1a237e',
      light: '#474f97',
      dark: '#121858',
      contrastText: '#000',
    },
  },
  overrides: {
    // https://material-ui.com/api/list-item/#css
    MuiListItem: {
      root: {
        backgroundColor: purple[900],
        "&$selected": {
          backgroundColor: red[900],
        },
      },
    },
    // https://material-ui.com/api/list-item-text/#css
    MuiListItemText: {
      primary: {
        color: '#fff',
      },
      secondary: {
        color: '#ff0',
      },
    },
    // Style sheet name ⚛️
    MuiButton: {
      // Name of the rule
      text: {
        // Some CSS
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      },
    },
  },
});
