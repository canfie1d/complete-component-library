import { Switch, Route } from 'react-router-dom';

const ViewSwitcher = ({ displayedView, children, enableRouting, path }) => {
  const element = children.find((child) => {
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
