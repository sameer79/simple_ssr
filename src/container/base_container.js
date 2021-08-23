import React, {Component} from "react";
import Grid from '@material-ui/core/Grid';
import SideBar from '../components/side_bar'


export default class BaseContainer extends Component {
    render() {
        const {children} = this.props;
        return (
            <Grid container spacing={3}>
                <Grid item md={2}>
                    <SideBar {...this.props}/>
                </Grid>
                {children}
            </Grid>
        );
    }
}