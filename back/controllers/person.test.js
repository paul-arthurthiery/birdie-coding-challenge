/* global describe test expect */
const {
  getAttributes,
} = require('./person.controller');
const httpMocks = require('node-mocks-http');
require('mysql2/node_modules/iconv-lite').encodingExists('cesu8');

const listOfAttributes = {
  choosableAttributes: [
    'id',
    'class of worker',
    'industry code',
    'occupation code',
    'education',
    'wage per hour',
    'last education',
    'marital status',
    'major industry code',
    'major occupation code',
    'mace',
    'hispanice',
    'sex',
    'member of labor',
    'reason for unemployment',
    'fulltime',
    'capital gain',
    'capital loss',
    'dividends',
    'income tax liability',
    'previous residence region',
    'previous residence state',
    'household-with-family',
    'household-simple',
    'weight',
    'msa-change',
    'reg-change',
    'within-reg-change',
    'lived-here',
    'migration prev res in sunbelt',
    'w',
    'family members under 118',
    'father birth country',
    'mother birth country',
    'birth country',
    'citizenship',
    'own business or self employed',
    "fill questionnaire for veteran's admin",
    'veterans benefits',
    'weeks worked in year',
    'year',
    'salary range',
  ],
};

// Some examples of tests we could use
// get correct attributes
describe('GET /person', () => {
  test('fetches proper attributes', async () => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    expect(await getAttributes(req, res)).toEqual(listOfAttributes);
  });
});
