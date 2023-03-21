import RPi.GPIO as GPIO
from mfrc522 import SimpleMFRC522
import signal
import sys
import time

reader = SimpleMFRC522()
is_reading = True
BUZZER_PIN = 37
RELAY_PIN = 12
GPIO.setwarnings(False)
pwm = None
duration = 1


def initialize_gpio():
    global pwm
    GPIO.setmode(GPIO.BOARD)
    GPIO.setup(BUZZER_PIN, GPIO.OUT)
    if not hasattr(initialize_gpio, 'pwm'):
        initialize_gpio.pwm = GPIO.PWM(BUZZER_PIN, 500)
    GPIO.setup(RELAY_PIN, GPIO.OUT, initial=GPIO.HIGH)

initialize_gpio()

# Capture SIGINT for cleanup
def end_read(signal, frame):
    global is_reading
    print('Ctrl+C captured, exiting')
    GPIO.cleanup()
    is_reading = False
    sys.exit()

# Hook the SIGINT
signal.signal(signal.SIGINT, end_read)

def show_invalid_rfid():
    print("Invalid RFID")
    initialize_gpio()
    initialize_gpio.pwm.start(70)
    time.sleep(duration)
    initialize_gpio.pwm.stop()
    time.sleep(0.05)

def show_valid_rfid():
    print("Valid RFID")
    initialize_gpio()
    GPIO.output(RELAY_PIN, GPIO.LOW)
    time.sleep(3)
    GPIO.output(RELAY_PIN, GPIO.HIGH)

while is_reading:
    try:
        id, text = reader.read()

        if id == 258181445832:
            show_valid_rfid()
            print("Access Granted")
            print(f'ID :: {id}')
            print(f'Badge Number :: {text}')
            time.sleep(1)

        else:
            show_invalid_rfid()
            print("Access Denied")
            print(f'ID :: {id}')
            print(f'Badge Number :: {text}')

    except:
        GPIO.cleanup()
        raise


