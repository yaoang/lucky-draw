const csv = `
staffID,name
1,Hello1
2,Hello2
3,Hello3
4,Hello4
5,Hello5
6,Hello6
7,Hello7
8,Hello8
9,Hello9
10,Hello10
11,Hello11
12,Hello12
13,Hello13
14,Hello14
15,Hello15
16,Hello16
17,Hello17
18,Hello18
19,Hello19
20,Hello20
21,Hello21
22,Hello22
23,Hello23
24,Hello24
25,Hello25
26,Hello26
27,Hello27
28,Hello28
29,Hello29
30,Hello30
31,Hello31
32,Hello32
33,Hello33
34,Hello34
35,Hello35
36,Hello36
37,Hello37
38,Hello38
39,Hello39

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
