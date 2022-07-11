export interface userInfoModel {
  Phone_Number: string,
  First_Name: string,
  Last_Name: string,
  Email: string,
  National_ID_Number: string,
  Birth_Date: string,
  Registration_Time: string,
  IBAN: string,
  Job: string,
  Is_Legal: boolean,
  Is_Identity_Verified: boolean
  Is_Email_Verified: boolean,
  Legal_Name: string,
  Legal_National_ID_Number: string,
  Economic_Code: string,
  Registration_Number: string,
  State_Province: string,
  City: string,
  Telephone: string,
  Postal_Code: string,
  Legal_Type: string,
  Visual_Verified: boolean,

}

export interface updateUserInfoFunctionInterface {
  func : (Phone_Number: string, key: string, value: string) => Promise<1 | -1 | 500>
}