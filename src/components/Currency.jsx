var React = require('react');
var {FormMixin, ErrorMessage} = require('react-formation');

var currencies = ['USD United States Dollar'];

module.exports = React.createClass({

  mixins: [FormMixin],

  render: function () {
    return (
      <div className="form-group">

        <label className="optional">Currency:</label>
        <select className="currency" valueLink={this.linkField('currency')}>
          <option className="currency" value="">CAD - Canadian Dollar</option>
          {currencies.map(currencies => <option value={currencies}>{currencies}</option>)}
        </select>

      </div>
    );
  }
});
