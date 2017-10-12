import React, {Component} from 'react';
import PropTypes from 'prop-types';
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
    filterValue: PropTypes.string,
    handleFilterValueChange: PropTypes.func,
    mode: PropTypes.string,
    onFilterValueChange: PropTypes.func,
    showFilterIcon: PropTypes.bool,
    title: PropTypes.string,
    titleStyle: PropTypes.object,
    toolbarIconRight: PropTypes.node,
  };

  static defaultProps = {
    mode: 'default',
    filterValue: '',
    showFilterIcon: true,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.filterValueTimer = undefined;
    this.filterInput = undefined;
    this.state = {
      mode: props.mode,
      filterValue: props.filterValue,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.mode === 'default' && this.state.mode === 'filter') {
      if (this.filterInput) {
        this.filterInput.focus();
      }
    }
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
      titleStyle,
      showFilterIcon,
      ...other, // eslint-disable-line no-unused-vars, comma-dangle
    } = this.props;

    const {
      mode,
      filterValue,
    } = this.state;

    const styles = getStyles(this.context);

    let contentNode;
    let filterIconNode;

    if (mode === 'default') {
      contentNode = (<ToolbarTitle style={Object.assign({}, styles.toolbarTitle, titleStyle)} text={title} />);
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
              ref={(textField) => {
                this.filterInput = textField ? textField.input : null;
              }}
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

    if (showFilterIcon) {
      filterIconNode = (
        <IconButton
          style={Object.assign(styles.headerToolbarIconButton, styles.icon)}
          onClick={this.handleFilterClick}
        >
          <FilterListIcon
            color={mode === 'filter' ? blue500 : ''}
          />
        </IconButton>
      );
    }

    return (
      <Toolbar style={styles.headerToolbar}>
        {contentNode}
        <ToolbarGroup>
          {filterIconNode}
          {toolbarIconRightChildren}
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

export default DataTablesHeaderToolbar;
