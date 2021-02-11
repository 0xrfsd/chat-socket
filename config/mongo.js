import mongoose, { mongo } from 'mongoose';
import config from './index.js';

const CONNECTION_URL = `mongodb://${config.db.url}/${config.db.name}`

mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
    console.log('Mongo has connected succcesfully')
})

mongoose.connection.on('reconnected', () => {
    console.log('Mongo has reconneceted')
})

mongoose.connection.on('error', () => {
    console.log('Mongo has an error', error)
    mongoose.disconnect()
})

mongoose.connection.on('disconnected', () => {
    console.log('Mongo connection is disconnected')
})