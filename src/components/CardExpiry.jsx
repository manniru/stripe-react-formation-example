var React = require('react');
var {FormMixin, ErrorMessage} = require('react-formation');

var days = [];
var years = [];
for (var i = 2016; i < 2020; i++) {years.push(i);}
for (var j = 1; j < 32; j++) {days.push(j);}
var dateData = {
  years,
  months: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
  days
};


module.exports = React.createClass({

  mixins: [FormMixin],

  render: function () {
    return (
      <div>

        <div className="form-group">
          <label>Exp. month:</label>
          <select valueLink={this.linkField('expMonth')}>
            <option value="">Month</option>
            {dateData.months.map(month => <option value={month}>{month}</option>)}
          </select>
        </div>

        <div className="form-group">
          <label>Exp. year:</label>
          <select valueLink={this.linkField('expYear')}>
            <option value="">Year</option>
            {dateData.years.map(year => <option value={year}>{year}</option>)}
          </select>
        </div>

      </div>
    );
  }
});
