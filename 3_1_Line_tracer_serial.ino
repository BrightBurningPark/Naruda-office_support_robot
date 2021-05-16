int sensor = A3;        // 라인트레이서 센서를 9번 핀에 연결

void setup(){
  Serial.begin(9600); 
}

void loop(){
  int val = digitalRead(sensor);  // 센서 값을 읽어와서
  Serial.println(val);
  delay(100);
}
