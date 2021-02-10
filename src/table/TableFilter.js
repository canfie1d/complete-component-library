import { useState } from 'react';
import PropTypes from 'prop-types';
import Flex from '../layout/Flex';
import SearchInput from '../inputs/SearchInput';
import Header from '../Header';

const TableFilter = props => {
  const [filterText, setFilterText] = useState(props.filterText);

  return (
    <Flex
      style={{ marginBottom: '2em' }}
      alignment='flex-end'
      justify='space-between'
      wrap
    >
      <Flex.Column>
        <Header as='h2' style={{ margin: 0 }}>
          {props.headerText}
          {props.subHeader}
        </Header>
      </Flex.Column>
      {props.children && <Flex.Column grow={0}>{props.children}</Flex.Column>}
      <Flex.Column grow={0}>
        <SearchInput
          value={filterText}
          onClear={() => {
            setFilterText('');
            props.onClear();
            props.onFilterClear();
          }}
          onChange={e => {
            setFilterText(e.target.value);
            props.onFilterChange(e.target.value);
          }}
          placeholder={props.placeholder}
        />
      </Flex.Column>
      {props.actions && <Flex.Column grow={0}>{props.actions}</Flex.Column>}
    </Flex>
  );
};

TableFilter.defaultProps = {
  formatHeader: true,
  placeholder: 'Filter Items...',
  filterText: '',
};

TableFilter.propTypes = {
  onFilterClear: PropTypes.func,
  onFilterChange: PropTypes.func,
};

export default TableFilter;
