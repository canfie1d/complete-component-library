import { useEffect, useState } from 'react';
import moment from 'moment';

const Count = (props) => {
  const [age, setAge] = useState();

  useEffect(() => {
    var diff = props.countDown
      ? moment(props.startTime).diff(moment())
      : moment().diff(moment(props.startTime));
    const ageInSecs = parseInt(moment.duration(diff).asSeconds());
    setAge(ageInSecs);
  }, []); // eslint-disable-line

  useEffect(() => {
    const interval = setInterval(() => {
      const newAge = props.countDown ? age - 1 : age + 1;
      setAge(newAge);
    }, 1000);

    return () => clearInterval(interval);
  });

  const formatAge = (ageInSecs) => {
    if (Math.abs(ageInSecs) > 86400) {
      return moment(props.startTime).format('l');
    }
    return `${moment.utc(ageInSecs * 1000).format('HH:mm:ss')} ${
      props.countDown ? '' : 'ago'
    }`;
  };

  return formatAge(age);
};

export default Count;
