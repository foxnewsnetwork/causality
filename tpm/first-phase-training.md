# First Phase Training

The ultimate objective is to build / train modules that can be plugged together into other neural nets, thus a big design goal of the project is that the output of each "layer" of the neural network is meaningful (Judea Pearl might even call it "casual"). What this means is that I'd like my AI to build "eigenimages" (aka archetypes) that I, as the human expert, would agree is meaningful

## Plan Specificaiton

To get to that goal, I'd like to put together the following:

- Gather a bunch of screenshots from league
- Pipe each image through a neural network consisting of:
  - [sci-kit image features API](https://scikit-image.org/docs/stable/api/skimage.feature.html) at input
  - narrow middle [autoendcoer](https://en.wikipedia.org/wiki/Autoencoder)
  - [sci-kit image draw api](https://scikit-image.org/docs/stable/api/skimage.draw.html) at output
- Learn a family of the most efficient (aka "minimum") [autoendcoer](https://en.wikipedia.org/wiki/Autoencoder) that satisfies:
  - Draws something to screen
  - I, as the human expert, agrees that this image captures some category or archetype I have in my head
  - Is "stable" (as in if I feed the output back in again, it should look the same)
  - My arbitrary definition of minimum (as it pertains to botting LOL)

## Requirements

In order to satisfy the above specs, engineering will need to put together the following:

- client-side ui that can:
  - display images from server
  - send images to server
  - receive approval / rejection from user
  - display current status of autoencoder set
- server-side brain that can:
  - generate a family of neural nets
  - interface with sci-kit feature api
  - output with image draw api
  - store values in a local database
- flask server to bridge the functionality
- load up a bunch of images from LoL to use as training data


## References

- [sci-kit image features API](https://scikit-image.org/docs/stable/api/skimage.feature.html)
- [opencv thresholding api](https://opencv-python-tutroals.readthedocs.io/en/latest/py_tutorials/py_imgproc/py_thresholding/py_thresholding.html#thresholding)
- [sci-kit image draw api](https://scikit-image.org/docs/stable/api/skimage.draw.html)
- [autoendcoer](https://en.wikipedia.org/wiki/Autoencoder)