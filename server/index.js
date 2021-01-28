const faker = require('faker')

module.exports = () => {
    const data = { messages: [] }
    const NBMAX= 100;
  for (let i = 1; i <= NBMAX; i++) {
    const random = Math.ceil(Math.random() * NBMAX)
    const parentId = i % Math.ceil(Math.random() * NBMAX) ? i=== random ? Math.ceil(Math.random() * i): random  : null;
    data.messages.push({ 
        id: i, 
        user: `user ${Math.ceil(Math.random() * i)}`,
        content: `${faker.lorem.paragraph()}`,
        parentId,
        isPublic: true,
        createdAt: faker.date.past()
    })
  }
  return data
}