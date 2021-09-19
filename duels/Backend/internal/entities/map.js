const api = require('axios').default;

module.exports = class Map { // represents a game map
    name = ''; // map's display name
    description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit';
    word_group = 1;
    word_count = 10;

    mode = 'single'; // 'single' or 'pvp'
    minigame = 'word-trans'; // 
    
    constructor(options) {
        Object.assign(this, options);
        if (this.mode === 'single') {
            this.max_players = 1;
        }
        else if (this.mode === 'pvp') {
            this.max_players = 2;
            this.minigame = 'duels';
        }

        this.api_url = `/tasks/${this.minigame}`;
        if (this.minigame === 'word-trans' || this.minigame === 'trans-word') {
            this.api_url += '/' + this.word_group;
        }
        this.api_url += '/' + this.word_count;
    }

    async getTasks() {
        // var tasks = await new Promise(function(resolve, reject) {
        //     setTimeout(function() {
        //         resolve([
        //             {
        //                 items: [
        //                     {
        //                         original_word: 'алма',
        //                         russian_word: 'яблоко'
        //                     },
        //                     {
        //                         original_word: 'татарча',
        //                         russian_word: 'татарский'
        //                     }
        //                 ],
        //                 correct: 1
        //             }
        //         ])
        //     }, 1000);
        // });
        return await api.get(this.api_url).then(function(response) {
            return response.data;
        }).catch(function(err) {
            console.error('Error while polling the API:' + err);
        });

        // var map = this;
        // tasks = tasks.map((task) => {
        //     let new_task = {};

        //     new_task.correct = task.correct;
        //     switch(map.minigame)
        //     {
        //         case 'duels':
        //             new_task.question = 'Выбери правильный ответ :p';
        //             new_task.answers = task.items.map((item) => item.russian_word);
        //             break;
        //         case 'word-trans':
        //             new_task.answers = task.items.map((item) => item.russian_word);
        //             break
        //         case 'trans-word':
        //             new_task.answers = task.items.map((item) => item.original_word);
        //             break;
        //     }

        //     return new_task;
        // });

        return tasks;

        // return await api.get(`/tasks/${this.minigame}/${this.word_group}/${this.word_count}`)
        //     .then((response) => {
        //         return response.data;
        //     })
        //     .catch((err) => {
        //         console.error('Error while fetching tasks:' + err);
        //         return [];
        //     });
    }
}