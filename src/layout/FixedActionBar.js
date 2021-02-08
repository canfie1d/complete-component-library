import classNames from 'classnames';
import Container from './layout/Container';
import Flex from './layout/Flex';

const FixedActionBar = (props) => {
  const classes = [
    'fixed-action-bar',
    props.expanded && 'fixed-action-bar--expanded',
  ];

  const overlayClasses = [
    'button--transparent',
    'fixed-action-bar-overlay',
    props.expanded && 'fixed-action-bar-overlay--active',
  ];

  return (
    <>
      <div className={classNames(classes)}>
        <Container>
          <Flex wrap={props.wrap}>{props.children}</Flex>
        </Container>
      </div>
      {props.onClose && (
        <button onClick={props.onClose} className={classNames(overlayClasses)}>
          <span className='visually-hidden'>Close help dialog</span>
        </button>
      )}
    </>
  );
};

export default FixedActionBar;
