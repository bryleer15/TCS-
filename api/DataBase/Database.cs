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
        long length = reader.GetBytes(10, 0, null, 0, 0); // Get the size of the Picture column data
        byte[] imageData = new byte[length];
        reader.GetBytes(10, 0, imageData, 0, (int)length); // Read the BLOB data into the byte array
 
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
            Description = reader.GetString(9),
            Picture = imageData,  // Assign the image data
            Bought = reader.GetString(11)
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
             string sql = "SELECT * FROM CARDSMEMORBILLIA WHERE bought != 'Y' Order by rating DESC;";
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
            (sport, price, firstName, lastName, team, rating, category, isBiddable, description, picture, bought)
            VALUES (@sport, @price, @firstName, @lastName, @team, @rating, @category, @isBiddable, @description, @picture, @bought);";
 
    List<MySqlParameter> parms = new(){
        new MySqlParameter("@sport", MySqlDbType.String) { Value = myData.Sport },
        new MySqlParameter("@price", MySqlDbType.Double) { Value = myData.Price },
        new MySqlParameter("@firstName", MySqlDbType.String) { Value = myData.FirstName },
        new MySqlParameter("@lastName", MySqlDbType.String) { Value = myData.LastName },
        new MySqlParameter("@team", MySqlDbType.String) { Value = myData.Team },
        new MySqlParameter("@rating", MySqlDbType.Int32) { Value = myData.Rating },
        new MySqlParameter("@isBiddable", MySqlDbType.String) { Value = "F" },
        new MySqlParameter("@category", MySqlDbType.String) { Value = myData.Category },
        new MySqlParameter("@description", MySqlDbType.String) { Value = myData.Description },
        new MySqlParameter("@picture", MySqlDbType.Blob) { Value = myData.Picture }, // Insert image data
        new MySqlParameter("@bought", MySqlDbType.String) { Value = "F" }
    };
 
    await DataNoReturnSql(sql, parms);  
}
 
    public async Task UpdateData(Data myData, int inventoryID){

    string sql = @$"UPDATE CARDSMEMORBILLIA
        SET Sport = @sport, Price = @price, FirstName = @firstName,
        LastName = @lastName, Team = @team, Rating = @rating,
        Category = @category, IsBiddable = @isBiddable,
        Description = @description, Picture = @picture, Bought = @bought
        WHERE inventoryID = @inventoryID;";
 
        List<MySqlParameter> parms = new(){
        new MySqlParameter("@inventoryID", MySqlDbType.Int32) { Value = inventoryID },
        new MySqlParameter("@sport", MySqlDbType.String) { Value = myData.Sport },
        new MySqlParameter("@price", MySqlDbType.Double) { Value = myData.Price },
        new MySqlParameter("@firstName", MySqlDbType.String) { Value = myData.FirstName },
        new MySqlParameter("@lastName", MySqlDbType.String) { Value = myData.LastName },
        new MySqlParameter("@team", MySqlDbType.String) { Value = myData.Team },
        new MySqlParameter("@rating", MySqlDbType.Int32) { Value = myData.Rating },
        new MySqlParameter("@isBiddable", MySqlDbType.String) { Value = "F" },
        new MySqlParameter("@category", MySqlDbType.String) { Value = myData.Category },
        new MySqlParameter("@description", MySqlDbType.String) { Value = myData.Description },
        new MySqlParameter("@picture", MySqlDbType.Blob) { Value = myData.Picture }, // Update image data
        new MySqlParameter("@bought", MySqlDbType.String) { Value = "F" }
    };
 
    await DataNoReturnSql(sql, parms);
}

 
    public async Task UpdateData(Data myData, int inventoryID, string imagePath){
        // Read the image file into a byte array
    byte[] imageData = await File.ReadAllBytesAsync(imagePath);
 
        string sql = @$"UPDATE CARDSMEMORBILLIA 
                    SET Sport = @sport, Price = @price, FirstName = @firstName, 
                        LastName = @lastName, Team = @team, Rating = @rating, 
                        Category = @category, IsBiddable = @isBiddable, 
                        Description = @description, Picture = @picture, Bought = @bought
                    WHERE inventoryID = @inventoryID;";

        List<MySqlParameter> parms = new(){
            new MySqlParameter("@inventoryID", MySqlDbType.Int32) { Value = inventoryID },
            new MySqlParameter("@sport", MySqlDbType.String) { Value = myData.Sport },
            new MySqlParameter("@price", MySqlDbType.Double) { Value = myData.Price },
            new MySqlParameter("@firstName", MySqlDbType.String) { Value = myData.FirstName },
            new MySqlParameter("@lastName", MySqlDbType.String) { Value = myData.LastName },
            new MySqlParameter("@team", MySqlDbType.String) { Value = myData.Team },
            new MySqlParameter("@rating", MySqlDbType.Int32) { Value = myData.Rating },
            new MySqlParameter("@isBiddable", MySqlDbType.String) { Value = "F" },
            new MySqlParameter("@category", MySqlDbType.String) { Value = myData.Category },
            new MySqlParameter("@description", MySqlDbType.String) { Value = myData.Description },
            new MySqlParameter("@picture", MySqlDbType.Blob) { Value = imageData }, // Update image data
            new MySqlParameter("@bought", MySqlDbType.String) { Value = "F" }
        };
 
    await DataNoReturnSql(sql, parms);
    }

    public async Task<List<Data>> GetBaseball(){
        string sql = "SELECT * FROM CARDSMEMORBILLIA WHERE bought != 'Y' AND sport = 'Baseball' ORDER BY rating DESC;";
        List<MySqlParameter> parms = new();
        return await SelectData(sql, parms);
    }
    public async Task<List<Data>> GetBasketball(){
        string sql = "SELECT * FROM CARDSMEMORBILLIA WHERE bought != 'Y' AND sport = 'Basketball' ORDER BY rating DESC;";
        List<MySqlParameter> parms = new();
        return await SelectData(sql, parms);
    }














}
}

