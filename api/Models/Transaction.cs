using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Transaction
    {
        public int TransID {get; set;}
        public int AccountID {get; set;}
        public int InventoryID {get; set;}
        public int Price {get; set;}
        public DateTime TransDate { get; set; }
        public int BidID { get; set; }
    }
}