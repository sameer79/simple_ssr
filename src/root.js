import React, {Component} from 'react';
import {hot} from 'react-hot-loader';
import { withRouter } from "react-router";
import {Provider} from 'mobx-react';
import { ThemeProvider } from '@material-ui/core/styles';

import {Routes} from './routers/routes';
import theme from './components/site/theme';


class Root extends Component {
    render () {
        return(
            <ThemeProvider theme={theme}>
                <Provider>
                {Routes()}
                </Provider>
          </ThemeProvider>
        )
    }
}

export default hot(module)(withRouter(Root));