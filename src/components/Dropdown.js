import m from 'mithril';

export default class DropdownComponent {
  constructor() {
    this.data = m.prop([{ name: 'alice', id: 1 }, { name: 'bob', id: 2 }]);
    this.selectedId = m.prop();
  }
  view(ctrl) {
    return m('select', { onchange: m.withAttr('value', ctrl.selectedId) }, [
      this.data().map(person => m('option', { value: person.id }, person.name)),
    ]);
  }
}
