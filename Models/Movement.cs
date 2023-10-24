using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MStarTest.Models
{
    [Table("movements")]
    public class Movement : BaseModel
    {
        [Column("type")]
        [Required(ErrorMessage = "O campo tipo é obrigatório.")]
        public int Type { get; set; }

        public string? TypeText { get; set; } //0 = Entrada ; 1 = Saída

        [Column("quantity")]
        [Required(ErrorMessage = "O campo quantidade é obrigatório.")]
        public float Quantity { get; set; }

        [Column("movimented_at")]
        public DateTime MovimentedAt { get; set; } = DateTime.UtcNow;

        [Column("stock_id")]
        [Required(ErrorMessage = "O campo local é obrigatório.")]
        public int StockId { get; set; }

        public string? StockName { get; set; }

        [Column("product_id")]
        [Required(ErrorMessage = "O campo produto é obrigatório.")]
        public int ProductId { get; set; }

        public string? ProductName { get; set; }

        public Stock? Stock { get; set; }
        public Product? Product { get; set; }
    }
}
