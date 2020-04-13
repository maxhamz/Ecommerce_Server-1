const PRES="https://cdn-image.hipwee.com/wp-content/uploads/2017/09/hipwee-9888267_20170906021736.png"
const OTC="https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,q_auto:best,w_640/v1539174094/OBAT_BEBAS_FIX_uphnzj.png"
const OTC_R = "https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,q_auto:best,w_640/v1539174111/OBT_tpvdcj.png"
const JAMU = "https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,q_auto:best,w_640/v1539174005/JAMU_FIX_c3l0j5.png"

function defaultPic(status) {
    let pic = ""

    switch(status) {
        case 'prescription':
            pic = PRES
            break
        case 'otc':
            pic = OTC
            break
        case 'otc_limited':
            pic = OTC_R
            break
        case 'herbal':
            pic = JAMU
            break
        default:
            pic = JAMU
    }

    return pic
}

module.exports = {defaultPic}