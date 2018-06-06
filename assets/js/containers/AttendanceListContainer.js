import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { AttendanceList } from '../components';
import {
  fetchAttendances,
  selectLecture,
  attendancesLoaded,
  uploadPhoto,
} from '../redux/modules/lectures';

class AttendanceListContainer extends Component {
  componentDidMount() {
    const { lectureId } = this.props;
    this.props.fetch(lectureId);
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

const mapStateToProps = (state, { match }) => {
  const { lectureId } = match.params;
  return {
    lectureId,
    lecture: selectLecture(state, lectureId),
    loading: !attendancesLoaded(state, lectureId),
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
