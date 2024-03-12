export const GIFTS = {
    "aiguozhetouyingyi": { "name": "爱国者投影仪H28", "count": 4, "img": "ygpz.png" },
    "airpods": { "name": "AirPods第三代配闪电充电盒", "count": 6, "img": "ygpz.png" },
    "appleWatch": { "name": "Apple Watch series 9 GPS版41mm M/L", "count": 3, "img": "ygpz.png" },
    "changbaxiaojudang": { "name": "唱吧小巨蛋G2MAX", "count": 6, "img": "ygpz.png" },
    "dajiang": { "name": "大疆无人机DJI Mini2 SE", "count": 3, "img": "ygpz.png" },
    "dajiangpocket2": { "name": "大疆运动相机Pocket2 黑标准版", "count": 1, "img": "ygpz.png" },
    "dyson": { "name": "Dyson吸尘器V12", "count": 1, "img": "ygpz.png" },
    "dysonchuifengji": { "name": "Dyson吹风机DHD08 红色", "count": 1, "img": "ygpz.png" },
    "haohan": { "name": "浩瀚卓越云台M5标配", "count": 7, "img": "ygpz.png" },
    "huawei": { "name": "华为手机Mate 60 Pro (12GB + 1TB)", "count": 1, "img": "ygpz.png" },
    "huaweibluetooth": { "name": "华为蓝牙耳机FreeBuds 5i", "count": 7, "img": "ygpz.png" },
    "huaweipad": { "name": "华为MatePad 11寸 8+256GB", "count": 1, "img": "ygpz.png" },
    "huaweiwatch": { "name": "华为Watch GT3活力款", "count": 4, "img": "ygpz.png" },
    "ipad10": { "name": "iPad10 256G WLAN", "count": 1, "img": "ygpz.png" },
    "iphone": { "name": "iPhone 15 Pro 512G", "count": 2, "img": "ygpz.png" },
    "jbl": { "name": "JBL运动耳机 Nearbuds", "count": 7, "img": "ygpz.png" },
    "jimi": { "name": "极米投影仪Z6X 第四代", "count": 1, "img": "ygpz.png" },
    "lipingka1000": { "name": "礼品卡1000元", "count": 6, "img": "ygpz.png" },
    "lipingka500": { "name": "礼品卡500元", "count": 9, "img": "ygpz.png" },
    "macbookpro": { "name": "MacBook Pro14", "count": 1, "img": "ygpz.png" },
    "maxieer": { "name": "马歇尔 Action3音箱", "count": 1, "img": "ygpz.png" },
    "meidi": { "name": "美的空气炸锅 KZC6381", "count": 6, "img": "ygpz.png" },
    "mofei": { "name": "摩飞折叠暖菜板MR8301", "count": 6, "img": "ygpz.png" },
    "stone": { "name": "石头P10Pro扫拖机器人", "count": 1, "img": "ygpz.png" },
    "switch": { "name": "Switch NS OLED 日版", "count": 2, "img": "ygpz.png" },
    "waterpik": { "name": "Waterpik水牙线GT3-12", "count": 4, "img": "ygpz.png" },
    "ygpz": { "name": "礼品卡100元", "count": 1, "img": "ygpz.png", "tableCount": 127 },
    "reshen": { "name": "热身礼品卡100元", "count": 1, "img": "ygpz.png", "tableSeats": 12 },
    "yjj4": { "name": "云鲸J4 水箱版", "count": 1, "img": "ygpz.png" },
    "zOther": { "name": "龙年好礼", "count": 1, "img": "ygpz.png" }
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
