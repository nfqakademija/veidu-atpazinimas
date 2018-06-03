import React from 'react';

import { connect } from 'react-redux';

import { fetchAttendancesIfNeeded, invalidateAttendances } from '../redux/modules/attendances';
import { StudentList } from '../components';

const mapStateToProps = state => ({
  lectures: state.lectures.lectures,
  loading: state.lectures.loading,
  error: state.lectures.error,
});

const mapDispatchToProps = dispatch => ({
  fetch: () => dispatch(fetchAttendancesIfNeeded()),
  invalidate: () => dispatch(invalidateAttendances()),
});

export default connect(mapStateToProps, mapDispatchToProps)(StudentList);
