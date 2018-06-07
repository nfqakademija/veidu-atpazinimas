import React, { Component } from 'react';
import { connect } from 'react-redux';

import { LectureList } from '../components';
import { fetchLectures, selectLectures, addLecture } from '../redux/modules/lectures';
import { createLoadingSelector } from '../redux/modules';

class LectureListContainer extends Component {
  componentDidMount() {
    const { fetch } = this.props;
    fetch();
  }

  render() {
    const { lectures, loading, addLecture } = this.props;

    return <LectureList lectures={lectures} loading={loading} addLecture={addLecture} />;
  }
}

const lectureLoadingSelector = createLoadingSelector(['FETCH_LECTURES']);

const mapStateToProps = state => ({
  lectures: selectLectures(state),
  loading: lectureLoadingSelector(state),
});

const mapDispatchToProps = dispatch => ({
  fetch: () => dispatch(fetchLectures()),
  addLecture: lecture => dispatch(addLecture(lecture)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LectureListContainer);
