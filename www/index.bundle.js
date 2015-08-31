/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(1);
	var Form = __webpack_require__(2);
	
	// The main code is in ./components/Form.jsx
	
	React.render(React.createElement(Form, null), document.getElementById('app'));

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(1);
	var Formation = __webpack_require__(3);
	var classnames = __webpack_require__(15);
	
	var CreateForm = Formation.CreateForm;
	var SubmitButton = Formation.SubmitButton;
	var ErrorMessage = Formation.ErrorMessage;
	
	var CardExpiry = __webpack_require__(16);
	var Currency = __webpack_require__(17);
	
	var Input = React.createClass({ displayName: "Input",
	  mixins: [Formation.FormMixin],
	  render: function render() {
	    var errors = this.validateField(this.props.field);
	    var inputClass = classnames('input', {
	      valid: this.didSubmit() && !errors,
	      invalid: this.didSubmit() && errors
	    });
	    return React.createElement("div", null, React.createElement("input", { className: inputClass, type: this.props.type || 'text', placeholder: this.props.label, valueLink: this.linkField(this.props.field) }), React.createElement(ErrorMessage, { className: "helper-error", field: this.props.field }));
	  }
	});
	
	module.exports = CreateForm({
	
	  schema: {
	    description: {
	      label: 'Description',
	      type: 'string'
	    },
	    statementDesc: {
	      label: 'Statement Desc',
	      type: 'string'
	    },
	    cardNumber: {
	      required: true,
	      label: 'Card number',
	      type: function type(card) {
	        if (card.length < 17 && card.length > 14) return false;
	        return 'Enter a valid card number';
	      }
	    },
	    cvcNumber: {
	      label: 'CVC number',
	      type: function type(cvc) {
	        if (cvc.length < 5 && cvc.length > 2) return false;
	        return 'Enter a 3- or 4-digit CVC';
	      }
	    },
	    expMonth: {
	      required: true
	    },
	    expYear: {
	      required: true
	    },
	    currency: {
	      required: true
	    },
	    amount: {
	      type: 'dollar',
	      required: true,
	      label: 'Amount'
	    }
	  },
	
	  onSuccess: function onSuccess(data) {
	    alert(JSON.stringify(data));
	  },
	
	  render: function render() {
	    return React.createElement("div", { className: "stripe-eg" }, React.createElement("form", null, React.createElement("h2", null, "Create a new payment"), React.createElement(Currency, null), React.createElement("div", { className: "form-group" }, React.createElement("label", null, "Amount:"), React.createElement(Input, { label: "9.99", field: "amount" })), React.createElement("div", { className: "form-group" }, React.createElement("label", null, "Card number:"), React.createElement(Input, { label: "", field: "cardNumber" })), React.createElement("div", { className: "form-group" }, React.createElement("label", { className: "optional" }, "CVC:"), React.createElement(Input, { label: "", field: "cvcNumber" })), React.createElement(CardExpiry, null), React.createElement("div", { className: "form-group" }, React.createElement("label", { className: "optional" }, "Description:"), React.createElement(Input, { label: "", field: "description" })), React.createElement("div", { className: "form-group" }, React.createElement("label", { className: "optional" }, "Statement desc:"), React.createElement(Input, { label: "", field: "statementDesc" })), React.createElement("footer", null, React.createElement("div", { className: "form-group" }, React.createElement("button", { className: "cancel" }, "Cancel"), React.createElement(SubmitButton, { className: "submit" }, "Create payment ")))));
	  }
	});

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = {
	  CreateForm: __webpack_require__(4),
	  SubmitButton: __webpack_require__(9),
	  SubmitGroupButton: __webpack_require__(12),
	  FormMixin: __webpack_require__(11),
	  ErrorMessage: __webpack_require__(13),
	  Radio: __webpack_require__(14),
	  validations: __webpack_require__(7)
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(1);
	var convertSchema = __webpack_require__(5);
	var CreateFormMixin = __webpack_require__(6);
	var contextConfig = __webpack_require__(8);
	
	module.exports = function CreateForm(config) {
	
	  if (!config.schema) throw new Error('You must include "schema" as one of the properties for CreateForm');
	  if (!config.mixins) config.mixins = [];
	
	  // If we get an array for the schema,
	  // assume we want a multi-part form
	  if (config.schema instanceof Array) {
	    config.schema = convertSchema(config.schema);
	  }
	
	  // We need this for setting up linked state
	  if (config.mixins.indexOf(React.addons.LinkedStateMixin) === -1) {
	    config.mixins.push(React.addons.LinkedStateMixin);
	  }
	
	  config.mixins.push({
	    getInitialState: function getInitialState() {
	      var _this = this;
	
	      var state = {
	        didSubmit: false,
	        dirtyFields: {}
	      };
	
	      Object.keys(this.schema).forEach(function (key) {
	        state.dirtyFields[key] = false;
	        state[key] = _this.schema[key].initial;
	      });
	
	      return state;
	    },
	
	    childContextTypes: contextConfig.types,
	
	    getChildContext: function getChildContext() {
	      var _this2 = this;
	
	      var methods = {};
	      contextConfig.methods.forEach(function (method) {
	        methods[method] = _this2[method];
	      });
	      return {
	        composableForms: methods
	      };
	    }
	  });
	
	  config.mixins.push(CreateFormMixin);
	
	  return React.createClass(config);
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function convertSchema(schema) {
	  var newSchema = {};
	
	  schema.forEach(function (group, i) {
	    Object.keys(group).forEach(function (key) {
	      group[key].group = i;
	      if (newSchema[key]) throw new Error('Your schema has two groups with the same field: ' + key);
	      newSchema[key] = group[key];
	    });
	  });
	
	  return newSchema;
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = {
	
	  linkField: function linkField(key) {
	    if (!this.schema[key]) throw new Error('No value "' + key + '" exists in the schema');
	    return this.linkState(key);
	  },
	
	  getValues: function getValues() {
	    var _this = this;
	
	    var values = {};
	    Object.keys(this.schema).forEach(function (key) {
	      if (typeof _this.linkField(key).value === 'undefined') return;
	      values[key] = _this.linkField(key).value;
	    });
	    return values;
	  },
	
	  submitGroup: function submitGroup(group, onSuccess, onError) {
	    var _this2 = this;
	
	    var dirtyFields = this.state.dirtyFields;
	
	    Object.keys(this.schema).forEach(function (key) {
	      if (_this2.schema[key].group === group) dirtyFields[key] = true;
	    });
	
	    this.setState({ dirtyFields: dirtyFields });
	
	    // TODO return values
	    if (this.isGroupValid(group)) {
	      onSuccess && onSuccess();
	    } else {
	      onError && onError();
	    }
	  },
	
	  submitForm: function submitForm(e) {
	    var _this3 = this;
	
	    if (e) e.preventDefault();
	
	    // Make all fields dirty
	    var dirtyFields = this.state.dirtyFields;
	    Object.keys(this.schema).forEach(function (key) {
	      dirtyFields[key] = true;
	    });
	
	    this.setState({
	      dirtyFields: dirtyFields,
	      didSubmit: true
	    });
	
	    if (!this.isValid()) return;
	
	    var data = {};
	
	    Object.keys(this.schema).forEach(function (key) {
	      if (typeof _this3.state[key] !== 'undefined') data[key] = _this3.state[key];
	    });
	
	    if (this.onSuccess) {
	      this.onSuccess(data);
	    }
	  },
	
	  validations: __webpack_require__(7),
	
	  validateField: function validateField(key) {
	    var errors = [];
	    var schema = this.schema[key];
	    var currentValue = this.state[key];
	    var label = schema.label || key;
	
	    if (schema.required === true && !currentValue) errors.push(label + ' is required');
	    if (typeof schema.required === 'function') {
	      var isConditionallyRequred = schema.required.bind(this)();
	      if (isConditionallyRequred && !currentValue) errors.push(label + ' is required');
	    }
	    if (currentValue && typeof schema.type === 'string' && this.validations[schema.type]) {
	      var typeError = this.validations[schema.type](currentValue);
	      if (typeError) errors.push(typeError);
	    }
	    if (currentValue && typeof schema.type === 'function') {
	      var typeError = schema.type(currentValue);
	      if (typeError) errors.push(typeError);
	    }
	    if (!errors.length) return false;
	    return errors;
	  },
	
	  didSubmit: function didSubmit(field) {
	    if (!field) return this.state.didSubmit;
	    return this.state.dirtyFields[field];
	  },
	
	  isGroupValid: function isGroupValid(groupName) {
	    var _this4 = this;
	
	    var isValid = true;
	    var fields = Object.keys(this.schema).filter(function (key) {
	      return _this4.schema[key].group === groupName;
	    });
	    fields.forEach(function (key) {
	      if (_this4.validateField(key)) isValid = false;
	    });
	    return isValid;
	  },
	
	  isValid: function isValid() {
	    var _this5 = this;
	
	    var isValid = true;
	    Object.keys(this.schema).forEach(function (key) {
	      if (_this5.validateField(key)) isValid = false;
	    });
	    return isValid;
	  }
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';
	
	var EMAIL_REGEX = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
	var NUMBER_REGEX = /^\d+$/;
	var DOLLAR_REGEX = /^\d*\.?\d*$/;
	
	// TODO: make configurable, localizable, add basic templating
	var messages = {
	  email: 'This must be a valid email',
	  number: 'This must be a number',
	  dollar: 'This must be a dollar amount'
	};
	
	var validations = {
	  email: function email(value) {
	    if (EMAIL_REGEX.test(value)) {
	      return false;
	    } else {
	      return messages.email;
	    }
	  },
	  number: function number(value) {
	    if (NUMBER_REGEX.test(value)) {
	      return false;
	    } else {
	      return messages.number;
	    }
	  },
	  dollar: function number(value) {
	    if (DOLLAR_REGEX.test(value)) {
	      return false;
	    } else {
	      return messages.dollar;
	    }
	  }
	};
	
	module.exports = validations;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(1);
	
	// This is the name of the object that we will add to the context
	var CONTEXT_NAME = 'composableForms';
	
	// We can use this for contextTypes, childContextTypes
	var types = {};
	types[CONTEXT_NAME] = React.PropTypes.object;
	
	// Methods that will be exposed on context.composableForms and FormMixin
	// Each method MUST have a .md file in src/lib/apiDocs
	// e.g. for this.didSubmit(), there should be a file called didSubmit.md
	// var docFiles = require.context('./apiDocs', true, /\.md$/).keys();
	// var methods = docFiles.map(file => file.replace('./', '').replace('.md', ''));
	
	var methods = ['didSubmit', 'isGroupValid', 'isValid', 'linkField', 'submitForm', 'submitGroup', 'validateField'];
	
	module.exports = {
	  name: CONTEXT_NAME,
	  types: types,
	  methods: methods
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(1);
	var assign = __webpack_require__(10);
	
	module.exports = React.createClass({
	  displayName: 'exports',
	
	  mixins: [__webpack_require__(11)],
	  render: function render() {
	    var props = assign({}, this.props, {
	      onClick: this.submitForm
	    });
	    return React.createElement('button', props, this.props.children || 'Submit');
	  }
	});

/***/ },
/* 10 */
/***/ function(module, exports) {

	/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule Object.assign
	 */
	
	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.assign
	
	'use strict';
	
	function assign(target, sources) {
	  if (target == null) {
	    throw new TypeError('Object.assign target cannot be null or undefined');
	  }
	
	  var to = Object(target);
	  var hasOwnProperty = Object.prototype.hasOwnProperty;
	
	  for (var nextIndex = 1; nextIndex < arguments.length; nextIndex++) {
	    var nextSource = arguments[nextIndex];
	    if (nextSource == null) {
	      continue;
	    }
	
	    var from = Object(nextSource);
	
	    // We don't currently support accessors nor proxies. Therefore this
	    // copy cannot throw. If we ever supported this then we must handle
	    // exceptions and side-effects. We don't support symbols so they won't
	    // be transferred.
	
	    for (var key in from) {
	      if (hasOwnProperty.call(from, key)) {
	        to[key] = from[key];
	      }
	    }
	  }
	
	  return to;
	}
	
	module.exports = assign;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var contextConfig = __webpack_require__(8);
	
	var FormMixin = {
	  contextTypes: contextConfig.types
	};
	
	// Add each method defined in the context to the mixin
	contextConfig.methods.forEach(function (method) {
	  FormMixin[method] = function () {
	    return this.context.composableForms[method].apply(null, arguments);
	  };
	});
	
	module.exports = FormMixin;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(1);
	var assign = __webpack_require__(10);
	
	module.exports = React.createClass({
	  displayName: 'exports',
	
	  mixins: [__webpack_require__(11)],
	  onClick: function onClick(e) {
	    e.preventDefault();
	    this.submitGroup(this.props.group, this.props.onSuccess, this.props.onError);
	  },
	  render: function render() {
	    var props = assign({}, this.props, {
	      onClick: this.onClick
	    });
	
	    delete props.onSuccess;
	    delete props.onError;
	
	    return React.createElement('button', props, this.props.children || 'Submit');
	  }
	});

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(1);
	var assign = __webpack_require__(10);
	
	module.exports = React.createClass({
	  displayName: 'exports',
	
	  propTypes: {
	    field: React.PropTypes.string.isRequired,
	    show: React.PropTypes.bool
	  },
	  mixins: [__webpack_require__(11)],
	  showErrors: function showErrors(errors) {
	    if (!errors) return false;
	    if (typeof this.props.show !== 'undefined') return this.props.show;
	    if (errors && this.didSubmit(this.props.field)) return true;
	  },
	  render: function render() {
	    var errors = this.validateField(this.props.field);
	    var props = assign({ className: 'errors' }, this.props, {
	      hidden: !this.showErrors(errors)
	    });
	    return React.createElement('div', props, errors && errors.map(function (error) {
	      return React.createElement('span', { key: error }, error);
	    }));
	  }
	});

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(1);
	var assign = __webpack_require__(10);
	
	var Radio = React.createClass({
	  displayName: 'Radio',
	
	  onChange: function onChange(e) {
	    var value = e.target.value;
	    if (typeof this.props.value === 'number') value = +value;
	    this.props.radioLink.requestChange(value);
	  },
	  render: function render() {
	    var props = assign({}, this.props, {
	      type: 'radio',
	      checked: this.props.value + '' === this.props.radioLink.value + '',
	      onChange: this.onChange
	    });
	    return React.createElement('input', props);
	  }
	});
	
	module.exports = Radio;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2015 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	
	(function () {
		'use strict';
	
		function classNames () {
	
			var classes = '';
	
			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;
	
				var argType = typeof arg;
	
				if ('string' === argType || 'number' === argType) {
					classes += ' ' + arg;
	
				} else if (Array.isArray(arg)) {
					classes += ' ' + classNames.apply(null, arg);
	
				} else if ('object' === argType) {
					for (var key in arg) {
						if (arg.hasOwnProperty(key) && arg[key]) {
							classes += ' ' + key;
						}
					}
				}
			}
	
			return classes.substr(1);
		}
	
		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if (true){
			// AMD. Register as an anonymous module.
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	
	}());


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(1);
	
	var _require = __webpack_require__(3);
	
	var FormMixin = _require.FormMixin;
	var ErrorMessage = _require.ErrorMessage;
	
	var days = [];
	var years = [];
	for (var i = 2016; i < 2020; i++) {
	  years.push(i);
	}
	for (var j = 1; j < 32; j++) {
	  days.push(j);
	}
	var dateData = {
	  years: years,
	  months: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
	  days: days
	};
	
	module.exports = React.createClass({ displayName: "module.exports",
	
	  mixins: [FormMixin],
	
	  render: function render() {
	    return React.createElement("div", null, React.createElement("div", { className: "form-group" }, React.createElement("label", null, "Exp. month:"), React.createElement("select", { valueLink: this.linkField('expMonth') }, React.createElement("option", { value: "" }, "Month"), dateData.months.map(function (month) {
	      return React.createElement("option", { value: month }, month);
	    }))), React.createElement("div", { className: "form-group" }, React.createElement("label", null, "Exp. year:"), React.createElement("select", { valueLink: this.linkField('expYear') }, React.createElement("option", { value: "" }, "Year"), dateData.years.map(function (year) {
	      return React.createElement("option", { value: year }, year);
	    }))));
	  }
	});

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(1);
	
	var _require = __webpack_require__(3);
	
	var FormMixin = _require.FormMixin;
	var ErrorMessage = _require.ErrorMessage;
	
	var currencies = ['USD United States Dollar'];
	
	module.exports = React.createClass({ displayName: "module.exports",
	
	  mixins: [FormMixin],
	
	  render: function render() {
	    return React.createElement("div", { className: "form-group" }, React.createElement("label", { className: "optional" }, "Currency:"), React.createElement("select", { className: "currency", valueLink: this.linkField('currency') }, React.createElement("option", { className: "currency", value: "" }, "CAD - Canadian Dollar"), currencies.map(function (currencies) {
	      return React.createElement("option", { value: currencies }, currencies);
	    })));
	  }
	});

/***/ }
/******/ ]);
//# sourceMappingURL=index.bundle.js.map