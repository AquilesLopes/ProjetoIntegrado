
export function resizedataURL(datas : any, wantedWidth : number, wantedHeight : number){

    return new Promise((resolve, reject) => {
        // We create an image to receive the Data URI
        var img = document.createElement('img');

        // When the event "onload" is triggered we can resize the image.
        img.onload = function(){        
            // We create a canvas and get its context.
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');

            // We set the dimensions at the wanted size.
            canvas.width = wantedWidth;
            canvas.height = wantedHeight;

            // We resize the image with the canvas method drawImage();
            ctx?.drawImage(img, 0, 0, wantedWidth, wantedHeight); 

            var dataURI = canvas.toDataURL();

            resolve(dataURI);
        };

        // We put the Data URI in the image's src attribute
        img.src = datas;
    });

}

export function squareImgDataURL(datas : any){
    return new Promise(async function(resolve,reject){
        // the desired aspect ratio of our output image (width / height)
        const outputImageAspectRatio = 1;

        // this image will hold our source image data
        const inputImage = new Image();

        // we want to wait for our image to load
        inputImage.onload = () => {
            // let's store the width and height of our image
            const inputWidth = inputImage.naturalWidth;
            const inputHeight = inputImage.naturalHeight;
            
            // get the aspect ratio of the input image
            const inputImageAspectRatio = inputWidth / inputHeight;
            
            // if it's bigger than our target aspect ratio
            let outputWidth = inputWidth;
            let outputHeight = inputHeight;
            if (inputImageAspectRatio > outputImageAspectRatio) {
                outputWidth = inputHeight * outputImageAspectRatio;
            } else if (inputImageAspectRatio < outputImageAspectRatio) {
                outputHeight = inputHeight / outputImageAspectRatio;
            }
            
            // calculate the position to draw the image at
            const outputX = (outputWidth - inputWidth) * .5;
            const outputY = (outputHeight - inputHeight) * .5;

            // create a canvas that will present the output image
            const outputImage = document.createElement('canvas');

            // set it to the same size as the image
            outputImage.width = outputWidth;
            outputImage.height = outputHeight;
            
            // draw our image at position 0, 0 on the canvas
            const ctx = outputImage.getContext('2d');
            ctx?.drawImage(inputImage, outputX, outputY);                   
            
            var dataURI = outputImage.toDataURL();

            // This is the return of the Promise
            resolve(dataURI);
        };

        // start loading our image
        inputImage.src = datas;
    })
}

export function squareAndResizeImage(datas : any, wantedWidth : number, wantedHeight : number){
    return new Promise((resolve, reject) => {
        squareImgDataURL(datas)
        .then((imgSquare) : any => {
            resizedataURL(imgSquare, wantedWidth, wantedHeight)
            .then((imgResize) => {
                resolve(imgResize);
            });
        });
    });
}
