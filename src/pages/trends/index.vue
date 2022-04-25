<template>
  <view class="con">
    <canvas
      canvas-id="HvTwBrwWTmVJoqgSgvXfZrLwdKuarsuF"
      id="HvTwBrwWTmVJoqgSgvXfZrLwdKuarsuF"
      class="charts"
      @touchend="tap"
    />

    <canvas
      canvas-id="mzuvASZyQnmcXoFLKuRDMsMvkdXuEapZ"
      id="mzuvASZyQnmcXoFLKuRDMsMvkdXuEapZ"
      class="charts chart2"
      @touchend="tap1"
    />
  </view>
</template>

<script>
import uCharts from "@qiun/ucharts";
import map from "../../map.json";
var uChartsInstance = {};
export default {
  data() {
    return {
      cWidth: 750,
      cHeight: 500,
      yqdata: [],
    };
  },
  async onShow() {
  },
  onReady() {
    //这里的 750 对应 css .charts 的 width
    this.cWidth = uni.upx2px(750);
    //这里的 500 对应 css .charts 的 height
    this.cHeight = uni.upx2px(500);
    this.getServerData();
  },
  methods: {
    getServerData() {
      let that = this;
      let mapseries = { series: map.features };
      wx.cloud
        .callFunction({
          name: "yqdata",
        })
        .then((res) => {
          let yqdata = JSON.parse(res.result).area;
          console.log(yqdata);
          let series = map.features.map((item) => {
            // console.log(item);
            //根据接口数据查找到当前匹配的数据
            let dataItem = yqdata.find((x) => {
              // console.log(x);
              return x.provinceName == item.properties.name;
            }) || {
              placeCount: 0, //门店数量
              provinceName: item.properties.name, //地区
            };
            // console.log(dataItem);
            //添加到 json data中
            item.data = dataItem;
            //设置颜色
            item.color = this.addColor(dataItem.placeCount || 0);
            return item;
          });
          console.log(series);
          let mapseries = {
            series,
          };
          let res1 = {
            series: [
              {
                data: series.map((item) => {
                  return {
                    name: item.data.provinceName,
                    value: item.data.placeCount ? item.data.placeCount : 0,
                  };
                }),
              },
            ],
          };
          that.drawCharts("HvTwBrwWTmVJoqgSgvXfZrLwdKuarsuF", mapseries);
          this.drawCharts1("mzuvASZyQnmcXoFLKuRDMsMvkdXuEapZ", res1);
        });
    },
    drawCharts(id, data) {
      const ctx = uni.createCanvasContext(id, this);
      uChartsInstance[id] = new uCharts({
        type: "map",
        context: ctx,
        width: this.cWidth,
        height: this.cHeight,
        series: data.series,
        animation: true,
        timing: "easeOut",
        duration: 1000,
        rotate: false,
        rotateLock: false,
        background: "#FFFFFF",
        // color: [
        //   "#1890FF",
        //   "#91CB74",
        //   "#FAC858",
        //   "#EE6666",
        //   "#73C0DE",
        //   "#3CA272",
        //   "#FC8452",
        //   "#9A60B4",
        //   "#ea7ccc",
        // ],
        padding: [0, 0, 0, 0],
        fontSize: 5,
        fontColor: "#666666",
        dataLabel: true,
        dataPointShape: true,
        dataPointShapeType: "solid",
        touchMoveLimit: 60,
        enableScroll: false,
        enableMarkLine: false,
        extra: {
          map: {
            border: true,
            borderWidth: 1,
            borderColor: "#666666",
            fillOpacity: 0.6,
            activeBorderColor: "#F04864",
            activeFillColor: "#FACC14",
            activeFillOpacity: 1,
            mercator: false,
          },
          tooltip: {
            showBox: true,
            showArrow: true,
            showCategory: false,
            borderWidth: 0,
            borderRadius: 0,
            borderColor: "#000000",
            borderOpacity: 0.7,
            bgColor: "#000000",
            bgOpacity: 0.7,
            gridType: "solid",
            dashLength: 4,
            gridColor: "#CCCCCC",
            fontColor: "#FFFFFF",
            splitLine: true,
            horizentalLine: false,
            xAxisLabel: false,
            yAxisLabel: false,
            labelBgColor: "#FFFFFF",
            labelBgOpacity: 0.7,
            labelFontColor: "#666666",
          },
        },
      });
    },
    drawCharts1(id, data) {
      const ctx = uni.createCanvasContext(id, this);
      uChartsInstance[id] = new uCharts({
        type: "pie",
        context: ctx,
        width: this.cWidth,
        height: this.cHeight,
        series: data.series,
        animation: true,
        timing: "easeOut",
        duration: 1000,
        rotate: false,
        rotateLock: false,
        background: "#FFFFFF",
        color: [
          "#1890FF",
          "#91CB74",
          "#FAC858",
          "#EE6666",
          "#73C0DE",
          "#3CA272",
          "#FC8452",
          "#9A60B4",
          "#ea7ccc",
        ],
        padding: [5, 5, 5, 5],
        fontSize: 13,
        fontColor: "#666666",
        dataLabel: false,
        dataPointShape: true,
        dataPointShapeType: "solid",
        touchMoveLimit: 60,
        enableScroll: false,
        enableMarkLine: false,
        legend: {
          show: true,
          position: "bottom",
          float: "center",
          padding: 5,
          margin: 5,
          backgroundColor: "rgba(0,0,0,0)",
          borderColor: "rgba(0,0,0,0)",
          borderWidth: 0,
          fontSize: 13,
          fontColor: "#666666",
          lineHeight: 11,
          hiddenColor: "#CECECE",
          itemGap: 10,
        },
        extra: {
          pie: {
            activeOpacity: 0.5,
            activeRadius: 10,
            offsetAngle: 0,
            labelWidth: 15,
            border: false,
            borderWidth: 3,
            borderColor: "#FFFFFF",
            customRadius: 0,
            linearType: "none",
          },
          tooltip: {
            showBox: true,
            showArrow: true,
            showCategory: false,
            borderWidth: 0,
            borderRadius: 0,
            borderColor: "#000000",
            borderOpacity: 0.7,
            bgColor: "#000000",
            bgOpacity: 0.7,
            gridType: "solid",
            dashLength: 4,
            gridColor: "#CCCCCC",
            fontColor: "#FFFFFF",
            splitLine: true,
            horizentalLine: false,
            xAxisLabel: false,
            yAxisLabel: false,
            labelBgColor: "#FFFFFF",
            labelBgOpacity: 0.7,
            labelFontColor: "#666666",
          },
        },
      });
    },

    // 根据条件添加颜色
    addColor(count) {
      if (count > 9999) {
        return "#A52A2A";
      } else if (count > 999) {
        return "#FF4500";
      } else if (count > 99) {
        return "#FF7F50";
      } else if (count > 10) {
        return "#FFA07A";
      } else {
        return "#FFF5EE";
      }
    },
    tap(e) {
      uChartsInstance[e.target.id].touchLegend(e);
      uChartsInstance[e.target.id].showToolTip(e, {
        formatter: (item, category, index, opts) => {
          let series = opts.series[index];

          let res = {
            series: [
              {
                data: series.data.cities.map((item) => {
                  return {
                    name: item.cityName,
                    value: item.placeCount ? item.placeCount : 0,
                  };
                }),
              },
            ],
          };
          this.drawCharts1("mzuvASZyQnmcXoFLKuRDMsMvkdXuEapZ", res);
          console.log(index, series);
          return `${item.name} 现有${
            series.data.placeCount ? series.data.placeCount : 0
          }例`;
        },
      });
    },
    tap1(e) {
      uChartsInstance[e.target.id].touchLegend(e);
      uChartsInstance[e.target.id].showToolTip(e);
    },
  },
};
</script>

<style scoped>
.con {
  height: 100vh;
  padding-top: 50rpx;
}
.charts {
  width: 750rpx;
  height: 500rpx;
  font-size: 10rpx;
}
.chart2 {
  height: 900rpx;
}
</style>
