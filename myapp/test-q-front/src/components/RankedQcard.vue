<template>
    <b-card class="text-center">                            
        <img :src='cardSource' alt="">
        <span class="card-rank">#{{ cardRank }}</span>
        <span class="card-likes">{{ cardLikes }}</span>
        <span class="card-dislikes">{{ cardDislikes }}</span>
    </b-card>
</template>

<script>
export default {
    name: 'RankedQcard',
    props: ['cardSource', 'cardRank', 'cardDislikes', 'cardLikes', 'cardId'],
    data(){
    }
}
</script>

<style scoped>
</style>