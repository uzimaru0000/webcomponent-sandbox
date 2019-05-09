<template>
  <div>
    <div class="border" :class="{ isDark }">
      <div>This is Vue.js</div>
      <div>
        <button class="button">
          <span>ClickMe!</span>
          <ripple-effect></ripple-effect>
        </button>
      </div>
      <div>
        <x-input
          type="email"
          placeholder="email"
          :value="email"
          @input="email = $event.target.value"
          :class="{'isDark-input': isDark}"
        ></x-input>
      </div>
      <div>
        <x-input
          type="password"
          placeholder="password"
          :value="password"
          @input="password = $event.target.value"
          :class="{'isDark-input': isDark}"
        ></x-input>
      </div>
      <div>
        <x-toggle @change="isDark = !isDark"></x-toggle>
      </div>
      <div>
        <div>{{email}}</div>
        <div>{{password}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      isDark: false
    };
  }
};
</script>

<style scoped>
.border {
  border: 5px solid #50b47f;
}

.isDark {
  background: #333;
  color: white;
}

.isDark-input {
  --color: white;
}
</style>

