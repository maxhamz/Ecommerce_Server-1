const fetch = require('node-fetch')
global.Headers = fetch.Headers;
const FormData = require('form-data')
// let sampleURL = "https://pbs.twimg.com/profile_images/679852624754028544/Inq6KagO_reasonably_small.jpg"
// const {customError} = require('./customError')

async function post2Imgur(baseURL) {

    let link

    var myHeaders = new Headers();

    // let basecid = "Client-ID "
    // let mycid = process.env.IMGUR_CLIENT_ID

    // let cid = basecid+mycid

    myHeaders.append("Authorization", "Client-ID 390277fdd42f174");
    // myHeaders.append("Authorization", cid);

    var formdata = new FormData();
    formdata.append("image", baseURL);


    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };


    link = await fetch("https://api.imgur.com/3/image", requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log("OK, THIS IS IMGUR'S URL");
            console.log(result)
            let d = JSON.parse(result)
            console.log(d.data.link);
            return d.data.link
        })
        .catch(error => {
            // console.log('error', error)
            console.log("ERROR POSTING 2 IMGUR");
            console.error(error)
            // next(error)
        });

    return link
}


// console.log("HELLO");
// let s = post2Imgur(sampleURL)
// console.log(s);

// s
// .then(result => {
//     console.log("GERONIMO!");
//     console.log(result);
// })

module.exports = {post2Imgur}
