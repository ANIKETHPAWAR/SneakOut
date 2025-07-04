import React, { useState } from 'react';

const SpotImages = ({ formData, onInputChange }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [imageCaption, setImageCaption] = useState('');
  const [imageError, setImageError] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState(null);

  const handleAddImage = (e) => {
    e.preventDefault();
    let newImage = null;
    if (imageFile && filePreviewUrl) {
      newImage = {
        url: filePreviewUrl,
        caption: imageCaption.trim(),
        file: imageFile
      };
    } else if (imageUrl.trim()) {
      newImage = {
        url: imageUrl.trim(),
        caption: imageCaption.trim()
      };
    }
    if (newImage) {
      onInputChange('images', [...formData.images, newImage]);
      setImageUrl('');
      setImageCaption('');
      setImageFile(null);
      setFilePreviewUrl(null);
      setImageError({ ...imageError, [newImage.url]: false });
    }
  };

  const handleRemoveImage = (index) => {
    const removed = formData.images[index];
    if (removed && removed.file && removed.url.startsWith('blob:')) {
      URL.revokeObjectURL(removed.url);
    }
    const newImages = formData.images.filter((_, i) => i !== index);
    onInputChange('images', newImages);
  };

  const handleImageError = (url) => {
    setImageError((prev) => ({ ...prev, [url]: true }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImageFile(file);
      setFilePreviewUrl(previewUrl);
      setImageUrl(''); // Clear URL input if file is chosen
    } else {
      setImageFile(null);
      setFilePreviewUrl(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Images (Optional)</h2>
        <p className="text-sm text-gray-600 mb-4">
          Add images to showcase your spot. You can use image URLs from services like Imgur, Google Drive, or any public image hosting, or upload from your device.
        </p>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image URL
              </label>
              <input
                type="url"
                placeholder="https://example.com/image.jpg"
                className="w-full px-3 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                value={imageUrl}
                onChange={(e) => {
                  setImageUrl(e.target.value);
                  setImageFile(null);
                  setFilePreviewUrl(null);
                }}
                disabled={!!imageFile}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Or Upload Image
              </label>
              <input
                type="file"
                accept="image/*"
                className="w-full px-3 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent bg-white"
                onChange={handleFileChange}
                disabled={!!imageUrl}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Caption (Optional)
              </label>
              <input
                type="text"
                placeholder="Brief description of the image"
                className="w-full px-3 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                value={imageCaption}
                onChange={(e) => setImageCaption(e.target.value)}
              />
            </div>
          </div>
          <button
            type="button"
            onClick={handleAddImage}
            disabled={!(imageUrl.trim() || (imageFile && filePreviewUrl))}
            className="px-4 py-2 bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:from-indigo-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:bg-gray-400 disabled:cursor-not-allowed shadow"
          >
            Add Image
          </button>
        </div>

        {/* Image Preview Section */}
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-700 mb-3">Added Images</h3>
          {formData.images.length === 0 ? (
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-indigo-200 rounded-lg p-8 bg-indigo-50 text-indigo-400 shadow-inner">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a4 4 0 004 4h10a4 4 0 004-4V7a4 4 0 00-4-4H7a4 4 0 00-4 4z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11l2 2 4-4m0 0l2 2m-2-2v6" />
              </svg>
              <span className="text-base">No images added yet. Add some image URLs or upload images above!</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {formData.images.map((image, index) => (
                <div key={index} className="border border-indigo-200 rounded-lg p-3 bg-white shadow-md flex flex-col items-center">
                  {imageError[image.url] ? (
                    <div className="flex flex-col items-center justify-center h-32 w-full bg-red-50 rounded mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-400 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span className="text-xs text-red-500">Image failed to load</span>
                    </div>
                  ) : (
                    <img
                      src={image.url}
                      alt={image.caption || 'Spot image'}
                      className="w-full h-32 object-cover rounded-md mb-2 border border-indigo-100 shadow-sm"
                      onError={() => handleImageError(image.url)}
                    />
                  )}
                  {image.caption && (
                    <p className="text-sm text-gray-600 mb-2 text-center">{image.caption}</p>
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="w-full px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpotImages; 