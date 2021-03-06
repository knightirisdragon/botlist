import { Client } from 'discord.js';
import config from '../config.json';
import mongoose from 'mongoose';
import Deps from './utils/deps';

import EventsService from './services/events.service';
import { API } from './api/server';
import Log from './utils/log';

export const bot = new Client();

bot.login(process.env.token);

Deps.get<EventsService>(EventsService).init();
Deps.build(API);

mongoose.connect(config.mongoURL, { 
    useUnifiedTopology: true, 
    useNewUrlParser: true, 
    useFindAndModify: false 
}, (error) => error
    ? Log.error('Failed to connect to index-botlist', 'bot')
    : Log.info('Connected to index-botlist', 'bot'));

setInterval(() => require('node-fetch')('https://index-botlist.glitch.me/'), 5 * 60 * 1000);