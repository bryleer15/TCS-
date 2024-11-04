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
             string sql = "SELECT * FROM CARDSMEMORBILLIA WHERE bought = 'F' Order by rating DESC;";
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

    string sql = @$"UPDATE CARDSMEMORBILLIA
        SET Sport = @sport, Price = @price, FirstName = @firstName,
        LastName = @lastName, Team = @team, Rating = @rating,
        Category = @category, IsBiddable = @isBiddable,
        Descriptions = @descriptions, Bought = @bought, Picture = @picture
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
        new MySqlParameter("@descriptions", MySqlDbType.String) { Value = myData.Descriptions },
        new MySqlParameter("@bought", MySqlDbType.String) { Value = "F" },        
        new MySqlParameter("@picture", MySqlDbType.String) { Value = myData.Picture } // Update image data

    };
 
    await DataNoReturnSql(sql, parms);
}

 

    public async Task<List<Data>> GetTab(){  
        string sql = "SELECT COUNT FROM CARDSMEMORBILLIA WHERE bought = 'F'  ORDER BY rating DESC;";
        List<MySqlParameter> parms = new();
        return await SelectData(sql, parms);
    }












}
}
