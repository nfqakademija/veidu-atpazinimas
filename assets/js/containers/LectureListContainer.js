import React, { Component } from 'react';
import axios from 'axios';
import { LectureList } from '../components';
import { Toolbar } from '../layouts';

class LectureListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      lectures: [],
    };
  }

  componentDidMount() {
    axios.get('/api/lectures')
        .then(({data}) => {
          for (let lecture of data) {
            lecture.start = parseTime(lecture.start);
          }

          this.setState({
            isLoaded: true,
            lectures: data,
          });
        })
        .catch(error => this.setState({
              isLoaded: true,
              error,
            }),
        );

    const parseTime = time => new Date(time)
        .toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
  }

  componentWillUnmount() {

  }

  render() {
    return <div>
      <Toolbar title="Attendance" account={true}/>
      <LectureList {...this.state} />
    </div>;
  }
}

export default LectureListContainer;
