<template>
  <table>
    <thead>
      <tr>
        <th></th>
        <th v-for="i in max" :key="i">{{ i }} - {{ i }}</th>
      </tr>
      <tr>
        <th>警戒期間</th>
        <td
          v-for="i in max"
          :key="i"
          :class="getClass(i, 'warn')"
          @click="setValue(i, 'warn')"
          @mouseover="hoverData = { isOn: true, value: i, type: 'warn' }"
        ></td>
      </tr>
    </thead>
    <tbody @mouseleave="hoverData = { isOn: false, value: null, type: null }">
      <tr>
        <th>注意期間</th>
        <td
          v-for="i in max"
          :key="i"
          :class="getClass(i, 'adv')"
          @click="setValue(i, 'adv')"
          @mouseover="hoverData = { isOn: true, value: i, type: 'adv' }"
        ></td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
  import { ref, computed, toRefs } from 'vue';

  /** 選択可能な最大コマ数 */
  const max = ref(8);

  /** 選択されている注意・警戒期間のコマ数 */
  const value = ref({ adv: 1, warn: 1 });
  /** マウスホバー中のコマ情報 */
  const hoverData = ref({ isOn: false, value: null, type: null });

  /**
   * 選択されたコマ数を設定し整合処理を行う。
   * @param {number} val コマ数
   * @param {string} type 注意・警戒の種別
   */
  const setValue = (val, type) => {
    // 注意期間 >= 警戒期間となるように整合
    if (type == 'warn') {
      value.value['warn'] = val;
      value.value['adv'] = Math.max(val, value.value['adv']);
    } else {
      value.value['warn'] = Math.min(val, value.value['warn']);
      value.value['adv'] = val;
    }
  };

  /** マウスホバー中のコマが選択された場合に設定される注意・警戒期間のコマ数 */
  const expectedValue = computed(() => {
    const { isOn, value: hVal, type: hType } = hoverData.value;
    const { adv: advVal, warn: warnVal } = value.value;
    if (isOn) {
      return hType === 'warn'
        ? { adv: Math.max(advVal, hVal), warn: hVal }
        : { adv: hVal, warn: Math.min(hVal, warnVal) };
    } else {
      return { adv: advVal, warn: warnVal };
    }
  });

  /**
   * コマのcssクラスを取得する。
   * @param {number} val コマ数
   * @param {string} type 注意・警戒の種別
   */
  const getClass = (val, type) => {
    const hVal = expectedValue.value[type];
    const cVal = value.value[type];
    const isTransp = (hVal < val && val <= cVal) || (val <= hVal && val > cVal);
    if (val <= Math.max(cVal, hVal)) {
      return isTransp ? `${type}-50` : type;
    } else {
      return 'normal';
    }
  };
</script>

<style lang="scss" scoped>
  table {
    font-size: 1.2em;
    border-spacing: 2px;
    user-select: none;
    background-color: #ffffff;
    border: 1px solid #9e9e9e;
    th {
      padding: 0.1em 0.75em;
      font-weight: normal;
      text-align: center;
      //background-color: #e0e0e0;
    }
    td {
      padding: 0.1em 0.75em;
      cursor: pointer;

      &.adv {
        background-color: #ffd700;
      }
      &.adv-50 {
        background-color: rgba($color: #ffd700, $alpha: 0.5);
      }
      &.warn {
        background-color: #ffc8ff;
      }
      &.warn-50 {
        background-color: rgba($color: #ffc8ff, $alpha: 0.5);
      }
      &.normal {
        background-color: #ffffff;
      }
    }
  }
</style>
