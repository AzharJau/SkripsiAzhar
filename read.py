import RPi.GPIO as GPIO
from mfrc522 import SimpleMFRC522
import signal
import sys
import requests
import time


# REST API ENDPOINT
API_URL = 'https://localhost:5000/api/members'



# Define PIN assignments
RED_LED_PIN = 11
GREEN_LED_PIN = 13
BUZZER_PIN = 37
RELAY_PIN = 12
duration = 1
is_reading = True
current_rfid = None
reader = None

# Cleanup function

def end_read(signal, frame):
    global is_reading
    GPIO.cleanup()
    is_reading = False
    sys.exit()


signal.signal(signal.SIGINT, end_read)

# REST API function and validate the RFID Badge

def get_rfid_info(uid):
    query_params = {
        "rfId": uid
    }
    response = requests.get(API_URL, params=query_params)

    return response.json()



# Initialize pin

def setup():
    global reader
    GPIO.setmode(GPIO.BOARD)
    GPIO.setwarnings(False)
    GPIO.setup(RED_LED_PIN, GPIO.OUT)
    GPIO.setup(GREEN_LED_PIN, GPIO.OUT)
    GPIO.setup(BUZZER_PIN, GPIO.OUT)
    GPIO.setup(RELAY_PIN, GPIO.OUT, initial=GPIO.HIGH)
    setup.pwm = GPIO.PWM(BUZZER_PIN, 500)

    reader = SimpleMFRC522()


# clear output 

def clear_outputs():
    GPIO.output(RED_LED_PIN, GPIO.LOW)
    GPIO.output(GREEN_LED_PIN, GPIO.LOW)
    GPIO.output(BUZZER_PIN, GPIO.LOW)


# If RFID invalid
def show_invalid_rfid():
    clear_outputs()
    setup.pwm.start(70)
    time.sleep(duration)
    setup.pwm.stop()
    time.sleep(0.05)
    clear_outputs()


# If RFID valid
def show_valid_rfid():
    clear_outputs()
    GPIO.output(GREEN_LED_PIN, GPIO.HIGH)
    open_lock()
    clear_outputs()


# open lock
def open_lock():
    print("Opening door lock...")
    GPIO.output(RELAY_PIN, GPIO.LOW)
    time.sleep(3)
    GPIO.output(RELAY_PIN, GPIO.HIGH)
    

def main():
    global reader, current_rfid
    setup()

    print("scan your RFID")
    while is_reading:
        uid, rfid_badge_number = reader.read()
        if uid == current_rfid:
            time.sleep(1)
            current_rfid = None
        else:
            current_rfid = uid
            response = get_rfid_info(uid)
            print(f"Response :: {response}")
            if response:
                    show_valid_rfid()
                    print("Access Granted")
                    print(f'ID :: {uid}')
                    print(f'Badge Number :: {rfid_badge_number}')
            else:
                    show_invalid_rfid()
                    print("Access Denied")
                    print(f'ID :: {uid}')
                    print(f'Badge Number :: {rfid_badge_number}')



# Main entry Point
if __name__ == '__main__':
    main()

