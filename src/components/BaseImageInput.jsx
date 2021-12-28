import * as React from 'react';
import { useDispatch } from 'react-redux';

import { setBaseImage } from '../store/slices/canvas';
import { createBaseImage } from '../helpers/items';

const BaseImageInput = () => {
  const dispatch = useDispatch();

  const setBaseImageToCanvas = (e) => {
    const reader = new FileReader();
    reader.onload = function(e) {
      const img = document.createElement('img');

      // Make sure that the image is always outside
      // of user's viewport, since it's just temporary.
      img.style.position = 'absolute';
      img.style.top = '-999999px';
      img.style.left = '-999999px';
      img.src = e.target.result;
      document.body.appendChild(img);

      img.onload = function() {
        const rect = img.getBoundingClientRect()
        dispatch(
          setBaseImage(createBaseImage({
            url: e.target.result,
            naturalWidth: rect.width,
            naturalHeight: rect.height,
          })),
        );
        document.body.removeChild(img);
      }
    }

    reader.readAsDataURL(e.target.files[0]);
  };
  
  return (
    <input
      id="image-input"
      style={{ display: 'none' }}
      type="file"
      onChange={setBaseImageToCanvas}
    />
  );
};

export default BaseImageInput;
