import RPi.GPIO as GPIO
from mfrc522 import SimpleMFRC522
import signal
import pytz
import sys
import requests
import time
import datetime
from datetime import datetime
from dateutil import parser

# REST API Endpoints
API_URL = 'https://localhost:5000/api/members'
API_LOG = 'https://localhost:5000/api/logs'
API_SCAN = 'https://localhost:5000/api/scan'


# Define PIN assignments
RED_LED_PIN = 11
GREEN_LED_PIN = 13
BUZZER_PIN = 37
RELAY_PIN = 12
duration = 1

is_reading = True
current_rfid = None
reader = None

# Cleanup
def end_read(signal, frame):
    global is_reading
    print('Cleaning up GPIO before exiting...')
    GPIO.cleanup()
    is_reading = False
    sys.exit()

# Hook function
signal.signal(signal.SIGINT, end_read)

# validate RFID Badge '''
def get_rfid_info(uid):
    query_params = {
        "rfId": uid
    }
    response = requests.get(API_URL, params=query_params)

    return response.json()

def add_log_granted(member_id, full_name, member_active, uid, image_pic):
    # Set the current time to UTC timezone
    current_time = datetime.now(pytz.UTC)

    # request body
    data = {
        'memberIdLog': member_id,
        'fullName': full_name,
        'memberActive': member_active,
        'rfidBadgeNumberLog': uid,
        'imagePic': image_pic,
        'loginTime': current_time.isoformat(),
        'accessStatus': 'Memeber Aktif'
    }
        
    # Send POST request
    response = requests.post(API_LOG, json=data)
    print (response.status_code)
    if response.status_code == 200:
        print('Log added successfully!')
    else:
        print('Failed to add log.')
    
def add_log_expire(member_id, full_name, member_active, uid, image_pic):
    current_time = datetime.now(pytz.UTC)

    # request body
    data = {
        'memberIdLog': member_id,
        'fullName': full_name,
        'memberActive': member_active,
        'rfidBadgeNumberLog': uid,
        'imagePic': image_pic,
        'loginTime': current_time.isoformat(),
        'accessStatus': 'Member Habis'
    }
        
    # POST request
    response = requests.post(API_LOG, json=data)
    print (response.status_code)
    if response.status_code == 200:
        print('Log added successfully!')
    else:
        print('Failed to add log.')
    
def add_log_unknow(uid):
    current_time = datetime.now(pytz.UTC)

    # request body
    data = {

        'rfidBadgeNumberLog': uid,
        'loginTime': current_time.isoformat(),
        'accessStatus': 'RFID Tidak Terdaftar'
    }
    
    # POST request
    response = requests.post(API_LOG, json=data)
    print (response.status_code)
    print (response)
    if response.status_code == 200:
        print('Log added successfully!')
    else:
        print('Failed to add log.')

def scan(uid):

    # request body
    data = {

        'uid': uid,

    }
    
    # POST request
    response = requests.post(API_SCAN, json=data)
    print (response.status_code)
    print (response)
    if response.status_code == 200:
        print('Log added successfully!')
    else:
        print('Failed to add log.')
        
# Initialize pins
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

# if invalid
def show_invalid_rfid():
    clear_outputs()
    setup.pwm.start(70)
    time.sleep(duration)
    setup.pwm.stop()
    time.sleep(0.05)
    clear_outputs()

# if valid
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

# main
def main():
    global reader, current_rfid
    setup()

    print("Please scan your RFID(s)...")
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
                member_active = response[0]['memberActive']           
                if member_active and parser.isoparse(member_active) > datetime.now(pytz.UTC):
                    show_valid_rfid()
                    add_log_granted(response[0]['memberId'], response[0]['fullName'], response[0]['memberActive'], uid, response[0]['imagePic'])
                    scan(uid)
                    print("Access Granted")
                    print(f'ID :: {uid}')
                    print(f'Badge Number :: {rfid_badge_number}')
                else:
                    show_invalid_rfid()
                    add_log_expire(response[0]['memberId'], response[0]['fullName'], response[0]['memberActive'], uid, response[0]['imagePic'])
                    scan(uid)
                    print("Access Denied")
                    print(f'ID :: {uid}')
                    print(f'Badge Number :: {rfid_badge_number}')
            else:
                show_invalid_rfid()
                add_log_unknow(uid)
                scan(uid)
                print("Access Denied")
                print(f'ID :: {uid}')
                print(f'Badge Number :: {rfid_badge_number}')


# Main entry Point
if __name__ == '__main__':
    main()

