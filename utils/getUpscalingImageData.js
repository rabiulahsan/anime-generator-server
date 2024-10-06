const getUpscalingImageData = async (image) => {
  const form = new FormData();
  form.append("image_file", image); // Use 'image' which is the function parameter
  form.append("target_width", 1024);
  form.append("target_height", 1024);

  try {
    const response = await fetch(
      "https://clipdrop-api.co/image-upscaling/v1/upscale",
      {
        method: "POST",
        headers: {
          "x-api-key": process.env.CLIP_DROP_KEY,
        },
        body: form,
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const buffer = await response.arrayBuffer();
    return buffer; // Return the buffer
  } catch (error) {
    console.error("Error upscaling image:", error);
    throw error;
  }
};

module.exports = getUpscalingImageData;
