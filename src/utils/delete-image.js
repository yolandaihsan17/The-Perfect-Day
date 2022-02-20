import axios from 'axios';

export default async function deleteImage() {
  return new Promise((resolve, reject) => {
    let count = 0
    for (let image of uploadedImages.current) {
      axios({
        method: 'post',
        url: image.delete_url,
        data: null
      }).then(() => {
        count += 1
        if (count === uploadedImages.current.length) {
          resolve()
        }
      }).catch(() => {
        console.log('Failed to delete this image: ' + image.title)
        reject()
      })
    }
  })
}