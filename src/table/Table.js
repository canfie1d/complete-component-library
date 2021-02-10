import { useState, useEffect } from 'react';
import Pagination from './Pagination';
import Container from '../layout/Container';
import PropTypes from 'prop-types';
import Image from '../Image';
import Header from '../Header';
import Flex from '../layout/Flex';

const Table = props => {
  const [activePage, setActivePage] = useState(0);
  // reset pagination upon new filters
  useEffect(() => {
    const pages = Math.ceil(props.listLength / props.itemsPerPage);
    if (pages > 0 && activePage > pages) {
      setActivePage(0);
    }
  }, [props.resetPagination]); // eslint-disable-line

  if (props.listLength === 0) {
    if (props.noItemsContent) {
      return props.noItemsContent;
    } else {
      return (
        <Container placeholder>
          <Header icon>No items match your filter</Header>
        </Container>
      );
    }
  }

  // paginate filtered array of items
  const paginatedList = props.list?.slice(
    (state.activePage - 1) * props.itemsPerPage,
    state.activePage * props.itemsPerPage
  );

  const childTable = React.cloneElement(props.children, {
    list: paginatedList,
    sort: state.sortType,
    setActivePage: activePage =>
      dispatch({ type: 'SET_ACTIVE_PAGE', payload: activePage }),
    setSort: sortData => dispatch({ type: 'SET_SORT_TYPE', payload: sortData }),
  });

  return (
    <div className='table'>
      {childTable}
      {props.listLength > props.itemsPerPage && (
        <Flex justify='center'>
          <Pagination
            boundaryRange={0}
            activePage={props.activePage ? props.activePage : state.activePage}
            onPageChange={(e, { activePage }) => {
              if (props.backendSort) {
                props.setActivePage(activePage);
              } else {
                dispatch({ type: 'SET_ACTIVE_PAGE', payload: activePage });
              }
            }}
            ellipsisItem={null}
            firstItem={null}
            lastItem={null}
            siblingRange={3}
            pointing
            secondary
            totalPages={Math.ceil(props.listLength / props.itemsPerPage)}
          />
        </Flex>
      )}
    </div>
  );
};

Table.propTypes = {
  list: PropTypes.array,
  listLength: PropTypes.number,
  itemsPerPage: PropTypes.number,
};

Table.defaultProps = {
  itemsPerPage: 20,
  defaultSort: {
    sortBy: 'pickupDate',
    direction: 'descending',
  },
};

export default Table;
