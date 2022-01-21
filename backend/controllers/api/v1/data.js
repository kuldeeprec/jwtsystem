const Data = require("../../../models/data");
module.exports.index = async function (req, res) {
  let data = await Data.find({});
  return res.json(200, {
    message: "List of posts",
    data: data,
  });
};
