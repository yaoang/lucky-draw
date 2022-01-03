var state = 'running'
localStorage.setItem('picked', [])
window.initNames = ''

function getAllUsers() {
    const nameStr = initNames
    let names = nameStr.split(',')
    if (names.length === 1 && !names[0]) {
        names = []
    }
    return names
}

function getKeyMap(names) {
    const KEYMAP = {}
    let index = 0

    names.forEach(n => {
        KEYMAP[n] = index % 200 + 1
        index++
    })
    return KEYMAP
}

function stopAnimationPlay() {
    const a3d = document.querySelector('.a3d')
    if (state === 'running') {
        state = 'paused'
    } else {
        state = 'running'
    }
    a3d.childNodes.forEach(cn => cn.style.animationPlayState = state)
}

async function sleep(time) {
    await setTimeout(() => {
    }, time)
}

function pickOne(picker) {
    console.log('start to pick ')
    const a3d = document.querySelector('.a3d')
    const length = a3d.childNodes.length
    for (let index = length - 1; index >= 0; index--) {
        const cn = a3d.childNodes[index]
        if (cn.childNodes[0].getAttribute('data-name') != picker) {
            if (index > 1) {
                document.getElementById('picker').innerText = `Picking one name from ${length} name`
            }
            a3d.removeChild(cn)

            if (index === 0) {
                document.querySelector('.rot:nth-child(1).key').style.marginLeft = '0'
            }

            if (index % 2 === 0) {
                setTimeout(() => pickOne(picker), 100)
                break
            }

            if (index === 1) {
                document.getElementById('picker').innerHTML = picker
                const saved = localStorage.getItem('picked')
                const all = saved.split(',')
                if (!all[0]) {
                    all.length = 0
                }
                all.push(picker)
                localStorage.setItem('picked', all)
                document.getElementById('picked').innerHTML = `Picked:(${all.length})<br/> ${all.join(' <br/>')}`
                document.getElementById('pick-button').disabled = false
            }
        } else {
            if (index < 3) {
                cn.style.fontSize = '4vw'
                cn.childNodes[0].style.color = '#fff'
            }
        }
    }
}
