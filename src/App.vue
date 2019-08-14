<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
    </div>
    <router-view/>
  </div>
</template>

<style lang="less">
html,body{
    height: 100%;
    margin: 0;
    padding: 0;
}
#app{
    height: 100%;
    .home{
      text-align: center;
    }
}
</style>
