<script setup>
const props = defineProps({
  label: String,
  onClick: Function,
  link: String,
});

const handleClick = () => {
  if (props.onClick) {
    props.onClick();  // Kald den funktion, der er sendt som prop
  }
};
</script>

<template>
    <button
      v-if="!link"
      class="button"
      @click="handleClick"
    >
      {{ label }}
    </button>
    <a v-else :href="link" class="button">{{ label }}</a>
  </template>

<style scoped>
.theButton, .button {
  display: inline-block;
  font-family: var(--PoppinsFont);
  padding: 10px 20px;
  width: fit-content;
  color: white;
  background-color: var(--FocusOrange);
  border: 2px solid var(--FocusOrange);
  text-align: center;
  text-decoration: none;
  border-radius: 12px;
  text-transform: uppercase;
  font-weight: 500;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.theButton:hover, .button:hover {
text-decoration: underline;
}

.theButton:active, .button:active {
    box-shadow: inset 0 -2px 7px rgba(0, 0, 0, 0.25), inset 0 4px 7px rgba(0, 0, 0, 0.25);
    text-decoration: none;
}


</style>
