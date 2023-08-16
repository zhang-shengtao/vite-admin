function getPie3D(pieData, internalDiameterRatio, boxHeight) {
  let series = [];
  let sumValue = 0;
  let startValue = 0;
  let endValue = 0;
  const legendData = [];
  const k =
    typeof internalDiameterRatio !== "undefined" ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio) : 1 / 3;
  // 为每一个饼图数据，生成一个 series-surface 配置
  for (let i = 0; i < pieData.length; i++) {
    sumValue += pieData[i].value;
    const seriesItem = {
      name: typeof pieData[i].name === "undefined" ? `series${i}` : pieData[i].name,
      type: "surface",
      parametric: true,
      wireframe: {
        show: false
      },
      pieData: pieData[i],
      pieStatus: {
        selected: false,
        hovered: false,
        k
      }
    };
    if (typeof pieData[i].itemStyle !== "undefined") {
      const itemStyle = {
        color: "",
        opacity: ""
      };
      itemStyle.color =
        typeof pieData[i].itemStyle.color !== "undefined" ? (itemStyle.color = pieData[i].itemStyle.color) : null;
      itemStyle.opacity =
        typeof pieData[i].itemStyle.opacity !== "undefined" ? (itemStyle.opacity = pieData[i].itemStyle.opacity) : null;

      seriesItem.itemStyle = itemStyle;
    }
    series.push(seriesItem);
  }
  // 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
  // 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，也就是实现每一个扇形。
  for (let i = 0; i < series.length; i++) {
    endValue = startValue + series[i].pieData.value;
    series[i].pieData.startRatio = startValue / sumValue;
    series[i].pieData.endRatio = endValue / sumValue;
    series[i].parametricEquation = getParametricEquation(
      series[i].pieData.startRatio,
      series[i].pieData.endRatio,
      false,
      false,
      k,
      series[i].pieData.value
    );
    startValue = endValue;
    legendData.push(series[i].name);
  }
  // 补充一个透明的圆环，用于支撑高亮功能的近似实现。
  series.push({
    name: "mouseoutSeries",
    type: "surface",
    parametric: true,
    wireframe: {
      show: false
    },
    itemStyle: {
      opacity: 0
    },
    parametricEquation: {
      u: {
        min: 0,
        max: Math.PI * 2,
        step: Math.PI / 20
      },
      v: {
        min: 0,
        max: Math.PI,
        step: Math.PI / 20
      },
      x(u, v) {
        return Math.sin(v) * Math.sin(u) + Math.sin(u);
      },
      y(u, v) {
        return Math.sin(v) * Math.cos(u) + Math.cos(u);
      },
      z(u, v) {
        return Math.cos(v) > 0 ? 0.1 : -0.1;
      }
    }
  });

  // 准备待返回的配置项，把准备好的 legendData、series 传入。
  const option = {
    // backgroundColor: "#0b4fc8",
    tooltip: {
      textStyle: {
        fontSize: 13
      },
      formatter: (params) => {
        if (params.seriesName !== "mouseoutSeries" && params.seriesName !== "pie2d") {
          return (
            `${params.seriesName}<br/>` +
            `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${params.color};"></span>` +
            `${option.series[params.seriesIndex].pieData.value}%`
          );
        }
      }
    },
    animation: true,
    xAxis3D: {
      min: -1,
      max: 1
    },
    yAxis3D: {
      min: -1,
      max: 1
    },
    zAxis3D: {
      min: -1,
      max: "dataMax"
    },
    grid3D: {
      top: -20,
      show: false,
      boxHeight, // 最大高度
      viewControl: {
        alpha: 45, // 俯仰角
        beta: 0, //起始角度
        distance: 300, // 修改到眼睛的视距直观大小
        rotateSensitivity: 0,
        zoomSensitivity: 0,
        panSensitivity: 0,
        autoRotate: false // 是否旋转
      },
      // 后处理特效可以为画面添加高光、景深、环境光遮蔽（SSAO）、调色等效果。可以让整个画面更富有质感。
      postEffect: {
        enable: true,
        bloom: {
          enable: true,
          bloomIntensity: 0.1
        },
        SSAO: {
          enable: true,
          quality: "medium",
          radius: 2
        }
      },
      temporalSuperSampling: {
        enable: true
      }
    },
    series
  };

  pieData.map((item) => {
    item.itemStyle.color = "transparent";
  });
  series.push({
    name: "pie2d",
    type: "pie",
    labelLine: {
      length: 20,
      length2: 70,
      lineStyle: {
        color: "#00eaff"
      }
    },
    startAngle: 10, //起始角度，支持范围[0, 360]。
    clockwise: false, //饼图的扇区是否是顺时针排布。上述这两项配置主要是为了对齐3d的样式
    radius: "70%",
    center: ["50%", "50%"],
    data: pieData,
    itemStyle: {
      opacity: 1
    }
  });
  option.labelLine = {
    show: true
  };
  option.label = {
    show: true,
    position: "outside",
    rich: {
      b: {
        color: "#333"
      },
      c: {
        color: "#333"
      }
    },
    formatter: "{b|{b}}\n{c|{c}%}"
  };
  return option;
}
function getParametricEquation(startRatio, endRatio, isSelected, isHovered, knum, h) {
  // 计算
  const midRatio = (startRatio + endRatio) / 2;
  const startRadian = startRatio * Math.PI * 2;
  const endRadian = endRatio * Math.PI * 2;
  const midRadian = midRatio * Math.PI * 2;
  // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
  const k = typeof knum !== "undefined" ? knum : 1 / 3;
  // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
  const offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0;
  const offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0;
  // 计算高亮效果的放大比例（未高亮，则比例为 1）
  const hoverRate = isHovered ? 1.05 : 1;
  // 返回曲面参数方程
  return {
    u: {
      min: -Math.PI,
      max: Math.PI * 3,
      step: Math.PI / 32
    },
    v: {
      min: 0,
      max: Math.PI * 2,
      step: Math.PI / 20
    },
    x(u, v) {
      if (u < startRadian) {
        return offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
      }
      if (u > endRadian) {
        return offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
      }
      return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
    },
    y(u, v) {
      if (u < startRadian) {
        return offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
      }
      if (u > endRadian) {
        return offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
      }
      return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate;
    },
    z(u, v) {
      if (u < -Math.PI * 0.5) {
        return Math.sin(u);
      }
      if (u > Math.PI * 2.5) {
        return Math.sin(u) * h * 0.1;
      }
      return Math.sin(v) > 0 ? 1 * h * 0.1 : -1;
    }
  };
}
export function pie(echartData, myEcharts) {
  const colorArr = ["#d72ef6", "#8045f8", "#69cde7", "#2748f7", "#edbc3b", "#9083FD"];
  const newEchartData = echartData.map((item, index) => {
    return {
      name: item.name,
      value: item.value,
      itemStyle: {
        color: colorArr[index]
      }
    };
  });
  const options = getPie3D(newEchartData, 0, 60);
  myEcharts.setOption(options, true);
  myEcharts.resize();
}

