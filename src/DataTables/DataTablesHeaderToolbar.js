import React, {Component, PropTypes} from 'react';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import ClearIcon from 'material-ui/svg-icons/content/clear';
import FilterListIcon from 'material-ui/svg-icons/content/filter-list';
import SearchIcon from 'material-ui/svg-icons/action/search';
import TextField from 'material-ui/TextField';
import {blue500} from 'material-ui/styles/colors';

function getStyles(context) {
  const {
    table,
  } = context.muiTheme;

  return {
    headerToolbar: {
      backgroundColor: table.backgroundColor,
      height: 64,
      paddingRight: 8,
    },
    icon: {
      opacity: 0.64,
    },
    headerToolbarSearchIcon: {
      marginTop: 12,
    },
    headerToolbarIconButton: {
      marginTop: 6,
    },
    searchToolbarGroup: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
    },
    searchInputTextField: {
      marginTop: 6,
      marginLeft: 8,
      width: '100%',
      minWidth: 60,
    },
    headerToolbarDefaultIcons: {
      display: 'flex',
      alignItems: 'center',
    },
    toolbarTitle: {
      lineHeight: '72px',
    },
  };
}

class DataTablesHeaderToolbar extends Component {
  static muiName = 'DataTablesHeaderToolbar';

  static propTypes = {
    filterHintText: PropTypes.string,
    handleFilterValueChange: PropTypes.func,
    onFilterValueChange: PropTypes.func,
    title: PropTypes.string,
    toolbarIconRight: PropTypes.node,
  };

  static defaultProps = {

  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.filterValueTimer = undefined;
    this.state = {
      mode: 'default',
      filterValue: '',
    };
  }

  handleFilterClick = () => {
    const mode = this.state.mode === 'default' ? 'filter' : 'default';
    const {filterValue} = this.state;
    this.setState({
      mode: mode,
      filterValue: '',
    });
    if (mode === 'default' && filterValue !== '') {
      this.emitFilterValueChange('');
    }
  }

  handleClearClick = () => {
    const {filterValue} = this.state;
    if (filterValue !== '') {
      this.setState({
        filterValue: '',
      });
      this.emitFilterValueChange('');
    }
  }

  handleFilterValueChange = (event) => {
    const value = event.target.value;
    this.setState({
      filterValue: value,
    });
    clearTimeout(this.filterValueTimer);
    this.filterValueTimer = setTimeout(() => {
      this.emitFilterValueChange(value);
    }, 500);
  }

  emitFilterValueChange = (value) => {
    const {onFilterValueChange} = this.props;
    if (onFilterValueChange) {
      onFilterValueChange(value);
    }
  }

  render() {
    const {
      filterHintText,
      toolbarIconRight,
      title, // eslint-disable-line no-unused-vars
      ...other, // eslint-disable-line no-unused-vars, comma-dangle
    } = this.props;

    const {
      mode,
      filterValue,
    } = this.state;

    const styles = getStyles(this.context);

    let contentNode;

    if (mode === 'default') {
      contentNode = (<ToolbarTitle style={styles.toolbarTitle} text={title} />);
    } else if (mode === 'filter') {
      contentNode = (
        <div style={styles.searchToolbarGroup}>
          <div>
            <SearchIcon style={styles.headerToolbarSearchIcon} />
          </div>
          <div style={styles.searchInputTextField}>
            <TextField
              fullWidth={true}
              underlineShow={false}
              hintText={filterHintText}
              onChange={this.handleFilterValueChange}
              value={filterValue}
            />
          </div>
          <div style={styles.headerToolbarDefaultIcons}>
            <IconButton
              style={Object.assign(styles.headerToolbarIconButton, styles.icon)}
              onClick={this.handleClearClick}
            >
              <ClearIcon />
            </IconButton>
          </div>
        </div>
      );
    }

    const toolbarIconRightChildren = [];
    if (toolbarIconRight) {
      if (toolbarIconRight.length) {
        toolbarIconRight.map((toolbarIcon, i) => {
          toolbarIconRightChildren.push(React.cloneElement(
            toolbarIcon,
            {
              style: Object.assign(styles.headerToolbarIconButton, styles.icon),
              key: i,
            }
          ));
        });
      } else {
        toolbarIconRightChildren.push(React.cloneElement(
          toolbarIconRight,
          {
            style: Object.assign(styles.headerToolbarIconButton, styles.icon),
            key: 1,
          }
        ));
      }
    }

    return (
      <Toolbar style={styles.headerToolbar}>
        {contentNode}
        <ToolbarGroup>
          <IconButton
            style={Object.assign(styles.headerToolbarIconButton, styles.icon)}
            onClick={this.handleFilterClick}
          >
            <FilterListIcon
              color={mode === 'filter' ? blue500 : ''}
            />
          </IconButton>
          {toolbarIconRightChildren}
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

export default DataTablesHeaderToolbar;
