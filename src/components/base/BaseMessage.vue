<script setup>
import { defineProps } from 'vue'
defineProps({
    dataRole: {
        type: String,
        required: false,
        default: 'info'
    }
})
</script>

<template>
    <div>
        <p :class="dataRole">
            <slot></slot>
        </p>
    </div>
</template>

<style scoped>
p {
    padding: 0.5rem;
}

.info {
    background-color: #2196F3;
    color: #fff;
}

.warning {
    background-color: #FFC107;
    color: #000;
}

.error {
    background-color: #F44336;
    color: #fff;
}

.success {
    background-color: #4CAF50;
    color: #fff;
}
</style>