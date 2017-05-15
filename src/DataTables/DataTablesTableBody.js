import React from 'react';
import PropTypes from 'prop-types';
import {TableBody} from 'material-ui/Table';
import ClickAwayListener from 'material-ui/internal/ClickAwayListener';

class DataTablesTableBody extends TableBody {
  static muiName = 'TableBody';

  static propTypes = {
    /**
     * @ignore
     * Set to true to indicate that all rows should be selected.
     */
    allRowsSelected: PropTypes.bool,
    /**
     * Children passed to table body.
     */
    children: PropTypes.node,
    /**
     * The css class name of the root element.
     */
    className: PropTypes.string,
    /**
     * Controls whether or not to deselect all selected
     * rows after clicking outside the table.
     */
    deselectOnClickaway: PropTypes.bool,
    /**
     * Controls the display of the row checkbox. The default value is true.
     */
    displayRowCheckbox: PropTypes.bool,
    /**
     * @ignore
     * If true, multiple table rows can be selected.
     * CTRL/CMD+Click and SHIFT+Click are valid actions.
     * The default value is false.
     */
    multiSelectable: PropTypes.bool,
    /**
     * @ignore
     * Callback function for when a cell is clicked.
     */
    onCellClick: PropTypes.func,
    /**
     * @ignore
     * Customized handler
     * Callback function for when a cell is double clicked.
     */
    onCellDoubleClick: PropTypes.func,
    /**
     * @ignore
     * Called when a table cell is hovered. rowNumber
     * is the row number of the hovered row and columnId
     * is the column number or the column key of the cell.
     */
    onCellHover: PropTypes.func,
    /**
     * @ignore
     * Called when a table cell is no longer hovered.
     * rowNumber is the row number of the row and columnId
     * is the column number or the column key of the cell.
     */
    onCellHoverExit: PropTypes.func,
    /**
     * @ignore
     * Called when a table row is hovered.
     * rowNumber is the row number of the hovered row.
     */
    onRowHover: PropTypes.func,
    /**
     * @ignore
     * Called when a table row is no longer
     * hovered. rowNumber is the row number of the row
     * that is no longer hovered.
     */
    onRowHoverExit: PropTypes.func,
    /**
     * @ignore
     * Called when a row is selected. selectedRows is an
     * array of all row selections. IF all rows have been selected,
     * the string "all" will be returned instead to indicate that
     * all rows have been selected.
     */
    onRowSelection: PropTypes.func,
    /**
     * Controls whether or not the rows are pre-scanned to determine
     * initial state. If your table has a large number of rows and
     * you are experiencing a delay in rendering, turn off this property.
     */
    preScanRows: PropTypes.bool,
    /**
     * @ignore
     * If true, table rows can be selected. If multiple
     * row selection is desired, enable multiSelectable.
     * The default value is true.
     */
    selectable: PropTypes.bool,
    /**
     * If true, table rows will be highlighted when
     * the cursor is hovering over the row. The default
     * value is false.
     */
    showRowHover: PropTypes.bool,
    /**
     * If true, every other table row starting
     * with the first row will be striped. The default value is false.
     */
    stripedRows: PropTypes.bool,
    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,
  };

  createRows() {
    const numChildren = React.Children.count(this.props.children);
    let rowNumber = 0;
    const handlers = {
      onCellClick: this.onCellClick,
      onCellDoubleClick: this.onCellDoubleClick,
      onCellHover: this.onCellHover,
      onCellHoverExit: this.onCellHoverExit,
      onRowHover: this.onRowHover,
      onRowHoverExit: this.onRowHoverExit,
      onRowClick: this.onRowClick,
    };

    return React.Children.map(this.props.children, (child) => {
      if (React.isValidElement(child)) {
        const props = {
          hoverable: this.props.showRowHover,
          selected: this.isRowSelected(rowNumber),
          striped: this.props.stripedRows && (rowNumber % 2 === 0),
          rowNumber: rowNumber++,
        };

        if (rowNumber === numChildren) {
          props.displayBorder = false;
        }

        const children = [
          this.createRowCheckboxColumn(props),
        ];

        React.Children.forEach(child.props.children, (child) => {
          children.push(child);
        });

        return React.cloneElement(child, {...props, ...handlers}, children);
      }
    });
  }

  onCellDoubleClick = (event, rowNumber, columnNumber) => {
    event.stopPropagation();
    if (this.props.onCellDoubleClick) {
      this.props.onCellDoubleClick(rowNumber, this.getColumnId(columnNumber), event);
    }
  };

  render() {
    const {
      style,
      allRowsSelected, // eslint-disable-line no-unused-vars
      multiSelectable, // eslint-disable-line no-unused-vars
      onCellClick, // eslint-disable-line no-unused-vars
      onCellDoubleClick, // eslint-disable-line no-unused-vars
      onCellHover, // eslint-disable-line no-unused-vars
      onCellHoverExit, // eslint-disable-line no-unused-vars
      onRowHover, // eslint-disable-line no-unused-vars
      onRowHoverExit, // eslint-disable-line no-unused-vars
      onRowSelection, // eslint-disable-line no-unused-vars
      selectable, // eslint-disable-line no-unused-vars
      deselectOnClickaway, // eslint-disable-line no-unused-vars
      showRowHover, // eslint-disable-line no-unused-vars
      stripedRows, // eslint-disable-line no-unused-vars
      displayRowCheckbox, // eslint-disable-line no-unused-vars
      preScanRows, // eslint-disable-line no-unused-vars
      ...other
    } = this.props;

    const {prepareStyles} = this.context.muiTheme;

    return (
      <ClickAwayListener onClickAway={this.handleClickAway}>
        <tbody style={prepareStyles(Object.assign({}, style))} {...other}>
          {this.createRows()}
        </tbody>
      </ClickAwayListener>
    );
  }
}

export default DataTablesTableBody;
