import m from 'mithril';
import animateScrollTo from 'animated-scroll-to';
import { List, Shadow, ListTile, Button, Icon } from 'polythene-mithril';
import { Spinner } from 'amiv-web-ui-components';
import { error } from '../models/log';
import { i18n, currentLanguage } from '../models/language';
import { FilterView } from '../components';
import icons from '../images/icons';

const LIST_LOADING = 'loading';
const LIST_LOADED = 'loaded';
const LIST_ERROR = 'error';

const LOAD_MORE_IDLE = 'idle';
const LOAD_MORE_LOADING = 'loading';
const LOAD_MORE_ERROR = 'error';

/**
 * FilteredListDataStore class
 *
 * The instance of this class should be a file-global variable (static)
 * in order to survive any change in the URL.
 */
export class FilteredListDataStore {
  constructor() {
    this.shouldScroll = true;
    this.lastScrollPosition = 0;
    this.filterViewPositionTop = 0;
    this.listState = LIST_LOADING;
    this._loadMoreStates = [];
    this.filterValues = {};
    this.initialized = false;
  }

  get shouldScroll() {
    return this._shouldScroll;
  }

  set shouldScroll(value) {
    this._shouldScroll = value;
  }

  get lastScrollPosition() {
    return this._lastScrollPosition;
  }

  set lastScrollPosition(position) {
    this._lastScrollPosition = position;
  }

  get filterViewPositionTop() {
    return this._filterViewPositionTop;
  }

  set filterViewPositionTop(position) {
    this._filterViewPositionTop = position;
  }

  get listState() {
    return this._listState;
  }

  set listState(state) {
    if (![LIST_LOADING, LIST_LOADED, LIST_ERROR].includes(state)) {
      throw new Error(`Invalid state '${state}' for 'listState'`);
    }
    this._listState = state;
  }

  get pinnedItem() {
    return this._pinnedItem;
  }

  set pinnedItem(item) {
    this._pinnedItem = item;
  }

  getLoadMoreState(listName) {
    const state = this._loadMoreStates[listName];
    if (state) {
      return state;
    }
    return LOAD_MORE_IDLE;
  }

  setLoadMoreState(listName, state) {
    if (![LOAD_MORE_IDLE, LOAD_MORE_LOADING, LOAD_MORE_ERROR].includes(state)) {
      throw new Error(`Invalid state '${state}' for 'loadMoreState'`);
    }
    this._loadMoreStates[listName] = state;
  }

  get filterValues() {
    return this._filterValues;
  }

  set filterValues(values) {
    this._filterValues = values;
  }

  get isInitialized() {
    return this._isInitialized;
  }

