<script setup>
  // import SimpleCounter from './components/SimpleCounter.vue'; 
  // import CreateTask from './components/ManageTask.vue';
  import InbowView from './components/InbowView.vue'
</script>

<template>
  <div id="app" class="flex flex-col gap-3 justify-center">
    <!-- <h1 class="text-3xl font-bold flex justify-start">Taskly</h1>  -->
    <InbowView />
  </div>
</template>

<style>
#app {
  font-family: Arial, sans-serif;
  text-align: center;
  margin-top: 4rem;
}
</style>
