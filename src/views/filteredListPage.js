import m from 'mithril';
import { error } from '../models/log';
import { i18n } from '../models/language';
import { FilterView } from '../components';

/**
 * FilteredListDataStore class
 *
 * The instance of this class should be a file-global variable (static)
 * in order to survive any change in the URL.
 */
export class FilteredListDataStore {
  constructor() {
    this._positionTop = {};
    this.filterViewPositionTop = 0;
    this.detailsViewPositionTop = 0;
    this.lastScrollPosition = 0;
    this.listState = 'loading';
    this.loadMoreState = 'idle';
    this.detailsLoaded = false;
    this.filterValues = {};
    this.initialized = false;
  }

  get listState() {
    return this._listState;
  }

  set listState(state) {
    if (!['loading', 'loaded', 'error'].includes(state)) {
      throw new Error(`Invalid state '${state}' for 'listState'`);
    }
    this._listState = state;
  }

  get loadMoreState() {
    return this._loadMoreState;
  }

  set loadMoreState(state) {
    if (!['idle', 'loading', 'noMorePages', 'error'].includes(state)) {
      throw new Error(`Invalid state '${state}' for 'loadMoreState'`);
    }
    this._loadMoreState = state;
  }

  get detailsLoaded() {
    return this._detailsLoaded;
  }

  set detailsLoaded(value) {
    this._detailsLoaded = value;
  }

  get filterValues() {
    return this._filterValues;
  }

  set filterValues(values) {
    this._filterValues = values;
  }

  get lastScrollPosition() {
    return this._lastScrollPosition;
  }

  set lastScrollPosition(position) {
    this._lastScrollPosition = position;
  }

  get isInitialized() {
    return this._isInitialized;
  }

  setIsInitialized() {
    this._isInitialized = true;
  }

  getPositionTop(key) {
    return this._positionTop[key] || 0;
  }

  setPositionTop(key, position) {
    if (position < 0) {
      this._positionTop[key] = position;
    } else {
      this._positionTop[key] = 0;
    }
  }
}

/**
 * FilteredListPage class
 *
 * This is an abstract base class to create a filtered list page.
 */
export class FilteredListPage {
  /**
   * Constructor
   *
   * @param {String} name identifier of this page (used to specify unique element IDs)
   * @param {FilteredListDataStore} dataStore persistent data store
   * @param {boolean} hasDetailsPage specify whether there is a details view or not
   */
  constructor(name, dataStore, hasDetailsPage = true) {
    this.name = name;
    this.dataStore = dataStore;
    this.hasDetailsPage = hasDetailsPage;
  }

  /**
   * @param {object} vnode
   * @param {String} itemId id of the item to be shown on the details page
   */
  oninit(vnode, itemId) {
    document.addEventListener('scroll', () => this.onscroll());
    window.addEventListener('resize', () => this.onscroll());

    if (!this.dataStore.isInitialized) {
      this.reload().then(() => {
        this.dataStore.setIsInitialized();
      });
    }

    if (this.hasDetailsPage && itemId) {
      this.detailsItemId = itemId;
      this._loadItem(itemId)
        .then(() => {
          this.dataStore.detailsLoaded = true;
        })
        .catch(() => {
          this.dataStore.detailsLoaded = true;
        });
    }
  }

  /* eslint-disable class-methods-use-this, no-unused-vars */

  /**
   * Used to load a single item for the details view
   *
   * *This is an abstract function!
   * Implementation in child class is mandatory if details page is enabled.*
   *
   * @param {String} itemId id of the item to be shown on the details page
   * @return {Promise}
   * @protected
   */
  _loadItem(itemId) {
    throw new Error('_loadItem() not implemented');
  }

  /**
   * Used to reload the items list
   *
   * *This is a dummy function!
   * Implementation in child class is highly recommended.*
   *
   * @return {Promise}
   * @protected
   */
  _reloadData() {
    // Implementation needed in child class.
  }

  /**
   * Gives the configuration of the FilterView
   *
   * *This is a dummy function!
   * Implementation in child class is highly recommended.*
   *
   * @return {object} FilterView attributes
   * @protected
   */
  get _filterViewAttributes() {
    return { fields: [], onchange: () => {} };
  }

  /**
   * Constructs the list view.
   * This is only called when the data has been loaded successfully.
   *
   * *This is an abstract function!
   * Implementation in child class is mandatory if details page is enabled.*
   *
   * @return {Array} array of vnodes
   * @protected
   */
  get _listView() {
    throw new Error('_listView not implemented');
  }

