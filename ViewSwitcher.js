/**
 * Component that mimics the functionality of react-router-dom's Switch component
 * If routing is disabled, view switching is enabled with IDs on child elements
 */
import React from 'react';
import { Switch, Route } from 'react-router-dom';

const ViewSwitcher = ({ displayedView, children, enableRouting, path }) => {
  const element = children.find(child => {
    if (
      !React.isValidElement(child) ||
      !child ||
      !child.props ||
      !child.props.view
    ) {
      return false;
    }

    // usual case
    return child.props.view === displayedView;
  });

  if (enableRouting) {
    return (
      <Switch>
        <Route exact path={path} render={() => element} />
      </Switch>
    );
  }

  return element || null;
};

export default ViewSwitcher;
