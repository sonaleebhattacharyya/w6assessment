
import { Builder, Capabilities, By } from "selenium-webdriver"
require('chromedriver')
const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

beforeEach(async () => {
 await driver.get('http://127.0.0.1:5500/public/')
})

afterAll(async () => {
    driver.quit()
})
// First Test (included in the original file): Test that title shows up when page loads. 
test('Title shows up when page loads', async () => {
    const title = await driver.findElement(By.id('title'))
    const displayed = await title.isDisplayed()
    expect(displayed).toBe(true)
})
// Second Test: Let's check that clicking the Draw button displays the div with id = "choices""

test('clicking Draw button displays div with id = choices', async () => {
  const draw = await driver.findElement(By.id('draw'))
  await draw.click()
  const click = await driver.findElement(By.id('choices'))
  const displayed = await click.isDisplayed()
  expect(displayed).toBe(true)
 })