  setIsInitialized() {
    this._isInitialized = true;
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
   * @param {string}                resource  resource used to build the paths for this page
   * @param {FilteredListDataStore} dataStore persistent data store
   */
  constructor(resource, dataStore) {
    this.name = resource;
    this.dataStore = dataStore;
    this.mobileViewShowFilter = false;
  }

  /**
   * @param {object} vnode
   * @param {string} itemId id of the item to be shown on the details page
   */
  oninit(vnode, itemId) {
    // scroll events don't bubble up, so we need set useCapture to true for children scrollable elements
    document.addEventListener('scroll', () => this.onscroll(), true);

    this.itemId = itemId;

    if (this.dataStore.isInitialized) {
      this._handleItemDirectLink(itemId);
    }
  }

  _handleItemDirectLink(itemId) {
    if (!itemId) {
      this.dataStore.shouldScroll = false;
    }

    if (itemId && !this._isItemLoaded(itemId)) {
      this.dataStore.pinnedItem = { loading: true };
      this._loadItem(itemId)
        .then(item => {
          this.dataStore.pinnedItem = { loading: false, item };
        })
        .catch(() => {
          this.dataStore.pinnedItem = { loading: false };
        });
    }
    this.itemId = itemId;
  }

  oncreate({ dom }) {
    this.filterView = dom.querySelector(`#${this.name}ListFilterView`);
  }

  onupdate({ dom }) {
    this.filterView = dom.querySelector(`#${this.name}ListFilterView`);

    if (this.itemId && this.dataStore.isInitialized && this.dataStore.shouldScroll) {
      const element = dom.querySelector(`#${this.getItemElementId(this.itemId)}`);
      if (element) {
        this.dataStore.shouldScroll = false;
        setTimeout(() => animateScrollTo(element, { offset: -86 }), 50);
      }
    }
  }

  /* eslint-disable class-methods-use-this, no-unused-vars */

  /**
   * Checks if the page has any items to show.
   *
   * You should replace this function if you need additional behavior!
   *
   * @return {boolean}
   * @protected
   */
  _hasItems() {
    return true;
  }

  /**
   * Checks if the item with the given id is loaded
   *
   * *This is an abstract function!
   * Implementation in child class is mandatory*
   *
   * @param {string} itemId id of the item to be checked
   * @return {boolean}
   * @protected
   */
  _isItemLoaded(itemId) {
    throw new Error('_isItemLoaded(itemId) not implemented');
  }

  /**
   * Used to load a single item
   *
   * *This is an abstract function!
   * Implementation in child class is mandatory*
   *
   * @param {string} itemId id of the item to be shown on the details page
   * @return {Promise} if successful, the promise should return the item.
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
    return { fields: [], onchange: async () => {} };
  }

  /**
   * This returns the lists which should be randered by the base view.
   *
   * NOTES:
   *  * One of `items` or `pages` must be provided!
   *  * `items` requires an array or a class which supports the `map()` function!
   *  * `pages` requires an array of a class which supports the `map()` function and has
   *    values that satisfy the requirements for `items`.
   *  * `title` is optional. If missing, no list header is shown.
   *  * `loadMore` is optional. If available, it is used to load more items for the given list. Expects a return value of type `Promise`.
   *
   * Example:
   * ```javascript
   *   [
   *     {
   *       name: 'list1',
   *       title: 'List One',
   *       items: ['item 1.1', 'item 1.2'],
   *       loadMore: () => do_some_stuff_here,
   *     },
   *     {
   *       name: 'list2',
   *       title: 'List Two',
   *       pages: [['item 2.1', 'item 2.2'], ['item 2.3', 'item 2.4']],
   *     },
   *   ]
   * ```
   *
   * *This is an abstract function!
   * Implementation in child class is mandatory*
   *
   * @return {array} array as described above
   * @protected
   */
  get _lists() {
    throw new Error('_lists not implemented');
  }

  /**
   * Renders a list item
   *
   * *This is an abstract function!
   * Implementation in child class is mandatory*
   *
   * @param {object} item item to be rendered
   * @param {string} list name of the list where the item gets rendered
   * @return {object} vnode
   */
  _renderItem(item, list) {
    throw new Error('_renderItem not implemented');
  }

  /* eslint-enable */

  reload() {
    this.dataStore.listState = LIST_LOADING;
    return this._reloadData()
      .then(() => {
        this.dataStore.listState = LIST_LOADED;
      })
      .catch(err => {
        error(err);
        this.dataStore.listState = LIST_ERROR;
      })
      .finally(() => {
        m.redraw();
      });
  }

  /**
   * Get the id for the dom element of a specific item.
   *
   * @param {string} itemId item id
   */
  getItemElementId(itemId) {
    return `${this.name}_${itemId}`;
  }

  /**
   * Callback for item selection updates.
   *
   * *This function should be called by the child class!*
   *
   * @param {string}  id          Id of the item triggering the event
   * @param {boolean} selected    True if the item got selected
   * @param {int}     delay       Time in milliseconds to wait before changing route (default: 0ms)
   */
  // eslint-disable-next-line class-methods-use-this
  onChange(id, selected, delay = 0) {
    this.itemId = selected ? id : null;
    m.redraw();

    if (this.changeTimeout) {
      clearTimeout(this.changeTimeout);
    }
    this.changeTimeout = setTimeout(() => {
      const basePath = `/${currentLanguage()}/${this.name}`;
      const path = this.itemId ? `${basePath}/${id}` : basePath;
      m.route.setOrig(path);
    }, delay);
  }

  onscroll() {
    if (!this.filterView) return;

    const windowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    const scrollDelta = document.documentElement.scrollTop - this.dataStore.lastScrollPosition;
    const maxPosition = Math.min(windowHeight - this.filterView.scrollHeight, 0);
    const currentPosition = this.dataStore.filterViewPositionTop;

    const positionTop = Math.min(0, Math.max(currentPosition - scrollDelta, maxPosition));
    this.dataStore.filterViewPositionTop = positionTop;
    // eslint-disable-next-line no-param-reassign
    this.filterView.style.top = `${positionTop}px`;

    this.dataStore.lastScrollPosition = document.documentElement.scrollTop;
  }

  view() {
    const classes = ['filtered-list'];

    if (this.mobileViewShowFilter) {
      classes.push('mobile-show-filter');
    }

    let mobileButton;

    if (this.mobileViewShowFilter) {
      mobileButton = m(
        'div.action-button',
        {
          onclick: () => {
            this.mobileViewShowFilter = false;
          },
        },
        [m(Icon, { svg: { content: m.trust(icons.close) } }), ' ', m('span', i18n('filter.hide'))]
      );
    } else {
      mobileButton = m(
        'div.action-button',
        {
          onclick: () => {
            this.mobileViewShowFilter = true;
          },
        },
        [
          m(Icon, { svg: { content: m.trust(icons.filterList) } }),
          ' ',
          m('span', i18n('filter.show')),
        ]
      );
    }
    return m(
      `div#${this.name}-list`,
      {
        class: classes.join(' '),
      },
      [
        mobileButton,
        m('div.filter-container', this._filterView),
        m('div.content', this._listContainerView),
      ]
    );
  }

  get _filterView() {
    return [
      m(
        'div.filter',
        {
          id: `${this.name}ListFilterView`,
          style: {
            top: `${this.dataStore.filterViewPositionTop}px`,
          },
        },
        m(FilterView, {
          values: this.dataStore.filterValues,
          ...this._filterViewAttributes,
          onchange: async values => {
            this.dataStore.listState = LIST_LOADING;
            m.redraw();
            try {
              await this._filterViewAttributes.onchange(values);

              if (!this.dataStore.isInitialized) {
                this.dataStore.setIsInitialized();
                if (this.itemId) {
                  this._handleItemDirectLink(this.itemId);
                }
              }
              this.dataStore.listState = LIST_LOADED;
            } catch ({ _error: { code } }) {
              this.dataStore.listState = LIST_ERROR;
            }
            m.redraw();
          },
        })
      ),
    ];
  }

  get _listContainerView() {
    if (this.dataStore.listState === LIST_LOADING) {
      return m('div.loading', m(Spinner, { show: true, size: '96px' }));
    } else if (this.dataStore.listState === LIST_LOADED) {
      if (this._hasItems()) {
        let pinnedList;

        if (this.dataStore.pinnedItem && !this.dataStore.pinnedItem.loading) {
          pinnedList = this._renderList({
            name: 'pinned',
            items: [this.dataStore.pinnedItem.item],
          });
        }

        return [pinnedList, ...this._lists.map(list => this._renderList(list))];
      }
      return this.constructor._renderFullPageMessage(i18n('emptyList'));
    }
    return this.constructor._renderFullPageMessage(i18n('loadingError'));
  }

  static _renderFullPageMessage(message) {
    return m('span.empty-list', message);
  }

  _renderList(list) {
    const tiles = [];

    if (list.title) {
      tiles.push(
        m(
          Shadow,
          {
            className: 'list_header',
            shadowDepth: 1,
          },
          m(ListTile, {
            title: list.title,
          })
        )
      );
    }

    if (list.pages) {
      tiles.push(
        ...list.pages.map(page => page.map(item => this._renderItem(item, list.name, this.itemId)))
      );
    } else {
      tiles.push(...list.items.map(item => this._renderItem(item, list.name, this.itemId)));
    }

    if (list.loadMore && typeof list.loadMore === 'function') {
      tiles.push(this._renderLoadMoreItem(list, this.dataStore.getLoadMoreState(list.name)));
    }

    return m(List, {
      style: {
        backgroundColor: '#fff',
        borderStyle: 'none',
      },
      tiles,
    });
  }

  _renderLoadMoreItem(list) {
    const state = this.dataStore.getLoadMoreState(list.name);

    if (state === LOAD_MORE_LOADING) {
      return m(
        'div.load-more-items',
        m(Spinner, {
          className: 'spinner',
          show: true,
          size: '32px',
        })
      );
    }
    return m(
      'div.load-more-items',
      m(Button, {
        border: true,
        extraWide: true,
        label: state === LOAD_MORE_ERROR ? i18n('loadMoreError') : i18n('loadMore'),
        events: {
          onclick: () => {
            this.dataStore.setLoadMoreState(list.name, LOAD_MORE_LOADING);
            list
              .loadMore()
              .then(() => {
                this.dataStore.setLoadMoreState(list.name, LOAD_MORE_IDLE);
              })
              .catch(() => {
                this.dataStore.setLoadMoreState(list.name, LOAD_MORE_ERROR);
              })
              .finally(() => {
                m.redraw();
              });
          },
        },
      })
    );
  }
}
