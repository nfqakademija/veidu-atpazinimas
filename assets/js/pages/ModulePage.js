import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ModuleList } from '../../components';
import { fetchAction, createAction, selectList } from 'modules/modules';
import { createLoadingSelector } from '../../modules';

class ModuleListContainer extends Component {
  componentDidMount() {
    this.props.fetch();
  }

  render() {
    const { modules, loading } = this.props;
    return (
      <>
        <Header />
        <ModuleList modules={modules} loading={loading} />
      </>
    );
  }
}

const mapStateToProps = state => ({
  modules: selectList(state) || [],
  loading: !state.modules.index.length,
});

const mapDispatchToProps = dispatch => ({
  fetch: () => dispatch(fetchAction()),
  create: () => dispatch(createAction()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModuleListContainer);
