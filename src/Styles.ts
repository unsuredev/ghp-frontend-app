
import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';

export const THEME = createMuiTheme({
    palette: {
        primary: {
            main: "#004e8e",
            contrastText: "#ffffff",
        },
        secondary: {
            main: "#df1913",
            contrastText: "#ffffff",
        },
    },
});