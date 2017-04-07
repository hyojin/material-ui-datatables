# Material-UI-Datatables

[![npm](https://img.shields.io/npm/v/material-ui-datatables.svg)](https://www.npmjs.com/package/material-ui-datatables)
[![Build Status](https://travis-ci.org/hyojin/material-ui-datatables.svg?branch=master)](https://travis-ci.org/hyojin/material-ui-datatables)
[![Coverage Status](https://coveralls.io/repos/github/hyojin/material-ui-datatables/badge.svg?branch=master)](https://coveralls.io/github/hyojin/material-ui-datatables?branch=master)

An another React Data tables component.  
Material-UI-Datatables is a custom [React](https://facebook.github.io/react/) component using awesome [Material-UI](http://www.material-ui.com/). It provides rendering data and emitting events
 such as filter and column sort and pagination which may help you dealing with your data. You can check about the component in [Google's guideline](https://material.google.com/components/data-tables.html).

## Installation
```sh
npm install material-ui-datatables
```

## Demo
[Demo](https://hyojin.github.io/material-ui-datatables/)

## Status
Work in progress

## Usage
```jsx
import React, {Component} from 'react';
import DataTables from 'material-ui-datatables';

const TABLE_COLUMNS = [
  {
    key: 'name',
    label: 'Dessert (100g serving)',
  }, {
    key: 'calories',
    label: 'Calories',
  },
  ...
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
  },
  ...
];

class MyComponent extends Component {
  ...
  render() {
    return (
      <DataTables
        height={'auto'}
        selectable={false}
        showRowHover={true}
        columns={TABLE_COLUMNS}
        data={TABLE_DATA}
        showCheckboxes={false}
        onCellClick={this.handleCellClick}
        onCellDoubleClick={this.handleCellDoubleClick}
        onFilterValueChange={this.handleFilterValueChange}
        onSortOrderChange={this.handleSortOrderChange}
        page={1}
        count={100}
      />
    );
  }
}
```

## Properties
| Name                 | Type      | Default           | Description                                  |
|----------------------|-----------|-------------------|----------------------------------------------|
| columns              | array     |                   | Array of column settings [object](https://github.com/hyojin/material-ui-datatables#column-settings) |
| count                | number    | 0                 |                                              |
| data                 | array     |                   |                                              |
| enableSelectAll      | bool      | false             |                                              |
| filterHintText       | string    | 'Search'          |                                              |
| footerToolbarStyle   | object    |                   |                                              |
| height               | string    | 'inherit'         |                                              |
| multiSelectable      | bool      | false             |                                              |
| onCellClick          | function  |                   |                                              |
| onCellDoubleClick    | function  |                   |                                              |
| onFilterValueChange  | function  |                   | Should set 'showHeaderToolbar' to true first |
| onNextPageClick      | function  |                   |                                              |
| onPreviousPageClick  | function  |                   |                                              |
| onRowSelection       | function  |                   |                                              |
| onRowSizeChange      | function  |                   |                                              |
| onSortOrderChange    | function  |                   |                                              |
| page                 | number    | 1                 |                                              |
| rowSize              | number    | 10                |                                              |
| rowSizeLabel         | string    | 'Rows per page:'  |                                              |
| rowSizeList          | array     | [10, 30, 50, 100] |                                              |
| selectable           | bool      | false             |                                              |
| selectedRows         | array     | []                |                                              |
| showCheckboxes       | bool      | false             |                                              |
| showHeaderToolbar    | bool      | false             |                                              |
| summaryLabelTemplate | function  |                   |                                              |
| title                | string    |                   | Should set 'showHeaderToolbar' to true first |
| titleStyle           | object    |                   | Should set 'showHeaderToolbar' to true first |
| toolbarIconRight     | node      |                   | Can be an array of IconButton nodes          |

## Column settings
| Name                 | Type      | Default           | Description                                  |
|----------------------|-----------|-------------------|----------------------------------------------|
| key                  | string    |                   |                                              |
| label                | string    |                   |                                              |
| sortable             | bool      | false             |                                              |
| tooltip              | string    |                   |                                              |
| className            | string    |                   |                                              |
| style                | object    |                   | Inline column styles                         |

### Setting example
```javascript
{
  key: 'name',
  label: 'Dessert (100g serving)',
  sortable: true,
  tooltip: 'Dessert (100g serving)',
  className: 'important-column',
  style: {
    width: 250,
  },
}
```

## License
MIT
