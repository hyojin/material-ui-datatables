import React, {Component} from 'react';
import {indigo600} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card} from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';

import DataTables from 'material-ui-datatables';
import FakeAPI from './FakeAPI';

const styles = {
  appBarTitle: {
    fontSize: 24,
    fontWeight: 'normal',
    WebkitFontSmoothing: 'antialiased',
  },
  container: {
  },
  component: {
    textAlign: 'center',
  },
  iconStyles: {
    paddingLeft: 2,
    color: '#FFF',
  },
};

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: indigo600,
    accent1Color: indigo600,
  },
});

const TABLE_COLUMNS_SORT_STYLE = [
  {
    key: 'name',
    label: 'Dessert (100g serving)',
    sortable: true,
    style: {
      width: 250,
    },
  }, {
    key: 'calories',
    label: 'Calories',
    sortable: true,
  }, {
    key: 'fat',
    label: 'Fat (g)',
  }, {
    key: 'carbs',
    label: 'Carbs (g)',
  }, {
    key: 'protein',
    label: 'Protein (g)',
  }, {
    key: 'sodium',
    label: 'Sodium (mg)',
  }, {
    key: 'calcium',
    label: 'Calcium (%)',
  }, {
    key: 'iron',
    label: 'Iron (%)',
  },
];

class Main extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleSortOrderChange = this.handleSortOrderChange.bind(this);
    this.handleFilterValueChange = this.handleFilterValueChange.bind(this);
    this.handlePreviousPageClick = this.handlePreviousPageClick.bind(this);
    this.handleNextPageClick = this.handleNextPageClick.bind(this);
    this.handleRowSizeChange = this.handleRowSizeChange.bind(this);

    this.state = {
      data: [],
      currentPage: 1,
      rowSize: 5,
      total: 0,
      sort: '',
      order: '',
      filter: '',
    };
  }

  componentDidMount() {
    FakeAPI(this.state.currentPage, this.state.rowSize, this.state.sort,
      this.state.order, this.state.filter, (result) => {
        this.setState({
          total: result.count,
          data: result.data,
        });
      }
    );
  }

  handleSortOrderChange(key, order) {
    FakeAPI(this.state.currentPage, this.state.rowSize, key,
      order, this.state.filter, (result) => {
        this.setState({
          total: result.count,
          data: result.data,
          sort: key,
          order: order,
        });
      }
    );
  }

  handleFilterValueChange(value) {
    const page = 1;
    FakeAPI(page, this.state.rowSize, this.state.sort,
      this.state.order, value, (result) => {
        this.setState({
          total: result.count,
          data: result.data,
          filter: value,
          currentPage: page,
        });
      }
    );
  }

  handlePreviousPageClick() {
    const page = this.state.currentPage - 1;
    FakeAPI(page, this.state.rowSize, this.state.sort,
      this.state.order, this.state.filter, (result) => {
        this.setState({
          total: result.count,
          data: result.data,
          currentPage: page,
        });
      }
    );
  }

  handleNextPageClick() {
    const page = this.state.currentPage + 1;
    FakeAPI(page, this.state.rowSize, this.state.sort,
      this.state.order, this.state.filter, (result) => {
        this.setState({
          total: result.count,
          data: result.data,
          currentPage: page,
        });
      }
    );
  }

  handleRowSizeChange(index, rowSize) {
    let page = this.state.currentPage;
    if ((page - 1) * rowSize > this.state.total) {
      page = 1;
    }
    FakeAPI(page, rowSize, this.state.sort,
      this.state.order, this.state.filter, (result) => {
        this.setState({
          total: result.count,
          data: result.data,
          currentPage: page,
          rowSize: rowSize,
        });
      }
    );
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={styles.container}>
          <AppBar
            title={'Data tables'}
            showMenuIconButton={false}
            titleStyle={styles.appBarTitle}
            iconElementRight={(
              <IconButton
                href={'https://github.com/hyojin/material-ui-datatables'}
                iconStyle={styles.iconStyles}
              >
                <FontIcon
                  className={'fa fa-github'}
                />
              </IconButton>
            )}
          />
          <div style={styles.component}>
            <Card style={{margin: 12}}>
              <DataTables
                title={'Nutrition'}
                height={'auto'}
                selectable={true}
                showRowHover={true}
                columns={TABLE_COLUMNS_SORT_STYLE}
                data={this.state.data}
                showCheckboxes={false}
                showHeaderToolbar={true}
                onCellClick={this.handleCellClick}
                onCellDoubleClick={this.handleCellDoubleClick}
                onFilterValueChange={this.handleFilterValueChange}
                onNextPageClick={this.handleNextPageClick}
                onPreviousPageClick={this.handlePreviousPageClick}
                onSortOrderChange={this.handleSortOrderChange}
                onRowSizeChange={this.handleRowSizeChange}
                page={this.state.currentPage}
                count={this.state.total}
                rowSize={this.state.rowSize}
                rowSizeList={[5, 10, 15]}
              />
            </Card>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Main;
