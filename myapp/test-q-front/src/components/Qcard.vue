<template>
  <b-card class="text-center">                            
    <img :src='cardSource' alt="">
    <span class="card-rank">#{{ cardRank }}</span>
    <span class="card-likes">{{ cardLikes }}</span>
    <span class="card-dislikes">-{{ cardDislikes }}</span>    
    <button type="button" class="btn dislike-btn text-center" v-on:click="dislike()">
        <i class="bi bi-hand-thumbs-down"></i>
    </button>
    <button type="button" class="btn like-btn text-center" v-on:click="like()">
        <i class="bi bi-hand-thumbs-up"></i>
    </button>
</b-card>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Qcard',
  props: ['cardSource', 'cardRank', 'cardDislikes', 'cardLikes', 'cardId'],
  data(){
  },
  methods: {
      like() {
        // Call API to increment like
        axios.post('http://localhost:3000/qlist/like', { id: this.cardId })
		.then(response => {
			this.$emit('nextcard');
		})
		.catch(err => {
			console.log(err)
		})
      },
      dislike() {
        // Call API to increment dislike
        axios.post('http://localhost:3000/qlist/dislike', { id: this.cardId })
		.then(response => {
			this.$emit('nextcard');
		})
		.catch(err => {
			console.log(err)
		})
      }
  },
}
</script>
