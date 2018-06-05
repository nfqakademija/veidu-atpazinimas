import React, { Component } from 'react';
import { connect } from 'react-redux';

import { LectureList } from '../components';
import { fetchLectures, selectLectures } from '../redux/modules/lectures';

class LectureListContainer extends Component {
  componentDidMount() {
    this.props.fetch();
  }

  render() {
    const {lectures} = this.props;
    return <LectureList lectures={lectures}/>;
  }
}

const mapStateToProps = state => ({
  lectures: selectLectures(state),
  loading: !state.index.lectures.length
});

const mapDispatchToProps = dispatch => ({
  fetch: () => dispatch(fetchLectures()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(LectureListContainer);
