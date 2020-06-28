<template>
  <div>
    <Row
      :gutter="10"
      style="margin-bottom: 20px;">
      <Col span="6">
        <Card>
          <p slot="title">今日订单数</p>
          <p>1212</p>
        </Card>
      </Col>
      <Col span="6">
        <Card>
          <p slot="title">近 10 天订单数</p>
          <p>1212</p>
        </Card>
      </Col>
      <Col span="6">
        <Card>
          <p slot="title">今日销售额</p>
          <p>￥1212</p>
        </Card>
      </Col>
      <Col span="6">
        <Card>
          <p slot="title">近 10 天销售额</p>
          <p>￥1212</p>
        </Card>
      </Col>
    </Row>
    <Card>
      <p slot="title">订单数与销售额</p>
      <p>
        <ve-histogram
          :data="cChart.data"
          :settings="cChart.settings"
          :extend="chartExtend" />
      </p>
    </Card>
  </div>
</template>

<script>
import { VeHistogram } from 'v-charts'

export default {
  components: {
    VeHistogram
  },
  data () {
    this.chartExtend = {
      series (v) {
        v.forEach(i => {
          i.barWidth = 30
        })
        return v
      }
    }
    return {
      cChart: {
        settings: {
          metrics: ['订单数', '销售额'],
          dimension: ['日期']
        },
        data: {
          columns: ['日期', '订单数', '销售额'],
          rows: [
            {
              '日期': '2019-03-11',
              '订单数': 101,
              '销售额': 1093
            },
            {
              '日期': '2019-03-12',
              '订单数': 93,
              '销售额': 955
            },
            {
              '日期': '2019-03-13',
              '订单数': 133,
              '销售额': 1093
            },
            {
              '日期': '2019-03-14',
              '订单数': 101,
              '销售额': 1093
            },
            {
              '日期': '2019-03-15',
              '订单数': 203,
              '销售额': 1993
            },
            {
              '日期': '2019-03-16',
              '订单数': 183,
              '销售额': 1593
            },
            {
              '日期': '2019-03-17',
              '订单数': 101,
              '销售额': 1093
            },
            {
              '日期': '2019-03-18',
              '订单数': 101,
              '销售额': 1093
            },
            {
              '日期': '2019-03-19',
              '订单数': 203,
              '销售额': 2193
            },
            {
              '日期': '2019-03-20',
              '订单数': 193,
              '销售额': 1393
            }
          ]
        }
      }
    }
  }
}
</script>
