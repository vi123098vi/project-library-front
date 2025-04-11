<template>
  <button class="custom-button">
    <div class="bgContainer">
      <!-- 使用插槽接收父组件传入的文本 -->
      <span class="button-text"><slot>Default Button</slot></span>
    </div>
    <div class="arrowContainer">
      <!-- 使用插槽接收父组件传入的SVG -->
      <slot name="icon">
        <!-- 默认箭头SVG -->
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.4697 8.53033C13.1768 8.23744 13.1768 7.76256 13.4697 7.46967C13.7626 7.17678 14.2374 7.17678 14.5303 7.46967L18.5303 11.4697C18.8232 11.7626 18.8232 12.2374 18.5303 12.5303L14.5303 16.5303C14.2374 16.8232 13.7626 16.8232 13.4697 16.5303C13.1768 16.2374 13.1768 15.7626 13.4697 15.4697L16.1893 12.75H6.5C6.08579 12.75 5.75 12.4142 5.75 12C5.75 11.5858 6.08579 11.25 6.5 11.25H16.1893L13.4697 8.53033Z" fill="black"/>
        </svg>
      </slot>
    </div>
  </button>
</template>

<script>
export default {
  name: "ButtonOne",  // 统一使用PascalCase命名
  // 通过props接收自定义颜色
  props: {
    mainColor: {
      type: String,
      default: "yellow"
    },
    hoverColor: {
      type: String,
      default: "pink"
    }
  }
};
</script>

<style scoped>
.custom-button {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em 0em 1em 1em;
  background-color: v-bind(mainColor);
  cursor: pointer;
  box-shadow: 4px 6px 0px black;
  border: 4px solid;
  border-radius: 15px;
  position: relative;
  overflow: hidden;
  transition:
    box-shadow 250ms ease,
    transform 250ms ease,
    filter 50ms ease;
  min-width: 220px;
}

.custom-button:hover {
  transform: translate(2px, 2px);
  box-shadow: 2px 3px 0px black;
}

.custom-button:active {
  filter: saturate(0.75);
}

.custom-button::after {
  content: "";
  position: absolute;
  inset: 0;
  background-color: v-bind(hoverColor);
  z-index: -1;
  transform: translateX(-100%);
  transition: transform 250ms ease;
}

.custom-button:hover::after {
  transform: translateX(0);
}

.bgContainer {
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
  font-size: 1.5em;
  font-weight: 600;
  text-transform: uppercase;
}

.button-text {
  position: relative;
  transform: translateX(-100%);
  transition: transform 250ms ease;
  white-space: nowrap;
}

.custom-button:hover .button-text {
  transform: translateX(0);
}

.arrowContainer {
  flex-shrink: 0;
  padding: 0.8em;
  margin-left: 1em;
  border: 4px solid;
  border-radius: 50%;
  background-color: v-bind(hoverColor);
  position: relative;
  overflow: hidden;
  transition:
    transform 250ms ease,
    background-color 250ms ease;
}

.arrowContainer::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background-color: v-bind(mainColor);
  transform: translateX(-100%);
  transition: transform 250ms ease;
}

.custom-button:hover .arrowContainer::after {
  transform: translateX(0);
}

.custom-button:hover .arrowContainer {
  transform: translateX(5px);
}

.custom-button:active .arrowContainer {
  transform: translateX(8px);
}

svg {
  width: 1.2em;
  height: 1.2em;
  display: block;
}
</style>