import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { AttendanceList } from '../components';
import {
  fetchAttendances,
  selectLecture,
  uploadPhoto,
} from '../redux/modules/lectures';
import { createLoadingSelector } from '../redux/modules';

class AttendanceListContainer extends Component {
  componentWillMount() {
    const { lectureId, fetch } = this.props;
    fetch(lectureId);
  }

  render() {
    const { lectureId, lecture, loading, upload } = this.props;
    return (
      <AttendanceList
        lecture={lecture}
        loading={loading}
        upload={upload(lectureId)}
      />
    );
  }
}

const attendancesLoadingSelector = createLoadingSelector(['FETCH_ATTENDANCES']);

const mapStateToProps = (state, { match }) => {
  const { lectureId } = match.params;

  return {
    lectureId,
    lecture: selectLecture(state, lectureId),
    loading:
      attendancesLoadingSelector(state) ||
      !(
        state.entities.lectures[lectureId] &&
        state.entities.lectures[lectureId].attendances
      ),
  };
};

const mapDispatchToProps = dispatch => ({
  fetch: id => dispatch(fetchAttendances(id)),
  upload: id => file => dispatch(uploadPhoto(id, file)),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AttendanceListContainer)
);
