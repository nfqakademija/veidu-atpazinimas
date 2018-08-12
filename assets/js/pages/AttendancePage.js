import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { AddAPhoto } from '@material-ui/icons';

import Header from 'components/layouts/Header';
import FloatingActionButton from 'components/FloatingActionButton';

import AttendanceList from './attendances/AttendanceList';
import {
  showAction,
  uploadPhoto,
  selectItem,
  isItemLoading,
} from 'modules/lectures';

class AttendancePage extends Component {
  componentDidMount() {
    const { fetch, lectureId } = this.props;
    fetch(lectureId);
  }

  render() {
    const { lectureId, lecture, loading, upload } = this.props;

    return (
      <Fragment>
        <Header title={(lecture && lecture.title) || 'Lecture'} />

        <AttendanceList
          attendances={(lecture && lecture.attendances) || []}
          loading={loading}
        />

        <input
          id="upload-photo"
          type="file"
          accept="image/*"
          onChange={e => upload(lectureId, e.target.files[0])}
          style={{ display: 'none' }}
        />
        <label htmlFor="upload-photo">
          <FloatingActionButton icon={<AddAPhoto />} />
        </label>
      </Fragment>
    );
  }
}

const mapStateToProps = (
  state,
  {
    match: {
      params: { lectureId },
    },
  }
) => (
  (lectureId = +lectureId),
  {
    lectureId,
    lecture: selectItem(state, lectureId),
    loading: isItemLoading(state, lectureId),
  }
);

const mapDispatchToProps = dispatch => ({
  fetch: id => dispatch(showAction(id)),
  upload: (id, file) => dispatch(uploadPhoto(id, file)),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AttendancePage)
);
