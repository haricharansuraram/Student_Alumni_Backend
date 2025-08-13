const asyncHandler = require('express-async-handler');
const Alumni = require('../models/Alumni');

const getAlumni = asyncHandler(async (req, res) => {
  const { batch, industry, search } = req.query;
  let query = {};
  if (batch) query.batch = batch;
  if (industry) query.industry = industry;
  if (search) query.name = { $regex: search, $options: 'i' };
  const alumni = await Alumni.find(query);
  res.json(alumni);
});

module.exports = { getAlumni };