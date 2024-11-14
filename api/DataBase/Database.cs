using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using MySqlConnector;


namespace api.DataBase
{
    public class Database
    {
        private string cs;

        public Database(){
            
            cs ="Server=127.0.0.1;UserID=root;Password=Freedom2004!!;Database=TCS";
        }

    private async Task<List<Data>> SelectData(string sql, List<MySqlParameter> parms){
    List<Data> myData = new();
    using var connection = new MySqlConnection(cs);
    await connection.OpenAsync();
    using var command = new MySqlCommand(sql, connection);
 
    if (parms != null)
    {
        command.Parameters.AddRange(parms.ToArray());
    }
 
    using var reader = await command.ExecuteReaderAsync();
    while (await reader.ReadAsync())
    {
 
        myData.Add(new Data()
        {
            InventoryID = reader.GetInt32(0),
            Sport = reader.GetString(1),
            Price = reader.GetDouble(2),
            FirstName = reader.GetString(3),
            LastName = reader.GetString(4),
            Team = reader.GetString(5),
            Rating = reader.GetInt32(6),
            Category = reader.GetString(7),
            IsBiddable = reader.GetString(8),
            Descriptions = reader.GetString(9),
            Bought = reader.GetString(10),
            Picture = reader.GetString(11)
        });
    }
 
    return myData;
}
 
        private async Task DataNoReturnSql(string sql, List<MySqlParameter> parms){
             List<Data> myData = new();
             using var connection = new MySqlConnection(cs);
             await connection.OpenAsync();
             using var command = new MySqlCommand(sql, connection);
           
             if(parms != null){
                command.Parameters.AddRange(parms.ToArray());
             }
             await command.ExecuteNonQueryAsync();
    
        }
 
        public async Task<List<Data>> GetAllData()
        {
             string sql = "SELECT * FROM CARDSMEMORBILLIA Order by rating DESC;";
             List<MySqlParameter> parms = new();
             return await SelectData(sql, parms);
        }

 
         public async Task<List<Data>> GetData(int inventoryID)
        {
             string sql = $"SELECT * FROM CARDSMEMORBILLIA WHERE inventoryID = @inventoryID;";
              List<MySqlParameter> parms = new();
              parms.Add(new MySqlParameter("@inventoryID", MySqlDbType.Int32) {Value = inventoryID});
             return await SelectData(sql, parms);
        }
 
        public async Task DeleteData(int inventoryID)
        {
             string sql = $"Update CARDSMEMORBILLIA set bought = 'T' WHERE inventoryID = @inventoryID;";
              List<MySqlParameter> parms = new();
              parms.Add(new MySqlParameter("@inventoryID", MySqlDbType.Int32) {Value = inventoryID});
            await DataNoReturnSql(sql, parms);
        }
 

    public async Task InsertData(Data myData){

    string sql = @$"INSERT INTO CARDSMEMORBILLIA
            (sport, price, firstName, lastName, team, rating, category, isBiddable, descriptions, bought, picture)
            VALUES (@sport, @price, @firstName, @lastName, @team, @rating, @category, @isBiddable, @descriptions, @bought, @picture);";
 
    List<MySqlParameter> parms = new(){
        new MySqlParameter("@sport", MySqlDbType.String) { Value = myData.Sport },
        new MySqlParameter("@price", MySqlDbType.Double) { Value = myData.Price },
        new MySqlParameter("@firstName", MySqlDbType.String) { Value = myData.FirstName },
        new MySqlParameter("@lastName", MySqlDbType.String) { Value = myData.LastName },
        new MySqlParameter("@team", MySqlDbType.String) { Value = myData.Team },
        new MySqlParameter("@rating", MySqlDbType.Int32) { Value = myData.Rating },
        new MySqlParameter("@isBiddable", MySqlDbType.String) { Value = "F" },
        new MySqlParameter("@category", MySqlDbType.String) { Value = myData.Category },
        new MySqlParameter("@descriptions", MySqlDbType.String) { Value = myData.Descriptions },
        new MySqlParameter("@bought", MySqlDbType.String) { Value = "F" },
        new MySqlParameter("@picture", MySqlDbType.String) { Value = myData.Picture } // Insert image data

    };
 
    await DataNoReturnSql(sql, parms);  
}
 
    public async Task UpdateData(Data myData, int inventoryID){
System.Console.WriteLine(inventoryID);
    string sql = @$"UPDATE CARDSMEMORBILLIA
        SET sport = @sport, price = @price, firstName = @firstName,
        LastName = @lastName, team = @team, rating = @rating,
        category = @category, isBiddable = @isBiddable,
        descriptions = @descriptions, bought = @bought, picture = @picture
        WHERE inventoryID = @inventoryID;";
 
        List<MySqlParameter> parms = new(){
        new MySqlParameter("@inventoryID", MySqlDbType.Int32) { Value = inventoryID },
        new MySqlParameter("@sport", MySqlDbType.String) { Value = myData.Sport },
        new MySqlParameter("@price", MySqlDbType.Double) { Value = myData.Price },
        new MySqlParameter("@firstName", MySqlDbType.String) { Value = myData.FirstName },
        new MySqlParameter("@lastName", MySqlDbType.String) { Value = myData.LastName },
        new MySqlParameter("@team", MySqlDbType.String) { Value = myData.Team },
        new MySqlParameter("@rating", MySqlDbType.Int32) { Value = myData.Rating },
        new MySqlParameter("@isBiddable", MySqlDbType.String) { Value = myData.IsBiddable },
        new MySqlParameter("@category", MySqlDbType.String) { Value = myData.Category },
        new MySqlParameter("@descriptions", MySqlDbType.String) { Value = myData.Descriptions },
        new MySqlParameter("@bought", MySqlDbType.String) { Value = myData.Bought },        
        new MySqlParameter("@picture", MySqlDbType.String) { Value = myData.Picture } // Update image data

    };
 
    await DataNoReturnSql(sql, parms);
}

 

