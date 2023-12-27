const csv = `
staffID,name
99129686,Hello1
99129687,Hello2
99129688,Hello3
99129689,Hello4
99129690,Hello5
99129691,Hello6
99129692,Hello7
99129693,Hello8
99129694,Hello9
99129695,Hello10
99129696,Hello11
99129697,Hello12
99129698,Hello13
99129699,Hello14
99129700,Hello15
99129701,Hello16
99129702,Hello17
99129703,Hello18
99129704,Hello19
99129705,Hello20
99129706,Hello21
99129707,Hello22
99129708,Hello23
99129709,Hello24
99129710,Hello25
99129711,Hello26
99129712,Hello27
99129713,Hello28
99129714,Hello29
99129715,Hello30
99129716,Hello31
99129717,Hello32
99129718,Hello33
99129719,Hello34
99129720,Hello35
99129721,Hello36
99129722,Hello37
99129723,Hello38
99129724,Hello39
`
const csvToJson = (csv) => {
    const lines = csv.trim().split("\n");
    const headers = lines[0].split(",");
    const jsonArr = [];

    for (let i = 1; i < lines.length; i++) {
        const obj = {};
        const currentLine = lines[i].trim().split(",");

        for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentLine[j]
        }
        jsonArr.push(obj)
    }

    return jsonArr
}
