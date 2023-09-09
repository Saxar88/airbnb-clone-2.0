from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

driver = webdriver.Firefox()

driver.get("https://rent-site-clone-2-0.vercel.app/")

try:
    wait = WebDriverWait(driver, 10)
    wait.until(
        EC.presence_of_element_located((By.ID, 'user-menu'))).click()
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
    wait.until(EC.presence_of_element_located(
        (By.XPATH, "//*[text()='Log out']"))).click()

finally:
    driver.quit()
