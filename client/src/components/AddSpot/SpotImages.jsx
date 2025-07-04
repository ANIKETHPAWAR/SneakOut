import React, { useState, useRef } from 'react';

// Compress and resize image using canvas (max 1280px, 80% quality)
async function compressImage(file, maxSize = 1280, quality = 0.8) {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.onload = () => {
      let width = img.width;
      let height = img.height;
      if (width > maxSize || height > maxSize) {
        if (width > height) {
          height = Math.round((height * maxSize) / width);
          width = maxSize;
        } else {
          width = Math.round((width * maxSize) / height);
          height = maxSize;
        }
      }
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(
        (blob) => {
          const compressedFile = new File([blob], file.name, { type: file.type });
          resolve(compressedFile);
        },
        file.type,
        quality
      );
    };
    img.src = URL.createObjectURL(file);
  });
}

const MAX_IMAGE_SIZE_MB = 5;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

const SpotImages = ({ formData, onInputChange }) => {
  // State for image input, preview, and errors
  const [imageUrl, setImageUrl] = useState('');
  const [imageCaption, setImageCaption] = useState('');
  const [imageFiles, setImageFiles] = useState([]); // Selected files
  const [filePreviewUrls, setFilePreviewUrls] = useState([]); // Preview URLs
  const [validationError, setValidationError] = useState('');
  const fileInputRef = useRef();

  // Handle drag-and-drop
  const handleDrop = async (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
    if (files.length) await handleFiles(files);
  };
  const handleDragOver = (e) => e.preventDefault();

  // Handle file input (multiple)
  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files).filter(f => f.type.startsWith('image/'));
    if (files.length) await handleFiles(files);
  };

  // Validate, compress, and preview images
  const handleFiles = async (files) => {
    let validFiles = [];
    let previews = [];
    let error = '';
    for (const file of files) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        error = 'Only JPEG, PNG, WEBP, and GIF images are allowed.';
      } else if (file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
        error = `Images must be less than ${MAX_IMAGE_SIZE_MB}MB.`;
      } else {
        const compressed = await compressImage(file);
        validFiles.push(compressed);
        previews.push(URL.createObjectURL(compressed));
      }
    }
    setValidationError(error);
    setImageFiles(validFiles);
    setFilePreviewUrls(previews);
    setImageUrl('');
  };

  // Add all selected images (or URL) to form
  const handleAddImages = (e) => {
    e.preventDefault();
    const newImages = imageFiles.map((file, i) => ({
      url: filePreviewUrls[i],
      caption: imageCaption.trim(),
      file
    }));
    if (imageUrl.trim()) {
      newImages.push({ url: imageUrl.trim(), caption: imageCaption.trim() });
    }
    if (newImages.length) {
      onInputChange('images', [...formData.images, ...newImages]);
      setImageUrl('');
      setImageCaption('');
      setImageFiles([]);
      setFilePreviewUrls([]);
    }
  };

  // Remove image from list
  const handleRemoveImage = (index) => {
    const removed = formData.images[index];
    if (removed && removed.file && removed.url.startsWith('blob:')) {
      URL.revokeObjectURL(removed.url);
    }
    const newImages = formData.images.filter((_, i) => i !== index);
    onInputChange('images', newImages);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Images (Optional)</h2>
        <p className="text-sm text-gray-600 mb-4">
          Add images to showcase your spot. You can use image URLs or upload from your device.
        </p>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Image URL input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
              <input
                type="url"
                placeholder="https://example.com/image.jpg"
                className="w-full px-3 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                value={imageUrl}
                onChange={e => {
                  setImageUrl(e.target.value);
                  setImageFiles([]);
                  setFilePreviewUrls([]);
                }}
                disabled={imageFiles.length > 0}
              />
            </div>
            {/* Drag-and-drop upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Or Upload Images</label>
              <div
                className="w-full px-3 py-6 border-2 border-dashed border-indigo-300 rounded-lg bg-white text-center cursor-pointer"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => fileInputRef.current.click()}
              >
                <span className="text-indigo-400">Drag & drop images here, or click to select</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  disabled={!!imageUrl}
                />
              </div>
            </div>
            {/* Caption input */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Caption (Optional)</label>
              <input
                type="text"
                placeholder="Brief description of the image(s)"
                className="w-full px-3 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                value={imageCaption}
                onChange={e => setImageCaption(e.target.value)}
              />
            </div>
          </div>
          {/* Show validation error */}
          {validationError && (
            <div className="text-red-500 text-sm font-medium mt-2">{validationError}</div>
          )}
          {/* Preview selected files before adding */}
          {filePreviewUrls.length > 0 && (
            <div className="flex flex-wrap gap-4 mt-2">
              {filePreviewUrls.map((url, i) => (
                <img key={i} src={url} alt="preview" className="w-24 h-24 object-cover rounded border" />
              ))}
            </div>
          )}
          <button
            type="button"
            onClick={handleAddImages}
            disabled={!(imageUrl.trim() || filePreviewUrls.length > 0)}
            className="px-4 py-2 bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:from-indigo-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:bg-gray-400 disabled:cursor-not-allowed shadow"
          >
            Add Image{filePreviewUrls.length > 1 ? 's' : ''}
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
                  <img
                    src={image.url}
                    alt={image.caption || 'Spot image'}
                    className="w-full h-32 object-cover rounded-md mb-2 border border-indigo-100 shadow-sm"
                  />
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