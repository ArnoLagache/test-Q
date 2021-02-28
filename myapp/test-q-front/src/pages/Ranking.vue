<template>  
	<b-container fluid="sm">
		<b-row class="text-center">
			<b-col>
				<header>
					<b-navbar-brand tag="h1" class="mb-0">{{ Rankingtitle }}</b-navbar-brand>
					<p>{{ RankingIntro }}</p>
				</header>
			</b-col>
		</b-row>

		<b-row class="text-center justify-content-md-center">
			<b-col cols="12">
				<b-card-group deck>
					<b-row class="text-center justify-content-md-center">
						<b-col cols="6" md="3" v-for="rankedCard in rankedCards" :key="rankedCard">
							<RankedQcard :cardSource='rankedCard.source' :cardRank='rankedCard.rank' :cardLikes='rankedCard.likes' :cardDislikes='rankedCard.dislikes' :cardId='rankedCard.id' ></RankedQcard>
						</b-col>
					</b-row>
				</b-card-group>				
			</b-col>
		</b-row>

		<b-row class="text-center justify-content-md-center mt-2">
			<b-col sm="12">
				<router-link to="/" class="btn">Je veux voter !</router-link>
			</b-col>
		</b-row>

		<b-row class="text-center justify-content-md-center mt-4">
			<b-col sm="12">
				<img src="@/assets/Logo_Quincaillerie.png">			
			</b-col>
		</b-row>
	</b-container>
</template>

<script>
import axios from 'axios';
import RankedQcard from '../components/RankedQcard';
export default {
    name: 'Ranking',
    components: {
      RankedQcard
    },
    data() {
        return {
            Rankingtitle: 'Le classement des meilleurs Q ',            
            RankingIntro: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
			rankedCards: []
		}
    },
	methods: {
		getRank: function(){
			axios.get('http://localhost:3000/qlist/')
			.then(response => {
				if(response !== undefined && response.data !== undefined) {
					this.rankedCards = response.data;
					console.log(this.rankedCards)
				}
			})
			.catch(err => {
				console.log(err)
			})
		}
	},
	mounted() {
		this.getRank();
	}
}
</script>

<style>
</style>