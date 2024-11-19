using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Bid
    {
        public int BidID{ get; set; }
        public int InventoryID{ get; set; }
        public int AccountID{ get; set; }
        public double HighestBid{ get; set; }
        public DateTime BidDate {get; set;}
        public int RemainTime { get; set; }
        public double Price{ get; set; }

    }
}