    public async Task<List<Data>> GetTab(){  
        string sql = "SELECT COUNT FROM CARDSMEMORBILLIA WHERE bought = 'F'  ORDER BY rating DESC;";
        List<MySqlParameter> parms = new();
        return await SelectData(sql, parms);
    }



// ----------------------------------------------------------ACCOUNTS-----------------------------------------------------------------------------

  public async Task<List<Account>> GetAllAccounts()
        {
             string sql = "SELECT * FROM ACCOUNTS WHERE isLoggedin = 'F';";
             List<MySqlParameter> parms = new();
             return await SelectAccount(sql, parms);
        }

private async Task<List<Account>> SelectAccount(string sql, List<MySqlParameter> parms){
    List<Account> myAccount = new();
    using var connection = new MySqlConnection(cs);
    await connection.OpenAsync();
    using var command = new MySqlCommand(sql, connection);
 
    if (parms != null)
    {
        command.Parameters.AddRange(parms.ToArray());
    }
 
    using var reader = await command.ExecuteReaderAsync();
    while (await reader.ReadAsync())
    {
 
        myAccount.Add(new Account()
        {
            AccountID = reader.GetInt32(0),
            Email = reader.GetString(1),
            Password = reader.GetString(2),
            FName = reader.GetString(3),
            LName = reader.GetString(4),
            Address = reader.GetString(5),
            City = reader.GetString(6),
            State = reader.GetString(7),
            Zip = reader.GetString(8),
            IsAdmin = reader.GetString(9),
            IsLoggedin = reader.GetString(10)
        });
    }
 
    return myAccount;
}


 private async Task AccountNoReturnSql(string sql, List<MySqlParameter> parms){
             List<Account> myAccount = new();
             using var connection = new MySqlConnection(cs);
             await connection.OpenAsync();
             using var command = new MySqlCommand(sql, connection);
           
             if(parms != null){
                command.Parameters.AddRange(parms.ToArray());
             }
             await command.ExecuteNonQueryAsync();
    
        }


    public async Task InsertAccount(Account myAccount){

    string sql = @$"INSERT INTO ACCOUNTS
            (accountID, email, pass_word, fname, lname, address, city, state, zip_code, isAdmin, isLoggedin)
            VALUES (@accountID, @email, @password, @fname, @lname, @address, @city, @state, @zip, @isAdmin, @isLoggedin);";
 
    List<MySqlParameter> parms = new(){
        new MySqlParameter("@accountID", MySqlDbType.Int32) { Value = myAccount.AccountID },
        new MySqlParameter("@email", MySqlDbType.String) { Value = myAccount.Email },
        new MySqlParameter("@password", MySqlDbType.String) { Value = myAccount.Password },
        new MySqlParameter("@fname", MySqlDbType.String) { Value = myAccount.FName },
        new MySqlParameter("@lname", MySqlDbType.String) { Value = myAccount.LName },
        new MySqlParameter("@address", MySqlDbType.String) { Value = myAccount.Address },
        new MySqlParameter("@city", MySqlDbType.String) { Value = myAccount.City},
        new MySqlParameter("@state", MySqlDbType.String) { Value = myAccount.State },
        new MySqlParameter("@zip", MySqlDbType.String) { Value = myAccount.Zip },
        new MySqlParameter("@isAdmin", MySqlDbType.String){ Value = myAccount.IsAdmin },
        new MySqlParameter("@isLoggedin", MySqlDbType.String) { Value = myAccount.IsLoggedin }

    };
    await AccountNoReturnSql(sql, parms);  
}

    public async Task<List<Account>> GetLoggedIn(int accountID){
             string sql = $"SELECT * FROM ACCOUNTS WHERE accountID = @accountID AND isLoggedin = 'T';";
              List<MySqlParameter> parms = new();
                parms.Add(new MySqlParameter("@accountID", MySqlDbType.Int32) {Value = accountID});
                new MySqlParameter("@isLoggedin", MySqlDbType.String) { Value = "T" };
             return await SelectAccount(sql, parms);
        }

     public async Task<List<Account>> SignIn(int accountID, string isLoggedin){
    string sql = $"UPDATE ACCOUNTS SET isLoggedin = @isLoggedin WHERE accountID = @accountID;";
    List<MySqlParameter> parms = new(){
        new MySqlParameter("@accountID", MySqlDbType.Int32) { Value = accountID },
        new MySqlParameter("@isLoggedin", MySqlDbType.String) { Value = isLoggedin }
    };

    return await SelectAccount(sql, parms);
}

public async Task DeleteAccount(int accountID)
        {
             string sql = $"DELETE from ACCOUNTS WHERE accountID = @accountID;";
              List<MySqlParameter> parms = new();
              parms.Add(new MySqlParameter("@accountID", MySqlDbType.Int32) {Value = accountID});
            await AccountNoReturnSql(sql, parms);
        }










}
}
