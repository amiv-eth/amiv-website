import m from 'mithril';
import Ajv from 'ajv';
import jsonSchemaDraft04 from 'ajv/lib/refs/json-schema-draft-04.json';
import { log } from '../../models/log';
import inputGroup from './inputGroup';
import selectGroup from './selectGroup';

export default class JSONSchemaForm {
  constructor() {
    this.data = {};
    this.errors = {};

    this.ajv = new Ajv({
      missingRefs: 'ignore',
      errorDataPath: 'property',
      allErrors: false,
    });
    this.ajv.addMetaSchema(jsonSchemaDraft04);
  }

  oninit(vnode) {
    this.schema = vnode.attrs.schema;
    this.fieldOrder = vnode.attrs.fieldOrder;
    if (this.schema === null || typeof this.schema !== 'object') {
      this.schema = undefined;
    } else {
      this.ajv.addSchema(this.schema, 'schema');
    }
    if (!this.fieldOrder) {
      this.fieldOrder = [];
    }
  }

  // bind form-fields to the object data and validation
  bind(attrs) {
    // initialize error-list for every bound field
    if (!this.errors[attrs.name]) this.errors[attrs.name] = [];

    const boundFormelement = {
      oninput: (e) => {
        // bind changed data
        this.data[e.target.name] = e.target.value;

        // validate against schema
        const validate = this.ajv.getSchema('schema');
        this.valid = validate(this.data);

        if (this.valid) {
          Object.keys(this.errors).forEach((field) => {
            this.errors[field] = [];
          });
        } else {
          // get errors for respective fields
          Object.keys(this.errors).forEach((field) => {
            const errors = validate.errors.filter(error =>
              `.${field}` === error.dataPath);
            this.errors[field] = errors.map(error => error.message);
          });
        }
      },
      getErrors: () => this.errors[attrs.name],
      value: this.data[attrs.name],
    };
    // add the given attributes
    Object.keys(attrs).forEach((key) => { boundFormelement[key] = attrs[key]; });

    return boundFormelement;
  }

  view() {
    const elements = this.renderFormElements();
    return m('form', elements);
  }

  isValid() {
    return this.schema === undefined || this.valid;
  }

  validate() {
    // validate the new data against the schema
    const validate = this.ajv.getSchema('schema');
    this.valid = validate(this.data);
  }

  getValue() {
    return this.data;
  }

  // render all schema properties to an array of form-fields
  renderFormElements() {
    const elements = [];
    if (this.schema !== undefined) {
      let keys = Object.keys(this.schema.properties);
      this.fieldOrder.forEach((key) => {
        if (key in keys) {
          elements.push(this._renderProperty(key, this.schema.properties[key]));
          keys = keys.filter(e => e !== key);
        }
      });
      keys.forEach((key) => {
        elements.push(this._renderProperty(key, this.schema.properties[key]));
      });
    }
    return elements;
  }

  _renderArrayProperty(key, item) {
    if ('enum' in item) {
      return m(selectGroup, this.bind({
        name: key,
        title: item.description,
        type: item.items.enum.length > 8 ? 'select' : 'buttons',
        options: item.items.enum,
        args: {
          multipleSelect: true,
        },
      }));
    }
    log('Unknown array property type');
    return m('');
  }

  // render schema property to form-fields
  _renderProperty(key, item) {
    if (item.readOnly) return m('');

    if ('enum' in item) {
      return m(selectGroup, this.bind({
        name: key,
        title: item.description,
        options: item.enum,
        type: 'select',
        args: {
          multipleSelect: false,
        },
      }));
    }
    switch (item.type) {
      case 'integer': {
        return m(inputGroup, this.bind({ name: key, title: item.description, args: { type: 'number', step: 1 } }));
      }
      case 'number': {
        return m(inputGroup, this.bind({ name: key, title: item.description, args: { type: 'number' } }));
      }
      case 'boolean': {
        return m(inputGroup, this.bind({ name: key, title: item.description, args: { type: 'checkbox' } }));
      }
      case 'array': {
        return this._renderArrayProperty(key, item);
      }
      case 'string':
      default: {
        return m(inputGroup, this.bind({ name: key, title: item.description, args: { type: 'text' } }));
      }
    }
  }
}
