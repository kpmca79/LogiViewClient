export class Chart {
  chart: {type:string};
  title: {text:string};
  xAxis: {
      categories: string[],
      title: { text: string}
    };
  yAxis: {
        min: number,
        title: {
          text: string
        }
      };
  legend: {
          reversed: boolean
        };
        
  plotOptions: {
            series: {
              stacking: string
            }
          };
   series: {name: string,
            data: number[]   }[];
      
 

}
