import React from 'react';
import PropTypes from 'prop-types';
import {shallow, mount} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {TableHeader} from 'material-ui/Table';
import {Toolbar, ToolbarTitle} from 'material-ui/Toolbar';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import InfoOutline from 'material-ui/svg-icons/action/info-outline';
import FilterListIcon from 'material-ui/svg-icons/content/filter-list';
import {deepOrange500} from 'material-ui/styles/colors';

import {
  TABLE_COLUMNS,
    TABLE_COLUMNS_TOOLTIP,
    TABLE_COLUMNS_SORT_STYLE,
    TABLE_COLUMNS_CLASSNAME,
    TABLE_DATA,
    styles,
} from './tableSettings';
import DataTables from '../../src/DataTables/DataTables';
import DataTablesHeaderColumn from '../../src/DataTables/DataTablesHeaderColumn';
import DataTablesRow from '../../src/DataTables/DataTablesRow';
import DataTablesRowColumn from '../../src/DataTables/DataTablesRowColumn';
import DataTablesHeaderToolbar from '../../src/DataTables/DataTablesHeaderToolbar';
import DataTablesTable from '../../src/DataTables/DataTablesTable';

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
    it('should render data columns render function', function() {
      const dataRows = wrapper.find(DataTablesRow);
      expect(dataRows.getNodes()[2].props.children[2].props.children).to.equal('6.0');
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
    it('should render footer toolbar', function() {
      expect(wrapper.find({style: styles.footerToolbar})).to.have.length(1);
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
          childContextTypes: {muiTheme: PropTypes.object},
        }
      );

      // dummy
      global.window.getSelection = function() {
        return {
          removeAllRanges: function() {
          },
        };
      };
    });

    it('should call row select handler', function(done) {
      wrapper.find(DataTablesRowColumn).first().simulate('click');
      setTimeout(() => {
        expect(handleRowSelection).to.have.property('callCount', 1);
        expect(wrapper.find(DataTablesRow).first().prop('selected')).to.equal(true);
        done();
      }, 500);
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
          childContextTypes: {muiTheme: PropTypes.object},
        }
      );

      // dummy
      global.window.getSelection = function() {
        return {
          removeAllRanges: function() {
          },
        };
      };
    });

    it('should render header tool bar', function() {
      expect(wrapper.find(DataTablesHeaderToolbar)).to.have.length(1);
    });
    it('should render data tables title', function() {
      expect(wrapper.find(DataTablesHeaderToolbar).prop('title')).to.equal('Nutrition');
    });
    it('should call click handler', function(done) {
      wrapper.find(DataTablesRowColumn).first().simulate('click');
      setTimeout(() => {
        expect(handleCellClick).to.have.property('callCount', 1);
        done();
      }, 500);
    });
    it('should call dobule click handler', function() {
      // simulate double click
      wrapper.find(DataTablesRowColumn).first().simulate('click');
      wrapper.find(DataTablesRowColumn).first().simulate('click');
      expect(handleCellDoubleClick).to.have.property('callCount', 1);
    });
    it('should call filter value change handler and set focus to input', function(done) {
      wrapper.find(DataTablesHeaderToolbar).find(IconButton).simulate('click');
      const inputNodeInstanceId = Object.keys(wrapper.find(DataTablesHeaderToolbar).find(TextField).find('input').getDOMNode())[0];
      const inputDomId = wrapper.find(DataTablesHeaderToolbar).find(TextField).find('input').getDOMNode()[inputNodeInstanceId]._domID;
      const activeElementDomId = document.activeElement[inputNodeInstanceId]._domID;
      expect(inputDomId).to.equal(activeElementDomId);
      wrapper.find(DataTablesHeaderToolbar).find(TextField).find('input')
          .simulate('change', {target: {value: 'dummy'}});
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
          summaryLabelTemplate={
            (start, end, count) => `${start} - ${end} ${count}件`
          }
          showCheckboxes={false}
          showHeaderToolbar={true}
          count={100}
        />,
        {
          context: {muiTheme: muiTheme},
          childContextTypes: {muiTheme: PropTypes.object},
        }
      );
    });

    it('should render data tables title', function() {
      expect(wrapper.find(DataTablesHeaderToolbar).prop('title')).to.equal('ニュートリション');
    });
    it('should render row size label with customized label', function() {
      expect(
          wrapper.find({style: styles.footerToolbarItem})
          .at(0).props().children.props.children
      )
          .to.equal('ページサイズ');
    });
    it('should render summary label with customized label', function() {
      expect(
          wrapper.find({style: styles.footerToolbarItem})
          .at(1).props().children.props.children
      )
          .to.equal('1 - 10 100件');
    });
    it('should render search hint with customized text', function() {
      wrapper.find(DataTablesHeaderToolbar).find(IconButton).simulate('click');
      expect(wrapper.find(DataTablesHeaderToolbar).find(TextField).prop('hintText')).to.equal('検索');
    });
  });

  describe('Toolbar Icons & Styled title & Styled table', function() {
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
          footerToolbarStyle={styles.footerToolbarStyle}
          tableBodyStyle={styles.tableBodyStyle}
          tableStyle={styles.tableStyle}
          tableWrapperStyle={styles.tableWrapperStyle}
          count={100}
          toolbarIconRight={[
            <IconButton>
              <PersonAdd />
            </IconButton>,
            <IconButton>
              <InfoOutline />
            </IconButton>,
          ]}
        />,
        {
          context: {muiTheme: muiTheme},
          childContextTypes: {muiTheme: PropTypes.object},
        }
      );
    });

    it('should render custom tool bar icons', function() {
      expect(wrapper.find(DataTablesHeaderToolbar).find(IconButton)).to.have.length(3);
      expect(wrapper.find(DataTablesHeaderToolbar).find(FilterListIcon)).to.have.length(1);
      expect(wrapper.find(DataTablesHeaderToolbar).find(PersonAdd)).to.have.length(1);
      expect(wrapper.find(DataTablesHeaderToolbar).find(InfoOutline)).to.have.length(1);
    });

    it('should have inline styles for title', function() {
      expect(wrapper.find(ToolbarTitle).prop('style').fontSize).not.to.equal(undefined);
      expect(wrapper.find(ToolbarTitle).prop('style').color).not.to.equal(undefined);
      expect(wrapper.find(ToolbarTitle).prop('style').fontSize).to.equal(16);
      expect(wrapper.find(ToolbarTitle).prop('style').color).to.equal(deepOrange500);
    });

    it('should have footerToolbar styles defined', function() {
      expect(wrapper.find(Toolbar).at(1).prop('style').padding).to.equal('0 100px');
    });

    it('should have table styles defined', function() {
      expect(wrapper.find(DataTablesTable).at(0).prop('style').tableLayout).to.equal('auto');
    });

    it('should have table body styles defined', function() {
      expect(wrapper.find(DataTablesTable).at(0).prop('bodyStyle').overflowX).to.equal('auto');
    });

    it('should have table wrapper styles defined', function() {
      expect(wrapper.find(DataTablesTable).at(0).prop('wrapperStyle').padding).to.equal(5);
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
          childContextTypes: {muiTheme: PropTypes.object},
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

  describe('Programmatically select rows', function() {
    let wrapper;
    const muiTheme = getMuiTheme();

    before(function() {
      // full rendering
      wrapper = mount(
        <DataTables
          height={'auto'}
          selectable={true}
          selectedRows={[0, 2, 5]}
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
          childContextTypes: {muiTheme: PropTypes.object},
        }
      );
    });

    it('should render selected rows by default', function() {
      const tableRows = wrapper.find(DataTablesRow);
      expect(tableRows.getNodes()[0].props.selected).to.equal(true);
      expect(tableRows.getNodes()[1].props.selected).to.equal(false);
      expect(tableRows.getNodes()[2].props.selected).to.equal(true);
      expect(tableRows.getNodes()[3].props.selected).to.equal(false);
      expect(tableRows.getNodes()[4].props.selected).to.equal(false);
      expect(tableRows.getNodes()[5].props.selected).to.equal(true);
    });
  });

  describe('onRowSelection handler & onCellDoubleClick handler', function() {
    const handleRowSelection = sinon.spy();
    const handleCellDoubleClick = sinon.spy();
    let wrapper;
    const muiTheme = getMuiTheme();

    before(function() {
      // full rendering
      wrapper = mount(
        <DataTables
          title={'Nutrition'}
          height={'auto'}
          selectable={true}
          showRowHover={true}
          columns={TABLE_COLUMNS_SORT_STYLE}
          data={TABLE_DATA}
          showCheckboxes={false}
          showHeaderToolbar={true}
          enableSelectAll={false}
          onCellDoubleClick={handleCellDoubleClick}
          onRowSelection={handleRowSelection}
          count={100}
        />,
        {
          context: {muiTheme: muiTheme},
          childContextTypes: {muiTheme: PropTypes.object},
        }
      );

      // dummy
      global.window.getSelection = function() {
        return {
          removeAllRanges: function() {
          },
        };
      };
    });

    it('should call row select handler', function(done) {
      wrapper.find(DataTablesRowColumn).first().simulate('click');
      setTimeout(() => {
        expect(handleRowSelection).to.have.property('callCount', 1);
        done();
      }, 500);
    });

    it('should call dobule click handler', function() {
      // simulate double click
      wrapper.find(DataTablesRowColumn).first().simulate('click');
      wrapper.find(DataTablesRowColumn).first().simulate('click');
      expect(handleCellDoubleClick).to.have.property('callCount', 1);
    });
  });

  describe('row size controls', function() {
    const muiTheme = getMuiTheme();
    describe('when showRowSizeControls = false', function() {
      let wrapper;
      before(function() {
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
            showRowSizeControls={false}
            page={1}
            count={11}
          />,
          {
            context: {muiTheme: muiTheme},
            childContextTypes: {muiTheme: PropTypes.object},
          }
        );
      });

      it('should not render row size label', function() {
        expect(wrapper.find({style: styles.footerToolbarItem})).to.have.length(2);
      });

      it('should not render row size menu', function() {
        expect(wrapper.find(DropDownMenu)).to.have.length(0);
      });

      it('should not render any row size items', function() {
        const rowSizeItems = wrapper.find(MenuItem);
        expect(rowSizeItems).to.have.length(0);
      });
    });

    describe( 'when rowSizeList is empty', function() {
      let wrapper;
      before(function() {
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
            rowSizeList={[]}
            rowSize={10}
          />,
          {
            context: {muiTheme: muiTheme},
            childContextTypes: {muiTheme: PropTypes.object},
          }
        );
      });

      it('should render row size label', function() {
        expect(wrapper.find({style: styles.footerToolbarItem})).to.have.length(3);
      });

      it('should not render row size menu', function() {
        expect(wrapper.find(DropDownMenu)).to.have.length(0);
      });
    });
  });

  describe('Disable footer toolbar', function() {
    let wrapper;
    const muiTheme = getMuiTheme();

    before(function() {
      // full rendering
      wrapper = mount(
        <DataTables
          height={'auto'}
          showRowHover={true}
          columns={TABLE_COLUMNS_CLASSNAME}
          data={TABLE_DATA}
          multiSelectable={true}
          showCheckboxes={true}
          enableSelectAll={true}
          page={1}
          count={11}
          showFooterToolbar={false}
        />,
        {
          context: {muiTheme: muiTheme},
          childContextTypes: {muiTheme: PropTypes.object},
        }
      );
    });

    it('should not render footer toolbar', function() {
      expect(wrapper.find({style: styles.footerToolbar})).to.have.length(0);
    });
  });

  describe('Header toolbar mode', function() {
    let wrapper;
    const muiTheme = getMuiTheme();

    before(function() {
      // full rendering
      wrapper = mount(
        <DataTables
          height={'auto'}
          showRowHover={true}
          columns={TABLE_COLUMNS_CLASSNAME}
          data={TABLE_DATA}
          multiSelectable={true}
          showCheckboxes={true}
          enableSelectAll={true}
          showHeaderToolbar={true}
          headerToolbarMode={'filter'}
          filterValue={'test'}
          page={1}
          count={11}
        />,
        {
          context: {muiTheme: muiTheme},
          childContextTypes: {muiTheme: PropTypes.object},
        }
      );
    });

    it('should render header toolbar with filter mode', function() {
      expect(wrapper.find(DataTablesHeaderToolbar).prop('mode')).to.equal('filter');
      expect(wrapper.find(DataTablesHeaderToolbar).prop('filterValue')).to.equal('test');
    });
  });

  describe('Hide filter icon', function() {
    let wrapper;
    const muiTheme = getMuiTheme();

    before(function() {
      // full rendering
      wrapper = mount(
        <DataTables
          height={'auto'}
          showRowHover={true}
          columns={TABLE_COLUMNS_CLASSNAME}
          data={TABLE_DATA}
          multiSelectable={false}
          showHeaderToolbar={true}
          showCheckboxes={false}
          enableSelectAll={false}
          showFooterToolbar={true}
          count={10}
          showHeaderToolbarFilterIcon={false}
        />,
        {
          context: {muiTheme: muiTheme},
          childContextTypes: {muiTheme: PropTypes.object},
        }
      );
    });

    it('should not render filter icon in header toolbar', function() {
      expect(wrapper.find(DataTablesHeaderToolbar).find(FilterListIcon)).to.have.length(0);
    });
  });
});
