import PropTypes from 'prop-types';

const Video = (props) => {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: 0,
        paddingBottom: '56.25%',
        overflow: 'hidden',
      }}
    >
      <iframe
        title={props.title}
        frameBorder='0'
        allow='accelerometer; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen={true}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
        src={props.src}
      />
    </div>
  );
};

Video.defaultProps = {
  title: '',
  src: '',
};

Video.propTypes = {
  title: PropTypes.string,
  src: PropTypes.string,
};

export default Video;
