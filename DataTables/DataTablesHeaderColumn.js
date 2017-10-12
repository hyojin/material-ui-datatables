import React from 'react';
import PropTypes from 'prop-types';
import {TableHeaderColumn} from 'material-ui/Table';
import Tooltip from 'material-ui/internal/Tooltip';
import ArrowUpward from 'material-ui/svg-icons/navigation/arrow-upward';
import ArrowDownward from 'material-ui/svg-icons/navigation/arrow-downward';

function getStyles(props, context, state) {
  const {tableHeaderColumn} = context.muiTheme;

  return {
    root: {
      fontWeight: 'normal',
      fontSize: 12,
      paddingLeft: tableHeaderColumn.spacing,
      paddingRight: tableHeaderColumn.spacing,
      height: tableHeaderColumn.height,
      textAlign: props.alignRight ? 'right' : 'left',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      color: props.sorted ? '#3A3A3A' : tableHeaderColumn.textColor,
      position: 'relative',
      cursor: props.sortable ? 'pointer' : 'default',
    },
    tooltip: {
      boxSizing: 'border-box',
      marginTop: tableHeaderColumn.height / 2,
    },
    sortIcon: {
      height: '100%',
      width: '100%',
      opacity: props.sorted ? 0.87 : 0.54,
      display: state.sortHovered || props.sorted ? 'inline' : 'none',
    },
    iconWrapper: {
      display: 'inline-block',
      height: 16,
      width: 16,
      verticalAlign: 'middle',
      marginLeft: 8,
      marginRight: 8,
    },
    titleWrapper: {
      display: 'inline-block',
      verticalAlign: 'middle',
    },
  };
}

class DataTablesHeaderColumn extends TableHeaderColumn {
  static muiName = 'DataTablesHeaderColumn';

  static propTypes = {
    children: PropTypes.node,
    /**
     * The css class name of the root element.
     */
    className: PropTypes.string,
    /**
     * Number to identify the header row. This property
     * is automatically populated when used with TableHeader.
     */
    columnNumber: PropTypes.number,
    /**
     * @ignore
     * Not used here but we need to remove it from the root element.
     */
    hoverable: PropTypes.bool,
    /** @ignore */
    onClick: PropTypes.func,
    /**
     * @ignore
     * Not used here but we need to remove it from the root element.
     */
    onHover: PropTypes.func,
    /**
     * @ignore
     * Not used here but we need to remove it from the root element.
     */
    onHoverExit: PropTypes.func,
    /**
     * Override the inline-styles of the root element.
     */
    order: PropTypes.string,
    sortable: PropTypes.bool,
    style: PropTypes.object,
    /**
     * The string to supply to the tooltip. If not
     * string is supplied no tooltip will be shown.
     */
    tooltip: PropTypes.string,
    /**
     * Additional styling that can be applied to the tooltip.
     */
    tooltipStyle: PropTypes.object,


  };

  static defaultProps = {
    sortable: false,
    order: 'asc',
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      sortHovered: false,
    };
  }

  onMouseEnter = () => {
    if (this.props.tooltip !== undefined) {
      this.setState({hovered: true});
    }
    if (this.props.sortable) {
      this.setState({sortHovered: true});
    }
  };

  onMouseLeave = () => {
    if (this.props.tooltip !== undefined) {
      this.setState({hovered: false});
    }
    if (this.props.sortable) {
      this.setState({sortHovered: false});
    }
  };

  render() {
    const {
      children,
      className,
      columnNumber, // eslint-disable-line no-unused-vars
      hoverable, // eslint-disable-line no-unused-vars
      onClick, // eslint-disable-line no-unused-vars
      onHover, // eslint-disable-line no-unused-vars
      onHoverExit, // eslint-disable-line no-unused-vars
      style,
      tooltip,
      tooltipStyle,
      sortable,
      sorted,
      order,
      alignRight, // eslint-disable-line no-unused-vars
      ...other, // eslint-disable-line comma-dangle
    } = this.props;

    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context, this.state);

    const handlers = {
      onMouseEnter: this.onMouseEnter,
      onMouseLeave: this.onMouseLeave,
      onClick: this.onClick,
    };

    let tooltipNode;

    if (tooltip !== undefined) {
      tooltipNode = (
        <Tooltip
          label={tooltip}
          show={this.state.hovered}
          style={Object.assign(styles.tooltip, tooltipStyle)}
        />
      );
    }

    let sortIcon;

    if (sorted && order === 'asc') {
      sortIcon = (<div style={styles.iconWrapper}><ArrowUpward style={styles.sortIcon} /></div>);
    } else if (sorted && order === 'desc') {
      sortIcon = (<div style={styles.iconWrapper}><ArrowDownward style={styles.sortIcon} /></div>);
    } else if (sortable) {
      sortIcon = (<div style={styles.iconWrapper}><ArrowUpward style={styles.sortIcon} /></div>);
    }

    let leftSortIcon;
    let rightSortIcon;

    if (sortable && styles.root.textAlign === 'left') {
      rightSortIcon = sortIcon;
    } else if (sortable && styles.root.textAlign === 'right') {
      leftSortIcon = sortIcon;
    }

    const titleNode = (<div style={styles.titleWrapper}>{children}</div>);

    return (
      <th
        className={className}
        style={prepareStyles(Object.assign(styles.root, style))}
        {...handlers}
        {...other}
      >
        {tooltipNode}
        {leftSortIcon}
        {titleNode}
        {rightSortIcon}
      </th>
    );
  }
}

export default DataTablesHeaderColumn;
