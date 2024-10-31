using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Data
    {
        public int InventoryID { get; set; }
        public string Sport { get; set; }
        public double Price { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Team { get; set; }
        public int Rating { get; set; }
        public string Category { get; set; }
        public string IsBiddable { get; set; }
        public string Description { get; set; }
        public byte[] Picture { get; set; }
        public string Bought { get; set; }
 
        // This new property will hold the base64 image string
        public string PictureBase64 { get; set; }
    }

}