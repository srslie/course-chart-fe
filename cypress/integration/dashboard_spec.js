context('Dashboard View', () => {
  const baseUrl = 'http://localhost:3000/'
  const coursesApi = 'https://course-chart-be.herokuapp.com/courses'
  const course1Api = 'https://course-chart-be.herokuapp.com/courses/1'

  beforeEach(() => {
    cy.intercept('GET', coursesApi, { fixture: 'courses-api' })
    cy.visit(baseUrl).wait(300)
  })

  it('Should display the heading of Course Chart on initial display', () => {
    cy.get('h1').should('contain', 'Course Chart')
  })

  it('Has a navigation bar with course and module buttons', () => {
    cy.get('nav').find('img').should('be.visible')
      .get('nav').find('h1').should('have.text', 'CourseChart')
      .get('nav').find('a').eq(0).should('have.text', 'Home')
      .get('nav').find('a').eq(1).should('have.text', 'Nursing 101')
      .get('nav').find('a').eq(2).should('have.text', 'Foundations of Nursing')
      .get('nav').find('a').eq(3).should('have.text', '+ Add New Course')
      .get('nav').find('a').eq(4).should('have.text', 'Instructions')
      .get('nav').find('a').eq(5).should('have.text', 'About Site')
  })

  it('Should change url path to selected addCourseForm page', () => {
    cy
    .wait(1000)
    .get('nav').find('a').eq(3).click()
    .url().should('include', 'addCourseForm')
  })

  it('Should change url path to selected courseDashboard page', () => {
    cy.get('nav').find('a[id=1]').click()
      .url().should('include', 'courseDashboard')
  })

  it.only('Shouldtest', () => {

  })

  it('Should change url path to selected moduleDashboard page', () => {
    cy.intercept('GET', course1Api, { fixture: 'course1-api' })
      .get('nav').find('a[id=1]').click().wait(500)
      .get('nav').find('a').eq(5).click()
      .url().should('include', 'moduleDashboard')
  })

  it('Should change url path to selected addModuleForm page', () => {
    cy.intercept('GET', course1Api, { fixture: 'course1-api' })
      .get('nav').find('a[id=1]').click().wait(500)
      .get('nav').find('a').eq(11).click()
      .url().should('include', 'addModuleForm')
  })
})
