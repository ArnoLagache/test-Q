<template>
	<b-container fluid="sm">
		<b-row class="text-center">
			<b-col>
				<header>
					<b-navbar-brand tag="h1" class="mb-0">{{ title }}<u>{{ titleEnd }}</u></b-navbar-brand>
					<p>{{ siteIntro }}</p>
				</header>
			</b-col>
		</b-row>

		<b-row class="text-center justify-content-md-center">
			<b-col cols="12" md="4">
				<Qcard :cardSource='currentCard.source' :cardRank='currentCard.rank' :cardLikes='currentCard.likes' :cardDislikes='currentCard.dislikes' :cardId='currentCard.id'  v-on:nextcard="nextCard()"></Qcard>                
			</b-col>
		</b-row>

		<b-row class="text-center justify-content-md-center mt-2">
			<b-col cols="12">
				<a :href="mail" class="btn"><i class="bi bi-envelope"></i>Envoyez nous votre Q à {{ mailAdress }}</a>
			</b-col>
		</b-row>

		<b-row class="text-center justify-content-md-center mt-4">
			<b-col cols="12">
				<router-link to="/ranking" class="btn">Le classement qui pue pas du Q</router-link>
			</b-col>
		</b-row>

		<b-row class="text-center justify-content-md-center mt-4">
			<b-col cols="12">
				<img src="@/assets/Logo_Quincaillerie.png">
			</b-col>
		</b-row>
	</b-container>
</template>

<script>
import axios from 'axios';
import Qcard from '../components/Qcard';
export default {
  name: 'Home',
  components: {
	Qcard
  },
  data() {
	return {
	  title: 'Le meilleur site de Q ',
	  titleEnd: 'du monde !',
	  siteIntro: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
	  mailAdress: 'tulasvumonq@sitedeq.fr',	  
	  currentCard: {}
	}
  },
  methods: {
	  nextCard: function(){
		axios.get('http://localhost:3000/qlist/random')
		.then(response => {
			if(response !== undefined && response.data !== undefined) {
				this.currentCard = response.data;
			}
		})
		.catch(err => {
			console.log(err)
		})
	  }
  },
  computed: {
	mail: function(){
	  return 'mailto:' + this.mailAdress
	}
  },
  mounted() {
	  this.nextCard();
  }
}
</script>

<style scoped>
</style>
