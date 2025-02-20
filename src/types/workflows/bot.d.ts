export interface IBotStore {
    bots: any[] | [];
    inboundBots: any[] | [];
    outboundBots: any[] | [];
    getBots: () => Promise<any[]>;
    deleteBot: (id: string) => Promise<any>;
    getInboundBots: () => Promise<any[]>;
    getOutboundBots: () => Promise<any[]>;
}