/* eslint-disable import/no-extraneous-dependencies */
import { faker } from '@faker-js/faker';
import { factory, primaryKey } from '@mswjs/data';

const db = factory({
  message: {
    id: primaryKey(faker.datatype.uuid),
    title: faker.random.words,
    content: faker.random.words,
    hideByView: faker.datatype.boolean,
    limit: faker.datatype.number,
    status: () => faker.helpers.arrayElement(['ready', 'ongoing', 'done'])
  }
});

const createArrayOfObjects = (limit: number, create: any) => {
  for (let i = 1; i <= limit; i += 1) {
    create();
  }
};

createArrayOfObjects(5, db.message.create);

export default db;
