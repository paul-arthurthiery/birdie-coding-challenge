const {
  Person,
} = require('../models/person.model');

// Get all columns from MySQL table
exports.getAttributes = async (req, res) => {
  const choosableAttributes = Object.keys(Person.attributes).filter(item => item !== 'age');
  res.status(200).send(Object.keys(choosableAttributes));
};

// Get table data
exports.getTableData = async (req, res) => {
  const {
    column,
  } = req.body;
  try {
    const valuesAndCounts = await Person.aggregate(column, 'COUNT', {
      plain: false,
      group: [column],
      attributes: [column],
      limit: 100,
      order: [
        [column, 'ASC'],
      ],
    });
    const valuesAndAverages = await Person.aggregate('age', 'AVG', {
      plain: false,
      group: [column],
      attributes: [column],
      limit: 100,
      order: [
        [column, 'ASC'],
      ],
    });
    const tableData = valuesAndCounts.map((x) => {
      const index = valuesAndCounts.indexOf(x);
      return {
        value: x[column],
        count: x.COUNT,
        'average age': valuesAndAverages[index].AVG,
      };
    });
    tableData.sort((a, b) => b.count - a.count);
    res.status(200).send(tableData);
  } catch (err) {
    res.status(404).send({
      message: err.message || `${column} not found`,
    });
  }
};
