using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MStarTest.Models
{
    public class SimpleModel : BaseModel
    {
        [Column("name")]
        [Required(ErrorMessage = "O campo nome é obrigatório.")]
        [MinLength(4, ErrorMessage = "O campo nome pode ter no mínimo 4 caracteres.")]
        [MaxLength(120, ErrorMessage = "O campo nome pode ter no máximo 120 caracteres.")]
        public string Name { get; set; }
    }
}
