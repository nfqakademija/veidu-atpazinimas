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
    const parseTime = time => new Date(time)
        .toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});

    axios.get('/api/lectures')
        .then(({data}) => {
          for (let lecture of data) {
            lecture.start = parseTime(lecture.start);
            lecture.end = parseTime(lecture.end);
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
  }

  render() {
    return <div>
      <Toolbar/>
      <LectureList {...this.state} />
    </div>;
  }
}

export default LectureListContainer;
