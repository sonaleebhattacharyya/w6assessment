
import { Builder, Capabilities, By } from "selenium-webdriver"
require('chromedriver')
const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

beforeEach(async () => {
   await driver.get('http://127.0.0.1:5500/public/')
})

afterAll(async () => {
    driver.quit()
})

test('Title shows up when page loads', async () => {
    const title = await driver.findElement(By.id('title'))
    const displayed = await title.isDisplayed()
    expect(displayed).toBe(true)
})