// 3D柱状图
export function bar3D(data, myEcharts) {
  const option = {
    backgroundColor: "#0b4fc8",
    tooltip: {
      // show: false,
      // backgroundColor: "rgba(0,0,0,0.9)",
    },
    xAxis3D: {
      name: "",
      show: true,
      type: "value",
      // data: ["A", "B", "C", "D", "E", "F", "G", "H"],
      axisLine: {
        lineStyle: {
          color: "rgba(0,0,0,0)",
          width: 0
        }
      },
      splitLine: {
        show: true
      },
      axisLabel: {
        interval: 0,
        rotate: 45,
        textStyle: {
          color: "#fff",
          fontSize: 12
        }
      },
      axisTick: {
        show: true
      }
    },
    yAxis3D: {
      name: "",
      type: "category",
      show: true,
      data: [""],
      axisLine: {
        lineStyle: {
          color: "rgba(0,0,0,0)",
          width: 0
        }
      },
      splitLine: {
        show: true
      },
      axisLabel: {
        show: true
      },
      axisTick: {
        show: true
      }
    },
    zAxis3D: {
      name: "",
      type: "value",
      axisLine: {
        lineStyle: {
          color: "#0F0",
          width: 0
        }
      },
      splitLine: {
        show: false
      },
      axisLabel: {
        show: false
      },
      axisTick: {
        show: false
      }
    },
    grid3D: {
      boxWidth: 200,
      boxDepth: 0,
      axisPointer: {
        show: false
      },
      light: {
        main: {
          intensity: 1.2
        },
        ambient: {
          intensity: 0.3
        }
      },
      viewControl: {
        alpha: 0,
        beta: 0,
        autoRotate: false,
        zoomSensitivity: 0.2,
        distance: 180
      }
    },
    series: [
      {
        type: "bar3D",
        name: "1",
        barSize: 15,
        itemStyle: {
          normal: {
            color: function (params) {
              var colorList = ["#37b70c", "#fae521", "#f29c00", "#dd3f36", "#b3013f", "#a00398", "#E87C25", "#C6E579"];
              return colorList[params.dataIndex];
            }
          }
        },
        data: [
          [0, 0, 18000],
          [1, 0, 10000],
          [2, 0, 6000],
          [3, 0, 18000],
          [4, 0, 10000],
          [5, 0, 6000],
          [6, 0, 18000],
          [7, 0, 10000]
        ],
        stack: "stack",
        shading: "lambert",
        emphasis: {
          label: {
            show: true
          }
        }
      }
    ]
  };

  myEcharts.setOption(option);
}
