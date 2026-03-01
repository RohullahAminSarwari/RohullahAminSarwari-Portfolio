// Image upload utility functions
export const uploadImage = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      // Create a unique filename
      const timestamp = Date.now();
      const randomString = Math.random().toString(36).substring(2, 15);
      const fileExtension = file.name.split(".").pop();
      const fileName = `project_${timestamp}_${randomString}.${fileExtension}`;

      // Store image data in localStorage with metadata
      const imageData = {
        fileName,
        originalName: file.name,
        data: e.target.result,
        uploadedAt: new Date().toISOString(),
        size: file.size,
        type: file.type,
      };

      // Get existing images or create new array
      const existingImages = JSON.parse(
        localStorage.getItem("portfolio_images") || "[]"
      );
      existingImages.push(imageData);
      localStorage.setItem("portfolio_images", JSON.stringify(existingImages));

      // Return the image URL (we'll use a data URL for now)
      resolve({
        url: e.target.result,
        fileName,
        id: `${timestamp}_${randomString}`,
      });
    };

    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
};

export const deleteImage = (fileName) => {
  try {
    const existingImages = JSON.parse(
      localStorage.getItem("portfolio_images") || "[]"
    );
    const updatedImages = existingImages.filter(
      (img) => img.fileName !== fileName
    );
    localStorage.setItem("portfolio_images", JSON.stringify(updatedImages));
    return true;
  } catch (error) {
    console.error("Error deleting image:", error);
    return false;
  }
};

export const getImageUrl = (fileName) => {
  try {
    const existingImages = JSON.parse(
      localStorage.getItem("portfolio_images") || "[]"
    );
    const image = existingImages.find((img) => img.fileName === fileName);
    return image ? image.data : null;
  } catch (error) {
    console.error("Error getting image URL:", error);
    return null;
  }
};

export const getAllImages = () => {
  try {
    return JSON.parse(localStorage.getItem("portfolio_images") || "[]");
  } catch (error) {
    console.error("Error getting all images:", error);
    return [];
  }
};
