const winston = require('winston');

// Le niveau définira ce qui sera affiché
const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
}

// Detemine le niveau debug ou warn
const level = () => {
    const env = process.env.DEBUG || 'development'
    const isDevelopment = env === 'development'
    return isDevelopment ? 'debug' : 'warn'
}

// Couleurs choisies pour chaque élément
const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
} 

winston.addColors(colors)

// Type de format, vous pouvez le modifier
const format = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms'}),
    winston.format.colorize({ all: true }),
    winston.format.printf(
        (info) => `${info.timestamp} [${info.level}] ${info.message}`,
    ),
);

const transports = [
    new winston.transports.Console(),
    new winston.transports.File({
        filename: 'logs/error.log',
        level: 'error'
    }),
    new winston.transports.File({ filename: 'logs/all.log' }),
]

const logger = winston.createLogger({
    level: level(),
    levels,
    format,
    transports,
})

module.exports = logger