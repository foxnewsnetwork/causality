import React, { useCallback, useState } from 'react';

type Props = {
  takePicture: () => Promise<Blob>
}

const PictureEcho = (props: Props) => {
  const [picURL, setPicURL] = useState('')
  const takePicture = useCallback(() => {
    props.takePicture().then(blob => {
      const dataURI = URL.createObjectURL(blob);
      setPicURL(dataURI);
    })
  }, [props.takePicture])
  return (
    <div>
      <img src={picURL} />
      <button onClick={takePicture}>
        Take Pic
      </button>
    </div>
  )
}

export default PictureEcho;
