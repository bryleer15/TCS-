using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace api.Models
{
    public class DataFileHandler
    {
        public List<Data> MyData = new List<Data>();
        public List<Data> GetAllData () {
            MyData.Add(new Data() {
                FirstName = "Ken",
                LastName = "Griffey Jr.",
                Team = "Mariners",
                Rating = 8,
                Price = 150,
                Sport = "Baseball",
                Type = "Card",
                ID = 00001,
                Pic = "https://smcci.com/cdn/shop/files/2_b0427ce3-37a1-479a-a412-8658f35d5cb4_300x300@2x.jpg?v=1694724184"
            });
            MyData.Add(new Data() {
                FirstName = "Barry",
                LastName = "Bonds",
                Team = "Giants",
                Rating = 6,
                Price = 200,
                Sport = "Baseball",
                Type = "Card",
                ID = 00002,
                Pic = "data:image/jpeg;base64,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"
            });
            MyData.Add(new Data() {
                FirstName = "Mark",
                LastName = "McGwire",
                Team = "Cardinals",
                Rating = 9,
                Price = 180,
                Sport = "Baseball",
                Type = "Card",
                ID = 00003,
                Pic = ""
            });
            MyData.Add(new Data() {
                FirstName = "Sammy",
                LastName = "Sosa",
                Team = "Cubs",
                Rating = 7,
                Price = 120,
                Sport = "Baseball",
                Type = "Card",
                ID = 00004,
                Pic = ""
            });
            MyData.Add(new Data() {
                FirstName = "Pedro",
                LastName = "Martinez",
                Team = "Red Sox",
                Rating = 10,
                Price = 250,
                Sport = "Baseball",
                Type = "Card",
                ID = 00005,
                Pic = ""
            });
            MyData.Add(new Data() {
                FirstName = "Peyton",
                LastName = "Manning",
                Team = "Broncos",
                Rating = 0,
                Price = 300,
                Sport = "Fooball",
                Type = "Jersey",
                ID = 00006,
                Pic = ""
            });
            MyData.Add(new Data() {
                FirstName = "Michael",
                LastName = "Jordan",
                Team = "Bulls",
                Rating = 0,
                Price = 400,
                Sport = "Basketball",
                Type = "Jersey",
                ID = 00007,
                Pic = ""
            });
            MyData.Add(new Data() {
                FirstName = "Sidney",
                LastName = "Crosby",
                Team = "Penguins",
                Rating = 0,
                Price = 150,
                Sport = "Hockey",
                Type = "Stick",
                ID = 00008,
                Pic = ""
            });
            MyData.Add(new Data() {
                FirstName = "Babe",
                LastName = "Ruth",
                Team = "Yankees",
                Rating = 0,
                Price = 300,
                Sport = "Baseball",
                Type = "Bat",
                ID = 00009,
                Pic = ""
            });
            return MyData;
 
        }
    }
}
