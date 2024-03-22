import * as React from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import {
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@material-ui/core";

export interface ImageCropperProps {
  data?: any;
  onClose: Function;
  crop?: any;
}

export interface ImageCropperState {
  src: any;
  crop: any;
  croppedImageUrl: any;
  base64String: any;
}

var imageRef: any;
class ImageCropper extends React.Component<
  ImageCropperProps,
  ImageCropperState
> {
  constructor(props: ImageCropperProps) {
    super(props);
    this.state = {
      src: null,
      crop: {
        unit: "%",
        width: 60,
        height: (60 / (1 / 1)), // Calculate height based on width and aspect ratio
        aspect: 1 / 1,
        x: 0, // Set initial x position
        y: 0, // Set initial y position
        ...this.props.crop,
      },
      croppedImageUrl: "",
      base64String: "",
    };
  }
  componentDidMount = async () => {
    await this.onFileSelect(this.props.data);
  };
  onFileSelect = (file: any) => {
    if (file) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        this.setState({ src: reader.result });
      });
      reader.readAsDataURL(file);
    }
  };

  onClose = (data?: any) => {
    this.props.onClose(data);
  };
  onImageLoaded = (image: any) => {
    imageRef = image;
  };

  onCropComplete = (crop: any) => {
    this.makeClientCrop(crop);
  };

  onCropChange = (crop: any, percentCrop: any) => {
    const x = percentCrop.x;
    this.setState({ crop: { ...crop, x } });
  };

  async makeClientCrop(crop: any) {
    if (imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        imageRef,
        crop,
        "newFile.jpeg"
      );
      this.setState({ croppedImageUrl });
    }
  }
  toBase64 = (file: any) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  getCroppedImg = (image: any, crop: any, fileName: any) => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );
    }

    return new Promise((resolve, reject) => {
      canvas.toBlob(async (blob: any) => {
        if (!blob) {
          //reject(new Error('Canvas is empty'));
          console.error("Canvas is empty");
          return;
        }
        blob.name = fileName;
        let toBaseString = await this.toBase64(blob);
        // console.log("toBaseString", toBaseString);
        this.setState({ base64String: toBaseString });
        resolve(toBaseString);
      }, "image/jpeg");
    });
  };
  render() {
    const { crop, src } = this.state;
    return (
      <React.Fragment>
        <Dialog
          className="image-picker-dialog"
          open={true}
          keepMounted
          disableBackdropClick
          disableEscapeKeyDown
          onClose={() => this.props.onClose()}
        >
          <DialogTitle id="alert-dialog-title">Crop Image</DialogTitle>
          <DialogContent>
            {/* <section className="padding-16"> */}
            {this.state.src && (
              <ReactCrop
                //@ts-ignore
                src={src}
                crop={crop}
                ruleOfThirds
                onImageLoaded={this.onImageLoaded}
                onComplete={this.onCropComplete}
                onChange={this.onCropChange}
              />
            )}

            {/* </section> */}
          </DialogContent>
          <DialogActions>
            <Grid container spacing={2}>
              <Grid item>
                {" "}
                <Button
                  onClick={() => this.onClose()}
                  variant="outlined"
                  color="secondary"
                >
                  Cancel
                </Button>{" "}
              </Grid>
              <Grid item>
                {" "}
                <Button
                  onClick={() => this.onClose(this.state.base64String)}
                  variant="contained"
                  color="primary"
                >
                  Save
                </Button>{" "}
              </Grid>
            </Grid>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default ImageCropper;
