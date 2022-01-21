const Data = require("../../../models/data");
module.exports.index = async function (req, res) {
  let data = await Data.find({});
  return res.json(200, {
    message: "List of posts",
    data: data,
  });
};
module.exports.create = async function (req, res) {
  try {
    let data = await Data.create({
      content: req.body.content,
    });
    if (data) {
      return res.json(200, {
        message: "succesfully inseted data",
      });
    }
    return res.json(200, {
      message: "not inserted",
    });
  } catch (err) {
    console.error(err);
    return res.json(500, {
      message: `${err}`,
    });
  }
};
