from selenium import webdriver
from selenium.webdriver.firefox.service import Service as FirefoxService
from webdriver_manager.firefox import GeckoDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

driver = webdriver.Firefox(
    service=FirefoxService(GeckoDriverManager().install()))

driver.get("https://rent-site-clone-2-0.vercel.app/")

try:
    wait = WebDriverWait(driver, 10)
    wait.until(EC.presence_of_element_located((By.ID, 'user-menu'))).click()
    wait.until(EC.presence_of_element_located(
        (By.XPATH, "//*[text()='Sign up']"))).click()
    driver.find_element(
        "id", "email").send_keys("test-py@test.com")
    driver.find_element(
        "id", "name").send_keys("Test Py")
    driver.find_element(
        "id", "password").send_keys("test-py-123")
    driver.find_element(
        "xpath", "//*[text()='Continue']").click()
    wait.until(EC.presence_of_element_located(
        (By.XPATH, "//*[text()='Account created!']")))

finally:
    driver.quit()
