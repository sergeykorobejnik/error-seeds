let num=12354;function numToArr(t){if(8!=t)return null;let n=Math.ceil(Math.log10(t+1)),r=t/Math.pow(10,n),o=[],u=0;for(let t=n;t>0;t--)r*=10,o[u]=Math.trunc(r),r=(r-Math.trunc(r)).toFixed(t),u++;return o}console.log(numToArr(num));