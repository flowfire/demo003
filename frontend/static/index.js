// 初始化echarts实例
let myChart = echarts.init(document.getElementById('main'));

let data = {}

let options = {
    tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove'
    },
    series: [
        {
            type: 'tree',
            data: [data],

            top: '5%',
            left: '5%',
            bottom: '5%',
            right: '5%',

            symbolSize: 16,

            label: {
                position: 'right',
                verticalAlign: 'middle',
                align: 'left',
                fontSize: 16
            },

            leaves: {
                label: {
                    position: 'left',
                    verticalAlign: 'middle',
                    align: 'right',
                    fontSize: 16
                }
            },

            expandAndCollapse: true,
            animationDuration: 550,
            animationDurationUpdate: 750
        }
    ]
}


myChart.setOption(option = {});
let collpasePage = async name => {

    let rootData = {}
    
    let res = await fetch(`./api/getpage/${name}`)
    let json = await res.json()
    let links = json.parse.links
    let pages = links.filter(link => link.ns === 0)
    pages = pages.slice(0, 10)
    let children = pages.map(page => {
        return {
            name: page["*"],
        }
    })
    rootData.name = name
    rootData.children = children

    console.log(rootData)
    options.series[0].data = [rootData]
    myChart.setOption(options)
}

// 监听搜索事件
document.querySelector("#button").addEventListener("click", async () => {

    myChart.showLoading()
    try{
        let value = document.querySelector("#search").value
        let res = await fetch(`https://en.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*&search=${value}`)
        let json = await res.json()
        let page = json[1][0]
        await collpasePage(page)
    }finally{
        setTimeout(() => {
            myChart.hideLoading()
        }, 0)
    }
})

myChart.on("click", async (params) => {
    myChart.showLoading()
    try{
        let page = params.data.name
        await collpasePage(page)
    }finally{
        setTimeout(() => {
            myChart.hideLoading()
        }, 0)
    }

})