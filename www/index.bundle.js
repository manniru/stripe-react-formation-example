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
	var classnames = __webpack_require__(16);
	
	var CreateForm = Formation.CreateForm;
	var SubmitButton = Formation.SubmitButton;
	var ErrorMessage = Formation.ErrorMessage;
	var Validator = Formation.Validator;
	
	var CardExpiry = __webpack_require__(17);
	var Currency = __webpack_require__(18);
	
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
	
	  getSchema: function getSchema() {
	    return {
	      description: {
	        label: 'Description',
	        type: 'string'
	      },
	      statementDesc: {
	        label: 'Statement Desc',
	        validations: 'string'
	      },
	      cardNumber: {
	        required: true,
	        label: 'Card number',
	        validations: Validator.number().creditCard()
	      },
	      cvcNumber: {
	        label: 'CVC number',
	        validations: Validator.number().min(2).max(5)
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
	        validations: 'currency',
	        required: true,
	        label: 'Amount'
	      }
	    };
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
	  SubmitButton: __webpack_require__(11),
	  SubmitGroupButton: __webpack_require__(13),
	  FormMixin: __webpack_require__(12),
	  ErrorMessage: __webpack_require__(14),
	  Radio: __webpack_require__(15),
	  Validator: __webpack_require__(7)
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(1);
	var convertSchema = __webpack_require__(5);
	var CreateFormMixin = __webpack_require__(6);
	var contextConfig = __webpack_require__(10);
	
	module.exports = function CreateForm(config) {
	  if (!config.getSchema) throw new Error('You must include "getSchema" as one of the properties for CreateForm');
	  if (!config.mixins) config.mixins = [];
	
	  // We need this for setting up linked state
	  if (config.mixins.indexOf(React.addons.LinkedStateMixin) === -1) {
	    config.mixins.push(React.addons.LinkedStateMixin);
	  }
	
	  config.mixins.push({
	    getInitialState: function getInitialState() {
	      var _this = this;
	
	      var state = {
	        __didSubmit: false,
	        __dirtyFields: {}
	      };
	
	      this.__schema = this.getSchema();
	
	      // assume we want a multi-part form
	      if (this.__schema instanceof Array) {
	        this.__schema = convertSchema(this.__schema);
	      }
	
	      Object.keys(this.__schema).forEach(function (key) {
	        state.__dirtyFields[key] = false;
	        state[key] = _this.__schema[key].initial;
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
	
	      var context = {};
	      context[contextConfig.name] = methods;
	      return context;
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
	
	var Validator = __webpack_require__(7);
	
	module.exports = {
	
	  linkField: function linkField(key) {
	    if (!this.__schema[key]) throw new Error('No value "' + key + '" exists in the schema');
	    return this.linkState(key);
	  },
	
	  getValues: function getValues() {
	    var _this = this;
	
	    var values = {};
	    Object.keys(this.__schema).forEach(function (key) {
	      if (typeof _this.linkField(key).value === 'undefined') return;
	      values[key] = _this.linkField(key).value;
	    });
	    return values;
	  },
	
	  submitGroup: function submitGroup(group, onSuccess, onError) {
	    var _this2 = this;
	
	    var __dirtyFields = this.state.__dirtyFields;
	
	    Object.keys(this.__schema).forEach(function (key) {
	      if (_this2.__schema[key].group === group) __dirtyFields[key] = true;
	    });
	
	    this.setState({ __dirtyFields: __dirtyFields });
	
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
	    var __dirtyFields = this.state.__dirtyFields;
	    Object.keys(this.__schema).forEach(function (key) {
	      __dirtyFields[key] = true;
	    });
	
	    this.setState({
	      __dirtyFields: __dirtyFields,
	      __didSubmit: true
	    });
	
	    if (!this.isValid()) return;
	
	    var data = {};
	
	    Object.keys(this.__schema).forEach(function (key) {
	      if (typeof _this3.state[key] !== 'undefined') data[key] = _this3.state[key];
	    });
	
	    if (this.onSuccess) {
	      this.onSuccess(data);
	    }
	  },
	
	  validateField: function validateField(key) {
	    var errors = [];
	    var schema = this.__schema[key];
	    var currentValue = this.state[key];
	    var label = schema.label || key;
	    var validator = schema.validations;
	
	    if (schema.type) {
	      console.warn('Using "type" in your schema is deprecated. Please use "validations" instead.');
	      validator = schema.type;
	    }
	
	    // Required field
	    if (schema.required === true && !currentValue) errors.push(label + ' is required');
	    if (typeof schema.required === 'function') {
	      var isConditionallyRequred = schema.required.bind(this)();
	      if (isConditionallyRequred && !currentValue) errors.push(label + ' is required');
	    }
	
	    // Test validations
	    var typeError;
	    if (currentValue && validator instanceof Validator) {
	      typeError = validator.assert(currentValue);
	    } else if (currentValue && typeof validator === 'string' && Validator[validator]) {
	      typeError = Validator[validator]().assert(currentValue);
	    } else if (currentValue && typeof validator === 'function') {
	      typeError = validator.call(this, currentValue);
	    }
	    if (typeError) errors = errors.concat(typeError);
	
	    return errors.length ? errors : false;
	  },
	
	  didSubmit: function didSubmit(field) {
	    if (!field) return this.state.__didSubmit;
	    return this.state.__dirtyFields[field];
	  },
	
	  isGroupValid: function isGroupValid(groupName) {
	    var _this4 = this;
	
	    var isValid = true;
	    var fields = Object.keys(this.__schema).filter(function (key) {
	      return _this4.__schema[key].group === groupName;
	    });
	    fields.forEach(function (key) {
	      if (_this4.validateField(key)) isValid = false;
	    });
	    return isValid;
	  },
	
	  isValid: function isValid() {
	    var _this5 = this;
	
	    var isValid = true;
	    Object.keys(this.__schema).forEach(function (key) {
	      if (_this5.validateField(key)) isValid = false;
	    });
	    return isValid;
	  }
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var assign = __webpack_require__(8);
	
	var Validator = function Validator() {
	  this.validationSchema = [];
	  this._validator = __webpack_require__(9);
	  this.messages = assign({}, Validator.messages);
	};
	
	Validator.messages = {
	  alpha: 'Must be letters only (A-Z)',
	  number: 'Must be a number',
	  url: 'Must be a URL',
	  date: 'Must be a date',
	  before: 'Must be before ${before}',
	  after: 'Must be after ${after}',
	  oneOf: 'Must be one of ${allowed}',
	  email: 'Must be an email',
	  creditCard: 'Please enter a valid credit card',
	  max: 'Must be less than ${max}',
	  min: 'Must be greater than ${min}',
	  maxLength: 'Must be less than ${max} characters',
	  minLength: 'Must be at least ${min} characters',
	  pattern: 'Does not match pattern',
	  currency: 'Must be a valid currency',
	  hexColor: 'Must be a valid hex color'
	};
	
	Validator.definitions = {
	  email: function email() {
	    return {
	      validate: this._validator.isEmail
	    };
	  },
	  url: function url(options) {
	    return {
	      validate: function validate(value) {
	        return this._validator.isURL(value, options);
	      }
	    };
	  },
	  date: function date() {
	    return {
	      validate: this._validator.isDate
	    };
	  },
	  before: function before(_before) {
	    return {
	      validate: function validate(value) {
	        return this._validator.isBefore(value, _before);
	      },
	      message: function message(m) {
	        return m.replace('${before}', _before);
	      }
	    };
	  },
	  after: function after(_after) {
	    return {
	      validate: function validate(value) {
	        return this._validator.isAfter(value, _after);
	      },
	      message: function message(m) {
	        return m.replace('${after}', _after);
	      }
	    };
	  },
	  number: function number() {
	    return {
	      validate: this._validator.isNumeric
	    };
	  },
	  alpha: function alpha() {
	    return {
	      validate: this._validator.isAlpha
	    };
	  },
	  max: function max(_max) {
	    return {
	      validate: function validate(val) {
	        return this._validator.isInt(val, { max: _max }) || this._validator.isFloat(val, { max: _max });
	      },
	      message: function message(m) {
	        return m.replace('${max}', _max);
	      }
	    };
	  },
	  min: function min(_min) {
	    return {
	      validate: function validate(val) {
	        return this._validator.isInt(val, { min: _min }) || this._validator.isFloat(val, { min: _min });
	      },
	      message: function message(m) {
	        return m.replace('${min}', _min);
	      }
	    };
	  },
	  maxLength: function maxLength(max) {
	    return {
	      validate: function validate(val) {
	        return this._validator.isLength(val, 0, max);
	      },
	      message: function message(m) {
	        return m.replace('${max}', max);
	      }
	    };
	  },
	  minLength: function minLength(min) {
	    return {
	      validate: function validate(val) {
	        return this._validator.isLength(val, min);
	      },
	      message: function message(m) {
	        return m.replace('${min}', min);
	      }
	    };
	  },
	  creditCard: function creditCard() {
	    return {
	      validate: this._validator.isCreditCard
	    };
	  },
	  oneOf: function oneOf(allowed) {
	    var _this = this;
	
	    return {
	      validate: function validate(val) {
	        return _this._validator.isIn(val, allowed);
	      },
	      message: function message(m) {
	        return m.replace('${allowed}', allowed.join(', '));
	      }
	    };
	  },
	  pattern: function pattern(_pattern) {
	    var _this2 = this;
	
	    return {
	      validate: function validate(val) {
	        return _this2._validator.matches(val, _pattern);
	      }
	    };
	  },
	  currency: function currency(options) {
	    return {
	      validate: function validate(value) {
	        return this._validator.isCurrency(value, options);
	      }
	    };
	  },
	  hexColor: function hexColor() {
	    return {
	      validate: this._validator.isHexColor
	    };
	  },
	  custom: function custom(definition) {
	    return definition;
	  }
	};
	
	Object.keys(Validator.definitions).forEach(function (key) {
	  Validator[key] = Validator.prototype[key] = function () {
	    var instance = this instanceof Validator ? this : new Validator();
	    var args = Array.prototype.slice.call(arguments);
	    var schema = Validator.definitions[key].apply(instance, arguments);
	
	    var lastArg = arguments[arguments.length - 1];
	    var customMessage = lastArg && typeof lastArg === 'object' && lastArg.message;
	
	    // If the validation function specifies a function, run the message template
	    // through it
	    if (typeof schema.message === 'function') {
	      var template = schema.message;
	      schema.message = function () {
	        return template.call(instance, customMessage || instance.messages[key] || '');
	      };
	    } else {
	      schema.message = function () {
	        return customMessage || instance.messages[key] || '';
	      };
	    }
	
	    instance.validationSchema.push(schema);
	
	    return instance;
	  };
	});
	
	Validator.prototype.assert = function (value, context) {
	  var _this3 = this;
	
	  var results = this.validationSchema.map(function (definition) {
	    var errorMessage = definition.message.call(_this3, value);
	    return definition.validate.call(context || _this3, value) ? false : errorMessage;
	  }).filter(function (error) {
	    return error;
	  });
	  return results.length ? results : false;
	};
	
	module.exports = Validator;

/***/ },
/* 8 */
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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * Copyright (c) 2015 Chris O'Hara <cohara87@gmail.com>
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining
	 * a copy of this software and associated documentation files (the
	 * "Software"), to deal in the Software without restriction, including
	 * without limitation the rights to use, copy, modify, merge, publish,
	 * distribute, sublicense, and/or sell copies of the Software, and to
	 * permit persons to whom the Software is furnished to do so, subject to
	 * the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be
	 * included in all copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
	 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
	 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
	 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
	 */
	
	(function (name, definition) {
	    if (true) {
	        module.exports = definition();
	    } else if (typeof define === 'function' && typeof define.amd === 'object') {
	        define(definition);
	    } else {
	        this[name] = definition();
	    }
	})('validator', function (validator) {
	
	    'use strict';
	
	    validator = { version: '4.0.6' };
	
	    var emailUserPart = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~]+$/i;
	    var quotedEmailUser = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f]))*$/i;
	
	    var emailUserUtf8Part = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+$/i;
	    var quotedEmailUserUtf8 = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*$/i;
	
	    var displayName = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\.\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\.\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\s]*<(.+)>$/i;
	
	    var creditCard = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
	
	    var isin = /^[A-Z]{2}[0-9A-Z]{9}[0-9]$/;
	
	    var isbn10Maybe = /^(?:[0-9]{9}X|[0-9]{10})$/
	      , isbn13Maybe = /^(?:[0-9]{13})$/;
	
	    var ipv4Maybe = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/
	      , ipv6Block = /^[0-9A-F]{1,4}$/i;
	
	    var uuid = {
	        '3': /^[0-9A-F]{8}-[0-9A-F]{4}-3[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i
	      , '4': /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
	      , '5': /^[0-9A-F]{8}-[0-9A-F]{4}-5[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
	      , all: /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i
	    };
	
	    var alpha = /^[A-Z]+$/i
	      , alphanumeric = /^[0-9A-Z]+$/i
	      , numeric = /^[-+]?[0-9]+$/
	      , int = /^(?:[-+]?(?:0|[1-9][0-9]*))$/
	      , float = /^(?:[-+]?(?:[0-9]+))?(?:\.[0-9]*)?(?:[eE][\+\-]?(?:[0-9]+))?$/
	      , hexadecimal = /^[0-9A-F]+$/i
	      , decimal = /^[-+]?([0-9]+|\.[0-9]+|[0-9]+\.[0-9]+)$/
	      , hexcolor = /^#?([0-9A-F]{3}|[0-9A-F]{6})$/i;
	
	    var ascii = /^[\x00-\x7F]+$/
	      , multibyte = /[^\x00-\x7F]/
	      , fullWidth = /[^\u0020-\u007E\uFF61-\uFF9F\uFFA0-\uFFDC\uFFE8-\uFFEE0-9a-zA-Z]/
	      , halfWidth = /[\u0020-\u007E\uFF61-\uFF9F\uFFA0-\uFFDC\uFFE8-\uFFEE0-9a-zA-Z]/;
	
	    var surrogatePair = /[\uD800-\uDBFF][\uDC00-\uDFFF]/;
	
	    var base64 = /^(?:[A-Z0-9+\/]{4})*(?:[A-Z0-9+\/]{2}==|[A-Z0-9+\/]{3}=|[A-Z0-9+\/]{4})$/i;
	
	    var phones = {
	      'zh-CN': /^(\+?0?86\-?)?1[345789]\d{9}$/,
	      'zh-TW': /^(\+?886\-?|0)?9\d{8}$/,
	      'en-ZA': /^(\+?27|0)\d{9}$/,
	      'en-AU': /^(\+?61|0)4\d{8}$/,
	      'en-HK': /^(\+?852\-?)?[569]\d{3}\-?\d{4}$/,
	      'fr-FR': /^(\+?33|0)[67]\d{8}$/,
	      'pt-PT': /^(\+351)?9[1236]\d{7}$/,
	      'el-GR': /^(\+30)?((2\d{9})|(69\d{8}))$/,
	      'en-GB': /^(\+?44|0)7\d{9}$/,
	      'en-US': /^(\+?1)?[2-9]\d{2}[2-9](?!11)\d{6}$/,
	      'en-ZM': /^(\+26)?09[567]\d{7}$/,
	      'ru-RU': /^(\+?7|8)?9\d{9}$/
	    };
	
	    // from http://goo.gl/0ejHHW
	    var iso8601 = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;
	
	    validator.extend = function (name, fn) {
	        validator[name] = function () {
	            var args = Array.prototype.slice.call(arguments);
	            args[0] = validator.toString(args[0]);
	            return fn.apply(validator, args);
	        };
	    };
	
	    //Right before exporting the validator object, pass each of the builtins
	    //through extend() so that their first argument is coerced to a string
	    validator.init = function () {
	        for (var name in validator) {
	            if (typeof validator[name] !== 'function' || name === 'toString' ||
	                    name === 'toDate' || name === 'extend' || name === 'init') {
	                continue;
	            }
	            validator.extend(name, validator[name]);
	        }
	    };
	
	    validator.toString = function (input) {
	        if (typeof input === 'object' && input !== null && input.toString) {
	            input = input.toString();
	        } else if (input === null || typeof input === 'undefined' || (isNaN(input) && !input.length)) {
	            input = '';
	        } else if (typeof input !== 'string') {
	            input += '';
	        }
	        return input;
	    };
	
	    validator.toDate = function (date) {
	        if (Object.prototype.toString.call(date) === '[object Date]') {
	            return date;
	        }
	        date = Date.parse(date);
	        return !isNaN(date) ? new Date(date) : null;
	    };
	
	    validator.toFloat = function (str) {
	        return parseFloat(str);
	    };
	
	    validator.toInt = function (str, radix) {
	        return parseInt(str, radix || 10);
	    };
	
	    validator.toBoolean = function (str, strict) {
	        if (strict) {
	            return str === '1' || str === 'true';
	        }
	        return str !== '0' && str !== 'false' && str !== '';
	    };
	
	    validator.equals = function (str, comparison) {
	        return str === validator.toString(comparison);
	    };
	
	    validator.contains = function (str, elem) {
	        return str.indexOf(validator.toString(elem)) >= 0;
	    };
	
	    validator.matches = function (str, pattern, modifiers) {
	        if (Object.prototype.toString.call(pattern) !== '[object RegExp]') {
	            pattern = new RegExp(pattern, modifiers);
	        }
	        return pattern.test(str);
	    };
	
	    var default_email_options = {
	        allow_display_name: false,
	        allow_utf8_local_part: true,
	        require_tld: true
	    };
	
	    validator.isEmail = function (str, options) {
	        options = merge(options, default_email_options);
	
	        if (options.allow_display_name) {
	            var display_email = str.match(displayName);
	            if (display_email) {
	                str = display_email[1];
	            }
	        }
	
	        var parts = str.split('@')
	          , domain = parts.pop()
	          , user = parts.join('@');
	
	        var lower_domain = domain.toLowerCase();
	        if (lower_domain === 'gmail.com' || lower_domain === 'googlemail.com') {
	            user = user.replace(/\./g, '').toLowerCase();
	        }
	
	        if (!validator.isByteLength(user, 0, 64) ||
	                !validator.isByteLength(domain, 0, 256)) {
	            return false;
	        }
	
	        if (!validator.isFQDN(domain, {require_tld: options.require_tld})) {
	            return false;
	        }
	
	        if (user[0] === '"') {
	            user = user.slice(1, user.length - 1);
	            return options.allow_utf8_local_part ?
	                quotedEmailUserUtf8.test(user) :
	                quotedEmailUser.test(user);
	        }
	
	        var pattern = options.allow_utf8_local_part ?
	            emailUserUtf8Part : emailUserPart;
	
	        var user_parts = user.split('.');
	        for (var i = 0; i < user_parts.length; i++) {
	            if (!pattern.test(user_parts[i])) {
	                return false;
	            }
	        }
	
	        return true;
	    };
	
	    var default_url_options = {
	        protocols: [ 'http', 'https', 'ftp' ]
	      , require_tld: true
	      , require_protocol: false
	      , require_valid_protocol: true
	      , allow_underscores: false
	      , allow_trailing_dot: false
	      , allow_protocol_relative_urls: false
	    };
	
	    validator.isURL = function (url, options) {
	        if (!url || url.length >= 2083 || /\s/.test(url)) {
	            return false;
	        }
	        if (url.indexOf('mailto:') === 0) {
	            return false;
	        }
	        options = merge(options, default_url_options);
	        var protocol, auth, host, hostname, port,
	            port_str, split;
	        split = url.split('://');
	        if (split.length > 1) {
	            protocol = split.shift();
	            if (options.require_valid_protocol && options.protocols.indexOf(protocol) === -1) {
	                return false;
	            }
	        } else if (options.require_protocol) {
	            return false;
	        }  else if (options.allow_protocol_relative_urls && url.substr(0, 2) === '//') {
	            split[0] = url.substr(2);
	        }
	        url = split.join('://');
	        split = url.split('#');
	        url = split.shift();
	
	        split = url.split('?');
	        url = split.shift();
	
	        split = url.split('/');
	        url = split.shift();
	        split = url.split('@');
	        if (split.length > 1) {
	            auth = split.shift();
	            if (auth.indexOf(':') >= 0 && auth.split(':').length > 2) {
	                return false;
	            }
	        }
	        hostname = split.join('@');
	        split = hostname.split(':');
	        host = split.shift();
	        if (split.length) {
	            port_str = split.join(':');
	            port = parseInt(port_str, 10);
	            if (!/^[0-9]+$/.test(port_str) || port <= 0 || port > 65535) {
	                return false;
	            }
	        }
	        if (!validator.isIP(host) && !validator.isFQDN(host, options) &&
	                host !== 'localhost') {
	            return false;
	        }
	        if (options.host_whitelist &&
	                options.host_whitelist.indexOf(host) === -1) {
	            return false;
	        }
	        if (options.host_blacklist &&
	                options.host_blacklist.indexOf(host) !== -1) {
	            return false;
	        }
	        return true;
	    };
	
	    validator.isIP = function (str, version) {
	        version = validator.toString(version);
	        if (!version) {
	            return validator.isIP(str, 4) || validator.isIP(str, 6);
	        } else if (version === '4') {
	            if (!ipv4Maybe.test(str)) {
	                return false;
	            }
	            var parts = str.split('.').sort(function (a, b) {
	                return a - b;
	            });
	            return parts[3] <= 255;
	        } else if (version === '6') {
	            var blocks = str.split(':');
	            var foundOmissionBlock = false; // marker to indicate ::
	
	            // At least some OS accept the last 32 bits of an IPv6 address
	            // (i.e. 2 of the blocks) in IPv4 notation, and RFC 3493 says
	            // that '::ffff:a.b.c.d' is valid for IPv4-mapped IPv6 addresses,
	            // and '::a.b.c.d' is deprecated, but also valid.
	            var foundIPv4TransitionBlock = validator.isIP(blocks[blocks.length - 1], 4);
	            var expectedNumberOfBlocks = foundIPv4TransitionBlock ? 7 : 8;
	
	            if (blocks.length > expectedNumberOfBlocks)
	                return false;
	
	            // initial or final ::
	            if (str === '::') {
	                return true;
	            } else if (str.substr(0, 2) === '::') {
	                blocks.shift();
	                blocks.shift();
	                foundOmissionBlock = true;
	            } else if (str.substr(str.length - 2) === '::') {
	                blocks.pop();
	                blocks.pop();
	                foundOmissionBlock = true;
	            }
	
	            for (var i = 0; i < blocks.length; ++i) {
	                // test for a :: which can not be at the string start/end
	                // since those cases have been handled above
	                if (blocks[i] === '' && i > 0 && i < blocks.length -1) {
	                    if (foundOmissionBlock)
	                        return false; // multiple :: in address
	                    foundOmissionBlock = true;
	                } else if (foundIPv4TransitionBlock && i == blocks.length - 1) {
	                    // it has been checked before that the last
	                    // block is a valid IPv4 address
	                } else if (!ipv6Block.test(blocks[i])) {
	                    return false;
	                }
	            }
	
	            if (foundOmissionBlock) {
	                return blocks.length >= 1;
	            } else {
	                return blocks.length === expectedNumberOfBlocks;
	            }
	        }
	        return false;
	    };
	
	    var default_fqdn_options = {
	        require_tld: true
	      , allow_underscores: false
	      , allow_trailing_dot: false
	    };
	
	    validator.isFQDN = function (str, options) {
	        options = merge(options, default_fqdn_options);
	
	        /* Remove the optional trailing dot before checking validity */
	        if (options.allow_trailing_dot && str[str.length - 1] === '.') {
	            str = str.substring(0, str.length - 1);
	        }
	        var parts = str.split('.');
	        if (options.require_tld) {
	            var tld = parts.pop();
	            if (!parts.length || !/^([a-z\u00a1-\uffff]{2,}|xn[a-z0-9-]{2,})$/i.test(tld)) {
	                return false;
	            }
	        }
	        for (var part, i = 0; i < parts.length; i++) {
	            part = parts[i];
	            if (options.allow_underscores) {
	                if (part.indexOf('__') >= 0) {
	                    return false;
	                }
	                part = part.replace(/_/g, '');
	            }
	            if (!/^[a-z\u00a1-\uffff0-9-]+$/i.test(part)) {
	                return false;
	            }
	            if (/[\uff01-\uff5e]/.test(part)) {
	                // disallow full-width chars
	                return false;
	            }
	            if (part[0] === '-' || part[part.length - 1] === '-' ||
	                    part.indexOf('---') >= 0) {
	                return false;
	            }
	        }
	        return true;
	    };
	
	    validator.isBoolean = function(str) {
	        return (['true', 'false', '1', '0'].indexOf(str) >= 0);
	    };
	
	    validator.isAlpha = function (str) {
	        return alpha.test(str);
	    };
	
	    validator.isAlphanumeric = function (str) {
	        return alphanumeric.test(str);
	    };
	
	    validator.isNumeric = function (str) {
	        return numeric.test(str);
	    };
	
	    validator.isDecimal = function (str) {
	        return str !== '' && decimal.test(str);
	    };
	
	    validator.isHexadecimal = function (str) {
	        return hexadecimal.test(str);
	    };
	
	    validator.isHexColor = function (str) {
	        return hexcolor.test(str);
	    };
	
	    validator.isLowercase = function (str) {
	        return str === str.toLowerCase();
	    };
	
	    validator.isUppercase = function (str) {
	        return str === str.toUpperCase();
	    };
	
	    validator.isInt = function (str, options) {
	        options = options || {};
	        return int.test(str) && (!options.hasOwnProperty('min') || str >= options.min) && (!options.hasOwnProperty('max') || str <= options.max);
	    };
	
	    validator.isFloat = function (str, options) {
	        options = options || {};
	        return str !== '' && float.test(str) && (!options.hasOwnProperty('min') || str >= options.min) && (!options.hasOwnProperty('max') || str <= options.max);
	    };
	
	    validator.isDivisibleBy = function (str, num) {
	        return validator.toFloat(str) % validator.toInt(num) === 0;
	    };
	
	    validator.isNull = function (str) {
	        return str.length === 0;
	    };
	
	    validator.isLength = function (str, min, max) {
	        var surrogatePairs = str.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g) || [];
	        var len = str.length - surrogatePairs.length;
	        return len >= min && (typeof max === 'undefined' || len <= max);
	    };
	
	    validator.isByteLength = function (str, min, max) {
	        var len = encodeURI(str).split(/%..|./).length - 1;
	        return len >= min && (typeof max === 'undefined' || len <= max);
	    };
	
	    validator.isUUID = function (str, version) {
	        var pattern = uuid[version ? version : 'all'];
	        return pattern && pattern.test(str);
	    };
	
	    validator.isDate = function (str) {
	        return !isNaN(Date.parse(str));
	    };
	
	    validator.isAfter = function (str, date) {
	        var comparison = validator.toDate(date || new Date())
	          , original = validator.toDate(str);
	        return !!(original && comparison && original > comparison);
	    };
	
	    validator.isBefore = function (str, date) {
	        var comparison = validator.toDate(date || new Date())
	          , original = validator.toDate(str);
	        return !!(original && comparison && original < comparison);
	    };
	
	    validator.isIn = function (str, options) {
	        var i;
	        if (Object.prototype.toString.call(options) === '[object Array]') {
	            var array = [];
	            for (i in options) {
	                array[i] = validator.toString(options[i]);
	            }
	            return array.indexOf(str) >= 0;
	        } else if (typeof options === 'object') {
	            return options.hasOwnProperty(str);
	        } else if (options && typeof options.indexOf === 'function') {
	            return options.indexOf(str) >= 0;
	        }
	        return false;
	    };
	
	    validator.isCreditCard = function (str) {
	        var sanitized = str.replace(/[^0-9]+/g, '');
	        if (!creditCard.test(sanitized)) {
	            return false;
	        }
	        var sum = 0, digit, tmpNum, shouldDouble;
	        for (var i = sanitized.length - 1; i >= 0; i--) {
	            digit = sanitized.substring(i, (i + 1));
	            tmpNum = parseInt(digit, 10);
	            if (shouldDouble) {
	                tmpNum *= 2;
	                if (tmpNum >= 10) {
	                    sum += ((tmpNum % 10) + 1);
	                } else {
	                    sum += tmpNum;
	                }
	            } else {
	                sum += tmpNum;
	            }
	            shouldDouble = !shouldDouble;
	        }
	        return !!((sum % 10) === 0 ? sanitized : false);
	    };
	
	    validator.isISIN = function (str) {
	        if (!isin.test(str)) {
	            return false;
	        }
	
	        var checksumStr = str.replace(/[A-Z]/g, function(character) {
	            return parseInt(character, 36);
	        });
	
	        var sum = 0, digit, tmpNum, shouldDouble = true;
	        for (var i = checksumStr.length - 2; i >= 0; i--) {
	            digit = checksumStr.substring(i, (i + 1));
	            tmpNum = parseInt(digit, 10);
	            if (shouldDouble) {
	                tmpNum *= 2;
	                if (tmpNum >= 10) {
	                    sum += tmpNum + 1;
	                } else {
	                    sum += tmpNum;
	                }
	            } else {
	                sum += tmpNum;
	            }
	            shouldDouble = !shouldDouble;
	        }
	
	        return parseInt(str.substr(str.length - 1), 10) === (10000 - sum) % 10;
	    };
	
	    validator.isISBN = function (str, version) {
	        version = validator.toString(version);
	        if (!version) {
	            return validator.isISBN(str, 10) || validator.isISBN(str, 13);
	        }
	        var sanitized = str.replace(/[\s-]+/g, '')
	          , checksum = 0, i;
	        if (version === '10') {
	            if (!isbn10Maybe.test(sanitized)) {
	                return false;
	            }
	            for (i = 0; i < 9; i++) {
	                checksum += (i + 1) * sanitized.charAt(i);
	            }
	            if (sanitized.charAt(9) === 'X') {
	                checksum += 10 * 10;
	            } else {
	                checksum += 10 * sanitized.charAt(9);
	            }
	            if ((checksum % 11) === 0) {
	                return !!sanitized;
	            }
	        } else  if (version === '13') {
	            if (!isbn13Maybe.test(sanitized)) {
	                return false;
	            }
	            var factor = [ 1, 3 ];
	            for (i = 0; i < 12; i++) {
	                checksum += factor[i % 2] * sanitized.charAt(i);
	            }
	            if (sanitized.charAt(12) - ((10 - (checksum % 10)) % 10) === 0) {
	                return !!sanitized;
	            }
	        }
	        return false;
	    };
	
	    validator.isMobilePhone = function(str, locale) {
	        if (locale in phones) {
	            return phones[locale].test(str);
	        }
	        return false;
	    };
	
	    var default_currency_options = {
	        symbol: '$'
	      , require_symbol: false
	      , allow_space_after_symbol: false
	      , symbol_after_digits: false
	      , allow_negatives: true
	      , parens_for_negatives: false
	      , negative_sign_before_digits: false
	      , negative_sign_after_digits: false
	      , allow_negative_sign_placeholder: false
	      , thousands_separator: ','
	      , decimal_separator: '.'
	      , allow_space_after_digits: false
	    };
	
	    validator.isCurrency = function (str, options) {
	        options = merge(options, default_currency_options);
	
	        return currencyRegex(options).test(str);
	    };
	
	    validator.isJSON = function (str) {
	        try {
	            var obj = JSON.parse(str);
	            return !!obj && typeof obj === 'object';
	        } catch (e) {}
	        return false;
	    };
	
	    validator.isMultibyte = function (str) {
	        return multibyte.test(str);
	    };
	
	    validator.isAscii = function (str) {
	        return ascii.test(str);
	    };
	
	    validator.isFullWidth = function (str) {
	        return fullWidth.test(str);
	    };
	
	    validator.isHalfWidth = function (str) {
	        return halfWidth.test(str);
	    };
	
	    validator.isVariableWidth = function (str) {
	        return fullWidth.test(str) && halfWidth.test(str);
	    };
	
	    validator.isSurrogatePair = function (str) {
	        return surrogatePair.test(str);
	    };
	
	    validator.isBase64 = function (str) {
	        return base64.test(str);
	    };
	
	    validator.isMongoId = function (str) {
	        return validator.isHexadecimal(str) && str.length === 24;
	    };
	
	    validator.isISO8601 = function (str) {
	        return iso8601.test(str);
	    };
	
	    validator.ltrim = function (str, chars) {
	        var pattern = chars ? new RegExp('^[' + chars + ']+', 'g') : /^\s+/g;
	        return str.replace(pattern, '');
	    };
	
	    validator.rtrim = function (str, chars) {
	        var pattern = chars ? new RegExp('[' + chars + ']+$', 'g') : /\s+$/g;
	        return str.replace(pattern, '');
	    };
	
	    validator.trim = function (str, chars) {
	        var pattern = chars ? new RegExp('^[' + chars + ']+|[' + chars + ']+$', 'g') : /^\s+|\s+$/g;
	        return str.replace(pattern, '');
	    };
	
	    validator.escape = function (str) {
	        return (str.replace(/&/g, '&amp;')
	            .replace(/"/g, '&quot;')
	            .replace(/'/g, '&#x27;')
	            .replace(/</g, '&lt;')
	            .replace(/>/g, '&gt;')
	            .replace(/\//g, '&#x2F;')
	            .replace(/\`/g, '&#96;'));
	    };
	
	    validator.stripLow = function (str, keep_new_lines) {
	        var chars = keep_new_lines ? '\\x00-\\x09\\x0B\\x0C\\x0E-\\x1F\\x7F' : '\\x00-\\x1F\\x7F';
	        return validator.blacklist(str, chars);
	    };
	
	    validator.whitelist = function (str, chars) {
	        return str.replace(new RegExp('[^' + chars + ']+', 'g'), '');
	    };
	
	    validator.blacklist = function (str, chars) {
	        return str.replace(new RegExp('[' + chars + ']+', 'g'), '');
	    };
	
	    var default_normalize_email_options = {
	        lowercase: true
	    };
	
	    validator.normalizeEmail = function (email, options) {
	        options = merge(options, default_normalize_email_options);
	        if (!validator.isEmail(email)) {
	            return false;
	        }
	        var parts = email.split('@', 2);
	        parts[1] = parts[1].toLowerCase();
	        if (parts[1] === 'gmail.com' || parts[1] === 'googlemail.com') {
	            parts[0] = parts[0].toLowerCase().replace(/\./g, '');
	            if (parts[0][0] === '+') {
	                return false;
	            }
	            parts[0] = parts[0].split('+')[0];
	            parts[1] = 'gmail.com';
	        } else if (options.lowercase) {
	            parts[0] = parts[0].toLowerCase();
	        }
	        return parts.join('@');
	    };
	
	    function merge(obj, defaults) {
	        obj = obj || {};
	        for (var key in defaults) {
	            if (typeof obj[key] === 'undefined') {
	                obj[key] = defaults[key];
	            }
	        }
	        return obj;
	    }
	
	    function currencyRegex(options) {
	        var symbol = '(\\' + options.symbol.replace(/\./g, '\\.') + ')' + (options.require_symbol ? '' : '?')
	            , negative = '-?'
	            , whole_dollar_amount_without_sep = '[1-9]\\d*'
	            , whole_dollar_amount_with_sep = '[1-9]\\d{0,2}(\\' + options.thousands_separator + '\\d{3})*'
	            , valid_whole_dollar_amounts = ['0', whole_dollar_amount_without_sep, whole_dollar_amount_with_sep]
	            , whole_dollar_amount = '(' + valid_whole_dollar_amounts.join('|') + ')?'
	            , decimal_amount = '(\\' + options.decimal_separator + '\\d{2})?';
	        var pattern = whole_dollar_amount + decimal_amount;
	        // default is negative sign before symbol, but there are two other options (besides parens)
	        if (options.allow_negatives && !options.parens_for_negatives) {
	            if (options.negative_sign_after_digits) {
	                pattern += negative;
	            }
	            else if (options.negative_sign_before_digits) {
	                pattern = negative + pattern;
	            }
	        }
	        // South African Rand, for example, uses R 123 (space) and R-123 (no space)
	        if (options.allow_negative_sign_placeholder) {
	            pattern = '( (?!\\-))?' + pattern;
	        }
	        else if (options.allow_space_after_symbol) {
	            pattern = ' ?' + pattern;
	        }
	        else if (options.allow_space_after_digits) {
	            pattern += '( (?!$))?';
	        }
	        if (options.symbol_after_digits) {
	            pattern += symbol;
	        } else {
	            pattern = symbol + pattern;
	        }
	        if (options.allow_negatives) {
	            if (options.parens_for_negatives) {
	                pattern = '(\\(' + pattern + '\\)|' + pattern + ')';
	            }
	            else if (!(options.negative_sign_before_digits || options.negative_sign_after_digits)) {
	                pattern = negative + pattern;
	            }
	        }
	        return new RegExp(
	            '^' +
	            // ensure there's a dollar and/or decimal amount, and that it doesn't start with a space or a negative sign followed by a space
	            '(?!-? )(?=.*\\d)' +
	            pattern +
	            '$'
	        );
	    }
	
	    validator.init();
	
	    return validator;
	
	});


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(1);
	
	// This is the name of the object that we will add to the context
	var CONTEXT_NAME = 'reactFormation';
	
	// We can use this for contextTypes, childContextTypes
	var types = {};
	types[CONTEXT_NAME] = React.PropTypes.object;
	
	// Methods that will be exposed on context.reactFormation and FormMixin
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
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(1);
	var assign = __webpack_require__(8);
	
	module.exports = React.createClass({
	  displayName: 'exports',
	
	  mixins: [__webpack_require__(12)],
	  render: function render() {
	    var props = assign({}, this.props, {
	      onClick: this.submitForm
	    });
	    return React.createElement('button', props, this.props.children || 'Submit');
	  }
	});

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var contextConfig = __webpack_require__(10);
	
	var FormMixin = {
	  contextTypes: contextConfig.types
	};
	
	// Add each method defined in the context to the mixin
	contextConfig.methods.forEach(function (method) {
	  FormMixin[method] = function () {
	    return this.context[contextConfig.name][method].apply(null, arguments);
	  };
	});
	
	module.exports = FormMixin;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(1);
	var assign = __webpack_require__(8);
	
	module.exports = React.createClass({
	  displayName: 'exports',
	
	  mixins: [__webpack_require__(12)],
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
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(1);
	var assign = __webpack_require__(8);
	
	module.exports = React.createClass({
	  displayName: 'exports',
	
	  propTypes: {
	    field: React.PropTypes.string.isRequired,
	    show: React.PropTypes.bool
	  },
	  mixins: [__webpack_require__(12)],
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
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(1);
	var assign = __webpack_require__(8);
	
	var Radio = React.createClass({
	  displayName: 'Radio',
	
	  onChange: function onChange(e) {
	    var value = e.target.value;
	    if (typeof this.props.value === 'number') value = +value;
	    this.props.radioLink.requestChange(value);
	  },
	  render: function render() {
	    var props = assign({}, this.props, {
	      validations: 'radio',
	      checked: this.props.value + '' === this.props.radioLink.value + '',
	      onChange: this.onChange
	    });
	    return React.createElement('input', props);
	  }
	});
	
	module.exports = Radio;

/***/ },
/* 16 */
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
/* 17 */
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
/* 18 */
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