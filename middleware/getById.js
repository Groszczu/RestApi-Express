const getById = (resourceCollection) => async (req, res, next) => {
  const resourceName = resourceCollection.modelName.toLowerCase();
  let resource;
  try {
    resource = await resourceCollection.findById(req.params.id);
  } catch (err) {
    return res.status(500).json({message: err.message});
  }

  if (resource === null) {
    return res.status(404).json({message: `${resourceName} with given id could not be find`});
  }

  res[resourceName] = resource;
  next();
};

module.exports = getById;