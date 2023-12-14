/* eslint-disable no-undef */
describe('TaskItem.cy.js', () => {
  it('testando', () => {
    // cy.mount()
    cy.get('h2.text-xl.font-bold.mb-4').then(($element) => {
      cy.log($element.text());
    }).should('have.text', 'CRUD com Vue3, Vuex e Tailwind.');
  })
})