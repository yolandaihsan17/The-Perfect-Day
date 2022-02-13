import Compressor from "compressorjs";

export default function compressImage(file) {
    console.log('originial', file.size)
    return new Promise((resolve, reject) => {
        new Compressor(file, {
            quality: 0.4,

            // The compression process is asynchronous,
            // which means you have to access the `result` in the `success` hook function.
            success(result) {
                resolve(result)
                // const formData = new FormData();

                // // The third parameter is required for server
                // formData.append('file', result, result.name);

                // // Send the compressed image file to server with XMLHttpRequest.
                // axios.post('/path/to/upload', formData).then(() => {
                //   console.log('Upload success');
                // });
            },
            error(err) {
                console.log(err.message);
                reject()
            },
        });
    })
}