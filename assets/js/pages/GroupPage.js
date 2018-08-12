import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ModuleList } from '../../components';
import { fetchModules, selectModules } from '../../modules/modules';
import { createLoadingSelector } from "../../modules";

class ModuleListContainer extends Component {
  componentDidMount() {
    this.props.fetch();
  }

  render() {
    const { modules, loading } = this.props;
    return <ModuleList modules={modules} loading={loading} />;
  }
}

const modulesLoadingSelector = createLoadingSelector(['FETCH_MODULES']);

const mapStateToProps = state => ({
  modules: selectModules(state),
  loading: modulesLoadingSelector(state),
});

const mapDispatchToProps = dispatch => ({
  fetch: () => dispatch(fetchModules()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModuleListContainer);