  /**
   * Constructs the details view
   *
   * *This is an abstract function!
   * Implementation in child class is mandatory if details page is enabled.*
   *
   * @return {object} vnode
   * @protected
   */
  get _detailsView() {
    throw new Error('_detailsView not implemented');
  }

  /**
   * Constructs the details placeholder view shown when no item has been selected.
   *
   * *This is an abstract function!
   * Implementation in child class is mandatory if details page is enabled.*
   *
   * @return {object} vnode
   * @protected
   */
  get _detailsPlaceholderView() {
    throw new Error('_detailsPlaceholderView not implemented');
  }

  /**
   * Loads the next page of the list.
   *
   * *This is an abstract function!
   * Implementation in child class is mandatory.*
   *
   * @return {Promise}
   * @protected
   */
  _loadNextPage() {
    throw new Error('_loadNextPage() not implemented');
  }

  /* eslint-enable */

  reload() {
    this.dataStore.listState = 'loading';
    return this._reloadData()
      .then(() => {
        this.dataStore.listState = 'loaded';
      })
      .catch(err => {
        error(err);
        this.dataStore.listState = 'error';
      });
  }

  onscroll() {
    const filterView = document.getElementById(`${this.name}ListFilterView`);
    const detailsView = document.getElementById(`${this.name}ListDetailsView`);
    this._updateViewPosition(filterView, 'filterView');
    this._updateViewPosition(detailsView, 'detailsView');
    this.dataStore.lastScrollPosition = document.documentElement.scrollTop;
  }

  _updateViewPosition(element, positionTopKey) {
    if (!element) return;

    const windowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    const scrollDelta = document.documentElement.scrollTop - this.dataStore.lastScrollPosition;
    const maxPosition = Math.min(windowHeight - element.scrollHeight, 0);
    const currentPosition = this.dataStore.getPositionTop(positionTopKey);

    const positionTop = Math.min(0, Math.max(currentPosition - scrollDelta, maxPosition));
    this.dataStore.setPositionTop(positionTopKey, positionTop);
    // eslint-disable-next-line no-param-reassign
    element.style.top = `${positionTop}px`;
  }

  view() {
    return m(
      `div#${this.name}-list`,
      {
        class: !this.hasDetailsPage ? 'no-details' : '',
      },
      [
        m('div', this._filterView),
        m('div.content', this._listContainerView),
        this.hasDetailsPage ? m('div', this._detailsContainerView) : m(''),
      ]
    );
  }

  get _filterView() {
    return m(
      'div.filter',
      {
        id: `${this.name}ListFilterView`,
        style: {
          top: `${this.dataStore.getPositionTop('filterView')}px`,
        },
      },
      m(FilterView, { ...{ values: this.dataStore }, ...this._filterViewAttributes })
    );
  }

  get _listContainerView() {
    if (this.dataStore.listState === 'loading') {
      return m('span', i18n('loading'));
    } else if (this.dataStore.listState === 'loaded') {
      return [...this._listView, this._loadMoreView];
    }
    return m('span', i18n('loading_error'));
  }

  get _loadMoreView() {
    if (this.dataStore.loadMoreState === 'loading') {
      return m('div.load-more-items', i18n('loading'));
    } else if (this.dataStore.loadMoreState === 'noMorePages') {
      return m('');
    }
    return m(
      'div.load-more-items.active',
      {
        onclick: () => {
          this.dataStore.loadMoreState = 'loading';
          this._loadNextPage()
            .then(() => {
              this.dataStore.loadMoreState = 'idle';
              m.redraw();
            })
            .catch(() => {
              this.dataStore.loadMoreState = 'error';
            });
        },
      },
      this.dataStore.loadMoreState === 'error' ? i18n('load_more_error') : i18n('load_more')
    );
  }

  get _detailsContainerView() {
    if (this.detailsItemId) {
      if (this.dataStore.detailsLoaded) {
        return m(
          'div.details',
          {
            id: `${this.name}ListDetailsView`,
            style: {
              top: `${this.dataStore.getPositionTop('detailsView')}px`,
            },
          },
          this._detailsView
        );
      }
      // Do not show anything on details panel when data has not been loaded.
      return m('');
    }
    return m(
      'div.details',
      {
        id: `${this.name}ListDetailsView`,
        style: {
          top: `${this.dataStore.getPositionTop('detailsView')}px`,
        },
      },
      this._detailsPlaceholderView
    );
  }
}
