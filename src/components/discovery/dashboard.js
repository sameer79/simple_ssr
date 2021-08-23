import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import BaseContainer from '../../container/base_container'
import UiState from '../common/ui_state';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
export default class Dashboard extends Component {
  _vName = 'c_discovery_dashboard';
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0
    }
    this.restoreState();
  }

  restoreState() {
    let data = UiState.getStateData(this._vName)
    if(!data) {
      return;
    }
    Object.assign(this, {
      state: data.state
    });
  }

  componentWillUnmount() {
    let {state, _vName} = this;
    let data = JSON.stringify({state});
    UiState.saveState(_vName, data);
  }
  
  handleChange = (event, newValue) => {
    this.setState({activeTab: newValue})
  }

  render() {
    return (
      <BaseContainer>
        <Grid item sm={10}>
          <Box py={1} display="flex" justifyContent="space-between">
            <Typography variant="h4" component="span">Discovery Dashboard</Typography>
          </Box>
          <Tabs
            value={this.state.activeTab}
            indicatorColor="primary"
            textColor="primary"
            onChange={this.handleChange}
            aria-label="disabled tabs example"
          >
            <Tab label="Tab 1" />
            <Tab label="Tab 2" />
          </Tabs>
          <TabPanel value={this.state.activeTab} index={0}>
            Item One
          </TabPanel>
          <TabPanel value={this.state.activeTab} index={1}>
            Item two
          </TabPanel>
        </Grid>
      </BaseContainer>
    )
  }
}
