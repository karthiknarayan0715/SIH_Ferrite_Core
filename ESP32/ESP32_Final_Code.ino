#include "HX711.h"
#include <WiFi.h>
#include <WebSocketsClient.h>

const int LOADCELL_DOUT_PIN_1 = 32;
const int LOADCELL_SCK_PIN_1 = 33;
const int LOADCELL_DOUT_PIN_2 = 26;
const int LOADCELL_SCK_PIN_2 = 27;

const int trigPin1 = 2;
const int echoPin1 = 3;
const int trigPin2 = 4;
const int echoPin2 = 5;

const char* ssid = "SuperFastHotspot";
const char* password = "12344321";
const char* serverIP = "192.168.48.136";
const int serverPort = 5000;

String data;

int counter = 0;

WebSocketsClient webSocket;
unsigned long lastUpdateTime = 0;
const unsigned long updateInterval = 5000;

void onWebSocketEvent(WStype_t type, uint8_t * payload, size_t length) {
  switch(type) {
    case WStype_DISCONNECTED:
      Serial.println("Disconnected from WebSocket server");
      break;
    case WStype_CONNECTED:
      Serial.println("Connected to WebSocket server");
      data = "{\"type\":\"IsESP32\"}}";
      webSocket.sendTXT(data);
      break;
    case WStype_TEXT:
      const String payload_str = (char*) payload;
      if(payload_str == "start"){

      }
      Serial.println("Received response from server: " + String((char *)payload));
      break;
  }
}

int getDistance(int trigPin, int echoPin) {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  return pulseIn(echoPin, HIGH) * 0.034 / 2;
}

HX711 scale1;
HX711 scale2;
HX711 scale3;
HX711 scale4;

void setup() {
  Serial.begin(57600);

  scale1.begin(LOADCELL_DOUT_PIN_1, LOADCELL_SCK_PIN_1);
  scale1.tare();

  scale2.begin(LOADCELL_DOUT_PIN_2, LOADCELL_SCK_PIN_2);
  scale2.tare();

  pinMode(trigPin1, OUTPUT);
  pinMode(echoPin1, INPUT);
  pinMode(trigPin2, OUTPUT);
  pinMode(echoPin2, INPUT);

  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000); 
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");

  // Setup WebSocket callbacks
  webSocket.begin(serverIP, serverPort, "/");
  webSocket.onEvent(onWebSocketEvent);
  webSocket.setReconnectInterval(5000);
}

float measureWeight(HX711 &scale, float calibrationFactor) {
  if (scale.is_ready()) {
    return scale.get_value(10) / calibrationFactor;
  } else {
    return -1;
  }
}

void loop() {
  webSocket.loop();
  if(counter >= 1)
  {
    float weights[] = {measureWeight(scale1, 202), measureWeight(scale2, 174)};

    Serial.print("Weights: [");
    int total_weight = 0;

    for (int i = 0; i < sizeof(weights) / sizeof(weights[0]); ++i) {
      Serial.print(weights[i]);
      total_weight += weights[i];
    }
    data = ""
  }

  delay(500); 
  int distance1 = getDistance(trigPin1, echoPin1);
  int distance2 = getDistance(trigPin2, echoPin2);

  if (distance1 < 50 && distance2 > 50) {
    counter++;
    Serial.print("Counter: ");
    Serial.println(counter);
    delay(500);
  }
}