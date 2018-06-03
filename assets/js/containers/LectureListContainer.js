import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchLectures } from '../redux/modules/lectures';
import { LectureList } from '../components';

class LectureListContainer extends Component {
  componentDidMount() {
    this.props.fetch();
  }

  render() {
    return <LectureList {...this.props}/>;
  }
}

const mapStateToProps = state => ({
  lectures: state.entities.lectures,
});

const mapDispatchToProps = dispatch => ({
  fetch: () => dispatch(fetchLectures()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(LectureListContainer);
