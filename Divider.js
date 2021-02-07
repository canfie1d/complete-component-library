/**
 * A simple component that creates a stylized hr
 */

import React from 'react';

const Divider = props => {
  let styles = {
    display: props.display,
    height: props.height,
    width: props.width,
    background: props.color,
    marginBottom: props.marginBottom,
  };

  if (props.style) {
    styles = { ...styles, ...props.style };
  }

  return <div style={styles} />;
};

Divider.defaultProps = {
  display: 'block',
  height: '3px',
  width: '40%',
  color: '#3aad49',
  marginBottom: '1em',
};

export default Divider;
