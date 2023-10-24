using System.ComponentModel.DataAnnotations.Schema;

namespace MStarTest.Models
{
    [Table("stocks")]
    public class Stock : SimpleModel
    {
        public ICollection<Movement> Moviments { get; set; } = new List<Movement>();
    }
}
