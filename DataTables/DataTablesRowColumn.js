import React from 'react';
import PropTypes from 'prop-types';
import {TableRowColumn} from 'material-ui/Table';

function getStyles(props, context) {
  const {tableRowColumn} = context.muiTheme;

  const styles = {
    root: {
      paddingLeft: tableRowColumn.spacing,
      paddingRight: tableRowColumn.spacing,
      height: tableRowColumn.height,
      textAlign: props.alignRight ? 'right' : 'left',
      fontSize: 13,
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },
  };

  if (React.Children.count(props.children) === 1 && !isNaN(props.children)) {
    styles.textAlign = 'right';
  }

  return styles;
}

class DataTablesRowColumn extends TableRowColumn {
  static muiName = 'TableRowColumn';

  static propTypes = {
    children: PropTypes.node,
    /**
     * The css class name of the root element.
     */
    className: PropTypes.string,
    /**
     * @ignore
     * Number to identify the header row. This property
     * is automatically populated when used with TableHeader.
     */
    columnNumber: PropTypes.number,
    /**
     * @ignore
     * If true, this column responds to hover events.
     */
    hoverable: PropTypes.bool,
    /** @ignore */
    onClick: PropTypes.func,
    /** @ignore */
    onDoubleClick: PropTypes.func,
    /** @ignore */
    onHover: PropTypes.func,
    /**
     * @ignore
     * Callback function for hover exit event.
     */
    onHoverExit: PropTypes.func,
    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,
  };

  onDoubleClick = (event) => {
    if (this.props.onDoubleClick) {
      this.props.onDoubleClick(event, this.props.columnNumber);
    }
  };

  render() {
    const {
      children,
      className,
      columnNumber, // eslint-disable-line no-unused-vars
      hoverable, // eslint-disable-line no-unused-vars
      onClick, // eslint-disable-line no-unused-vars
      onDoubleClick, // eslint-disable-line no-unused-vars
      onHover, // eslint-disable-line no-unused-vars
      onHoverExit, // eslint-disable-line no-unused-vars
      style,
      alignRight, // eslint-disable-line no-unused-vars
      ...other, // eslint-disable-line comma-dangle
    } = this.props;

    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context);

    const handlers = {
      onClick: this.onClick,
      onMouseEnter: this.onMouseEnter,
      onMouseLeave: this.onMouseLeave,
      onDoubleClick: this.onDoubleClick,
    };

    return (
      <td
        className={className}
        style={prepareStyles(Object.assign(styles.root, style))}
        {...handlers}
        {...other}
      >
        {children}
      </td>
    );
  }
}

export default DataTablesRowColumn;
