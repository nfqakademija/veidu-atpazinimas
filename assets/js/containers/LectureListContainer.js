import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { fetchLecturesIfNeeded } from '../actions/lectureActions';
import { LectureList } from '../components';
import { Header } from '../components/common';

class LectureListContainer extends Component {
  static propTypes = {
    lectures: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired,
  };

  componentWillMount() {
    const {dispatch} = this.props;
    dispatch(fetchLecturesIfNeeded());
  }

  render() {
    return (
        <div>
          <Header title="Attendance"/>
          <LectureList {...this.props}/>
        </div>
    );
  }
}

const mapStateToProps = state => ({
  lectures: state.lectures.lectures,
  isFetching: state.lectures.isFetching,
  error: state.lectures.error,
});

export default connect(mapStateToProps)(LectureListContainer);