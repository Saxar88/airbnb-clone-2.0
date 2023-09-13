from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
import time

browsers = ["chrome", "firefox"]

for browser in browsers:
    if browser == "chrome":
        driver = webdriver.Chrome()
    elif browser == "firefox":
        options = Options()
        options.binary_location = r'C:\Program Files\Mozilla Firefox\firefox.exe'
        driver = webdriver.Firefox(options=options)

driver.get("https://rent-site-clone-2-0.vercel.app/")

try:
    wait = WebDriverWait(driver, 10)
    wait.until(EC.presence_of_element_located((By.ID, 'user-menu'))).click()
    wait.until(EC.presence_of_element_located(
        (By.XPATH, "//*[text()='Log in']"))).click()
    driver.find_element(
        "id", "email").send_keys("test-py@test.com")
    driver.find_element(
        "id", "password").send_keys("test-py-123")
    driver.find_element(
        "xpath", "//*[text()='Continue']").click()
    wait.until(EC.presence_of_element_located(
        (By.XPATH, "//*[text()='Logged in successfully!']")))

    wait.until(EC.invisibility_of_element_located(
        (By.ID, "modal")))
    time.sleep(0.5)
    wait.until(EC.presence_of_element_located(
        (By.XPATH, "//*[text()='Airbnb your home']"))).click()
    wait.until(EC.presence_of_element_located(
        (By.XPATH, "//*[text()='Windmills']"))).click()
    next_button = driver.find_element(
        "xpath", "//*[text()='Next']")
    next_button.click()
    wait.until(EC.presence_of_element_located(
        (By.XPATH, "//div[@class='text-lg css-19bb58m']"))).click()
    driver.find_element(
        "id", "react-select-2-input").send_keys("Greece")
    next_button.click()
    add_guests = wait.until(EC.presence_of_element_located(
        (By.XPATH, "//div//div//div//div//div//div[2]//div[1]//div[3]//div[3]")))
    for i in range(3):
        add_guests.click()
    add_room = driver.find_element(
        "xpath", "//div[3]//div[1]//div[3]//div[3]")
    add_room.click()
    next_button.click()
    wait.until(EC.presence_of_element_located(
        (By.ID, "image-upload"))).click()
    wait.until(EC.presence_of_element_located(
        (By.NAME, "file"))).send_keys(r'C:\Users\W10\Desktop\Anemomilos.webp')
    wait.until(EC.presence_of_element_located(
        (By.XPATH, "//*[text()='Next']"))).click()
    driver.find_element(
        "xpath", "//*[text()='Title']").send_keys("Anemomilos")
    driver.find_element(
        "xpath", "//*[text()='Description']").send_keys("It is a real old windmill that was used to grind wheat. This operation stopped with the appearance of the machine mills, and a few years later it was turned into a residence. It has 3 floors. The kitchen and the bathroom are on the ground floor, the children's bedroom is upstairs, and on the third floor there is the main bedroom with a 360 degrees view of the endless blue sea, but also the mountainous part of the island. Outside there is a pool, a kitchen, and a shower.")
    next_button.click()
    price_input = wait.until(EC.presence_of_element_located((By.ID, "price")))
    price_input.click()
    price_input.send_keys(Keys.BACKSPACE, '248')
    driver.find_element(
        "xpath", "//*[text()='Create']").click()
    wait.until(EC.presence_of_element_located(
        (By.XPATH, "//*[text()='Listing created!']")))

finally:
    driver.quit()
