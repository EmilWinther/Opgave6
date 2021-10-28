const baseUrl = "https://athleteapiexam.azurewebsites.net/api/athletes"

Vue.createApp({
    data() {
        return {
            athletes: [],
            athleteId: null,
            athleteCountry: null,
            singleAthlete: null,
            addData: { name: "", country: "", height: 0 },
            addMessage: "",
            idToDelete: null,
            deleteMessage: ""
        }
    },
    async created() {
        try {
            const response = await axios.get(baseUrl)
            this.athletes = await response.data
            console.log(this.athletes)
        } catch (ex) {
            alert(ex.message)
        }
    },
    methods: {
        async helperGetAndShow(url) {
            try {
                const response = await axios.get(url)
                this.athletes = await response.data
            } catch (ex) {
                alert(ex.message)
            }
        },
        getAllAthletes() {
            this.helperGetAndShow(baseUrl)
        },
        async getAthleteById(id) {
            const url = baseUrl + "/" + id
            try {
                const response = await axios.get(url)
                this.singleAthlete = await response.data
            } catch (ex) {
                alert(ex.message)
            }
        },
        async getAthleteByCountry(country) {
            const url = baseUrl + "/country/" + country
            try {
                const response = await axios.get(url)
                this.singleAthlete = await response.data
            } catch (ex) {
                alert(ex.message)
            }
        },
        async addAthlete() {
            console.log(this.addData)
            try {
                response = await axios.post(baseUrl, this.addData)
                this.addMessage = "response " + response.status + " " + response.statusText
                this.getAllAthletes()
            } catch (ex) {
                alert(ex.message)
            }
        },
        async deleteAthleteById(idToDelete) {
            const url = baseUrl + "/" + idToDelete
            try {
                response = await axios.delete(url)
                this.deleteMessage = response.status + " " + response.statusText
                this.getAllAthletes()
            } catch (ex) {
                alert(ex.message)
            }
        }
    }
}).mount("#app")