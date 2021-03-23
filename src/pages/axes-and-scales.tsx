import { Fragment, useEffect, useRef, useState } from "react";
import { select, line, curveCardinal, scaleLinear, axisBottom, axisRight } from "d3";

const AxesAndScales: React.FC = () => {
  const [data, setData] = useState([25, 30, 45, 60, 20, 65, 75]);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = select(svgRef.current);
    const xScale: any = scaleLinear()
      .domain([0, data.length - 1])
      .range([0, 300]);

    const yScale: any = scaleLinear()
      .domain([0, 150])
      .range([150, 0]);

    const xAxis: any = axisBottom(xScale)
      .ticks(data.length)
      .tickFormat((index: any) => index + 1);
    svg
      .select(".x-axis")
      .style("transform", "translateY(150px)")
      .call(xAxis);

    const yAxis: any = axisRight(yScale);
    svg
      .select(".y-axis")
      .style("transform", "translateX(300px)")
      .call(yAxis);

    // generates the "d" attribute of a path element
    const myLine: any = line()
      .x((value, index) => xScale(index))
      .y(yScale)
      .curve(curveCardinal);

    // renders path element, and attaches
    // the "d" attribute from line generator above
    svg
      .selectAll(".line")
      .data([data])
      .join("path")
      .attr("class", "line")
      .attr("d", myLine)
      .attr("fill", "none")
      .attr("stroke", "blue");
  }, [data]);

  return (
    <Fragment>
      <svg ref={svgRef}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
      <br />
      <br />
      <br />
      <br />
      <button onClick={() => setData(data.map((value) => value + 5))}>
        Update data
      </button>
      <button onClick={() => setData(data.filter((value) => value < 35))}>
        Filter data
      </button>
    </Fragment>
  );
};

export default AxesAndScales;
