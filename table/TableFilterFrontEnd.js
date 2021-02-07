import React, { useContext, useState } from 'react';
import { Form } from 'formik-semantic-ui';
import Flex from '../layout/Flex';
import SearchInput from '../inputs/SearchInput';
import { TableContext } from '../../contexts/TableStore';
import { Header } from 'semantic-ui-react';

const TableFilterFrontEnd = props => {
  const [state, dispatch] = useContext(TableContext); // eslint-disable-line
  const [filterText, setFilterText] = useState(
    props.filterText ? props.filterText : ''
  );
  const [timeout, setTimeoutState] = useState(null);
  const listLength = props.listLength ? props.listLength : state.list.length;

  return (
    <Flex
      style={{ marginBottom: '2em' }}
      alignment='flex-end'
      justify='space-between'
      wrap
    >
      <Flex.Column>
        <Header as='h2' style={{ margin: 0 }}>
          {props.formatHeader
            ? `${listLength.toLocaleString('en')} ${props.headerText}${
                listLength !== 1 ? 's' : ''
              }`
            : props.headerText}
          {props.subHeader}
        </Header>
      </Flex.Column>
      {props.children && <Flex.Column grow={0}>{props.children}</Flex.Column>}
      <Flex.Column grow={0}>
        <Form
          render={() => (
            <SearchInput
              value={props.backendFilter ? filterText : state.filterText}
              onClear={() => {
                if (props.backendFilter) {
                  // clear on backend
                  setFilterText('');
                  props.handleFilterSearch('');
                } else {
                  dispatch({ type: 'SET_FILTER_TEXT', payload: '' });
                }
              }}
              onChange={e => {
                if (props.backendFilter) {
                  setFilterText(e.target.value);
                  // have a wait period of 1 second then search the backend
                  clearTimeout(timeout);
                  let searchValue = e.target.value;
                  setTimeoutState(
                    setTimeout(function () {
                      props.handleFilterSearch(searchValue);
                    }, 1000)
                  );
                } else {
                  dispatch({
                    type: 'SET_FILTER_TEXT',
                    payload: e.target.value,
                  });
                }
              }}
              placeholder='Filter Items...'
            />
          )}
        />
      </Flex.Column>
      {props.headerActions && (
        <Flex.Column grow={0}>{props.headerActions}</Flex.Column>
      )}
    </Flex>
  );
};

TableFilterFrontEnd.defaultProps = {
  formatHeader: true,
};

export default TableFilterFrontEnd;
