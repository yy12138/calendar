<template>
  <div>
    <CHeader title="起止日期" backBol="true"></CHeader>
    <div class="content-body has-header main-bg">
      <div>
        <mt-loadmore :top-method="loadTop">
          <div v-for="(item, index) in loadCalendar" :key="index" v-if="loadCalendar.length">
            <Calendar @ensureStartOrEnd="ensureStartOrEnd" :selectedStart="selectedStart" :selectedEnd="selectedEnd" :date="item.date"></Calendar>
          </div>
          <Calendar :date="preDate" @ensureStartOrEnd="ensureStartOrEnd" :selectedStart="selectedStart" :selectedEnd="selectedEnd"></Calendar>
          <Calendar :date="date" @ensureStartOrEnd="ensureStartOrEnd" :selectedStart="selectedStart" :selectedEnd="selectedEnd"></Calendar>
        </mt-loadmore>
      </div>
    </div>
  </div>

</template>
<script>
import CHeader from '@/components/common/IHeader.vue'
import Calendar from '@/components/common/calendar.vue'
export default {
  data () {
    return {
      date: new Date(),
      selectedStart: 0,
      selectedEnd: 0,
      loadCalendar: []
    }
  },
  components: {
    CHeader,
    Calendar
  },
  computed: {
    preDate () {
      // 判断date是否为1月
      if (this.date.getMonth() + 1 === 1) {
        return new Date(this.date.getFullYear() - 1, 11, 1);
      } else {
        return new Date(this.date.getFullYear(), this.date.getMonth() - 1, 1);
      }
    }
  },
  methods: {
    ensureStartOrEnd (data) {
      if (this.selectedStart && !this.selectedEnd){
        this.judgeStartEnd(data);
      } else {
        // 没有选中一个起止日期 或者有起止日期 重新定义一个开始日期
        this.selectedStart = new Date(data.year, data.month - 1, data.date);
        this.selectedEnd = 0;
      }
    },
    judgeStartEnd (data) {
      // 确定终点日期
      if (this.selectedStart.getFullYear() === data.year) {
        if (this.selectedStart.getMonth() + 1 === data.month) {
          // 同年同月
          if (this.selectedStart.getDate() < data.date) {
            // console.log("同年同月 起点日期小于终点日期");
            this.selectedEnd = new Date(data.year, data.month - 1, data.date);
          } else {
            // 同一年同一月中 起点日期大于终点日期， 起止日期交换
            // console.log("同年同月 起点日期大于终点日期");
            this.selectedEnd = this.selectedStart;
            this.selectedStart = new Date(data.year, data.month - 1, data.date);
          }
        } else {
          // 同年不同月
            // console.log("同年不同月");
          if (this.selectedStart.getMonth() + 1 > data.month) {
            // 起点月 > 终点月 起止交换
            // console.log("同年不同月 起点月大于终点月");
            this.selectedEnd = this.selectedStart;
            this.selectedStart = new Date(data.year, data.month - 1, data.date);
          } else {
            // console.log("同年不同月 起点月小于终点月");
            // 起点月 < 终点月
            this.selectedEnd = new Date(data.year, data.month - 1, data.date);
          }
        }
      } else {
        // 不为同年 有起点日期
        if (this.selectedStart.getFullYear() > data.year) {
          // 起点year > 终点 year 互换
          this.selectedEnd = this.selectedStart;
          this.selectedStart = new Date(data.year, data.month - 1, data.date);
        } else {
          this.selectedEnd = new Date(data.year, data.month - 1, data.date);
        }
      }
    },
    loadTop () {
      // 加载更多日历
      var date;
      if (this.loadCalendar.length) {
        date = this.createPreDate(this.loadCalendar[0].date);
      } else {
        date = this.createPreDate(this.preDate);
      }
      let dateObj = {date: date};
      this.loadCalendar.unshift(dateObj);
    },
    createPreDate (date) {
      // 创建上一个月的日期
      if (date.getMonth() + 1 === 1) {
        return new Date(date.getFullYear() - 1, 11, 1);
      } else {
        return new Date(date.getFullYear(), date.getMonth() - 1, 1);
      }
    }
  }
}
</script>
<style scoped>
  .content-body > div{
    overflow-y: scroll;
    overflow-x: hidden;
    width: 100%;
    height: 100%;
  }
</style>
