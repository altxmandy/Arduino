float tensao = 0;
void setup() {
  Serial.begin(9600);
}
float Emax(float Uldr) {
  return pow(
    10,
    (log((20000.0 * (5.0 - Uldr)) / 150.0) / log(5.012)) + 1
  );
}
float Emin(float Uldr) {
  return pow(
    10,
    (log((8000.0 * (5.0 - Uldr)) / 150.0) / log(5.012)) + 1
  );
}
void loop() {
  tensao = analogRead(A0) * (5.0 / 1023.0);
  float luxMax = Emax(tensao);
  float luxMin = Emin(tensao);
  Serial.print("Tensao no LDR: ");
  Serial.print(tensao);
  Serial.println(" V");
  Serial.print("Lux minimo estimado: ");
  Serial.println(luxMin);
  Serial.print("Lux maximo estimado: ");
  Serial.println(luxMax);
  Serial.println("-----------------------");
  delay(1000);
}
