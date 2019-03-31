import m from 'mithril';
import { Dialog } from 'polythene-mithril-dialog';
import { FAB } from 'polythene-mithril-fab';
import header from './header';
import footer from './footer';
import icons from '../images/icons';
import { isLsdTripEnabled, setLsdTripState } from '../models/lsd';

export default class Layout {
  static view(vnode) {
    return m(
      'div',
      {
        style: {
          fontFamily: isLsdTripEnabled() ? '"Comic Sans MS", cursive, sans-serif' : null,
          overflowY: isLsdTripEnabled() ? 'hidden' : null,
        },
      },
      [
        m(header),
        m('main', vnode.children),
        m(footer),
        m(Dialog),
        isLsdTripEnabled() &&
          m(
            'div',
            { style: { position: 'fixed', bottom: '4em', right: '4em' } },
            m(FAB, {
              style: {
                zIndex: 100,
                backgroundColor: '#5378E1',
                color: '#fff',
              },
              icon: { svg: { content: m.trust(icons.stop) } },
              events: {
                onclick: () => {
                  setLsdTripState(false);
                },
              },
            })
          ),
      ]
    );
  }
}
