
import axios from 'axios';

export default async function uploadImage(image) {
  let body = new FormData()
  body.set('key', 'd829fc600a8959409d9e433b97f87f32')
  body.append('image', image)

  const a = await axios({
    method: 'post',
    url: 'https://api.imgbb.com/1/upload',
    data: body
  })

  return a.data
}