<template>
  <div class="font32 custom-header main-bg normal-border-color">
    <img src="/static/images/header/arrow_left.svg" alt="返回按钮" class="back" v-if="backBol" @click="back">
    <h1 class="font32">{{title}}</h1>
    <img :src="elseSrc" alt="" class="else-fun" v-if="funBol" @click="help">
    <div class="list white-color" v-if="!directRoute">
      <transition name="fade">
        <div v-if="show">
          <ul v-if="listData.length > 1">
            <li v-for="item in listData" :key="item.id">
              <div class="font32 item-title">{{item.title}}</div>
              <ul>
                <li v-for="zitem in item.children" :key="zitem.id" class="item-style">
                  <router-link :to="{path: zitem.to}" class="font32 white-color">{{zitem.title}}</router-link>
                </li>
              </ul>
            </li>
          </ul>
          <ul v-else>
            <li v-for="item in listData[0].children" :key="item.id" class="item-style">
              <router-link :to="{path: item.to}" class="font32 white-color">{{item.title}}</router-link>
            </li>
          </ul>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      show: false
    }
  },
  props: {
    // 是否有返回键
    backBol: {
      default: false
    },
    // 顶部右侧图标的图片路径
    elseSrc: String,
    // 是否出现顶部右侧图标
    funBol: {
      default: false,
    },
    // 当顶部右侧图标点击效果为出现列表时，需要传入listdata数据 数据格式在底部
    listData: {
      type: Array,
      default: function () {
        return [];
      }
    },
    // 顶部标题
    title: String,
    // 顶部右侧图标点击时直接跳转的路径
    directRoute: String,
    backUrl: String
  },
  methods: {
    back () {
      if (this.backUrl) {
        this.$router.push(this.backUrl);
      } else {
        this.$router.back(-1);
      }
    },
    help () {
      if(this.directRoute) {
        this.$router.push(this.directRoute);
      } else {
        // 做动画
        this.show = !this.show;
      }
    }
  }
}
</script>
<style scoped>
  .custom-header{
    position: fixed;
    height: 24px;
    line-height: 24px;
    width: 100vw;
    text-align: center;
    top: 0;
    padding-top: 10px;
    padding-bottom: 10px;
    z-index: 1001;
    border-bottom-width: 1px;
    border-bottom-style: solid;
  }
  .back, .else-fun{
    position: absolute;
    height: 20px;
    top: 2px;
    cursor: pointer;
    padding: 10px;
  }
  .back{
    left: 0;
  }
  .else-fun{
    right: 0;
  }
  .list{
    position: absolute;
    top: 40px;
    right: 10px;
    z-index: 100002;
  }
  .list > div {
    position: relative;
  }
  .list > div::before{
    position: absolute;
    content: '';
    border-width: 5px;
    border-color: transparent transparent rgba(0, 0, 0, .7);
    border-style: solid;
    top: -10px;
    right: 8px;
  }
  .list > div > ul{
    background-color: #333;
    border-radius: 5px;
    width: 150px;
    padding: 0 10px;
  }
  .list > div > ul div.item-title{
    background-color: rgba(255, 255, 255, .15);
    text-align: left;
    padding-left: 5px;
    height: 20px;
    line-height: 20px;
    margin-top: 5px;
  }
  .list > div > ul li.item-style{
    border-bottom: 1px solid rgba(255, 255, 255, .2);
    letter-spacing: 2px;
    height: 50px;
    line-height: 50px;
  }
  .list > div > ul li.item-style:nth-last-child(1) {
    border-bottom: none;
  }
  .fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>

// 数据类型
      // listData: [
      //   {
      //     id: 1,
      //     title: "订单状态",
      //     children: [
      //       {
      //         id: 1,
      //         title: '常见问题',
      //         to: '/'
      //       },
      //       {
      //         id: 2,
      //         title: '提现记录',
      //         to: '/'
      //       }
      //     ]
      //   },
      //   {
      //     id: 2,
      //     title: "交易类型",
      //     children: [
      //       {
      //         id: 1,
      //         title: '常见问题',
      //         to: '/'
      //       },
      //       {
      //         id: 2,
      //         title: '提现记录',
      //         to: '/'
      //       }
      //     ]
      //   }
      // ]
