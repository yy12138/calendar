<template>
  <div class="security-code-wrap">
    <label for="code">
      <ul class="security-code-container">
        <li class="field-wrap normal-border" v-for="(item, index) in number" :key="index">
          <i class="char-field font40">{{value[index] || placeholder}}</i>
        </li>
      </ul>
    </label>
    <input ref="input" class="input-code" @keyup="handleInput($event)" v-model="value"
           id="code" name="code" type="tel" :maxlength="number"
           autocorrect="off" autocomplete="off" autocapitalize="off">
  </div>
</template>

<script>
  export default {
    name: 'SecurityCode',
    // component properties
    props: {
      number: {
        type: Number,
        default: 4
      },
      placeholder: {
        type: String,
        default: ''
      }
    },
    // variables
    data() {
      return {
        value: ''
      }
    },
    methods: {
      hideKeyboard() {
        // 输入完成隐藏键盘
        document.activeElement.blur() // ios隐藏键盘
        this.$refs.input.blur() // android隐藏键盘
      },
      handleSubmit() {
        this.$emit('input', this.value)
      },
      handleInput(e) {
        this.$refs.input.value = this.value
        if (this.value.length >= this.number) {
          this.hideKeyboard()
        }
        this.handleSubmit()
      }
    }
  }
</script>

<style scoped>
  .security-code-wrap {
    overflow: hidden;
  }
  .security-code-container {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: left;
  }
  .security-code-container  .field-wrap {
    list-style: none;
    display: block;
    width: 40px;
    height: 50px;
    line-height: 50px;
    background-color: #fff;
    margin: 2px 35px 2px 0;
    color: #000;
    text-align: center;
    /* border: 1px solid #d9d9d9; */
    border-radius: 4px;
  }
  .security-code-container  .field-wrap:nth-child(1) {
    margin: 2px 35px 2px 0;
  }
  .security-code-container  .field-wrap:nth-last-child(1) {
    margin: 2px 0 2px 0;
  }
  .input-code {
    position: absolute;
    left: -9999px;
    top: -99999px;
    width: 0;
    height: 0;
    opacity: 0;
    overflow: visible;
    z-index: -1;
  }
  .security-code-container .field-wrap .char-field {
     font-style: normal;
  }

</style>
