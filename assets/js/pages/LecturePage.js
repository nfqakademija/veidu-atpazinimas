import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { Button } from '@material-ui/core';
import { Search } from '@material-ui/icons';

import Header from 'components/layouts/Header';
import FloatingActionButton from 'components/FloatingActionButton';

import { LectureForm, LectureList } from './lectures/*';
import { listAction, createAction, selectList, isListLoading } from 'modules/lectures';

class LecturePage extends Component {
  state = {
    search: false,
    form: false,
  };

  componentDidMount() {
    const { fetch } = this.props;
    fetch();
  }

  handleOpen = name => () =>
    this.setState({
      [name]: true,
    });

  handleClose = name => () =>
    this.setState({
      [name]: false,
    });

  render() {
    const { lectures, loading, create } = this.props;
    const { search, form } = this.state;

    return (
      <Fragment>
        <Header title="Lectures">
          <Button onClick={this.handleOpen('search')}>
            <Search />
          </Button>
        </Header>

        {/* <Drawer open={search} onClose={this.handleClose('search')}>
          Search
        </Drawer> */}

        <LectureList lectures={lectures} loading={loading} />

        <FloatingActionButton onClick={this.handleOpen('form')} />

        <LectureForm
          create={create}
          open={form}
          onClose={this.handleClose('form')}
        />

        {/* <Snackbar resource="lectures"/> */}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  lectures: selectList(state) || [],
  loading: isListLoading(state),
});

const mapDispatchToProps = dispatch => ({
  fetch: () => dispatch(listAction()),
  create: () => dispatch(createAction()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LecturePage);
