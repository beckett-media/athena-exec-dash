/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCards = /* GraphQL */ `
  query GetCards($id: ID!) {
    getCards(id: $id) {
      id
      cardsshipped
      cardsreceived
      cardsgraded
      type
      createdAt
      updatedAt
      date
      owner
    }
  }
`;
export const listCards = /* GraphQL */ `
  query ListCards(
    $filter: ModelCardsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCards(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        cardsshipped
        cardsreceived
        cardsgraded
        type
        createdAt
        updatedAt
        date
        owner
      }
      nextToken
    }
  }
`;
