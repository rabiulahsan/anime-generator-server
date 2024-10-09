const getImageData = async (prompt) => {
  const modifiedPrompt = `Create a realistic anime image based on: """ ${prompt}"""`;
  const form = new FormData();
  form.append("prompt", modifiedPrompt);

  const response = await fetch("https://clipdrop-api.co/text-to-image/v1", {
    method: "POST",
    headers: {
      "x-api-key": process.env.CLIP_DROP_KEY,
    },
    body: form,
  });
  const buffer = await response.arrayBuffer();
  //   console.log(buffer);
  return buffer;
};
module.exports = getImageData;
