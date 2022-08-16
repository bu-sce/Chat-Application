// Cross Origin Resource Sharing
const whitelist = ['https://www.yoursite.com', 'http://localhost:3000', 'http://localhost:9090' , 'https://tele-chat.vercel.app' , 'https://tele-chat-api.herokuapp.com'];
const corsOptions = {
    origin: (origin : any, callback : any) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}


module.exports = corsOptions;