import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Image, Header, Pagination } from 'semantic-ui-react';
import Container from '../layout/Container';
import TruckIcon from '../../assets/icons/TruckIcon';
import { TableContext } from '../../contexts/TableStore';
import Flex from '../layout/Flex';

const Table = props => {
  const [state, dispatch] = useContext(TableContext); // eslint-disable-line
  const listLength = props.listLength ? props.listLength : state.list?.length;

  useEffect(() => {
    dispatch({
      type: 'INIT_TABLE_STORE',
      payload: { list: props.initialList, sortType: props.defaultSort },
    });

    return () => {
      dispatch({
        type: 'INIT_TABLE_STORE',
        payload: { list: [], sortType: props.defaultSort },
      });
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // reset pagination upon new filters
  useEffect(() => {
    const pages = Math.ceil(listLength / props.itemsPerPage);
    if (pages > 0 && state.activePage > pages) {
      dispatch({ type: 'SET_ACTIVE_PAGE', payload: 1 });
    }
  }, [state.filterText, state.filters]); // eslint-disable-line react-hooks/exhaustive-deps

  const noItems = listLength === 0 || state.list === undefined;
  if (noItems) {
    if (props.noItemsContent) {
      return props.noItemsContent;
    } else {
      return (
        <Container placeholder>
          <Header icon>
            <Image src={TruckIcon} centered />
            <Header.Content>No items match your filter</Header.Content>
          </Header>
        </Container>
      );
    }
  }

  // paginate filtered array of items
  const paginatedList = state.list?.slice(
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
      {listLength > props.itemsPerPage && (
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
            totalPages={Math.ceil(listLength / props.itemsPerPage)}
          />
        </Flex>
      )}
    </div>
  );
};

Table.propTypes = {
  initialList: PropTypes.array,
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
