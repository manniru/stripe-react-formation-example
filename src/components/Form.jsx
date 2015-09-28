var React = require('react');
var Formation = require('react-formation');
var classnames = require('classnames');

var CreateForm = Formation.CreateForm;
var SubmitButton = Formation.SubmitButton;
var ErrorMessage = Formation.ErrorMessage;
var Validator = Formation.Validator;

var CardExpiry = require('./CardExpiry.jsx');
var Currency = require('./Currency.jsx');

var Input = React.createClass({
  mixins: [Formation.FormMixin],
  render: function () {
    var errors = this.validateField(this.props.field);
    var inputClass = classnames('input', {
      valid: this.didSubmit() && !errors,
      invalid: this.didSubmit() && errors
    });
    return (<div>
      <input className={inputClass} type={this.props.type || 'text'} placeholder={this.props.label} valueLink={this.linkField(this.props.field)} />
      <ErrorMessage className="helper-error" field={this.props.field} />
    </div>);
  }
});


module.exports = CreateForm({

  getSchema: function() {
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
    }
  },

  onSuccess: function (data) {
    alert(JSON.stringify(data));
  },

  render: function () {
    return (<div className="stripe-eg">
      <form>
        <h2>Create a new payment</h2>

        <Currency />

        <div className="form-group">
          <label>Amount:</label>
          <Input label="9.99" field="amount" />
        </div>

        <div className="form-group">
          <label>Card number:</label>
          <Input label="" field="cardNumber" />
        </div>

        <div className="form-group">
          <label className="optional">CVC:</label>
          <Input label="" field="cvcNumber" />
        </div>

        <CardExpiry />

        <div className="form-group">
          <label className="optional">Description:</label>
          <Input label="" field="description" />
        </div>

        <div className="form-group">
          <label className="optional">Statement desc:</label>
          <Input label="" field="statementDesc" />
        </div>

        <footer>
          <div className="form-group">
            <button className="cancel">Cancel</button>
            <SubmitButton className="submit">Create payment </SubmitButton>
          </div>
        </footer>
      </form>
    </div>);
  }
});
