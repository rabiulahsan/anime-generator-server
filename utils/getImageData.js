const getImageData = async (prompt) => {
  const form = new FormData();
  form.append("prompt", prompt);
  const response = await fetch("https://clipdrop-api.co/text-to-image/v1", {
    method: "POST",
    headers: {
      "x-api-key": process.env.GENERATE_ANIMIES_KEY,
    },
    body: form,
  });
  const buffer = await response.arrayBuffer();
  //   console.log(buffer);
  return buffer;
};
module.exports = getImageData;
