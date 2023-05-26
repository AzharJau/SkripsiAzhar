import RPi.GPIO as GPIO
from mfrc522 import SimpleMFRC522
import signal
import pytz
import sys
import requests
import time
from datetime import datetime
from dateutil import parser

# REST API Endpoints
API_MEMBER = 'http://localhost:5000/api/members'
API_LOG = 'http://localhost:5000/api/logs'
API_SCAN = 'http://localhost:5000/api/scan'


# Define PIN assignments
BUZZER_PIN = 37
RELAY_PIN = 12

is_reading = True
reader = None

# Cleanup
def end_read():
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
        'rfId': uid,
    }
    response = requests.get(API_MEMBER, params=query_params)

    return response.json()


def add_log_granted(uid):
    # Set the current time to UTC timezone
    current_time = datetime.now(pytz.UTC)
    # request body
    data = {
        'rfidBadgeNumberLog': uid,
        'loginTime': current_time.isoformat(),
        'accessStatus': 'Member Active'
    }
    # Send POST request
    response = requests.post(API_LOG, json=data)
    print (response.status_code)
    if response.status_code == 200:
        print('Log added successfully!')
    else:
        print('Failed to add log.')
    

def add_log_expire(uid):
    current_time = datetime.now(pytz.UTC)

    # request body
    data = {
        'rfidBadgeNumberLog': uid,
        'loginTime': current_time.isoformat(),
        'accessStatus': 'Member Expired'
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
        'accessStatus': 'RFID Not Registered'
    }
    
    # POST request
    response = requests.post(API_LOG, json=data)
    print (response.status_code)
    if response.status_code == 200:
        print('Log added successfully!')
    else:
        print('Failed to add log.')


def scan(uid):

    # request body
    data = {

        'rfidBadgeNumberLog': uid,

    }
    
    # POST request
    response = requests.post(API_SCAN, json=data)
    print (response.status_code)
    if response.status_code == 200:
        print('Log added successfully!')
    else:
        print('Failed to add log.')
        

# Initialize pins
def setup():
    global reader
    GPIO.setmode(GPIO.BOARD)
    GPIO.setwarnings(False)
    GPIO.setup(BUZZER_PIN, GPIO.OUT)
    GPIO.setup(RELAY_PIN, GPIO.OUT, initial=GPIO.HIGH)
    setup.pwm = GPIO.PWM(BUZZER_PIN, 500)
    reader = SimpleMFRC522()


# if invalid
def show_invalid_rfid():
    setup.pwm.start(70)
    time.sleep(1)
    setup.pwm.stop()
    time.sleep(1)


# if valid
def show_valid_rfid():
    print("Opening door lock...")
    GPIO.output(RELAY_PIN, GPIO.LOW)
    time.sleep(3)
    GPIO.output(RELAY_PIN, GPIO.HIGH)
    

# main
def main():
    global reader
    setup()
    print("Please scan your RFID(s)...")
    while is_reading:
        uid, rfid_badge_number = reader.read()
        start_time = time.time() 
        response = get_rfid_info(uid)
        print(f"Response :: {response}")
        if response:
            member_active = response[0]['memberActive']           
            if member_active and parser.isoparse(member_active) > datetime.now(pytz.UTC):
                scan(uid)
                show_valid_rfid()
                add_log_granted(uid)
                end_time = time.time()  # Menyimpan waktu selesai respons
                response_time = end_time - start_time  # Menghitung waktu respons
                print("Waktu respons:", response_time, "detik")
                print("Access Granted")
                print(f'ID :: {uid}')
                print(f'Badge Number :: {rfid_badge_number}')
            else:
                scan(uid)
                show_invalid_rfid()
                add_log_expire(uid)
                end_time = time.time()  # Menyimpan waktu selesai respons
                response_time = end_time - start_time  # Menghitung waktu respons
                print("Waktu respons:", response_time, "detik")
                print("Access Denied")
                print(f'ID :: {uid}')
                print(f'Badge Number :: {rfid_badge_number}')
        else:
            show_invalid_rfid()
            add_log_unknow(uid)
            scan(uid)
            end_time = time.time()  # Menyimpan waktu selesai respons
            response_time = end_time - start_time  # Menghitung waktu respons
            print("Waktu respons:", response_time, "detik")
            print("Access Denied")
            print(f'ID :: {uid}')
            print(f'Badge Number :: {rfid_badge_number}')


# Main entry Point
if __name__ == '__main__':
    main()

