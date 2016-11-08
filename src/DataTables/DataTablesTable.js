import React from 'react';
import {Table} from 'material-ui/Table';

class DataTablesTable extends Table {

  createTableBody(base) {
    return React.cloneElement(
      base,
      {
        allRowsSelected: this.state.allRowsSelected,
        multiSelectable: this.props.multiSelectable,
        onCellClick: this.onCellClick,
        onCellDoubleClick: this.onCellDoubleClick,
        onCellHover: this.onCellHover,
        onCellHoverExit: this.onCellHoverExit,
        onRowHover: this.onRowHover,
        onRowHoverExit: this.onRowHoverExit,
        onRowSelection: this.onRowSelection,
        selectable: this.props.selectable,
        style: Object.assign({height: this.props.height}, base.props.style),
      }
    );
  }

  onCellDoubleClick = (rowNumber, columnNumber, event) => {
    if (this.props.onCellDoubleClick) this.props.onCellDoubleClick(rowNumber, columnNumber, event);
  };
}

export default DataTablesTable;
