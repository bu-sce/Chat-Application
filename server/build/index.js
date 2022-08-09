"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config/config");
const Logging_1 = __importDefault(require("./library/Logging"));
const Logger_1 = __importDefault(require("./middleware/Logger"));
const apiRules_1 = __importDefault(require("./middleware/apiRules"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
// const corsOptions = require('./config/coreOption')
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const app = (0, express_1.default)();
/** Connect to Mongo */
mongoose_1.default
    .connect(config_1.config.mongo.url, {
    retryWrites: true,
    w: 'majority',
})
    .then(() => {
    Logging_1.default.info('MongoDB connected successfully.');
    StartServer();
})
    .catch((error) => Logging_1.default.error(error));
/** Only Start Server if Mongoose Connects */
const StartServer = () => {
    /** Log the request */
    app.use(Logger_1.default);
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(express_1.default.json());
    /** Rules of our API */
    //app.use(cors(corsOptions));
    app.use(apiRules_1.default);
    /** Routes */
    app.use("/api/auth", userRoute_1.default);
    /** Healthcheck */
    /** Error handling */
    app.use(errorHandler_1.default);
    app.listen(config_1.config.server.port, () => Logging_1.default.info(`Server is running on port ${config_1.config.server.port}`));
};
