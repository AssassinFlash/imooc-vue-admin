<template>
  <div class="app-wrapper">
    <!-- 左侧 Menu -->
    <Sidebar
      class="sidebar-container"
      :style="{ backgroundColor: variables.menuBg }"
    />

    <!-- 右侧内容 -->
    <div class="main-container">
      <div class="fixed-header">
        <!-- 顶部 navbar -->
        <Navbar />
      </div>

      <!-- 内容区 -->
      <AppMain />
    </div>
  </div>
</template>

<script setup>
import Navbar from './components/Navbar'
import Sidebar from './components/SideBar'
import AppMain from './components/AppMain'
import variables from '@/styles/variables.scss'
</script>

<style lang="scss" scoped>
@import '~@/styles/variables.scss';
@import '~@/styles/mixin.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  width: 100%;
  height: 100%;

  .fixed-header {
    position: fixed;
    width: calc(100% - #{$sideBarWidth});
    top: 0;
    right: 0;
    z-index: 9;
    transition: width #{$sidebarDuration} ease;
  }

  &.hideSidebar {
    .fixed-header {
      width: calc(100% - #{$hideSideBarWidth});
    }
  }
}
</style>
