#include <Wire.h>
//ITG3205//
#define ITGAddress   0x68    
#define G_SMPLRT_DIV 0x15    
#define G_DLPF_FS 0x16     
#define G_INT_CFG 0x17    
#define G_PWR_MGM 0x3E   

#define Register_ID 0  
#define Register_2D 0x2D  
#define Register_X0 0x32  
#define Register_X1 0x33  
#define Register_Y0 0x34  
#define Register_Y1 0x35  
#define Register_Z0 0x36  
#define Register_Z1 0x37  

#define qmc_address 0x0D

int xGyro, yGyro, zGyro;      
int buff[6];                  
int g_offx = 0;
int g_offy = 0;
int g_offz = 0;

int ADXAddress = 0xA7 >> 1;  // the default 7-bit slave address  
int reading = 0;  
int val=0;  
int X0,X1,X_out;  
int Y0,Y1,Y_out;  
int Z1,Z0,Z_out;  
double Xg,Yg,Zg;  

void QMC5883L_WriteReg(uint8_t RegAddr,uint8_t RegData);

void writeRegister(int deviceAddress, byte address, byte val)
 {
  Wire.beginTransmission(deviceAddress); 
  Wire.write(address);       
  Wire.write(val);        
  Wire.endTransmission();
}

void readRegister(int deviceAddress, byte address) 
{
  Wire.beginTransmission(deviceAddress);  
  Wire.write(address);        
  Wire.endTransmission(); 
  Wire.beginTransmission(deviceAddress); 
  Wire.requestFrom(deviceAddress, 6);   
 
  int i = 0;
  while(Wire.available())    
  { buff[i++] = Wire.read(); }
  Wire.endTransmission(); 
}

void initGyro()
{

writeRegister(ITGAddress, G_SMPLRT_DIV, 0x07); 
writeRegister(ITGAddress, G_DLPF_FS, 0x1E); 
writeRegister(ITGAddress, G_INT_CFG, 0x00); 
writeRegister(ITGAddress, G_PWR_MGM, 0x00);   
}

void getGyroValues()
{
  readRegister(ITGAddress, 0x1D); //
  xGyro = ((buff[0] << 8) | buff[1]) + g_offx;
  yGyro = ((buff[2] << 8) | buff[3]) + g_offy;
  zGyro = ((buff[4] << 8) | buff[5]) + g_offz;
}

void setup()
{
  Serial.begin(9600);
  Wire.begin();
  initGyro();
  delay(50); 
  // enable to measute g data  
  Wire.beginTransmission(ADXAddress);  
  Wire.write(Register_2D);  
  Wire.write(8);                //measuring enable  
  Wire.endTransmission();     // stop transmitting  
  QMC5883L_WriteReg(0x0B,0x01);
  QMC5883L_WriteReg(0x20,0x40);
  QMC5883L_WriteReg(0x21,0x01);
  QMC5883L_WriteReg(0x09,0x1d);
}
 void QMC5883L_WriteReg(uint8_t RegAddr,uint8_t RegData)
{
  Wire.beginTransmission(qmc_address);
  Wire.write(RegAddr);
  Wire.write(RegData);
  Wire.endTransmission();
}
void loop()
{   
    getGyroValues();
    
    int Compass_x,Compass_y,Compass_z;//triple axis data
    //Tell QMC5883L  where to begin reading data
    Wire.beginTransmission(qmc_address);
    Wire.write(0x00); //select register 3, X MSB register
    Wire.endTransmission();
    
    Wire.requestFrom(qmc_address, 6);
    if(6<=Wire.available()){
    Compass_x = Wire.read(); //X lsm
    Compass_x |= Wire.read()<<8; //X msb
    Compass_y = Wire.read(); //Y lsb
    Compass_y |= Wire.read()<<8; //Y msb
    Compass_z = Wire.read(); //Z lsb
    Compass_z |= Wire.read()<<8; //Z msb
    
    Wire.endTransmission();  
    Wire.requestFrom(ADXAddress,2);   
    if(Wire.available()<=2)     
    {  
    X0 = Wire.read();  
    X1 = Wire.read();   
    X1=X1<<8;  
    X_out=X0+X1;     
  }  
    //------------------Y  
  Wire.beginTransmission(ADXAddress); // transmit to device  
  Wire.write(Register_Y0);  
  Wire.write(Register_Y1);  
  Wire.endTransmission();  
  Wire.requestFrom(ADXAddress,2);   
  if(Wire.available()<=2)     
  {  
    Y0 = Wire.read();  
    Y1 = Wire.read();   
    Y1=Y1<<8;  
    Y_out=Y0+Y1;  
  }  
  //------------------Z  
  Wire.beginTransmission(ADXAddress); // transmit to device  
  Wire.write(Register_Z0);  
  Wire.write(Register_Z1);  
  Wire.endTransmission();  
  Wire.requestFrom(ADXAddress,2);   
  if(Wire.available()<=2)     
  {  
    Z0 = Wire.read();  
    Z1 = Wire.read();   
    Z1=Z1<<8;  
    Z_out=Z0+Z1;  
  }
  //Acceleration-test//
  /*  
  //display the real value  
  Xg=X_out/256.0;  
  Yg=Y_out/256.0;  
  Zg=Z_out/256.0;  
  */  
  //display the reading value  
  Xg=X_out;  
  Yg=Y_out;  
  Zg=Z_out;  
  Serial.println("Acce-test:");
  Serial.print("Acce_X=");  
  Serial.print(Xg);  
  Serial.print("       ");  
  Serial.print("  Acce_Y=");  
  Serial.print(Yg);  
  Serial.print("       ");  
  Serial.print("  Acce_Z=");  
  Serial.print(Zg);  
  Serial.println("  ");  
  delay(1000); 
  //Gyro-test//
  Serial.println("Gyro-test:");
  Serial.print("Gyro_X=");
  Serial.print(xGyro);
  Serial.print("  Gyro_Y=");
  Serial.print(yGyro);
  Serial.print("  Gyro_Z=");
  Serial.println(zGyro);
  delay(1000); 
 //Compass-test//
  Serial.println("Compass-test:");
  Serial.print("Comp_x:");
  Serial.print(Compass_x);
  Serial.print("   Comp_y:");
  Serial.print(Compass_y);
  Serial.print("   Comp_z:");
  Serial.println(Compass_z);
  delay(1000); 
}
}
