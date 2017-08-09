import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import {deepOrange500} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MenuItem from 'material-ui/MenuItem';
import {Card, CardHeader} from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import InfoOutline from 'material-ui/svg-icons/action/info-outline';

import DataTables from '../../src';

const styles = {
  container: {
    textAlign: 'center',
  },
  component: {
    margin: '60px 20px',
  },
  titleStyle: {
    fontSize: 16,
    color: deepOrange500,
  },
  footerToolbarStyle: {
    padding: '0 100px',
  },
  tableStyle: {
    tableLayout: 'auto',
  },
  tableBodyStyle: {
    overflowX: 'auto',
  },
  tableWrapperStyle: {
    padding: 5,
  },
};

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

const TABLE_COLUMNS = [
  {
    key: 'name',
    label: 'Dessert (100g serving)',
  }, {
    key: 'calories',
    label: 'Calories',
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

const TABLE_COLUMNS_TOOLTIP = [
  {
    key: 'name',
    label: 'Dessert (100g serving)',
    tooltip: 'Dessert (100g serving)',
  }, {
    key: 'calories',
    label: 'Calories',
    tooltip: 'Calories',
  }, {
    key: 'fat',
    label: 'Fat (g)',
    tooltip: 'Fat (g)',
  }, {
    key: 'carbs',
    label: 'Carbs (g)',
    tooltip: 'Carbs (g)',
  }, {
    key: 'protein',
    label: 'Protein (g)',
    tooltip: 'Protein (g)',
  }, {
    key: 'sodium',
    label: 'Sodium (mg)',
    tooltip: 'Sodium (mg)',
  }, {
    key: 'calcium',
    label: 'Calcium (%)',
    tooltip: 'Calcium (%)',
  }, {
    key: 'iron',
    label: 'Iron (%)',
    tooltip: 'Iron (%)',
  },
];

const TABLE_COLUMNS_SORT_STYLE = [
  {
    key: 'name',
    label: 'Dessert (100g serving)',
    sortable: true,
    style: {
      width: 250,
    }
  }, {
    key: 'calories',
    label: 'Calories',
    sortable: true,
  }, {
    key: 'fat',
    label: 'Fat (g)',
    alignRight: true,
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

const TABLE_COLUMNS_CLASSNAME = [
  {
    key: 'name',
    label: 'Dessert (100g serving)',
    className: 'important-column',
  }, {
    key: 'calories',
    label: 'Calories',
    className: 'important-column',
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

const TABLE_DATA = [
  {
    name: 'Frozen yogurt',
    calories: '159',
    fat: '6.0',
    carbs: '24',
    protein: '4.0',
    sodium: '87',
    calcium: '14%',
    iron: '1%',
  }, {
    name: 'Ice cream sandwich',
    calories: '159',
    fat: '6.0',
    carbs: '24',
    protein: '4.0',
    sodium: '87',
    calcium: '14%',
    iron: '1%',
  }, {
    name: 'Eclair',
    calories: '159',
    fat: '6.0',
    carbs: '24',
    protein: '4.0',
    sodium: '87',
    calcium: '14%',
    iron: '1%',
  }, {
    name: 'Cupcake',
    calories: '159',
    fat: '6.0',
    carbs: '24',
    protein: '4.0',
    sodium: '87',
    calcium: '14%',
    iron: '1%',
  }, {
    name: 'Gingerbread',
    calories: '159',
    fat: '6.0',
    carbs: '24',
    protein: '4.0',
    sodium: '87',
    calcium: '14%',
    iron: '1%',
  }, {
    name: 'Jelly bean',
    calories: '159',
    fat: '6.0',
    carbs: '24',
    protein: '4.0',
    sodium: '87',
    calcium: '14%',
    iron: '1%',
  }, {
    name: 'Lollipop',
    calories: '159',
    fat: '6.0',
    carbs: '24',
    protein: '4.0',
    sodium: '87',
    calcium: '14%',
    iron: '1%',
  }, {
    name: 'Honeycomb',
    calories: '159',
    fat: '6.0',
    carbs: '24',
    protein: '4.0',
    sodium: '87',
    calcium: '14%',
    iron: '1%',
  }, {
    name: 'Donut',
    calories: '159',
    fat: '6.0',
    carbs: '24',
    protein: '4.0',
    sodium: '87',
    calcium: '14%',
    iron: '1%',
  }, {
    name: 'KitKat',
    calories: '159',
    fat: '6.0',
    carbs: '24',
    protein: '4.0',
    sodium: '87',
    calcium: '14%',
    iron: '1%',
  },
];

const TABLE_DATA_NEXT = [
  {
    name: 'Marshmallow',
    calories: '159',
    fat: '6.0',
    carbs: '24',
    protein: '4.0',
    sodium: '87',
    calcium: '14%',
    iron: '1%',
  },
];

class Main extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleSortOrderChange = this.handleSortOrderChange.bind(this);
    this.handleFilterValueChange = this.handleFilterValueChange.bind(this);
    this.handleCellClick = this.handleCellClick.bind(this);
    this.handleCellDoubleClick = this.handleCellDoubleClick.bind(this);
    this.handleRowSelection = this.handleRowSelection.bind(this);
    this.handlePreviousPageClick = this.handlePreviousPageClick.bind(this);
    this.handleNextPageClick = this.handleNextPageClick.bind(this);
    this.handlePersonAddClick = this.handlePersonAddClick.bind(this);
    this.handleInfoClick = this.handleInfoClick.bind(this);

    this.state = {
      data: TABLE_DATA,
      page: 1,
    };
  }

  handleSortOrderChange(key, order) {
    console.log('key:' + key + ' order: ' + order);
  }

  handleFilterValueChange(value) {
    console.log('filter value: ' + value);
  }

  handleCellClick(rowIndex, columnIndex, row, column) {
    console.log('rowIndex: ' + rowIndex + ' columnIndex: ' + columnIndex);
  }

  handleCellDoubleClick(rowIndex, columnIndex, row, column) {
    console.log('rowIndex: ' + rowIndex + ' columnIndex: ' + columnIndex);
  }

  handleRowSelection(selectedRows) {
    console.log('selectedRows: ' + selectedRows);
  }

  handlePreviousPageClick() {
    console.log('handlePreviousPageClick');
    this.setState({
      data: TABLE_DATA,
      page: 1,
    });
  }

  handleNextPageClick() {
    console.log('handleNextPageClick');
    this.setState({
      data: TABLE_DATA_NEXT,
      page: 2,
    });
  }

  handlePersonAddClick() {
    console.log('handlePersonAddClick');
  }

  handleInfoClick() {
    console.log('handleInfoClick');
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={styles.container}>
          <h1>Material-UI-Custom-Components</h1>
          <div style={styles.component}>
            <h2>DataTables (Basic)</h2>
            <Card style={{margin: 12, textAlign: 'left'}}>
              <CardHeader
                title='Nutrition'
                titleStyle={{fontSize: 20}}
              />
              <DataTables
                height={'auto'}
                selectable={false}
                showRowHover={false}
                columns={TABLE_COLUMNS}
                data={TABLE_DATA}
                showCheckboxes={false}
                count={100}
              />
            </Card>
          </div>
          <div style={styles.component}>
            <h2>DataTables (Selectable & Tooltip & Pagination)</h2>
            <Card style={{margin: 12, textAlign: 'left'}}>
              <CardHeader
                title='Nutrition'
                titleStyle={{fontSize: 20}}
              />
              <DataTables
                height={'auto'}
                selectable={true}
                showRowHover={true}
                columns={TABLE_COLUMNS_TOOLTIP}
                data={this.state.data}
                page={this.state.page}
                multiSelectable={true}
                onNextPageClick={this.handleNextPageClick}
                onPreviousPageClick={this.handlePreviousPageClick}
                onRowSelection={this.handleRowSelection}
                showCheckboxes={true}
                enableSelectAll={true}
                count={11}
              />
            </Card>
          </div>
          <div style={styles.component}>
            <h2>DataTables (Filter & Column Sort & Styled Column)</h2>
            <Card style={{margin: 12}}>
              <DataTables
                title={'Nutrition'}
                height={'auto'}
                selectable={false}
                showRowHover={true}
                columns={TABLE_COLUMNS_SORT_STYLE}
                data={TABLE_DATA}
                showCheckboxes={false}
                showHeaderToolbar={true}
                onCellClick={this.handleCellClick}
                onCellDoubleClick={this.handleCellDoubleClick}
                onFilterValueChange={this.handleFilterValueChange}
                onSortOrderChange={this.handleSortOrderChange}
                count={100}
              />
            </Card>
          </div>
          <div style={styles.component}>
            <h2>DataTables (Internationalization)</h2>
            <Card style={{margin: 12}}>
              <DataTables
                title={'ニュートリション'}
                height={'auto'}
                selectable={false}
                showRowHover={true}
                columns={TABLE_COLUMNS}
                data={TABLE_DATA}
                filterHintText={'検索'}
                rowSizeLabel={'ページサイズ'}
                summaryLabelTemplate={(start, end, count) => {return `${start} - ${end} ${count}件`}}
                showCheckboxes={false}
                showHeaderToolbar={true}
                count={100}
              />
            </Card>
          </div>
          <div style={styles.component}>
            <h2>DataTables (Toolbar Icons & Styled title & Styled table)</h2>
            <Card style={{margin: 12}}>
              <DataTables
                title={'Nutrition'}
                titleStyle={styles.titleStyle}
                height={'auto'}
                selectable={false}
                showRowHover={true}
                columns={TABLE_COLUMNS_SORT_STYLE}
                data={TABLE_DATA}
                showCheckboxes={false}
                showHeaderToolbar={true}
                footerToolbarStyle={styles.footerToolbarStyle}
                tableBodyStyle={styles.tableBodyStyle}
                tableStyle={styles.tableStyle}
                tableWrapperStyle={styles.tableWrapperStyle}
                count={100}
                toolbarIconRight={[
                  <IconButton
                    onClick={this.handlePersonAddClick}
                  >
                    <PersonAdd />
                  </IconButton>,
                  <IconButton
                    onClick={this.handleInfoClick}
                  >
                    <InfoOutline />
                  </IconButton>
                ]}
              />
            </Card>
          </div>
          <div style={styles.component}>
            <h2>DataTables (Column class name)</h2>
            <Card style={{margin: 12, textAlign: 'left'}}>
              <CardHeader
                title='Nutrition'
                titleStyle={{fontSize: 20}}
              />
              <DataTables
                height={'auto'}
                selectable={false}
                showRowHover={false}
                columns={TABLE_COLUMNS_CLASSNAME}
                data={TABLE_DATA}
                showCheckboxes={false}
                count={100}
              />
            </Card>
          </div>
          <div style={styles.component}>
            <h2>DataTables (Programmatically select rows)</h2>
            <Card style={{margin: 12, textAlign: 'left'}}>
              <CardHeader
                title='Nutrition'
                titleStyle={{fontSize: 20}}
              />
              <DataTables
                height={'auto'}
                selectable={true}
                selectedRows={[0, 2, 5]}
                multiSelectable={true}
                showRowHover={false}
                columns={TABLE_COLUMNS_CLASSNAME}
                data={TABLE_DATA}
                showCheckboxes={false}
                count={100}
              />
            </Card>
          </div>
          <div style={styles.component}>
            <h2>DataTables (onRowSelection handler & onCellDoubleClick handler)</h2>
            <Card style={{margin: 12, textAlign: 'left'}}>
              <CardHeader
                title='Nutrition'
                titleStyle={{fontSize: 20}}
              />
              <DataTables
                height={'auto'}
                selectable={true}
                showRowHover={true}
                columns={TABLE_COLUMNS_TOOLTIP}
                data={this.state.data}
                page={this.state.page}
                multiSelectable={false}
                onRowSelection={this.handleRowSelection}
                onCellDoubleClick={this.handleCellDoubleClick}
                showCheckboxes={false}
                enableSelectAll={false}
                count={11}
              />
            </Card>
          </div>
          <div style={styles.component}>
            <h2>DataTables (Disable footer toolbar)</h2>
            <Card style={{margin: 12, textAlign: 'left'}}>
              <CardHeader
                title='Nutrition'
                titleStyle={{fontSize: 20}}
              />
              <DataTables
                height={'auto'}
                selectable={false}
                showRowHover={true}
                columns={TABLE_COLUMNS}
                data={TABLE_DATA}
                multiSelectable={false}
                showCheckboxes={false}
                enableSelectAll={false}
                showFooterToolbar={false}
                count={11}
              />
            </Card>
          </div>
          <div style={styles.component}>
            <h2>DataTables (Header toolbar mode)</h2>
            <Card style={{margin: 12, textAlign: 'left'}}>
              <DataTables
                title={'Nutrition'}
                height={'auto'}
                selectable={false}
                showRowHover={true}
                columns={TABLE_COLUMNS}
                data={TABLE_DATA}
                multiSelectable={false}
                showHeaderToolbar={true}
                showCheckboxes={false}
                enableSelectAll={false}
                showFooterToolbar={true}
                count={10}
                headerToolbarMode={'filter'}
                filterValue={'test'}
              />
            </Card>
          </div>
          <div style={styles.component}>
            <h2>DataTables (Hide filter icon)</h2>
            <Card style={{margin: 12, textAlign: 'left'}}>
              <DataTables
                title={'Nutrition'}
                height={'auto'}
                selectable={false}
                showRowHover={true}
                columns={TABLE_COLUMNS}
                data={TABLE_DATA}
                multiSelectable={false}
                showHeaderToolbar={true}
                showCheckboxes={false}
                enableSelectAll={false}
                showFooterToolbar={true}
                count={10}
                showHeaderToolbarFilterIcon={false}
              />
            </Card>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Main;
