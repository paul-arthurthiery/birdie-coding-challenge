const {
  Person,
} = require('../models/person.model');
//const validator = require('validator');

// Get all columns from MySQL table, omit some values 
exports.getAttributes = async (req, res) => {
  const choosableAttributes = Object.keys(Person.attributes).filter(item => item !== 'age' && item !== 'createdAt' && item !== 'updatedAt');
  res.status(200).send({
    choosableAttributes
  });
};

// Get required table data
exports.getTableData = async (req, res) => {
  const {
    column,
  } = req.body;

  // custom validation seems to significantly boost api perf and is pretty easy,
  // however validator could be used like below:

  // if (!validator.isLength(column, {
  //     min: 1,
  //     max: undefined,
  //   }) || !validator.isIn(column, Object.keys(Person.attributes))) {


  if (!(typeof (column) === 'string' && column.length > 0 && Object.keys(Person.attributes).includes(column))) {
    res.status(400).send({
      message: 'Request should be a non-empty string',
    });
    return;
  }
  try {

    // I chose to use an ORM here since they scale better and the perfs seem alright
    // these two aggregates could be done with the following SQL query :
    //

    // Groups selected column by values and uses COUNT on the grouped values
    const valuesAndCounts = await Person.aggregate(column, 'COUNT', {
      plain: false,
      group: [column],
      attributes: [column],
      order: [
        [column, 'ASC'],
      ],
    });

    // Groups selected column values and uses AVG on the grouped rows' ages
    const valuesAndAverages = await Person.aggregate('age', 'AVG', {
      plain: false,
      group: [column],
      attributes: [column],
      order: [
        [column, 'ASC'],
      ],
    });

    // fusing the two aggregates with a map. This doesn't feel optimized however
    // sequelize doesn't seem to support joins or double aggregates
    const tableData = valuesAndCounts.map((x) => {
      const index = valuesAndCounts.indexOf(x);
      return {
        value: x[column],
        count: x.COUNT,
        averageAge: valuesAndAverages[index].AVG,
      };
    });

    // sorting based on count (less front end processing)
    tableData.sort((a, b) => b.count - a.count);
    res.status(200).send(tableData);
  } catch (err) {
    res.status(404).send({
      message: err.message || `${column} not found`,
    });
  }
};