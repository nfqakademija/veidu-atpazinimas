import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { AttendanceList } from '../components';
import { fetchAttendances, selectLecture, attendancesLoaded } from '../redux/modules/lectures';

class AttendanceListContainer extends Component {
  componentWillMount() {
    const {lectureId} = this.props;
    this.props.fetch(lectureId);
  }

  render() {
    const {lecture, loading} = this.props;
    return <AttendanceList lecture={lecture} loading={loading}/>;
  }
}

const mapStateToProps = (state, {match}) => {
  const {lectureId} = match.params;
  return ({
    lectureId,
    lecture: selectLecture(state, lectureId),
    loading: !attendancesLoaded(state, lectureId),
  });
};

const mapDispatchToProps = dispatch => ({
  fetch: (id) => dispatch(fetchAttendances(id)),
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps,
)(AttendanceListContainer));
