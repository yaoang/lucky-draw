const names = [
    { "staffID": "99129686", "name": "Hello1" }, { "staffID": "99284077", "name": "Hello2" }, { "staffID": "99166837", "name": "Hello3" },
{ "staffID": "99659947", "name": "Hello4" }, { "staffID": "99219526", "name": "Hello5" }, { "staffID": "99255091", "name": "Hello6" }, { "staffID": "99116284", "name": "Hello7" }, { "staffID": "99699349", "name": "Hello8" },
{ "staffID": "99116222", "name": "Hello9" }, { "staffID": "99116216", "name": "Hello10" }, { "staffID": "99007154", "name": "Hello11" }, { "staffID": "99983378", "name": "Hello12" }, { "staffID": "99794002", "name": "Hello13" },
{ "staffID": "99866057", "name": "Hello14" }, { "staffID": "99310542", "name": "Hello15" }, { "staffID": "99982236", "name": "Hello16" }, { "staffID": "99212195", "name": "Hello17" }, { "staffID": "99109418", "name": "Hello18" },
{ "staffID": "99095990", "name": "Hello19" }, { "staffID": "99847191", "name": "Hello20" }, { "staffID": "99859167", "name": "Hello21" }, { "staffID": "99260065", "name": "Hello22" }, { "staffID": "99121199", "name": "Hello23" },
{ "staffID": "99965974", "name": "Hello24" }, { "staffID": "99272330", "name": "Hello25" }, { "staffID": "99250940", "name": "Hello26" }, { "staffID": "99254489", "name": "Hello27" }, { "staffID": "99407680", "name": "Hello28" },
{ "staffID": "99204230", "name": "Hello29" }, { "staffID": "99535653", "name": "Hello30" }, { "staffID": "99121097", "name": "Hello31" }, { "staffID": "99733303", "name": "Hello32" }, { "staffID": "99559634", "name": "Hello33" },
{ "staffID": "99746677", "name": "Hello34" }, { "staffID": "99216176", "name": "Hello35" }, { "staffID": "99739593", "name": "Hello36" }, { "staffID": "99891412", "name": "Hello37" }, { "staffID": "99673302", "name": "Hello38" },
{ "staffID": "99837922", "name": "Hello39" }, { "staffID": "99413387", "name": "Hello40" }, { "staffID": "99169543", "name": "Hello41" }, { "staffID": "99984075", "name": "Hello42" }, { "staffID": "99981808", "name": "Hello43" },
{ "staffID": "99803190", "name": "Hello44" }, { "staffID": "99768340", "name": "Hello45" }, { "staffID": "99386957", "name": "Hello46" }, { "staffID": "99011038", "name": "Hello47" }, { "staffID": "99248911", "name": "Hello48" },
{ "staffID": "99348601", "name": "Hello49" }, { "staffID": "99055719", "name": "Hello50" }, { "staffID": "99020897", "name": "Hello51" }, { "staffID": "99583575", "name": "Hello52" }, { "staffID": "99986775", "name": "Hello53" },
{ "staffID": "99278960", "name": "Hello54" }, { "staffID": "99462193", "name": "Hello55" }, { "staffID": "99336589", "name": "Hello56" }, { "staffID": "99013866", "name": "Hello57" }, { "staffID": "99205686", "name": "Hello58" },
{ "staffID": "99006541", "name": "Hello59" }, { "staffID": "99065166", "name": "Hello60" }, { "staffID": "99569353", "name": "Hello61" }, { "staffID": "99662926", "name": "Hello62" }, { "staffID": "99662928", "name": "Hello63" },
{ "staffID": "99251081", "name": "Hello64" }, { "staffID": "99427642", "name": "Hello65" }, { "staffID": "99866909", "name": "Hello66" }, { "staffID": "99106253", "name": "Hello67" }, { "staffID": "99106214", "name": "Hello68" },
{ "staffID": "99227273", "name": "Hello69" }, { "staffID": "99230866", "name": "Hello70" }, { "staffID": "99912737", "name": "Hello71" }, { "staffID": "99587411", "name": "Hello72" }, { "staffID": "99845371", "name": "Hello73" },
{ "staffID": "99064153", "name": "Hello74" }, { "staffID": "99767356", "name": "Hello75" }, { "staffID": "99227441", "name": "Hello76" }, { "staffID": "99228368", "name": "Hello77" }, { "staffID": "99593427", "name": "Hello78" },
{ "staffID": "99979729", "name": "Hello79" }, { "staffID": "99749821", "name": "Hello80" }, { "staffID": "99082028", "name": "Hello81" }, { "staffID": "99868247", "name": "Hello82" }, { "staffID": "99626119", "name": "Hello83" },
{ "staffID": "99881243", "name": "Hello84" }, { "staffID": "99979855", "name": "Hello85" }, { "staffID": "99978534", "name": "Hello86" }, { "staffID": "99117352", "name": "Hello87" }, { "staffID": "99010051", "name": "Hello88" },
{ "staffID": "99454725", "name": "Hello89" }, { "staffID": "99111126", "name": "Hello90" }, { "staffID": "99181875", "name": "Hello91" }
]

const shuffle = (arr) => {
    for (let i = 1; i < arr.length; i++) {
        const random = Math.floor(Math.random() * (i + 1))
        // [arr[i], arr[random]] = [arr[random], arr[i]]
        const tmp = arr[i]
        arr[i] = arr[random]
        arr[random] = tmp
    }
    return arr
}
