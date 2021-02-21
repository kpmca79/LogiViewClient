export class ChartJSOptions{
    title= { display: false,text: 'Data Analytics Chart'}
    legend= { display: false }
    aspectRatio=4
    backgroundColor:string
    animation={duration:2000,easing:'easeOutQuart'}
    elements={point:{pointStyle:'circle',radius:3,hoverRadius:5,backgroundColor:"rgba(125,125,125,0.1)",borderColor:"rgba(125,125,125,0.1)"}}
    scales= { yAxes: [{ gridLines: {color: "rgba(235, 235, 235, 1)",tickMarkLength:7,zeroLineWidth:1}, 
                        ticks: {beginAtZero: true,min:0,precision:0},
                        stacked: false,
                        scaleLabel: {display: false,labelString: "Y-Axis",stepSize: 1}
                      }],
              xAxes: [{ gridLines: {color: "rgba(235, 235, 235, 1)"},
                        ticks: {beginAtZero: true,min:0,precision:0}, 
                        stacked: false,
                        scaleLabel: {display: false,labelString: "X-Axis"}}], 
              x: {stacked: true},
              y: {stacked: true}
            }
    data={labels:[],datasets:[],backgroundColor:[],borderColor:[],fill:true}
    type="line"
   
}