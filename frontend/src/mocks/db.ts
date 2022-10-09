/* eslint-disable import/no-extraneous-dependencies */
import { faker } from '@faker-js/faker';
import { factory, primaryKey, oneOf } from '@mswjs/data';

const db = factory({
  user: {
    id: primaryKey(faker.datatype.uuid),
    username: faker.name.firstName,
    image: faker.image.avatar
  },
  message: {
    id: primaryKey(faker.datatype.uuid),
    title: faker.random.words,
    content: faker.random.words,
    hideByView: faker.datatype.boolean,
    limit: faker.datatype.number,
    status: () => faker.helpers.arrayElement(['ready', 'ongoing', 'done']),
    user: oneOf('user')
  }
});

const createArrayOfObjects = (limit: number, create: any) => {
  for (let i = 1; i <= limit; i += 1) {
    create();
  }
};

const simUser = db.user.create({
  id: 'a1d6baac-47da-11ed-b878-0242ac120002',
  username: 'johnmek'
});

const createRandomMessages = () => {
  db.message.create({
    user: db.user.create()
  });
}

const createMessagesBySimUser = () => {
  db.message.create({
    user: simUser
  });
}

createArrayOfObjects(5, createRandomMessages);

createArrayOfObjects(5, createMessagesBySimUser);

export default db;
