import React from 'react';
import {shallow, mount} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {TableHeader} from 'material-ui/Table';
import {Toolbar, ToolbarTitle} from 'material-ui/Toolbar';
import DropDownMenu from 'material-ui/DropDownMenu';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import InfoOutline from 'material-ui/svg-icons/action/info-outline';
import {deepOrange500} from 'material-ui/styles/colors';

import {TABLE_COLUMNS, TABLE_COLUMNS_TOOLTIP, TABLE_COLUMNS_SORT_STYLE, TABLE_COLUMNS_CLASSNAME, TABLE_DATA, styles} from './tableSettings';
import DataTables from '../../src/DataTables/DataTables';
import DataTablesHeaderColumn from '../../src/DataTables/DataTablesHeaderColumn';
import DataTablesRow from '../../src/DataTables/DataTablesRow';
import DataTablesRowColumn from '../../src/DataTables/DataTablesRowColumn';
import DataTablesHeaderToolbar from '../../src/DataTables/DataTablesHeaderToolbar';

describe('<DataTables />', function() {
  describe('Basic', function() {
    let wrapper;
    const muiTheme = getMuiTheme();

    before(function() {
      // shallow rendering
      wrapper = shallow(
        <DataTables
          height={'auto'}
          selectable={false}
          showRowHover={false}
          columns={TABLE_COLUMNS}
          data={TABLE_DATA}
          showCheckboxes={false}
          count={100}
          />,
        {
          context: {muiTheme: muiTheme},
        }
      );
    });

    it('should render table header', function() {
      expect(wrapper.find(TableHeader)).to.have.length(1);
    });
    it('should render header columns', function() {
      const headerColumns = wrapper.find(DataTablesHeaderColumn);
      expect(headerColumns).to.have.length(8);
      expect(headerColumns.getNodes()[0].props.children.props.children).to.equal('Dessert (100g serving)');
      expect(headerColumns.getNodes()[1].props.children.props.children).to.equal('Calories');
      expect(headerColumns.getNodes()[2].props.children.props.children).to.equal('Fat (g)');
      expect(headerColumns.getNodes()[3].props.children.props.children).to.equal('Carbs (g)');
      expect(headerColumns.getNodes()[4].props.children.props.children).to.equal('Protein (g)');
      expect(headerColumns.getNodes()[5].props.children.props.children).to.equal('Sodium (mg)');
      expect(headerColumns.getNodes()[6].props.children.props.children).to.equal('Calcium (%)');
      expect(headerColumns.getNodes()[7].props.children.props.children).to.equal('Iron (%)');
    });
    it('should render 10 data rows by default', function() {
      const dataRows = wrapper.find(DataTablesRow);
      expect(dataRows).to.have.length(10);
    });
    it('should render data columns', function() {
      const dataRows = wrapper.find(DataTablesRow);
      expect(dataRows.getNodes()[3].props.children[0].props.children).to.equal('Cupcake');
      expect(dataRows.getNodes()[3].props.children[1].props.children).to.equal('159');
      expect(dataRows.getNodes()[3].props.children[2].props.children).to.equal('6.0');
      expect(dataRows.getNodes()[3].props.children[3].props.children).to.equal('24');
      expect(dataRows.getNodes()[3].props.children[4].props.children).to.equal('4.0');
      expect(dataRows.getNodes()[3].props.children[5].props.children).to.equal('87');
      expect(dataRows.getNodes()[3].props.children[6].props.children).to.equal('14%');
      expect(dataRows.getNodes()[3].props.children[7].props.children).to.equal('1%');
    });
    it('should render row size label', function() {
      const rowSizeLabelWrapper = wrapper.find({style: styles.footerToolbarItem}).getNodes()[0];
      expect(rowSizeLabelWrapper.props.children.props.children).to.equal('Rows per page:');
    });
    it('should render row size menu', function() {
      expect(wrapper.find(DropDownMenu)).to.have.length(1);
    });
    it('should render 10, 30, 50, 100 row size items by default', function() {
      const rowSizeItems = wrapper.find(MenuItem);
      expect(rowSizeItems).to.have.length(4);
      expect(rowSizeItems.getNodes()[0].props.value).to.equal(10);
      expect(rowSizeItems.getNodes()[1].props.value).to.equal(30);
      expect(rowSizeItems.getNodes()[2].props.value).to.equal(50);
      expect(rowSizeItems.getNodes()[3].props.value).to.equal(100);
    });
    it('should render summary label', function() {
      const summaryLabelWrapper = wrapper.find({style: styles.footerToolbarItem}).getNodes()[1];
      expect(summaryLabelWrapper.props.children.props.children).to.equal('1 - 10 of 100');
    });
    it('should render pagination buttons', function() {
      expect(wrapper.find(FlatButton)).to.have.length(2);
    });
    it('should not render checkboxes', function() {
      expect(wrapper.find('[type="checkbox"]')).to.have.length(0);
    });
  });

  describe('Selectable & Tooltip & Pagination', function() {
    const handleNextPageClick = sinon.spy();
    const handlePreviousPageClick = sinon.spy();
    const handleRowSelection = sinon.spy();
    let wrapper;
    const muiTheme = getMuiTheme();

    before(function() {
      // full rendering
      wrapper = mount(
        <DataTables
          height={'auto'}
          selectable={true}
          showRowHover={true}
          columns={TABLE_COLUMNS_TOOLTIP}
          data={TABLE_DATA}
          multiSelectable={true}
          onNextPageClick={handleNextPageClick}
          onPreviousPageClick={handlePreviousPageClick}
          onRowSelection={handleRowSelection}
          showCheckboxes={true}
          enableSelectAll={true}
          page={1}
          count={11}
          />,
        {
          context: {muiTheme: muiTheme},
          childContextTypes: {muiTheme: React.PropTypes.object},
        }
      );

      // dummy
      global.window.getSelection = function() {
        return {
          removeAllRanges: function() {
          },
        };
      }
    });

    it('should call row select handler', function() {
      wrapper.find(DataTablesRowColumn).first().simulate('click');
      expect(handleRowSelection).to.have.property('callCount', 1);
    });
    it('should render tooltips', function() {
      const headerColumns = wrapper.find(DataTablesHeaderColumn);
      expect(headerColumns.getNodes()[0].props.tooltip).to.equal('Dessert (100g serving)');
      expect(headerColumns.getNodes()[1].props.tooltip).to.equal('Calories');
    });
    it('should call pagination handler', function() {
      wrapper.find(FlatButton).last().simulate('click');
      expect(handleNextPageClick).to.have.property('callCount', 1);
      wrapper.setProps({page: 2});
      wrapper.find(FlatButton).first().simulate('click');
      expect(handlePreviousPageClick).to.have.property('callCount', 1);
    });
    it('should render checkboxes', function() {
      expect(wrapper.find('[type="checkbox"]')).to.have.length(11);
    });
  });

  describe('Filter & Column Sort & Styled Column', function() {
    const handleCellClick = sinon.spy();
    const handleCellDoubleClick = sinon.spy();
    const handleFilterValueChange = sinon.spy();
    const handleSortOrderChange = sinon.spy();
    const handleRowSizeChange = sinon.spy();
    let wrapper;
    const muiTheme = getMuiTheme();

    before(function() {
      // full rendering
      wrapper = mount(
        <DataTables
          title={'Nutrition'}
          height={'auto'}
          selectable={false}
          showRowHover={true}
          columns={TABLE_COLUMNS_SORT_STYLE}
          data={TABLE_DATA}
          showCheckboxes={false}
          showHeaderToolbar={true}
          onCellClick={handleCellClick}
          onCellDoubleClick={handleCellDoubleClick}
          onFilterValueChange={handleFilterValueChange}
          onRowSizeChange={handleRowSizeChange}
          onSortOrderChange={handleSortOrderChange}
          count={100}
          />,
        {
          context: {muiTheme: muiTheme},
          childContextTypes: {muiTheme: React.PropTypes.object},
        }
      );

      // dummy
      global.window.getSelection = function() {
        return {
          removeAllRanges: function() {
          },
        };
      }
    });

    it('should render header tool bar', function() {
      expect(wrapper.find(DataTablesHeaderToolbar)).to.have.length(1);
    });
    it('should render data tables title', function() {
      expect(wrapper.find(DataTablesHeaderToolbar).prop('title')).to.equal('Nutrition');
    });
    it('should call click handler', function() {
      wrapper.find(DataTablesRowColumn).first().simulate('click');
      expect(handleCellClick).to.have.property('callCount', 1);
    });
    it('should call dobule click handler', function() {
      wrapper.find(DataTablesRowColumn).first().simulate('dblclick');
      expect(handleCellDoubleClick).to.have.property('callCount', 1);
    });
    it('should call filter value change handler', function(done) {
      wrapper.find(DataTablesHeaderToolbar).find(IconButton).simulate('click');
      wrapper.find(DataTablesHeaderToolbar).find(TextField).find('input').simulate('change', {target: {value: 'dummy'}});
      setTimeout(() => {
        expect(handleFilterValueChange).to.have.property('callCount', 1);
        expect(handleFilterValueChange.calledWith('dummy')).to.equal(true);
        done();
      }, 800);
    });
    it('should call row size change handler', function() {
      wrapper.find(DropDownMenu).props().onChange({}, 1, 30);
      expect(handleRowSizeChange).to.have.property('callCount', 1);
      expect(handleRowSizeChange.calledWith(1, 30)).to.equal(true);
    });
    it('should call sort order change handler', function() {
      wrapper.find(DataTablesHeaderColumn).first().simulate('click');
      expect(handleSortOrderChange).to.have.property('callCount', 1);
      expect(handleSortOrderChange.calledWith('name', 'asc')).to.equal(true);
      wrapper.find(DataTablesHeaderColumn).first().simulate('click');
      expect(handleSortOrderChange.calledWith('name', 'desc')).to.equal(true);
    });
  });

  describe('Internationalization', function() {
    let wrapper;
    const muiTheme = getMuiTheme();

    before(function() {
      // full rendering
      wrapper = mount(
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
          />,
        {
          context: {muiTheme: muiTheme},
          childContextTypes: {muiTheme: React.PropTypes.object},
        }
      );
    });

    it('should render data tables title', function() {
      expect(wrapper.find(DataTablesHeaderToolbar).prop('title')).to.equal('ニュートリション');
    });
    it('should render row size label with customized label', function() {
      expect(wrapper.find({style: styles.footerToolbarItem}).at(0).props().children.props.children).to.equal('ページサイズ');
    });
    it('should render summary label with customized label', function() {
      expect(wrapper.find({style: styles.footerToolbarItem}).at(1).props().children.props.children).to.equal('1 - 10 100件');
    });
    it('should render search hint with customized text', function() {
      wrapper.find(DataTablesHeaderToolbar).find(IconButton).simulate('click');
      expect(wrapper.find(DataTablesHeaderToolbar).find(TextField).prop('hintText')).to.equal('検索');
    });
  });

  describe('Toolbar Icons & Styled title', function() {
    let wrapper;
    const muiTheme = getMuiTheme();

    before(function() {
      // full rendering
      wrapper = mount(
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
          count={100}
          toolbarIconRight={[
            <IconButton>
              <PersonAdd />
            </IconButton>,
            <IconButton>
              <InfoOutline />
            </IconButton>
          ]}
          />,
        {
          context: {muiTheme: muiTheme},
          childContextTypes: {muiTheme: React.PropTypes.object},
        }
      );
    });

    it('should render custom tool bar icons', function() {
      expect(wrapper.find(DataTablesHeaderToolbar).find(IconButton)).to.have.length(3);
      expect(wrapper.find(DataTablesHeaderToolbar).find(PersonAdd)).to.have.length(1);
      expect(wrapper.find(DataTablesHeaderToolbar).find(InfoOutline)).to.have.length(1);
    });

    it('should have inline styles for title', function() {
      expect(wrapper.find(ToolbarTitle).prop('style').fontSize).not.to.equal(undefined);
      expect(wrapper.find(ToolbarTitle).prop('style').color).not.to.equal(undefined);
      expect(wrapper.find(ToolbarTitle).prop('style').fontSize).to.equal(16);
      expect(wrapper.find(ToolbarTitle).prop('style').color).to.equal(deepOrange500);
    });
  });

  describe('Column class name', function() {
    let wrapper;
    const muiTheme = getMuiTheme();

    before(function() {
      // full rendering
      wrapper = mount(
        <DataTables
          height={'auto'}
          selectable={true}
          showRowHover={true}
          columns={TABLE_COLUMNS_CLASSNAME}
          data={TABLE_DATA}
          multiSelectable={true}
          showCheckboxes={true}
          enableSelectAll={true}
          page={1}
          count={11}
          />,
        {
          context: {muiTheme: muiTheme},
          childContextTypes: {muiTheme: React.PropTypes.object},
        }
      );
    });

    it('should have column class name', function() {
      const headerColumns = wrapper.find(DataTablesHeaderColumn);
      expect(headerColumns.getNodes()[0].props.className).to.equal('important-column');
      expect(headerColumns.getNodes()[1].props.className).to.equal('important-column');
      expect(headerColumns.getNodes()[2].props.className).to.equal(undefined);
    });
  });
});
