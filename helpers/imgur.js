// IMGUR SETTING
// let request = require('request');
let rp = require('request-promise')
// const {customError} = require('./customError')

function post2Imgur(imageURL) {
    let options_post = {
        'method': 'POST',
        'uri': 'https://api.imgur.com/3/image',
        'headers': {
            'Authorization': `Client-ID ${process.env.IMGUR_CLIENT_ID}`
        },
        formData: {
            'image': ''
        },
        json: true
    };
    options_post.formData.image = imageURL
    rp(options_post)
        .then(response => {
            console.log(response.body);
        })
        .catch(err => {
            console.error(err)
        })
}

function getFromImgur(imageURL) {
    let options_get = {
        'method': 'GET',
        'url': `https://api.imgur.com/3/image/${imageURL}`,
        'headers': {
          'Authorization': `Client-ID ${process.env.IMGUR_CLIENT_ID}`
        },
        formData: {
      
        }
      };
      rp(options_get)
      .then(response => {
          console.log(response.body);
      })
      .catch(err => {
        console.error(err)
      })
    
}

module.exports = {post2Imgur, getFromImgur}