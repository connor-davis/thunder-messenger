class MessagingSwarm {
    constructor() {
        this.sessionName = undefined;
        this.swarm = undefined;
        this.peerCount = 0;
        this.connections = [];
    }

    async initialize(sessionName) {
        this.sessionName = sessionName;

        console.log('Creating messaging swarm on - ' + this.sessionName);

        this.swarm = new Hyperswarm();

        this.swarm.on('connection', (connection, information) => {
            this.connections.push(connection);
            this.peerCount = this.peerCount + 1;
        });

        this.topic = Buffer.alloc(32).fill(this.sessionName);
        this.discovery = this.swarm.join(this.topic, {
            server: true,
            client: true,
        });

        await this.discovery.flushed();

        return this.topic;
    }

    async destroy() {
        if (this.swarm) {
            return new Promise(async (resolve, reject) => {
                this.connections.forEach((connection) =>
                    connection.write(JSON.stringify({ type: 'disconnect' }))
                );

                await this.swarm.leave(this.topic);
                await this.discovery.destroy();
                await this.swarm.destroy();

                this.peerCount = 0;

                console.log('Leaving messaging swarm on - ' + this.sessionName);

                resolve(this.peerCount);
            });
        }
    }
}