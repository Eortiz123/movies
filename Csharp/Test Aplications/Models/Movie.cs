namespace Test_Aplications.Models
{
    public class Movie
    {
        public int Id { get; set; }
        public string Titulo { get; set; } = string.Empty;
        public string Direccion { get; set; } = string.Empty;
        public string Produccion { get; set; } = string.Empty;
        public string Fotografo { get; set; } = string.Empty;
        public string Vestuario { get; set; } = string.Empty;
        public string Resena { get; set; } = string.Empty;
        public DateOnly FechaEstreno { get; set; }
        public string Pais { get; set; } = string.Empty;
        public int Duracion { get; set; } = 0;
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
    }
}
