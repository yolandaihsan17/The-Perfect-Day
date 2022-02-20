export function getTemplateModel() {
  return {
    welcomeWords: 'Hello welcome to our wedding',
    name1: 'Name 1',
    name2: 'Name 2',
    disableParent: false,
    parentA1: 'parent 1',
    parentA2: 'parent 2',
    parentB1: 'parent 3',
    parentB2: 'parent 4',
    mainDate: '2021-02-13T01:49:29+01:00',
    section1Title: 'Wedding Details',
    descriptionText1: 'Anak ke 1 dari Bapak Fulan & Ibu Fulanah',
    descriptionText2: 'Anak ke 3 dari Bapak Abdul & Ibu Abdul',
    userId: '',

    ppA: ImageBBObject(),
    ppB: ImageBBObject(),
    
    parseBgImage: ImageBBObject(),

    bgImage: ImageBBObject(),

    images: [ImageBBObject()],

    events: [{
      name: 'Event 1',
      place: 'Event 1 place',
      address: 'Event 1 Address, No. 17, Indonesia',
      startTime: '',
      endTime: '',
      date: '2021-02-13T01:49:29+01:00',
      mapLink: 'https://goo.gl/maps/CZ24HgifWh2vjYp8A'
    },
    {
      name: 'Event 2',
      place: 'Event 2 place',
      address: 'Event 2 Address, No. 17, Indonesia',
      startTime: '',
      endTime: '',
      date: '2021-02-13T01:49:29+01:00',
      mapLink: 'https://goo.gl/maps/CZ24HgifWh2vjYp8A'
    }
    ]
  }
}

export function ImageBBObject() {
  return {
    delete_url: '',
    display_url: '',
    expiration: '',
    id: '',
    image: ImageObject(),
    is_360: '',
    medium: ImageObject(),
    size: '',
    thumb: ImageObject(),
    time: '',
    title: '',
    url: '',
    url_viewer: '',

    // frontend field for local images
    is_local: false,
    file_base64: null,
    file: null
  }
}

export function ImageObject() {
  return {
    extension: '',
    filename: '',
    mime: '',
    name: '',
    url: ''
  }
}