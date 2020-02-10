import * as convict from 'convict';
import * as debug from 'debug';
import * as fs from 'fs';

// tslint:disable:object-literal-sort-keys
const conf = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'qa', 'stage'],
    default: 'development',
    env: 'NODE_ENV',
  },
  ip: {
    doc: 'The ip address to bind.',
    format: 'ipaddress',
    default: '127.0.0.1',
    env: 'IP_ADDRESS',
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 8000,
    env: 'PORT',
  },
  database: {
    type: {
      doc: 'Database Type',
      format: ['mysql', 'postgres', 'cockroachdb', 'mariadb', 'sqlite'],
      default: 'postgres',
      env: 'TYPEORM_CONNECTION',
    },
    host: {
      doc: 'Host for Database',
      format: '*',
      default: 'localhost',
      env: 'TYPEORM_HOST',
    },
    name: {
      doc: 'Db name',
      format: '*',
      default: null,
      env: 'TYPEORM_DATABASE',
    },
    username: {
      doc: 'user name for db connection',
      format: '*',
      default: null,
      env: 'TYPEORM_USERNAME',
    },
    password: {
      doc: 'password for db connection',
      format: '*',
      default: null,
      env: 'TYPEORM_PASSWORD',
    },
    port: {
      doc: 'port for connection',
      format: 'port',
      default: 5432,
      env: 'TYPEORM_PORT',
    },
    synchronize: {
      format: Boolean,
      default: false,
      env: 'TYPEORM_SYNCHRONIZE',
    },
    logging: {
      format: Boolean,
      default: false,
      env: 'TYPEORM_LOGGING',
    },
    entities: {
      doc: 'typeorm entities config',
      format: String,
      default: 'src/entity/**/*.ts',
      env: 'TYPEORM_ENTITIES',
    },
    migrations: {
      doc: 'typeorm migrations config',
      format: String,
      default: 'src/migration/migrations/**/*.ts',
      env: 'TYPEORM_MIGRATIONS',
    },
    migrationsDir: {
      doc: 'typeorm migrations config',
      format: String,
      default: 'src/migration/migrations/**/*.ts',
      env: 'TYPEORM_MIGRATIONS_DIR',
    },
    subscribers: {
      doc: 'typeorm subscribers config',
      format: String,
      default: 'src/subscriber/**/*.ts',
      env: 'TYPEORM_SUBSCRIBERS',
    },
  },
});

const d = debug('api:conf');
const env = conf.get('env');
try {
  const path = `${__dirname}/env/${env}.json`;

  d('trying to access %s', path);
  fs.accessSync(path, fs.constants.F_OK);

  conf.loadFile(path);
} catch (error) {
  d("file doesn't exist, loading defaults");
}

conf.validate({ allowed: 'strict' });

export default conf;
