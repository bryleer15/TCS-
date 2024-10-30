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
           
             if(parms != null){
                command.Parameters.AddRange(parms.ToArray());
             }
 
             using var reader = await command.ExecuteReaderAsync();
            while(await reader.ReadAsync() )
            {
                myData.Add(new Data(){
                    InventoryID= reader.GetInt32(0),
                    Sport= reader.GetString(1),
                    Price= reader.GetDouble(2),
                    FirstName= reader.GetString(3),
                    LastName= reader.GetString(4),
                    Team= reader.GetString(5),
                    Rating= reader.GetInt32(6),
                    Category= reader.GetString(7),
                    IsBiddable= reader.GetString(8),
                    Description= reader.GetString(9),
                    Picture= reader.GetString(10),
                    Bought= reader.GetString(11)
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
             string sql = "SELECT * FROM CARDSMEMORBILLIA where deleted != 'Y' Order by rating DESC;";
             List<MySqlParameter> parms = new();
             return await SelectData(sql, parms);
        }
 
         public async Task<List<Data>> GetData(int inventoryID)
        {
             string sql = $"SELECT * FROM CARDSMEMORBILLIA WHERE inventoryID = @inventoryId;";
              List<MySqlParameter> parms = new();
              parms.Add(new MySqlParameter("@inventoryId", MySqlDbType.Int32) {Value = inventoryId});
             return await SelectData(sql, parms);
        }
 
        public async Task DeleteData(int id)
        {
             string sql = $"Update CARDSMEMORBILLIA set bought = 'T' WHERE inventoryId = @inventoryId;";
              List<MySqlParameter> parms = new();
              parms.Add(new MySqlParameter("@inventoryId", MySqlDbType.Int32) {Value = inventoryId});
            await DataNoReturnSql(sql, parms);
        }
 
        public async Task InsertData(Data myData)
        {
             string sql = @$"INSERT INTO CARDSMEMORBILLIA (sport, price, firstName, lastName, team, rating, category, isBiddable, description, picture, bought)
                            VALUES (@sport, @price, @firstName, @lastName, @team, @rating, @category, @isBiddable, @description, @picture, @bought); ";
              List<MySqlParameter> parms = new();
              parms.Add(new MySqlParameter("@sport", MySqlDbType.String) {Value = myData.Sport});
              parms.Add(new MySqlParameter("@price", MySqlDbType.Double) {Value = myData.Price});
              parms.Add(new MySqlParameter("@firstName", MySqlDbType.String) {Value = myData.FirstName});
              parms.Add(new MySqlParameter("@lastName", MySqlDbType.String) {Value = myData.LastName});
              parms.Add(new MySqlParameter("@team", MySqlDbType.String) {Value = myData.Team});
              parms.Add(new MySqlParameter("@rating", MySqlDbType.Int32) {Value = myData.Rating});
              parms.Add(new MySqlParameter("@isBiddable", MySqlDbType.String) {Value = "F"});
              parms.Add(new MySqlParameter("@category", MySqlDbType.String) {Value = myData.Category});
              parms.Add(new MySqlParameter("@description", MySqlDbType.String) {Value = myData.Description});
              parms.Add(new MySqlParameter("@picture", MySqlDbType.String) {Value = myData.Picture});
              parms.Add(new MySqlParameter("@bought", MySqlDbType.String) {Value = "F"});
              await DataNoReturnSql(sql, parms);
        }
 
        public async Task UpdateData(Data myData, int inventoryID)
        {
 
             string sql = @$"Update CARDSMEMORBILLIA SET InventoryID= @inventoryID,
                                Sport= @sport,
                                Price= @price,
                                FirstName= @firstName,
                                LastName= @lastName,
                                Team= @team,
                                Rating= @rating,
                                Category= @category,
                                IsBiddable= @isBiddable,
                                Description= @description,
                                Picture= @picture,
                                Bought= @bought
                            where inventoryID = @inventoryID;";
              List<MySqlParameter> parms = new();
              parms.Add(new MySqlParameter("@inventoryID", MySqlDbType.Int32) {Value = inventoryID});
              parms.Add(new MySqlParameter("@sport", MySqlDbType.String) {Value = myData.Sport});
              parms.Add(new MySqlParameter("@price", MySqlDbType.Double) {Value = myData.Price});
              parms.Add(new MySqlParameter("@firstName", MySqlDbType.String) {Value = myData.FirstName});
              parms.Add(new MySqlParameter("@lastName", MySqlDbType.String) {Value = myData.LastName});
              parms.Add(new MySqlParameter("@team", MySqlDbType.String) {Value = myData.Team});
              parms.Add(new MySqlParameter("@rating", MySqlDbType.Int32) {Value = myData.Rating});
              parms.Add(new MySqlParameter("@isBiddable", MySqlDbType.String) {Value = "F"});
              parms.Add(new MySqlParameter("@category", MySqlDbType.String) {Value = myData.Category});
              parms.Add(new MySqlParameter("@description", MySqlDbType.String) {Value = myData.Description});
              parms.Add(new MySqlParameter("@picture", MySqlDbType.String) {Value = myData.Picture});
              parms.Add(new MySqlParameter("@bought", MySqlDbType.String) {Value = "F"});
              await DataNoReturnSql(sql, parms);
        }
        
    }
 
}

