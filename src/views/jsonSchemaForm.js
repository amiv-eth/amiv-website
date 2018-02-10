import m from 'mithril';
import Ajv from 'ajv';
import jsonSchemaDraft04 from 'ajv/lib/refs/json-schema-draft-04.json';
import { inputGroup, selectGroup } from './formFields';

export default class JSONSchemaForm {
  constructor() {
    this.data = {};
    this.errors = {};

    this.ajv = new Ajv({
      missingRefs: 'ignore',
      errorDataPath: 'property',
      allErrors: true,
    });
    this.ajv.addMetaSchema(jsonSchemaDraft04);
  }

  oninit(vnode) {
    this.schema = vnode.attrs.schema;
    if (this.schema === null || typeof this.schema !== 'object') {
      this.schema = undefined;
    } else {
      this.ajv.addSchema(this.schema, 'schema');
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

  getValue() {
    return this.data;
  }

  // render all schema properties to an array of form-fields
  renderFormElements() {
    const elements = [];
    if (this.schema !== undefined) {
      Object.keys(this.schema.properties).forEach((key) => {
        elements.push(this._renderProperty(key, this.schema.properties[key]));
      });
    }
    return elements;
  }

  // render schema property to form-fields
  _renderProperty(key, item) {
    if ('enum' in item) {
      return m(selectGroup, this.bind({
        name: key,
        title: item.description,
        args: {
          options: item.enum,
          type: 'select',
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
        return m(selectGroup, this.bind({
          name: key,
          title: item.description,
          args: {
            options: item.items.enum,
            type: item.items.enum.length > 8 ? 'select' : 'buttons',
            multipleSelect: true,
          },
        }));
      }
      case 'string':
      default: {
        return m(inputGroup, this.bind({ name: key, title: item.description, args: { type: 'text' } }));
      }
    }
  }
}
