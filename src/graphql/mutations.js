/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const deleteCards = /* GraphQL */ `
  mutation DeleteCards(
    $input: DeleteCardsInput!
    $condition: ModelCardsConditionInput
  ) {
    deleteCards(input: $input, condition: $condition) {
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
export const createCards = /* GraphQL */ `
  mutation CreateCards(
    $input: CreateCardsInput!
    $condition: ModelCardsConditionInput
  ) {
    createCards(input: $input, condition: $condition) {
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
export const updateCards = /* GraphQL */ `
  mutation UpdateCards(
    $input: UpdateCardsInput!
    $condition: ModelCardsConditionInput
  ) {
    updateCards(input: $input, condition: $condition) {
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
