export const GIFTS = {
    'ygpz': {
        name: '100元购物卡',
        count: 20,
        img: 'gouwuka.png'
    },
    'jdcard': {
        name: '京东卡500元',
        count: 6,
        img: 'jingdong500yuan.png'
    },
    'cbxjd': {
        name: '唱吧小巨蛋',
        count: 8,
        img: 'changbaxiaojudang.png'
    },
    'huawei': {
        name: '华为手机',
        count: 2,
        img: 'huaweishouji.png'
    },
    'macBookPro': {
        name: 'Mac Book Pro',
        count: 1,
        img: 'macbookpro.png'
    }
}

export const gifts = Object.keys(GIFTS)

export const getGift = (drawType) => {
    return GIFTS[drawType]
}

export const getGiftName = (drawType) => {
    return getGift(drawType).name
}

export const getGiftNumber = (drawType) => {
    return getGift(drawType).count
}
