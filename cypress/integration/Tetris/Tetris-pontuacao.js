const { italic } = require("ansi-styles")
const { cyan } = require("color-name")

describe('Game', () =>{

    it(' Iniciar jogo', () => {
        cy.visit('/')
        cy.get("[id=start-button]").click()
    
    })  
    it("Mudar posição", () =>{
        cy.visit('/')
        cy.get("[id=start-button]").click()
        cy.get('body').type('{uparrow}')
    })

})