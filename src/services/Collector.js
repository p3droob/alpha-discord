const { Collector } = require('discord.js');
Object.defineProperties(Collector.prototype, {
    'handleCollect': {//cooldown
        value: async function handleCollect(...args) {
            const collect = this.collect(...args);

            if(collect && (await this.filter(...args, this.collected))) {
                if(this.cooldown) return;
                
                this.cooldown = true;
                
                setTimeout(() => {
                    this.cooldown = false
                }, this.options.cooldown || 1500);
                
                this.collected.set(collect, args[0]);
                
                this.emit('collect', ...args);
                
                if(this._idletimeout) {
                    this.client.clearTimeout(this._idletimeout);
                    this._idletimeout = this.client.setTimeout(() => this.stop('idle'), this.options.idle);
                }
            }
            
            this.checkEnd();
        }
    }
})