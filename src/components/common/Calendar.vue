<template>
  <div class="calendar normal-padding font28">
    <div class="rise-color month font32 normal-margin">{{year}}{{monthText}}</div>
    <ul>
      <li>日</li>
      <li>一</li>
      <li>二</li>
      <li>三</li>
      <li>四</li>
      <li>五</li>
      <li>六</li>
    </ul>
    <ul>
      <li v-for="(item, index) in weeks" :key="index + new Date()"></li>
      <li v-for="(item,index) in days" :key="index" :class="{'selected': item == start || item == end, 'section': item > start && item < end, 'normal-margin': true, 'has-start': end > start && item == start, 'has-end': end > start && item == end}" @click="$emit('ensureStartOrEnd', {date: item, year: year, month: month})" ><span>{{item}}</span></li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    date: '',
    selectedStart: 0,
    // 在同月 有selectedEnd
    //应为一个日期
    selectedEnd: 0
  },
  data () {
    return {

    }
  },
  computed: {
    month () {
      return this.date.getMonth() + 1;
    },
    year () {
      return this.date.getFullYear();
    },
    days () {
      let year = this.date.getFullYear();
      return this.judgeMonthDay(year, this.month);
    },
    weeks () {
      // 当前月的1号是星期几
      let date = new Date(this.date.getFullYear(),this.month - 1,1);
      return date.getDay();
    },
    start () {
      if (this.selectedStart) {
        if (this.selectedStart.getFullYear() === this.year) {
          if (this.selectedStart.getMonth() + 1 !== this.month) {
            return 0;
          } else {
            return this.selectedStart.getDate();
          }
        } else {
          // 不为同年
          return 0;
        }
      } else {
        return 0;
      }
    },
    end () {
      if (this.selectedEnd) {
        var startYear = this.selectedStart.getFullYear();
        var endYear = this.selectedEnd.getFullYear();
        var startMonth = this.selectedStart.getMonth() + 1;
        var endMonth = this.selectedEnd.getMonth() + 1;
        if (this.year > startYear && this.year < endYear) {
          // 在起止年份中间 每个月份都被填充
          return this.days + 1;
        } else if (this.year === startYear && this.year !== endYear) {
          // 当前年份为起始年份并且不为终止年份
          if (this.month >= startMonth) {
            // 当前月大于等于 起始月 则当前月从start开始填充填充到月末
            return this.days + 1;
          } else {
            // 小于则不填充
            return 0
          }
        } else if (this.year === endYear && this.year !== startYear) {
          // 当前年份为终止年份并且不为起始年份
          if (this.month < endMonth) {
            // 当前月小于终止月 则当前月从start开始填充填充到月末
            return this.days + 1;
          } else if (this.month === endMonth) {
            // 当前月等于终止月 则当前月从start开始填充填充到终止日期
            return this.selectedEnd.getDate();
          } else {
            // 大于则不填充
            return 0;
          }
        } else if (this.year === startYear && this.year === endYear) {
          // 当前年份为终止年份并且为起始年份
          if (this.month > startMonth && this.month < endMonth) {
            // 当前月小于终止月并且大约起始月 则当前月从start开始填充填充到月末
            return this.days + 1;
          } else if (this.month === startMonth && this.month !== endMonth) {
            // 当前月等于起始月并且不等于终止月 则当前月从start开始填充填充到月末
            return this.days + 1;
          } else if (this.month === endMonth && this.month !== startMonth) {
             // 当前月等于起始月并且不等于终止月 则当前月从start开始填充终止日期
            return this.selectedEnd.getDate();
          } else if (this.month === startMonth && this.month === endMonth) {
            // 当前月等于起始月并且等于终止月 则当前月从start开始填充终止日期
            return this.selectedEnd.getDate();
          } else {
            return 0;
          }
        } else {
          return 0;
        }
      } else {
        return 0;
      }
    },
    day () {
      return this.date.getDate();
    },
    monthText () {
      return this.transferMonth(this.month);
    }
  },
  mounted () {

  },
  methods: {
    // 判断是否为闰年
    judgeYear (year) {
      if ((year % 4 === 0 && year % 100 !== 0) || (year % 100 === 0 && year % 400 === 0)) {
        return true;//是闰年 二月29天
      } else {
        return false;//不是闰年 二月28天
      }
    },
    // 判断每个月的天数
    judgeMonthDay (year, Month) {
      switch (Month) {
        case 1:
          return 31;
        case 2:
          return this.judgeYear(year) ? 29 : 28;
        case 3:
          return 31;
        case 4:
          return 30;
        case 5:
          return 31;
        case 6:
          return 30;
        case 7:
          return 31;
        case 8:
          return 31;
        case 9:
          return 30;
        case 10:
          return 31;
        case 11:
          return 30;
        case 12:
          return 31;
      }
    },
    // 转换每个月份为文本
    transferMonth (month) {
      switch (month) {
        case 1:
          return '一月';
        case 2:
          return '二月';
        case 3:
          return '三月';
        case 4:
          return '四月';
        case 5:
          return '五月';
        case 6:
          return '六月';
        case 7:
          return '七月';
        case 8:
          return '八月';
        case 9:
          return '九月';
        case 10:
          return '十月';
        case 11:
          return '十一月';
        case 12:
          return '十二月';
      }
    }
  }
}
</script>
<style scoped>
  .calendar{

  }
  .calendar > div.month{
    text-align: left;
  }
  .calendar > ul{
    display: flex;
    flex-wrap: wrap;
  }
  .calendar > ul > li{
    width: 14.2%;
    margin-bottom: 15px;
    height: 30px;
    line-height: 30px;
    position: relative;
  }
  .calendar > ul > li.section{
    background: #ffc2c3;
  }
  .calendar > ul > li.selected{
    color: #fff;
  }
  .calendar > ul > li.selected > span{
    position: absolute;
    width: 30px;
    height: 30px;
    background-color: #ff787b;
    border-radius: 50%;
    left: 50%;
    margin-left: -15px;
    z-index: 3;
  }
  .calendar > ul > li.has-start:after{
    position: absolute;
    width: 50%;
    height: 100%;
    right: 0;
    top: 0;
    background-color: #ffc2c3;
    content: '';
  }
  .calendar > ul > li.has-end:after{
    position: absolute;
    width: 50%;
    height: 100%;
    left: 0;
    top: 0;
    background-color: #ffc2c3;
    content: '';
  }
</style>
