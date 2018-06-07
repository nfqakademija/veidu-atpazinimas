import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { StudentList } from '../components';
import {
  fetchStudents,
  selectStudentsInGroup,
  studentsLoaded,
  addStudent,
} from '../redux/modules/students';
import { createLoadingSelector } from '../redux/modules';

class StudentListContainer extends Component {
  componentDidMount() {
    const { moduleId, groupId } = this.props;

    if (moduleId !== undefined) this.props.fetch({ module: moduleId });
    if (groupId !== undefined) this.props.fetch({ group: groupId });
  }

  render() {
    const { addStudent, students, loading, groupId } = this.props;
    return (
      <StudentList students={students} loading={loading} addStudent={addStudent(groupId)} />
    );
  }
}

const moduleLoadingSelector = createLoadingSelector([
  'FETCH_STUDENTS_IN_MODULE',
]);
const groupLoadingSelector = createLoadingSelector(['FETCH_STUDENTS_IN_GROUP']);

const mapStateToProps = (state, { match }) => {
  const { moduleId, groupId } = match.params;

  // if (moduleId !== undefined)
  //   return ({
  //     moduleId,
  //     students: selectStudentsInModule(state, moduleId),
  //     loading: moduleLoadingSelector(state, moduleId),
  //   });
  if (groupId !== undefined)
    return {
      groupId,
      students: selectStudentsInGroup(state, groupId),
      loading: groupLoadingSelector(state),
    };
};

const mapDispatchToProps = dispatch => ({
  fetch: id => dispatch(fetchStudents(id)),
  addStudent: groupId => student => dispatch(addStudent(groupId, student)),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(StudentListContainer)
);
