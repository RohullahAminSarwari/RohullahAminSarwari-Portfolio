import React, { useState, useRef } from 'react';
import { uploadImage } from '../utils/imageUpload';

const ImageUpload = ({ onImageSelect, currentImage, label = "Upload Image" }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleFile = async (file) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setIsUploading(true);
    try {
      const result = await uploadImage(file);
      onImageSelect(result.url, result.fileName);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const onButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="space-y-4">
      <label className="block text-white mb-2">{label}</label>
      
      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-300 ${
          dragActive
            ? 'border-blue-400 bg-blue-400/10'
            : 'border-gray-600 hover:border-gray-500'
        } ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />
        
        {currentImage ? (
          <div className="space-y-4">
            <img
              src={currentImage}
              alt="Preview"
              className="mx-auto max-h-48 max-w-full rounded-lg object-cover"
            />
            <div className="flex justify-center space-x-2">
              <button
                type="button"
                onClick={onButtonClick}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                disabled={isUploading}
              >
                {isUploading ? 'Uploading...' : 'Change Image'}
              </button>
              <button
                type="button"
                onClick={() => onImageSelect('', '')}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                disabled={isUploading}
              >
                Remove
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
              <i className="fas fa-cloud-upload-alt text-2xl text-gray-400"></i>
            </div>
            <div>
              <p className="text-gray-300 mb-2">
                {isUploading ? 'Uploading...' : 'Drag & drop an image here, or click to select'}
              </p>
              <button
                type="button"
                onClick={onButtonClick}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                disabled={isUploading}
              >
                {isUploading ? 'Uploading...' : 'Choose File'}
              </button>
            </div>
            <p className="text-gray-400 text-sm">
              PNG, JPG, GIF up to 5MB
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
