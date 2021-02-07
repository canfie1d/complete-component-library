import React from 'react';
import { Card } from 'semantic-ui-react';

const TableCard = props => {
  return (
    <div style={props.style}>
      <Card fluid color={props.color}>
        {props.children}
      </Card>
    </div>
  );
};

TableCard.defaultProps = {
  style: {},
};

export default TableCard;
