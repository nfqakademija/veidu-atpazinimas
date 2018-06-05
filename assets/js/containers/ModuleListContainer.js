import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ModuleList } from '../components';
import { fetchModules, selectModules } from '../redux/modules/modules';

class ModuleListContainer extends Component {
  componentDidMount() {
    this.props.fetch();
  }

  render() {
    const {modules, loading} = this.props;
    return <ModuleList modules={modules} loading={loading}/>;
  }
}

const mapStateToProps = state => ({
  modules: selectModules(state),
  loading: !state.index.modules.length || !state.index.groups.length,
});

const mapDispatchToProps = dispatch => ({
  fetch: () => dispatch(fetchModules()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ModuleListContainer);
