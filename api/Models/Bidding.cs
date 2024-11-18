using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Bidding
    {
        public int BidID{ get; set; }
        public int InventoryID{ get; set; }
        public int AccountID{ get; set; }
        public int HighestBid{ get; set; }
        public TimeSpan RemainTime { get; set; }
        public int Price{ get; set; }

    }
}