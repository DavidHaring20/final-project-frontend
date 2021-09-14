<template>
    <div class="flex">
        <div v-if="type === 'CategoryArrows'" class="pr-6 self-center">
            <div v-if="index !== 0" @click="emitDecrementCategoryPosition" class="cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z" />
                </svg>
            </div>

            <div v-if="index !== numberOfCategories - 1" @click="emitIncrementCategoryPosition" class="cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z" />
                </svg>
            </div>
        </div>

        <div v-else class="pr-4">
            <div v-if="index !== 0" class="cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z" />
                </svg>
            </div>

            <div v-if="index !== numberOfSubcategories - 1" class="cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z" />
                </svg>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Arrows',

    props: {
        index: Number,
        numberOfCategories: Number,
        numberOfSubcategories: Number,
        type: String
    },

    methods: {
        emitDecrementCategoryPosition() {
            this.$emit('decrement-category-position');
        },

        emitIncrementCategoryPosition() {
            this.$emit('increment-category-position');
        }
    }
}
</script>