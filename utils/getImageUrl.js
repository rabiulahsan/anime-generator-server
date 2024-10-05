const image_hosting_api = `https://api.imgbb.com/1/upload?key=${process.env.IMG_BB_KEY}`;

const getImageUrl = async (buffer, prompt) => {
  console.log(image_hosting_api);
  ``;
  const imageFormData = new FormData();
  imageFormData.append(
    "image",
    new Blob([buffer], { type: "image/jpeg" }),
    `${prompt}.jpg`
  );

  const response = await fetch(image_hosting_api, {
    method: "POST",
    // headers: {
    //   "content-type": "multipart/form-data",
    // },
    body: imageFormData,
  });

  const imgData = await response.json();

  return imgData;
};
module.exports = getImageUrl;
