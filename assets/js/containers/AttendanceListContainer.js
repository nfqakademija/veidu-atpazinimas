import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { AttendanceList } from '../components';
import { fetchAttendances } from '../redux/modules/attendances';

class AttendanceListContainer extends Component {
  componentDidMount() {
    const {lectureId} = this.props;
    
    this.props.fetch(lectureId);
  }

  render() {
    return <AttendanceList {...this.props}/>;
  }
}

const mapStateToProps = (state, {match}) => {
  const { lectureId } = match.params;
  return ({
    lectureId,
    lecture: state.entities.lectures[lectureId],
    attendances: state.entities.attendances
  });
};

const mapDispatchToProps = dispatch => ({
  fetch: (id) => dispatch(fetchAttendances(id)),
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps,
)(AttendanceListContainer));
