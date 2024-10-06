const getUpscalingImageData = require("../utils/getUpscalingImageData");

const generateUpscalingImage = async (req, res) => {
  const { promptImage, email } = req?.body;
  const buffer = await getUpscalingImageData(promptImage);

  res.send(buffer);
};

module.exports = { generateUpscalingImage };
